package xds

import (
	"fmt"
	"net"

	core_meta "github.com/kumahq/kuma/v3/pkg/core/metadata"
)

// chainClass groups protocols whose filter chains can collide: chains of different
// classes always differ in the transport or application protocols they match on.
type chainClass int

const (
	tcpChain  chainClass = iota // tcp and mysql: raw_buffer with optional address and port
	tlsChain                    // tls: tls transport with SNI or address and optional port
	httpChain                   // http, http2 and grpc: raw_buffer and http/1.1,h2c with optional address and port
)

func protocolClass(protocol core_meta.Protocol) chainClass {
	switch protocol {
	case core_meta.ProtocolTLS:
		return tlsChain
	case core_meta.ProtocolHTTP, core_meta.ProtocolHTTP2, core_meta.ProtocolGRPC:
		return httpChain
	default:
		return tcpChain
	}
}

// chainKey identifies the filter chain a match ends up in: all domains of an L7
// protocol and port share one chain, TLS domains get a chain per SNI, IPs and CIDRs
// a chain per destination prefix range.
type chainKey struct {
	class   chainClass
	port    uint32
	address string
	sni     string
}

func newChainKey(matcher Matcher) chainKey {
	key := chainKey{class: protocolClass(matcher.Protocol), port: matcher.Port}
	switch matcher.MatchType {
	case IP, IPV6, CIDR, CIDRV6:
		key.address = normalizePrefix(matcher.MatchType, matcher.Value)
	case Domain, WildcardDomain:
		if key.class == tlsChain {
			key.sni = matcher.Value
		}
	}
	return key
}

func (k chainKey) describe() string {
	if k.sni != "" {
		return fmt.Sprintf("domain %q", k.sni)
	}
	if k.address == "" {
		return "domains"
	}
	return k.address
}

func (k chainKey) conflictReason() string {
	if k.class == httpChain {
		return fmt.Sprintf("only one of %v can be configured on the same port", l7Protocols)
	}
	return "both would produce the same filter chain matcher"
}

// normalizePrefix converts an address to the prefix range Envoy matches on, so an IP,
// a CIDR covering only that IP and a non-canonical spelling all resolve to the same chain
func normalizePrefix(matchType MatchType, value string) string {
	switch matchType {
	case IP:
		return canonicalIP(value) + "/32"
	case IPV6:
		return canonicalIP(value) + "/128"
	case CIDR, CIDRV6:
		ip, prefixLen := getIpAndMask(value)
		return fmt.Sprintf("%s/%d", ip, prefixLen)
	}
	return ""
}

func canonicalIP(value string) string {
	if ip := net.ParseIP(value); ip != nil {
		return ip.String()
	}
	return value
}

func getIpAndMask(cidr string) (string, uint32) {
	_, ipNet, err := net.ParseCIDR(cidr)
	if err != nil {
		return "", 0
	}
	ip := ipNet.IP.String()
	mask, _ := ipNet.Mask.Size()
	return ip, uint32(mask)
}

func describePort(port uint32) string {
	if port == 0 {
		return "all ports"
	}
	return fmt.Sprintf("port %d", port)
}
