import{d as L,e as a,o as r,p as l,w as e,a as n,b as c,m as S,an as X,A as B,V as T,t as u,c as f,J as g,K as w,F as N,q as P}from"./index-DH1Ug2X_.js";import{S as $}from"./SummaryView-pv74nbtW.js";const E=L({__name:"MeshMultiZoneServiceListView",setup(q){return(F,p)=>{const z=a("RouteTitle"),h=a("XAction"),C=a("KumaPort"),v=a("KTruncate"),b=a("XBadge"),y=a("XActionGroup"),V=a("RouterView"),k=a("DataCollection"),A=a("DataLoader"),R=a("KCard"),K=a("AppView"),x=a("RouteView");return r(),l(x,{name:"mesh-multi-zone-service-list-view",params:{page:1,size:50,mesh:"",service:""}},{default:e(({route:t,t:_,uri:D,me:m})=>[n(z,{render:!1,title:_("services.routes.mesh-multi-zone-service-list-view.title")},null,8,["title"]),p[4]||(p[4]=c()),n(K,{docs:_("services.mesh-multi-zone-service.href.docs")},{default:e(()=>[n(R,null,{default:e(()=>[n(A,{src:D(S(X),"/meshes/:mesh/mesh-multi-zone-services",{mesh:t.params.mesh},{page:t.params.page,size:t.params.size})},{loadable:e(({data:s})=>[n(k,{type:"services",items:(s==null?void 0:s.items)??[void 0]},{default:e(()=>[n(B,{headers:[{...m.get("headers.name"),label:"Name",key:"name"},{...m.get("headers.ports"),label:"Ports",key:"ports"},{...m.get("headers.labels"),label:"Selector",key:"labels"},{...m.get("headers.actions"),label:"Actions",key:"actions",hideLabel:!0}],"page-number":t.params.page,"page-size":t.params.size,total:s==null?void 0:s.total,items:s==null?void 0:s.items,"is-selected-row":o=>o.name===t.params.service,onChange:t.update,onResize:m.set},{name:e(({row:o})=>[n(T,{text:o.name},{default:e(()=>[n(h,{"data-action":"",to:{name:"mesh-multi-zone-service-summary-view",params:{mesh:o.mesh,service:o.id},query:{page:t.params.page,size:t.params.size}}},{default:e(()=>[c(u(o.name),1)]),_:2},1032,["to"])]),_:2},1032,["text"])]),ports:e(({row:o})=>[n(v,null,{default:e(()=>[(r(!0),f(g,null,w(o.spec.ports,i=>(r(),l(C,{key:i.port,port:{...i,targetPort:void 0}},null,8,["port"]))),128))]),_:2},1024)]),labels:e(({row:o})=>[n(v,null,{default:e(()=>[(r(!0),f(g,null,w(o.spec.selector.meshService.matchLabels,(i,d)=>(r(),l(b,{key:`${d}:${i}`,appearance:"info"},{default:e(()=>[c(u(d)+":"+u(i),1)]),_:2},1024))),128))]),_:2},1024)]),actions:e(({row:o})=>[n(y,null,{default:e(()=>[n(h,{to:{name:"mesh-multi-zone-service-detail-view",params:{mesh:o.mesh,service:o.id}}},{default:e(()=>[c(u(_("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["headers","page-number","page-size","total","items","is-selected-row","onChange","onResize"]),p[3]||(p[3]=c()),s!=null&&s.items&&t.params.service?(r(),l(V,{key:0},{default:e(o=>[n($,{onClose:i=>t.replace({name:"mesh-multi-zone-service-list-view",params:{mesh:t.params.mesh},query:{page:t.params.page,size:t.params.size}})},{default:e(()=>[(r(),l(N(o.Component),{items:s==null?void 0:s.items},null,8,["items"]))]),_:2},1032,["onClose"])]),_:2},1024)):P("",!0)]),_:2},1032,["items"])]),_:2},1032,["src"])]),_:2},1024)]),_:2},1032,["docs"])]),_:1})}}});export{E as default};
