ARG ARCH
FROM kumahq/envoy:no-push-$ARCH as envoy
FROM ubuntu:22.04

RUN mkdir /kuma
RUN echo "# use this file to override default configuration of \`kuma-cp\`" > /kuma/kuma-cp.conf \
    && chmod a+rw /kuma/kuma-cp.conf

RUN apt update \
  && apt dist-upgrade -y \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    curl \
    dnsutils \
    iproute2 \
    iptables \
    ncat \
    net-tools \
    openssh-server \
    rsync \
    strace \
    tcpdump \
    telnet \
    tmux \
    tzdata \
    vim \
  && apt clean \
  && rm -rf /var/lib/apt/lists/*

RUN ssh-keygen -A \
  && sed -i s/#PermitRootLogin.*/PermitRootLogin\ yes/ /etc/ssh/sshd_config \
  && sed -i s/#PermitEmptyPasswords.*/PermitEmptyPasswords\ yes/ /etc/ssh/sshd_config \
  && mkdir /var/run/sshd \
  && passwd -d root \
  && chmod a+rwx /root \
  && useradd -u 5678 -U kuma-dp

ARG ARCH

ADD /build/artifacts-linux-$ARCH/kuma-cp/kuma-cp /usr/bin
ADD /build/artifacts-linux-$ARCH/kuma-dp/kuma-dp /usr/bin
COPY --from=envoy /envoy /usr/bin/envoy
ADD /build/artifacts-linux-$ARCH/coredns/coredns /usr/bin
ADD /build/artifacts-linux-$ARCH/kumactl/kumactl /usr/bin
ADD /build/artifacts-linux-$ARCH/test-server/test-server /usr/bin
ADD /test/server/certs/server.crt /kuma
ADD /test/server/certs/server.key /kuma

# do not detach (-D), log to stderr (-e)
CMD ["/usr/sbin/sshd", "-D", "-e"]
