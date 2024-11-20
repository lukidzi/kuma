import{d as S,e as p,o as r,m as d,w as a,a as o,k as _,P as v,b as n,t as i,S as C,$ as R,c as u,H as y,R as E,p as f,A as B,E as I,q as L}from"./index-Dx_kP1mI.js";import{F as N}from"./FilterBar-BIrduEPu.js";import{S as X}from"./SummaryView-CkTdfI05.js";const q={class:"stack"},T={class:"columns"},G={key:0},F={key:1},K=S({__name:"DelegatedGatewayDetailView",setup(j){return(H,l)=>{const k=p("KCard"),w=p("DataLoader"),h=p("XAction"),b=p("XIcon"),x=p("XActionGroup"),V=p("RouterView"),P=p("DataCollection"),$=p("AppView"),A=p("RouteView");return r(),d(A,{name:"delegated-gateway-detail-view",params:{mesh:"",service:"",page:1,size:50,s:"",dataPlane:""}},{default:a(({can:z,route:s,t:m,me:c})=>[o($,null,{default:a(()=>[_("div",q,[o(w,{src:`/meshes/${s.params.mesh}/service-insights/${s.params.service}`},{default:a(({data:t})=>[t?(r(),d(k,{key:0},{default:a(()=>{var e,g;return[_("div",T,[o(v,null,{title:a(()=>[n(i(m("http.api.property.status")),1)]),body:a(()=>[o(C,{status:t.status},null,8,["status"])]),_:2},1024),l[2]||(l[2]=n()),o(v,null,{title:a(()=>[n(i(m("http.api.property.address")),1)]),body:a(()=>[t.addressPort?(r(),d(R,{key:0,text:t.addressPort},null,8,["text"])):(r(),u(y,{key:1},[n(i(m("common.detail.none")),1)],64))]),_:2},1024),l[3]||(l[3]=n()),o(E,{online:((e=t.dataplanes)==null?void 0:e.online)??0,total:((g=t.dataplanes)==null?void 0:g.total)??0},{title:a(()=>[n(i(m("http.api.property.dataPlaneProxies")),1)]),_:2},1032,["online","total"])])]}),_:2},1024)):f("",!0)]),_:2},1032,["src"]),l[14]||(l[14]=n()),_("div",null,[_("h3",null,i(m("delegated-gateways.detail.data_plane_proxies")),1),l[13]||(l[13]=n()),o(k,{class:"mt-4"},{default:a(()=>[_("search",null,[o(N,{class:"data-plane-proxy-filter",placeholder:"tag: 'kuma.io/protocol: http'",query:s.params.s,fields:{name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"},...z("use zones")&&{zone:{description:"filter by “kuma.io/zone” value"}}},onChange:t=>s.update({...Object.fromEntries(t.entries())})},null,8,["query","fields","onChange"])]),l[12]||(l[12]=n()),o(w,{src:`/meshes/${s.params.mesh}/dataplanes/for/service-insight/${s.params.service}?page=${s.params.page}&size=${s.params.size}&search=${s.params.s}`},{loadable:a(({data:t})=>[o(P,{type:"data-planes",items:(t==null?void 0:t.items)??[void 0],page:s.params.page,"page-size":s.params.size,total:t==null?void 0:t.total,onChange:s.update},{default:a(()=>[o(B,{class:"data-plane-collection","data-testid":"data-plane-collection",headers:[{...c.get("headers.name"),label:"Name",key:"name"},{...c.get("headers.namespace"),label:"Namespace",key:"namespace"},...z("use zones")?[{...c.get("headers.zone"),label:"Zone",key:"zone"}]:[],{...c.get("headers.certificate"),label:"Certificate Info",key:"certificate"},{...c.get("headers.status"),label:"Status",key:"status"},{...c.get("headers.warnings"),label:"Warnings",key:"warnings",hideLabel:!0},{...c.get("headers.actions"),label:"Actions",key:"actions",hideLabel:!0}],items:t==null?void 0:t.items,"is-selected-row":e=>e.name===s.params.dataPlane,onResize:c.set},{name:a(({row:e})=>[o(h,{"data-action":"",class:"name-link",to:{name:"delegated-gateway-data-plane-summary-view",params:{mesh:e.mesh,dataPlane:e.id},query:{page:s.params.page,size:s.params.size,s:s.params.s}}},{default:a(()=>[n(i(e.name),1)]),_:2},1032,["to"])]),namespace:a(({row:e})=>[n(i(e.namespace),1)]),zone:a(({row:e})=>[e.zone?(r(),d(h,{key:0,to:{name:"zone-cp-detail-view",params:{zone:e.zone}}},{default:a(()=>[n(i(e.zone),1)]),_:2},1032,["to"])):(r(),u(y,{key:1},[n(i(m("common.collection.none")),1)],64))]),certificate:a(({row:e})=>{var g;return[(g=e.dataplaneInsight.mTLS)!=null&&g.certificateExpirationTime?(r(),u(y,{key:0},[n(i(m("common.formats.datetime",{value:Date.parse(e.dataplaneInsight.mTLS.certificateExpirationTime)})),1)],64)):(r(),u(y,{key:1},[n(i(m("data-planes.components.data-plane-list.certificate.none")),1)],64))]}),status:a(({row:e})=>[o(C,{status:e.status},null,8,["status"])]),warnings:a(({row:e})=>[e.isCertExpired||e.warnings.length>0?(r(),d(b,{key:0,class:"mr-1",name:"warning"},{default:a(()=>[_("ul",null,[e.warnings.length>0?(r(),u("li",G,i(m("data-planes.components.data-plane-list.version_mismatch")),1)):f("",!0),l[4]||(l[4]=n()),e.isCertExpired?(r(),u("li",F,i(m("data-planes.components.data-plane-list.cert_expired")),1)):f("",!0)])]),_:2},1024)):(r(),u(y,{key:1},[n(i(m("common.collection.none")),1)],64))]),actions:a(({row:e})=>[o(x,null,{default:a(()=>[o(h,{to:{name:"data-plane-detail-view",params:{dataPlane:e.id}}},{default:a(()=>[n(i(m("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["headers","items","is-selected-row","onResize"]),l[11]||(l[11]=n()),s.params.dataPlane?(r(),d(V,{key:0},{default:a(e=>[o(X,{onClose:g=>s.replace({name:s.name,params:{mesh:s.params.mesh},query:{page:s.params.page,size:s.params.size,s:s.params.s}})},{default:a(()=>[typeof t<"u"?(r(),d(I(e.Component),{key:0,items:t.items},null,8,["items"])):f("",!0)]),_:2},1032,["onClose"])]),_:2},1024)):f("",!0)]),_:2},1032,["items","page","page-size","total","onChange"])]),_:2},1032,["src"])]),_:2},1024)])])]),_:2},1024)]),_:1})}}}),J=L(K,[["__scopeId","data-v-b42bf862"]]);export{J as default};
