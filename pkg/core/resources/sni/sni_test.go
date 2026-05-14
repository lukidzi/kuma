package sni_test

import (
	"strings"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"github.com/kumahq/kuma/v2/pkg/core/kri"
	meshexternalservice_api "github.com/kumahq/kuma/v2/pkg/core/resources/apis/meshexternalservice/api/v1alpha1"
	meshmzservice_api "github.com/kumahq/kuma/v2/pkg/core/resources/apis/meshmultizoneservice/api/v1alpha1"
	meshservice_api "github.com/kumahq/kuma/v2/pkg/core/resources/apis/meshservice/api/v1alpha1"
	"github.com/kumahq/kuma/v2/pkg/core/resources/sni"
)

var _ = Describe("FromKRI / ValidateKRI", func() {
	type kriTestCase struct {
		id        kri.Identifier
		expected  string
		expectErr bool
	}
	DescribeTable("",
		func(tc kriTestCase) {
			err := sni.ValidateKRI(tc.id)
			if tc.expectErr {
				Expect(err).To(HaveOccurred())
				return
			}
			Expect(err).ToNot(HaveOccurred())
			out := sni.FromKRI(tc.id)
			Expect(out).To(Equal(tc.expected))
			Expect(govalidator.IsDNSName(out)).To(BeTrue())
		},
		Entry("MeshService global", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "default",
				Name:         "backend",
				SectionName:  "http",
			},
			expected: "sni.msvc.default.backend.http",
		}),
		Entry("MeshService zone system-ns", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "default",
				Zone:         "east",
				Name:         "backend",
				SectionName:  "http",
			},
			expected: "sni.msvc.default.east.backend.http",
		}),
		Entry("MeshService zone custom-ns", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "default",
				Zone:         "east",
				Namespace:    "app-ns",
				Name:         "backend",
				SectionName:  "http",
			},
			expected: "sni.msvc.default.east.app-ns.backend.http",
		}),
		Entry("MeshExternalService global", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshexternalservice_api.MeshExternalServiceType,
				Mesh:         "default",
				Name:         "ext-backend",
				SectionName:  "9000",
			},
			expected: "sni.extsvc.default.ext-backend.9000",
		}),
		Entry("MeshExternalService zone", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshexternalservice_api.MeshExternalServiceType,
				Mesh:         "prod",
				Zone:         "west",
				Name:         "ext-backend",
				SectionName:  "9000",
			},
			expected: "sni.extsvc.prod.west.ext-backend.9000",
		}),
		Entry("MeshMultiZoneService global", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshmzservice_api.MeshMultiZoneServiceType,
				Mesh:         "default",
				Name:         "global-svc",
				SectionName:  "http",
			},
			expected: "sni.mzsvc.default.global-svc.http",
		}),
		Entry("MeshMultiZoneService numeric port", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshmzservice_api.MeshMultiZoneServiceType,
				Mesh:         "default",
				Name:         "global-svc",
				SectionName:  "8080",
			},
			expected: "sni.mzsvc.default.global-svc.8080",
		}),
		Entry("error empty mesh", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Name:         "backend",
				SectionName:  "http",
			},
			expectErr: true,
		}),
		Entry("error empty name", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "default",
				SectionName:  "http",
			},
			expectErr: true,
		}),
		Entry("error empty sectionName", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "default",
				Name:         "backend",
			},
			expectErr: true,
		}),
		Entry("error namespace without zone", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "default",
				Namespace:    "app-ns",
				Name:         "backend",
				SectionName:  "http",
			},
			expectErr: true,
		}),
		Entry("error mesh contains dot", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "de.fault",
				Name:         "backend",
				SectionName:  "http",
			},
			expectErr: true,
		}),
		Entry("error name contains dot", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "default",
				Name:         "back.end",
				SectionName:  "http",
			},
			expectErr: true,
		}),
		Entry("error zone contains dot", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "default",
				Zone:         "east.zone",
				Name:         "backend",
				SectionName:  "http",
			},
			expectErr: true,
		}),
		Entry("error sectionName contains dot", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "default",
				Name:         "backend",
				SectionName:  "http.port",
			},
			expectErr: true,
		}),
		Entry("label exactly 63 chars", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "default",
				Name:         strings.Repeat("a", 63),
				SectionName:  "http",
			},
			expected: "sni.msvc.default." + strings.Repeat("a", 63) + ".http",
		}),
		Entry("error label exceeds 63 chars", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         "default",
				Name:         strings.Repeat("a", 64),
				SectionName:  "http",
			},
			expectErr: true,
		}),
		Entry("error total exceeds 253 chars", kriTestCase{
			id: kri.Identifier{
				ResourceType: meshservice_api.MeshServiceType,
				Mesh:         strings.Repeat("a", 63),
				Zone:         strings.Repeat("b", 63),
				Namespace:    strings.Repeat("c", 63),
				Name:         strings.Repeat("d", 63),
				SectionName:  "http",
			},
			expectErr: true,
		}),
	)

	It("returns an error mentioning DNS label limit", func() {
		err := sni.ValidateKRI(kri.Identifier{
			ResourceType: meshservice_api.MeshServiceType,
			Mesh:         "default",
			Name:         strings.Repeat("a", 64),
			SectionName:  "http",
		})
		Expect(err).To(HaveOccurred())
		Expect(err.Error()).To(ContainSubstring("DNS label limit"))
	})

	It("returns an error mentioning DNS hostname limit", func() {
		err := sni.ValidateKRI(kri.Identifier{
			ResourceType: meshservice_api.MeshServiceType,
			Mesh:         strings.Repeat("a", 63),
			Zone:         strings.Repeat("b", 63),
			Namespace:    strings.Repeat("c", 63),
			Name:         strings.Repeat("d", 63),
			SectionName:  "http",
		})
		Expect(err).To(HaveOccurred())
		Expect(err.Error()).To(ContainSubstring("DNS hostname limit"))
	})
})
