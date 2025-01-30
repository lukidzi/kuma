import{d as T,r as t,o as r,q as p,w as o,b as a,e as l,p as y,as as E,c as u,M as d,N as k,T as P,aq as G,B as K,t as _,s as f,I as M,m as $}from"./index-Du84oSnm.js";import{S as F}from"./SummaryView-Cd8oe3uM.js";const O=T({__name:"MeshExternalServiceListView",props:{mesh:{}},setup(w){const C=w;return(Z,m)=>{const b=t("RouteTitle"),x=t("XI18n"),v=t("XAction"),V=t("XCopyButton"),X=t("KumaPort"),A=t("XActionGroup"),B=t("RouterView"),D=t("DataCollection"),N=t("DataLoader"),R=t("XCard"),S=t("AppView"),L=t("DataSource"),q=t("RouteView");return r(),p(q,{name:"mesh-external-service-list-view",params:{page:1,size:Number,mesh:"",service:""}},{default:o(({route:n,t:h,can:I,uri:z,me:c})=>[a(b,{render:!1,title:h("services.routes.mesh-external-service-list-view.title")},null,8,["title"]),m[6]||(m[6]=l()),a(L,{src:z(y(E),"/zone-cps/:name/egresses",{name:"*"},{page:1,size:100})},{default:o(({data:g})=>[(r(!0),u(d,null,k([[["services.mesh-external-service.notifications.mtls-warning",typeof C.mesh.mtlsBackend>"u"],["services.mesh-external-service.notifications.no-zone-egress",g&&!g.items.find(i=>typeof i.zoneEgressInsight.connectedSubscription<"u")]].filter(([i,s])=>s).map(i=>i[0])],i=>(r(),p(S,{key:typeof i,docs:h("services.mesh-external-service.href.docs")},P({default:o(()=>[m[5]||(m[5]=l()),a(R,null,{default:o(()=>[a(N,{src:z(y(G),"/meshes/:mesh/mesh-external-services",{mesh:n.params.mesh},{page:n.params.page,size:n.params.size})},{loadable:o(({data:s})=>[a(D,{type:"services",items:(s==null?void 0:s.items)??[void 0],page:n.params.page,"page-size":n.params.size,total:s==null?void 0:s.total,onChange:n.update},{default:o(()=>[a(K,{"data-testid":"service-collection",headers:[{...c.get("headers.name"),label:"Name",key:"name"},{...c.get("headers.namespace"),label:"Namespace",key:"namespace"},...I("use zones")?[{...c.get("headers.zone"),label:"Zone",key:"zone"}]:[],{...c.get("headers.port"),label:"Port",key:"port"},{...c.get("headers.actions"),label:"Actions",key:"actions",hideLabel:!0}],items:s==null?void 0:s.items,"is-selected-row":e=>e.name===n.params.service,onResize:c.set},{name:o(({row:e})=>[a(V,{text:e.name},{default:o(()=>[a(v,{"data-action":"",to:{name:"mesh-external-service-summary-view",params:{mesh:e.mesh,service:e.id},query:{page:n.params.page,size:n.params.size}}},{default:o(()=>[l(_(e.name),1)]),_:2},1032,["to"])]),_:2},1032,["text"])]),namespace:o(({row:e})=>[l(_(e.namespace),1)]),zone:o(({row:e})=>[e.labels&&e.labels["kuma.io/origin"]==="zone"&&e.labels["kuma.io/zone"]?(r(),u(d,{key:0},[e.labels["kuma.io/zone"]?(r(),p(v,{key:0,to:{name:"zone-cp-detail-view",params:{zone:e.labels["kuma.io/zone"]}}},{default:o(()=>[l(_(e.labels["kuma.io/zone"]),1)]),_:2},1032,["to"])):f("",!0)],64)):(r(),u(d,{key:1},[l(_(h("common.detail.none")),1)],64))]),port:o(({row:e})=>[e.spec.match?(r(),p(X,{key:0,port:e.spec.match},null,8,["port"])):f("",!0)]),actions:o(({row:e})=>[a(A,null,{default:o(()=>[a(v,{to:{name:"mesh-external-service-detail-view",params:{mesh:e.mesh,service:e.id}}},{default:o(()=>[l(_(h("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["headers","items","is-selected-row","onResize"]),m[4]||(m[4]=l()),s!=null&&s.items&&n.params.service?(r(),p(B,{key:0},{default:o(e=>[a(F,{onClose:j=>n.replace({name:"mesh-external-service-list-view",params:{mesh:n.params.mesh},query:{page:n.params.page,size:n.params.size}})},{default:o(()=>[(r(),p(M(e.Component),{items:s==null?void 0:s.items},null,8,["items"]))]),_:2},1032,["onClose"])]),_:2},1024)):f("",!0)]),_:2},1032,["items","page","page-size","total","onChange"])]),_:2},1032,["src"])]),_:2},1024)]),_:2},[i.length>0?{name:"notifications",fn:o(()=>[$("ul",null,[(r(!0),u(d,null,k(i,s=>(r(),u("li",{key:s},[a(x,{path:s},null,8,["path"])]))),128))])]),key:"0"}:void 0]),1032,["docs"]))),128))]),_:2},1032,["src"])]),_:1})}}});export{O as default};
