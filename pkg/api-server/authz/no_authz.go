package authz

import (
	"github.com/emicklei/go-restful/v3"
)

func NoAuthorizator(request *restful.Request, response *restful.Response, chain *restful.FilterChain) {
	chain.ProcessFilter(request, response)
}
