import{d as T,a as p,o as l,b as c,w as a,Z as b,t as m,f as s,e as i,W as L,F as u,c as d,av as B,m as _,p as y,T as I,K as w,q as f,U as N,D as R,_ as $}from"./index-2mpecEEN.js";import{A as E}from"./AppCollection-0LRJcRDP.js";import{F}from"./FilterBar-YuBvyv-p.js";import{S as C}from"./StatusBadge-o8igEgDo.js";import{S as K}from"./SummaryView-cSkFFChd.js";const A={class:"stack"},W={class:"columns"},Z={key:0},G={key:1},O=T({__name:"DelegatedGatewayDetailView",setup(U){return(D,J)=>{const h=p("KCard"),k=p("DataLoader"),g=p("RouterLink"),x=p("KTooltip"),S=p("RouterView"),P=p("AppView"),V=p("RouteView"),q=p("DataSource");return l(),c(q,{src:"/me"},{default:a(({data:z})=>[z?(l(),c(V,{key:0,name:"delegated-gateway-detail-view",params:{mesh:"",service:"",page:1,size:z.pageSize,query:"",s:"",dataPlane:""}},{default:a(({can:v,route:t,t:o})=>[i(P,null,{default:a(()=>[_("div",A,[i(k,{src:`/meshes/${t.params.mesh}/service-insights/${t.params.service}`},{default:a(({data:n})=>[n?(l(),c(h,{key:0},{default:a(()=>{var e,r;return[_("div",W,[i(b,null,{title:a(()=>[s(m(o("http.api.property.status")),1)]),body:a(()=>[i(C,{status:n.status},null,8,["status"])]),_:2},1024),s(),i(b,null,{title:a(()=>[s(m(o("http.api.property.address")),1)]),body:a(()=>[n.addressPort?(l(),c(L,{key:0,text:n.addressPort},null,8,["text"])):(l(),d(u,{key:1},[s(m(o("common.detail.none")),1)],64))]),_:2},1024),s(),i(B,{online:((e=n.dataplanes)==null?void 0:e.online)??0,total:((r=n.dataplanes)==null?void 0:r.total)??0},{title:a(()=>[s(m(o("http.api.property.dataPlaneProxies")),1)]),_:2},1032,["online","total"])])]}),_:2},1024)):y("",!0)]),_:2},1032,["src"]),s(),_("div",null,[_("h3",null,m(o("delegated-gateways.detail.data_plane_proxies")),1),s(),i(h,{class:"mt-4"},{default:a(()=>[i(k,{src:`/meshes/${t.params.mesh}/dataplanes/for/${t.params.service}?page=${t.params.page}&size=${t.params.size}&search=${t.params.s}`,loader:!1},{default:a(({data:n})=>[i(E,{class:"data-plane-collection","data-testid":"data-plane-collection","page-number":t.params.page,"page-size":t.params.size,headers:[{label:"Name",key:"name"},...v("use zones")?[{label:"Zone",key:"zone"}]:[],{label:"Certificate Info",key:"certificate"},{label:"Status",key:"status"},{label:"Warnings",key:"warnings",hideLabel:!0},{label:"Details",key:"details",hideLabel:!0}],items:n==null?void 0:n.items,total:n==null?void 0:n.total,"is-selected-row":e=>e.name===t.params.dataPlane,"summary-route-name":"delegated-gateway-data-plane-summary-view","empty-state-message":o("common.emptyState.message",{type:"Data Plane Proxies"}),"empty-state-cta-to":o("data-planes.href.docs.data_plane_proxy"),"empty-state-cta-text":o("common.documentation"),onChange:t.update},{toolbar:a(()=>[i(F,{class:"data-plane-proxy-filter",placeholder:"tag: 'kuma.io/protocol: http'",query:t.params.query,fields:{name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"},...v("use zones")&&{zone:{description:"filter by “kuma.io/zone” value"}}},onFieldsChange:e=>t.update({query:e.query,s:e.query.length>0?JSON.stringify(e.fields):""})},null,8,["placeholder","query","fields","onFieldsChange"])]),name:a(({row:e})=>[i(g,{class:"name-link",title:e.name,to:{name:"delegated-gateway-data-plane-summary-view",params:{mesh:e.mesh,dataPlane:e.name},query:{page:t.params.page,size:t.params.size,query:t.params.query}}},{default:a(()=>[s(m(e.name),1)]),_:2},1032,["title","to"])]),zone:a(({row:e})=>[e.zone?(l(),c(g,{key:0,to:{name:"zone-cp-detail-view",params:{zone:e.zone}}},{default:a(()=>[s(m(e.zone),1)]),_:2},1032,["to"])):(l(),d(u,{key:1},[s(m(o("common.collection.none")),1)],64))]),certificate:a(({row:e})=>{var r;return[(r=e.dataplaneInsight.mTLS)!=null&&r.certificateExpirationTime?(l(),d(u,{key:0},[s(m(o("common.formats.datetime",{value:Date.parse(e.dataplaneInsight.mTLS.certificateExpirationTime)})),1)],64)):(l(),d(u,{key:1},[s(m(o("data-planes.components.data-plane-list.certificate.none")),1)],64))]}),status:a(({row:e})=>[i(C,{status:e.status},null,8,["status"])]),warnings:a(({row:e})=>[e.isCertExpired||e.warnings.length>0?(l(),c(x,{key:0},{content:a(()=>[_("ul",null,[e.warnings.length>0?(l(),d("li",Z,m(o("data-planes.components.data-plane-list.version_mismatch")),1)):y("",!0),s(),e.isCertExpired?(l(),d("li",G,m(o("data-planes.components.data-plane-list.cert_expired")),1)):y("",!0)])]),default:a(()=>[s(),i(I,{class:"mr-1",size:f(w),"hide-title":""},null,8,["size"])]),_:2},1024)):(l(),d(u,{key:1},[s(m(o("common.collection.none")),1)],64))]),details:a(({row:e})=>[i(g,{class:"details-link","data-testid":"details-link",to:{name:"data-plane-detail-view",params:{dataPlane:e.name}}},{default:a(()=>[s(m(o("common.collection.details_link"))+" ",1),i(f(N),{display:"inline-block",decorative:"",size:f(w)},null,8,["size"])]),_:2},1032,["to"])]),_:2},1032,["page-number","page-size","headers","items","total","is-selected-row","empty-state-message","empty-state-cta-to","empty-state-cta-text","onChange"]),s(),t.params.dataPlane?(l(),c(S,{key:0},{default:a(e=>[i(K,{onClose:r=>t.replace({name:t.name,params:{mesh:t.params.mesh},query:{page:t.params.page,size:t.params.size}})},{default:a(()=>[(l(),c(R(e.Component),{name:t.params.dataPlane,"dataplane-overview":n==null?void 0:n.items.find(r=>r.name===t.params.dataPlane)},null,8,["name","dataplane-overview"]))]),_:2},1032,["onClose"])]),_:2},1024)):y("",!0)]),_:2},1032,["src"])]),_:2},1024)])])]),_:2},1024)]),_:2},1032,["params"])):y("",!0)]),_:1})}}}),Y=$(O,[["__scopeId","data-v-45fab6b7"]]);export{Y as default};
