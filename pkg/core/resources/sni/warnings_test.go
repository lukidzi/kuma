package sni_test

import (
	"strings"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"github.com/kumahq/kuma/v2/pkg/core/kri"
	core_model "github.com/kumahq/kuma/v2/pkg/core/resources/model"
	"github.com/kumahq/kuma/v2/pkg/core/resources/sni"
)

const (
	meshServiceType          core_model.ResourceType = "MeshService"
	meshExternalServiceType  core_model.ResourceType = "MeshExternalService"
	meshMultiZoneServiceType core_model.ResourceType = "MeshMultiZoneService"
)

var _ = Describe("Warnings", func() {
	It("returns nil for a compliant MeshService", func() {
		id := kri.Identifier{
			ResourceType: meshServiceType,
			Mesh:         "default",
			Name:         "backend",
			SectionName:  "http",
		}
		Expect(sni.Warnings(id)).To(BeEmpty())
	})

	It("warns when name contains '.'", func() {
		id := kri.Identifier{
			ResourceType: meshServiceType,
			Mesh:         "default",
			Name:         "foo.bar",
			SectionName:  "http",
		}
		ws := sni.Warnings(id)
		Expect(ws).To(HaveLen(1))
		Expect(ws[0]).To(ContainSubstring(`name "foo.bar" contains '.'`))
	})

	It("warns when a segment exceeds the DNS label limit", func() {
		long := strings.Repeat("a", 64)
		id := kri.Identifier{
			ResourceType: meshExternalServiceType,
			Mesh:         "default",
			Name:         long,
			SectionName:  "9000",
		}
		ws := sni.Warnings(id)
		Expect(ws).To(HaveLen(1))
		Expect(ws[0]).To(ContainSubstring("exceeds DNS label limit"))
	})

	It("warns when the computed SNI exceeds the DNS hostname limit", func() {
		// Build segments under the 63-char label limit but with a total above 253.
		seg := strings.Repeat("a", 63)
		id := kri.Identifier{
			ResourceType: meshServiceType,
			Mesh:         seg,
			Zone:         seg,
			Namespace:    seg,
			Name:         seg,
			SectionName:  "http",
		}
		ws := sni.Warnings(id)
		Expect(ws).ToNot(BeEmpty())
		joined := strings.Join(ws, "\n")
		Expect(joined).To(ContainSubstring("exceeds DNS hostname limit"))
	})

	It("returns nil for unsupported resource types", func() {
		id := kri.Identifier{
			ResourceType: "Dataplane",
			Mesh:         "default",
			Name:         "dp-1",
			SectionName:  "http",
		}
		Expect(sni.Warnings(id)).To(BeNil())
	})

	It("returns nil when required fields are missing", func() {
		id := kri.Identifier{
			ResourceType: meshMultiZoneServiceType,
			Mesh:         "default",
			Name:         "backend",
		}
		Expect(sni.Warnings(id)).To(BeNil())
	})
})
