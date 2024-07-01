import{d as B,h as r,o as s,a as c,w as t,j as n,g as z,C as L,k as o,t as l,b as p,F as u,S as $,e as d,z as b,M as E,r as N,A as P}from"./index-9gITI0JG.js";import{e as R}from"./kong-icons.es249-VUMzy5J0.js";import{F as T}from"./FilterBar-D-u9GZIh.js";import{S as q}from"./SummaryView-uFb2OIQZ.js";const A={class:"stack"},F={key:0},K={key:1},j=B({__name:"BuiltinGatewayDataplanesView",setup(O){return(X,Z)=>{const _=r("RouterLink"),v=r("XIcon"),w=r("RouterView"),C=r("DataLoader"),x=r("KCard"),f=r("DataSource"),S=r("AppView"),V=r("RouteView");return s(),c(f,{src:"/me"},{default:t(({data:k})=>[k?(s(),c(V,{key:0,name:"builtin-gateway-dataplanes-view",params:{mesh:"",gateway:"",listener:"",page:1,size:k.pageSize,s:"",dataPlane:""}},{default:t(({can:h,route:a,t:i})=>[n(S,null,{default:t(()=>[n(f,{src:`/meshes/${a.params.mesh}/mesh-gateways/${a.params.gateway}`},{default:t(({data:y,error:I})=>[z("div",A,[n(x,null,{default:t(()=>[n(C,{src:y===void 0?"":`/meshes/${a.params.mesh}/dataplanes/for/service-insight/${y.selectors[0].match["kuma.io/service"]}?page=${a.params.page}&size=${a.params.size}&search=${a.params.s}`,data:[y],errors:[I],loader:!1},{default:t(({data:m})=>[n(L,{class:"data-plane-collection","data-testid":"data-plane-collection","page-number":a.params.page,"page-size":a.params.size,headers:[{label:"Name",key:"name"},{label:"Namespace",key:"namespace"},...h("use zones")?[{label:"Zone",key:"zone"}]:[],{label:"Certificate Info",key:"certificate"},{label:"Status",key:"status"},{label:"Warnings",key:"warnings",hideLabel:!0},{label:"Details",key:"details",hideLabel:!0}],items:m==null?void 0:m.items,total:m==null?void 0:m.total,"is-selected-row":e=>e.name===a.params.dataPlane,"summary-route-name":"builtin-gateway-data-plane-summary-view","empty-state-message":i("common.emptyState.message",{type:"Data Plane Proxies"}),"empty-state-cta-to":i("data-planes.href.docs.data_plane_proxy"),"empty-state-cta-text":i("common.documentation"),onChange:a.update},{toolbar:t(()=>[n(T,{class:"data-plane-proxy-filter",placeholder:"name:dataplane-name",query:a.params.s,fields:{name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},service:{description:"filter by “kuma.io/service” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"},...h("use zones")&&{zone:{description:"filter by “kuma.io/zone” value"}}},onChange:e=>a.update({...Object.fromEntries(e.entries())})},null,8,["query","fields","onChange"])]),namespace:t(({row:e})=>[o(l(e.namespace),1)]),name:t(({row:e})=>[n(_,{class:"name-link",title:e.name,to:{name:"builtin-gateway-data-plane-summary-view",params:{mesh:e.mesh,dataPlane:e.id},query:{page:a.params.page,size:a.params.size,s:a.params.s}}},{default:t(()=>[o(l(e.name),1)]),_:2},1032,["title","to"])]),zone:t(({row:e})=>[e.zone?(s(),c(_,{key:0,to:{name:"zone-cp-detail-view",params:{zone:e.zone}}},{default:t(()=>[o(l(e.zone),1)]),_:2},1032,["to"])):(s(),p(u,{key:1},[o(l(i("common.collection.none")),1)],64))]),certificate:t(({row:e})=>{var g;return[(g=e.dataplaneInsight.mTLS)!=null&&g.certificateExpirationTime?(s(),p(u,{key:0},[o(l(i("common.formats.datetime",{value:Date.parse(e.dataplaneInsight.mTLS.certificateExpirationTime)})),1)],64)):(s(),p(u,{key:1},[o(l(i("data-planes.components.data-plane-list.certificate.none")),1)],64))]}),status:t(({row:e})=>[n($,{status:e.status},null,8,["status"])]),warnings:t(({row:e})=>[e.isCertExpired||e.warnings.length>0?(s(),c(v,{key:0,class:"mr-1",name:"warning"},{default:t(()=>[z("ul",null,[e.warnings.length>0?(s(),p("li",F,l(i("data-planes.components.data-plane-list.version_mismatch")),1)):d("",!0),o(),e.isCertExpired?(s(),p("li",K,l(i("data-planes.components.data-plane-list.cert_expired")),1)):d("",!0)])]),_:2},1024)):(s(),p(u,{key:1},[o(l(i("common.collection.none")),1)],64))]),details:t(({row:e})=>[n(_,{class:"details-link","data-testid":"details-link",to:{name:"data-plane-detail-view",params:{dataPlane:e.id}}},{default:t(()=>[o(l(i("common.collection.details_link"))+" ",1),n(b(R),{decorative:"",size:b(E)},null,8,["size"])]),_:2},1032,["to"])]),_:2},1032,["page-number","page-size","headers","items","total","is-selected-row","empty-state-message","empty-state-cta-to","empty-state-cta-text","onChange"]),o(),a.params.dataPlane?(s(),c(w,{key:0},{default:t(e=>[n(q,{onClose:g=>a.replace({name:a.name,params:{mesh:a.params.mesh},query:{page:a.params.page,size:a.params.size,s:a.params.s}})},{default:t(()=>[typeof m<"u"?(s(),c(N(e.Component),{key:0,items:m.items},null,8,["items"])):d("",!0)]),_:2},1032,["onClose"])]),_:2},1024)):d("",!0)]),_:2},1032,["src","data","errors"])]),_:2},1024)])]),_:2},1032,["src"])]),_:2},1024)]),_:2},1032,["params"])):d("",!0)]),_:1})}}}),G=P(j,[["__scopeId","data-v-79c7b1d8"]]);export{G as default};
