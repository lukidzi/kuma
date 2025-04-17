import{d as M,r as m,m as u,o as r,w as e,b as t,e as a,q as C,p as x,L as k,t as o,c,F as y,v as b,s as N,ao as J,C as I,R as E,O as W,S as Z,K as H,_ as Q}from"./index-DFpFnkh8.js";import{F as U}from"./FilterBar-DWf4B0x-.js";import{S as Y}from"./SummaryView-BTlZ2G-d.js";const ee=["data-testid"],ae=M({__name:"MeshServiceDetailView",props:{data:{}},setup(P){const d=P;return(te,n)=>{const _=m("XBadge"),h=m("XAction"),$=m("KumaPort"),v=m("XLayout"),q=m("XAboutCard"),F=m("XCopyButton"),T=m("DataCollection"),A=m("DataLoader"),X=m("XCard"),S=m("XIcon"),O=m("XActionGroup"),K=m("RouterView"),j=m("AppView"),G=m("RouteView");return r(),u(G,{name:"mesh-service-detail-view",params:{mesh:"",service:"",page:1,size:Number,s:"",proxy:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:e(({can:V,route:l,t:p,uri:R,me:f})=>[t(j,null,{default:e(()=>[t(v,{type:"stack"},{default:e(()=>[t(q,{title:p("services.mesh-service.about.title"),created:d.data.creationTime,modified:d.data.modificationTime},{default:e(()=>[t(k,{layout:"horizontal"},{title:e(()=>[a(o(p("http.api.property.state")),1)]),body:e(()=>[t(_,{appearance:d.data.spec.state==="Available"?"success":"danger"},{default:e(()=>[a(o(d.data.spec.state),1)]),_:1},8,["appearance"])]),_:2},1024),n[5]||(n[5]=a()),d.data.namespace.length>0?(r(),u(k,{key:0,layout:"horizontal"},{title:e(()=>[a(o(p("http.api.property.namespace")),1)]),body:e(()=>[t(_,{appearance:"decorative"},{default:e(()=>[a(o(d.data.namespace),1)]),_:1})]),_:2},1024)):x("",!0),n[6]||(n[6]=a()),V("use zones")&&d.data.zone?(r(),u(k,{key:1,layout:"horizontal"},{title:e(()=>[a(o(p("http.api.property.zone")),1)]),body:e(()=>[t(_,{appearance:"decorative"},{default:e(()=>[t(h,{to:{name:"zone-cp-detail-view",params:{zone:d.data.zone}}},{default:e(()=>[a(o(d.data.zone),1)]),_:1},8,["to"])]),_:1})]),_:2},1024)):x("",!0),n[7]||(n[7]=a()),t(k,{layout:"horizontal"},{title:e(()=>[a(o(p("http.api.property.ports")),1)]),body:e(()=>[d.data.spec.ports.length?(r(),u(v,{key:0,type:"separated",truncate:""},{default:e(()=>[(r(!0),c(y,null,b(d.data.spec.ports,i=>(r(),u($,{key:i.port,port:{...i,targetPort:void 0}},null,8,["port"]))),128))]),_:1})):(r(),c(y,{key:1},[a(o(p("common.detail.none")),1)],64))]),_:2},1024),n[8]||(n[8]=a()),t(k,{layout:"horizontal"},{title:e(()=>[a(o(p("http.api.property.selector")),1)]),body:e(()=>[Object.keys(d.data.spec.selector.dataplaneTags).length?(r(),u(v,{key:0,type:"separated",truncate:""},{default:e(()=>[(r(!0),c(y,null,b(d.data.spec.selector.dataplaneTags,(i,s)=>(r(),u(_,{key:`${s}:${i}`,appearance:"info"},{default:e(()=>[a(o(s)+":"+o(i),1)]),_:2},1024))),128))]),_:1})):(r(),c(y,{key:1},[a(o(p("common.detail.none")),1)],64))]),_:2},1024)]),_:2},1032,["title","created","modified"]),n[24]||(n[24]=a()),t(X,null,{title:e(()=>[a(o(p("services.detail.hostnames.title")),1)]),default:e(()=>[n[10]||(n[10]=a()),t(A,{src:R(N(J),"/meshes/:mesh/:serviceType/:serviceName/_hostnames",{mesh:l.params.mesh,serviceType:"meshservices",serviceName:l.params.service})},{loadable:e(({data:i})=>[t(T,{type:"hostnames",items:(i==null?void 0:i.items)??[void 0]},{default:e(()=>[t(I,{type:"hostnames-collection","data-testid":"hostnames-collection",items:i==null?void 0:i.items,headers:[{...f.get("headers.hostname"),label:p("services.detail.hostnames.hostname"),key:"hostname"},{...f.get("headers.zones"),label:p("services.detail.hostnames.zone"),key:"zones"}],onResize:f.set},{hostname:e(({row:s})=>[C("b",null,[t(F,{text:s.hostname},null,8,["text"])])]),zones:e(({row:s})=>[t(v,{type:"separated"},{default:e(()=>[(r(!0),c(y,null,b(s.zones,(g,w)=>(r(),u(_,{key:w,appearance:"decorative"},{default:e(()=>[t(h,{to:{name:"zone-cp-detail-view",params:{zone:g.name}}},{default:e(()=>[a(o(g.name),1)]),_:2},1032,["to"])]),_:2},1024))),128))]),_:2},1024)]),_:2},1032,["items","headers","onResize"])]),_:2},1032,["items"])]),_:2},1032,["src"])]),_:2},1024),n[25]||(n[25]=a()),t(X,null,{title:e(()=>[a(o(p("services.detail.dpp-status.title")),1)]),default:e(()=>[n[14]||(n[14]=a()),t(v,{type:"columns",class:"columns-with-borders"},{default:e(()=>[t(E,{total:d.data.status.dataplaneProxies.total,online:d.data.status.dataplaneProxies.connected,"data-testid":"connected-dpps"},{icon:e(()=>[t(S,{name:"connected"})]),title:e(()=>[a(o(p("services.detail.dpp-status.connected")),1)]),_:2},1032,["total","online"]),n[13]||(n[13]=a()),t(E,{total:d.data.status.dataplaneProxies.healthy,"data-testid":"healthy-dpps"},{icon:e(()=>[t(S,{name:"health"})]),title:e(()=>[a(o(p("services.detail.dpp-status.healthy")),1)]),_:2},1032,["total"])]),_:2},1024)]),_:2},1024),n[26]||(n[26]=a()),C("div",null,[t(X,{class:"mt-4"},{title:e(()=>[a(o(p("services.detail.data_plane_proxies")),1)]),default:e(()=>[n[22]||(n[22]=a()),C("search",null,[t(U,{class:"data-plane-proxy-filter",placeholder:"name:dataplane-name",query:l.params.s,fields:{name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"}},onChange:i=>l.update({page:1,...Object.fromEntries(i.entries())})},null,8,["query","onChange"])]),n[23]||(n[23]=a()),t(A,{src:R(N(W),"/meshes/:mesh/dataplanes/for/mesh-service/:tags",{mesh:l.params.mesh,tags:JSON.stringify({...V("use zones")&&d.data.zone?{"kuma.io/zone":d.data.zone}:{},...d.data.spec.selector.dataplaneTags})},{page:l.params.page,size:l.params.size,search:l.params.s})},{loadable:e(({data:i})=>[t(T,{type:"data-planes",items:(i==null?void 0:i.items)??[void 0],page:l.params.page,"page-size":l.params.size,total:i==null?void 0:i.total,onChange:l.update},{default:e(()=>[t(I,{class:"data-plane-collection","data-testid":"data-plane-collection",headers:[{...f.get("headers.name"),label:"Name",key:"name"},{...f.get("headers.namespace"),label:"Namespace",key:"namespace"},...V("use zones")?[{...f.get("headers.zone"),label:"Zone",key:"zone"}]:[],{...f.get("headers.certificate"),label:"Certificate Info",key:"certificate"},{...f.get("headers.status"),label:"Status",key:"status"},{...f.get("headers.warnings"),label:"Warnings",key:"warnings",hideLabel:!0},{...f.get("headers.actions"),label:"Actions",key:"actions",hideLabel:!0}],items:i==null?void 0:i.items,"is-selected-row":s=>s.name===l.params.proxy,onResize:f.set},{name:e(({row:s})=>[t(h,{class:"name-link",to:{name:"mesh-service-data-plane-summary-view",params:{mesh:s.mesh,proxy:s.id},query:{page:l.params.page,size:l.params.size,s:l.params.s}},"data-action":""},{default:e(()=>[a(o(s.name),1)]),_:2},1032,["to"])]),namespace:e(({row:s})=>[a(o(s.namespace),1)]),zone:e(({row:s})=>[s.zone?(r(),u(h,{key:0,to:{name:"zone-cp-detail-view",params:{zone:s.zone}}},{default:e(()=>[a(o(s.zone),1)]),_:2},1032,["to"])):(r(),c(y,{key:1},[a(o(p("common.collection.none")),1)],64))]),certificate:e(({row:s})=>{var g;return[(g=s.dataplaneInsight.mTLS)!=null&&g.certificateExpirationTime?(r(),c(y,{key:0},[a(o(p("common.formats.datetime",{value:Date.parse(s.dataplaneInsight.mTLS.certificateExpirationTime)})),1)],64)):(r(),c(y,{key:1},[a(o(p("data-planes.components.data-plane-list.certificate.none")),1)],64))]}),status:e(({row:s})=>[t(Z,{status:s.status},null,8,["status"])]),warnings:e(({row:s})=>{var g,w,B,L;return[(r(!0),c(y,null,b([[{bool:((w=(g=s.dataplaneInsight.version)==null?void 0:g.kumaDp)==null?void 0:w.kumaCpCompatible)===!1||((L=(B=s.dataplaneInsight.version)==null?void 0:B.envoy)==null?void 0:L.kumaDpCompatible)===!1,key:"dp-cp-incompatible"},{bool:s.isCertExpired,key:"certificate-expired"}].filter(({bool:z})=>z)],z=>(r(),c(y,{key:typeof z},[z.length>0?(r(),u(S,{key:0,name:"warning","data-testid":"warning"},{default:e(()=>[C("ul",null,[(r(!0),c(y,null,b(z,({key:D})=>(r(),c("li",{key:D,"data-testid":`warning-${D}`},o(p(`data-planes.routes.items.warnings.${D}`)),9,ee))),128))])]),_:2},1024)):(r(),c(y,{key:1},[a(o(p("common.collection.none")),1)],64))],64))),128))]}),actions:e(({row:s})=>[t(O,null,{default:e(()=>[t(h,{to:{name:"data-plane-detail-view",params:{proxy:s.id}}},{default:e(()=>[a(o(p("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["headers","items","is-selected-row","onResize"]),n[21]||(n[21]=a()),l.params.proxy?(r(),u(K,{key:0},{default:e(s=>[t(Y,{onClose:g=>l.replace({name:l.name,params:{mesh:l.params.mesh},query:{page:l.params.page,size:l.params.size,s:l.params.s}})},{default:e(()=>[typeof i<"u"?(r(),u(H(s.Component),{key:0,items:i.items},null,8,["items"])):x("",!0)]),_:2},1032,["onClose"])]),_:2},1024)):x("",!0)]),_:2},1032,["items","page","page-size","total","onChange"])]),_:2},1032,["src"])]),_:2},1024)])]),_:2},1024)]),_:2},1024)]),_:1})}}}),ie=Q(ae,[["__scopeId","data-v-269f6d4a"]]);export{ie as default};
