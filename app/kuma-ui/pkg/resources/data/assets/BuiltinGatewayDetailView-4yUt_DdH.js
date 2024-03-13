import{d as P,a as r,o as s,b as p,w as t,e as n,t as m,f as o,F as u,c,p as y,m as B,T as L,K as w,q as g,U as T,D as I,_ as N}from"./index-2mpecEEN.js";import{A as $}from"./AppCollection-0LRJcRDP.js";import{F as E}from"./FilterBar-YuBvyv-p.js";import{S as F}from"./StatusBadge-o8igEgDo.js";import{S as K}from"./SummaryView-cSkFFChd.js";const R={key:0},A={key:1},G=P({__name:"BuiltinGatewayDetailView",setup(O){return(U,Z)=>{const _=r("RouterLink"),v=r("KTooltip"),b=r("RouterView"),C=r("KCard"),x=r("DataLoader"),h=r("DataSource"),S=r("AppView"),V=r("RouteView");return s(),p(h,{src:"/me"},{default:t(({data:k})=>[k?(s(),p(V,{key:0,name:"builtin-gateway-detail-view",params:{mesh:"",gateway:"",page:1,size:k.pageSize,query:"",s:"",dataPlane:""}},{default:t(({can:z,route:a,t:i})=>[n(S,null,{default:t(()=>[n(h,{src:`/meshes/${a.params.mesh}/mesh-gateways/${a.params.gateway}`},{default:t(({data:f,error:q})=>[n(x,{src:f===void 0?"":`/meshes/${a.params.mesh}/dataplanes/for/${f.selectors[0].match["kuma.io/service"]}?page=${a.params.page}&size=${a.params.size}&search=${a.params.s}`,data:[f],errors:[q],loader:!1},{default:t(({data:l})=>[n(C,null,{default:t(()=>[n($,{class:"data-plane-collection","data-testid":"data-plane-collection","page-number":a.params.page,"page-size":a.params.size,headers:[{label:"Name",key:"name"},...z("use zones")?[{label:"Zone",key:"zone"}]:[],{label:"Certificate Info",key:"certificate"},{label:"Status",key:"status"},{label:"Warnings",key:"warnings",hideLabel:!0},{label:"Details",key:"details",hideLabel:!0}],items:l==null?void 0:l.items,total:l==null?void 0:l.total,"is-selected-row":e=>e.name===a.params.dataPlane,"summary-route-name":"builtin-gateway-data-plane-summary-view","empty-state-message":i("common.emptyState.message",{type:"Data Plane Proxies"}),"empty-state-cta-to":i("data-planes.href.docs.data_plane_proxy"),"empty-state-cta-text":i("common.documentation"),onChange:a.update},{toolbar:t(()=>[n(E,{class:"data-plane-proxy-filter",placeholder:"tag: 'kuma.io/protocol: http'",query:a.params.query,fields:{name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},service:{description:"filter by “kuma.io/service” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"},...z("use zones")&&{zone:{description:"filter by “kuma.io/zone” value"}}},onFieldsChange:e=>a.update({query:e.query,s:e.query.length>0?JSON.stringify(e.fields):""})},null,8,["placeholder","query","fields","onFieldsChange"])]),name:t(({row:e})=>[n(_,{class:"name-link",title:e.name,to:{name:"builtin-gateway-data-plane-summary-view",params:{mesh:e.mesh,dataPlane:e.name},query:{page:a.params.page,size:a.params.size,query:a.params.query}}},{default:t(()=>[o(m(e.name),1)]),_:2},1032,["title","to"])]),zone:t(({row:e})=>[e.zone?(s(),p(_,{key:0,to:{name:"zone-cp-detail-view",params:{zone:e.zone}}},{default:t(()=>[o(m(e.zone),1)]),_:2},1032,["to"])):(s(),c(u,{key:1},[o(m(i("common.collection.none")),1)],64))]),certificate:t(({row:e})=>{var d;return[(d=e.dataplaneInsight.mTLS)!=null&&d.certificateExpirationTime?(s(),c(u,{key:0},[o(m(i("common.formats.datetime",{value:Date.parse(e.dataplaneInsight.mTLS.certificateExpirationTime)})),1)],64)):(s(),c(u,{key:1},[o(m(i("data-planes.components.data-plane-list.certificate.none")),1)],64))]}),status:t(({row:e})=>[n(F,{status:e.status},null,8,["status"])]),warnings:t(({row:e})=>[e.isCertExpired||e.warnings.length>0?(s(),p(v,{key:0},{content:t(()=>[B("ul",null,[e.warnings.length>0?(s(),c("li",R,m(i("data-planes.components.data-plane-list.version_mismatch")),1)):y("",!0),o(),e.isCertExpired?(s(),c("li",A,m(i("data-planes.components.data-plane-list.cert_expired")),1)):y("",!0)])]),default:t(()=>[o(),n(L,{class:"mr-1",size:g(w),"hide-title":""},null,8,["size"])]),_:2},1024)):(s(),c(u,{key:1},[o(m(i("common.collection.none")),1)],64))]),details:t(({row:e})=>[n(_,{class:"details-link","data-testid":"details-link",to:{name:"data-plane-detail-view",params:{dataPlane:e.name}}},{default:t(()=>[o(m(i("common.collection.details_link"))+" ",1),n(g(T),{display:"inline-block",decorative:"",size:g(w)},null,8,["size"])]),_:2},1032,["to"])]),_:2},1032,["page-number","page-size","headers","items","total","is-selected-row","empty-state-message","empty-state-cta-to","empty-state-cta-text","onChange"]),o(),a.params.dataPlane?(s(),p(b,{key:0},{default:t(e=>[n(K,{onClose:d=>a.replace({name:a.name,params:{mesh:a.params.mesh},query:{page:a.params.page,size:a.params.size}})},{default:t(()=>[(s(),p(I(e.Component),{name:a.params.dataPlane,"dataplane-overview":l==null?void 0:l.items.find(d=>d.name===a.params.dataPlane)},null,8,["name","dataplane-overview"]))]),_:2},1032,["onClose"])]),_:2},1024)):y("",!0)]),_:2},1024)]),_:2},1032,["src","data","errors"])]),_:2},1032,["src"])]),_:2},1024)]),_:2},1032,["params"])):y("",!0)]),_:1})}}}),Q=N(G,[["__scopeId","data-v-a756f43e"]]);export{Q as default};
