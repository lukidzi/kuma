import{d as D,i as r,o as n,a as i,w as a,j as p,g as v,k as s,W as E,P as L,A as k,ap as N,e as y,t as l,J as C,b as c,H as u,Y as R,K as B,r as K,_ as A}from"./index-vd7wH-Zb.js";import{p as q}from"./kong-icons.es249-aJT92nbg.js";import{A as X}from"./AppCollection-CMVdgfiW.js";import{F}from"./FilterBar-B0O2Vf6H.js";import{S as O}from"./StatusBadge-CpgHKe5C.js";import{S as Z}from"./SummaryView-DApkNH1r.js";import"./kong-icons.es245-CaXnw5Ae.js";const j={key:0},U={key:1},W=D({__name:"DataPlaneListView",setup(H){return(J,Y)=>{const w=r("RouteTitle"),f=r("XIcon"),T=r("XSelect"),_=r("RouterLink"),S=r("KTruncate"),x=r("RouterView"),V=r("KCard"),I=r("AppView"),h=r("DataSource"),$=r("RouteView");return n(),i(h,{src:"/me"},{default:a(({data:z})=>[z?(n(),i($,{key:0,name:"data-plane-list-view",params:{page:1,size:z.pageSize,dataplaneType:"all",s:"",mesh:"",dataPlane:""}},{default:a(({can:b,route:t,t:o})=>[p(h,{src:`/meshes/${t.params.mesh}/dataplanes/of/${t.params.dataplaneType}?page=${t.params.page}&size=${t.params.size}&search=${t.params.s}`},{default:a(({data:d,error:g})=>[p(I,null,{title:a(()=>[v("h2",null,[p(w,{title:o("data-planes.routes.items.title")},null,8,["title"])])]),default:a(()=>[s(),p(V,null,{default:a(()=>[g!==void 0?(n(),i(E,{key:0,error:g},null,8,["error"])):(n(),i(X,{key:1,class:"data-plane-collection","data-testid":"data-plane-collection","page-number":t.params.page,"page-size":t.params.size,headers:[{label:" ",key:"type"},{label:"Name",key:"name"},{label:"Namespace",key:"namespace"},...b("use zones")?[{label:"Zone",key:"zone"}]:[],{label:"Services",key:"services"},{label:"Certificate Info",key:"certificate"},{label:"Status",key:"status"},{label:"Warnings",key:"warnings",hideLabel:!0},{label:"Details",key:"details",hideLabel:!0}],items:d==null?void 0:d.items,total:d==null?void 0:d.total,error:g,"is-selected-row":e=>e.name===t.params.dataPlane,"summary-route-name":"service-data-plane-summary-view","empty-state-message":o("common.emptyState.message",{type:"Data Plane Proxies"}),"empty-state-cta-to":o("data-planes.href.docs.data_plane_proxy"),"empty-state-cta-text":o("common.documentation"),onChange:t.update},{toolbar:a(()=>[p(F,{class:"data-plane-proxy-filter",placeholder:"service:backend",query:t.params.s,fields:{name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},service:{description:"filter by “kuma.io/service” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"},...b("use zones")&&{zone:{description:"filter by “kuma.io/zone” value"}}},onChange:e=>t.update({...Object.fromEntries(e.entries())})},null,8,["query","fields","onChange"]),s(),p(T,{label:"Type",selected:t.params.dataplaneType,onChange:e=>t.update({dataplaneType:e})},L({selected:a(({item:e})=>[e!=="all"?(n(),i(f,{key:0,size:k(N),name:e},null,8,["size","name"])):y("",!0),s(" "+l(o(`data-planes.type.${e}`)),1)]),_:2},[C(["all","standard","builtin","delegated"],e=>({name:`${e}-option`,fn:a(()=>[e!=="all"?(n(),i(f,{key:0,name:e},null,8,["name"])):y("",!0),s(" "+l(o(`data-planes.type.${e}`)),1)])}))]),1032,["selected","onChange"])]),type:a(({row:e})=>[p(f,{name:e.dataplaneType},{default:a(()=>[s(l(o(`data-planes.type.${e.dataplaneType}`)),1)]),_:2},1032,["name"])]),name:a(({row:e})=>[p(_,{"data-action":"",class:"name-link",title:e.name,to:{name:"data-plane-summary-view",params:{mesh:e.mesh,dataPlane:e.id},query:{page:t.params.page,size:t.params.size,s:t.params.s,dataplaneType:t.params.dataplaneType}}},{default:a(()=>[s(l(e.name),1)]),_:2},1032,["title","to"])]),namespace:a(({row:e})=>[s(l(e.namespace),1)]),services:a(({row:e})=>[e.services.length>0?(n(),i(S,{key:0,width:"auto"},{default:a(()=>[(n(!0),c(u,null,C(e.services,(m,P)=>(n(),c("div",{key:P},[p(R,{text:m},{default:a(()=>[e.dataplaneType==="standard"?(n(),i(_,{key:0,to:{name:"service-detail-view",params:{service:m}}},{default:a(()=>[s(l(m),1)]),_:2},1032,["to"])):e.dataplaneType==="delegated"?(n(),i(_,{key:1,to:{name:"delegated-gateway-detail-view",params:{service:m}}},{default:a(()=>[s(l(m),1)]),_:2},1032,["to"])):(n(),c(u,{key:2},[s(l(m),1)],64))]),_:2},1032,["text"])]))),128))]),_:2},1024)):(n(),c(u,{key:1},[s(l(o("common.collection.none")),1)],64))]),zone:a(({row:e})=>[e.zone?(n(),i(_,{key:0,to:{name:"zone-cp-detail-view",params:{zone:e.zone}}},{default:a(()=>[s(l(e.zone),1)]),_:2},1032,["to"])):(n(),c(u,{key:1},[s(l(o("common.collection.none")),1)],64))]),certificate:a(({row:e})=>{var m;return[(m=e.dataplaneInsight.mTLS)!=null&&m.certificateExpirationTime?(n(),c(u,{key:0},[s(l(o("common.formats.datetime",{value:Date.parse(e.dataplaneInsight.mTLS.certificateExpirationTime)})),1)],64)):(n(),c(u,{key:1},[s(l(o("data-planes.components.data-plane-list.certificate.none")),1)],64))]}),status:a(({row:e})=>[p(O,{status:e.status},null,8,["status"])]),warnings:a(({row:e})=>[e.isCertExpired||e.warnings.length>0?(n(),i(f,{key:0,class:"mr-1",name:"warning"},{default:a(()=>[v("ul",null,[e.warnings.length>0?(n(),c("li",j,l(o("data-planes.components.data-plane-list.version_mismatch")),1)):y("",!0),s(),e.isCertExpired?(n(),c("li",U,l(o("data-planes.components.data-plane-list.cert_expired")),1)):y("",!0)])]),_:2},1024)):(n(),c(u,{key:1},[s(l(o("common.collection.none")),1)],64))]),details:a(({row:e})=>[p(_,{class:"details-link","data-testid":"details-link",to:{name:"data-plane-detail-view",params:{dataPlane:e.id}}},{default:a(()=>[s(l(o("common.collection.details_link"))+" ",1),p(k(q),{decorative:"",size:k(B)},null,8,["size"])]),_:2},1032,["to"])]),_:2},1032,["page-number","page-size","headers","items","total","error","is-selected-row","empty-state-message","empty-state-cta-to","empty-state-cta-text","onChange"])),s(),t.params.dataPlane?(n(),i(x,{key:2},{default:a(e=>[p(Z,{onClose:m=>t.replace({name:t.name,params:{mesh:t.params.mesh},query:{page:t.params.page,size:t.params.size,s:t.params.s}})},{default:a(()=>[typeof d<"u"?(n(),i(K(e.Component),{key:0,items:d.items},null,8,["items"])):y("",!0)]),_:2},1032,["onClose"])]),_:2},1024)):y("",!0)]),_:2},1024)]),_:2},1024)]),_:2},1032,["src"])]),_:2},1032,["params"])):y("",!0)]),_:1})}}}),se=A(W,[["__scopeId","data-v-d75f8ebf"]]);export{se as default};
