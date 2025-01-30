import{d as X,r as s,o as r,q as m,w as t,b as o,e as d,p as b,au as x,B as R,t as p,c as z,M as k,S as B,I as D,s as w}from"./index-Du84oSnm.js";import{S as L}from"./SummaryView-Cd8oe3uM.js";const F=X({__name:"ZoneIngressListView",props:{data:{}},setup(N){return(q,l)=>{const y=s("RouteTitle"),f=s("XI18n"),u=s("XAction"),_=s("XCopyButton"),g=s("XActionGroup"),A=s("RouterView"),C=s("DataCollection"),v=s("DataLoader"),h=s("XCard"),I=s("AppView"),S=s("RouteView");return r(),m(S,{name:"zone-ingress-list-view",params:{zone:"",zoneIngress:""}},{default:t(({route:a,t:i,me:c,uri:V})=>[o(y,{render:!1,title:i("zone-ingresses.routes.items.title")},null,8,["title"]),l[6]||(l[6]=d()),o(I,{docs:i("zone-ingresses.href.docs")},{default:t(()=>[o(f,{path:"zone-ingresses.routes.items.intro","default-path":"common.i18n.ignore-error"}),l[5]||(l[5]=d()),o(h,null,{default:t(()=>[o(v,{src:V(b(x),"/zone-cps/:name/ingresses",{name:a.params.zone},{page:1,size:100})},{loadable:t(({data:n})=>[o(C,{type:"zone-ingresses",items:(n==null?void 0:n.items)??[void 0],total:n==null?void 0:n.total,onChange:a.update},{default:t(()=>[o(R,{class:"zone-ingress-collection","data-testid":"zone-ingress-collection",headers:[{...c.get("headers.name"),label:"Name",key:"name"},{...c.get("headers.socketAddress"),label:"Address",key:"socketAddress"},{...c.get("headers.advertisedSocketAddress"),label:"Advertised address",key:"advertisedSocketAddress"},{...c.get("headers.status"),label:"Status",key:"status"},{...c.get("headers.actions"),label:"Actions",key:"actions",hideLabel:!0}],items:n==null?void 0:n.items,"is-selected-row":e=>e.name===a.params.zoneIngress,onResize:c.set},{name:t(({row:e})=>[o(u,{"data-action":"",to:{name:"zone-ingress-summary-view",params:{zone:a.params.zone,zoneIngress:e.id},query:{page:1,size:100}}},{default:t(()=>[d(p(e.name),1)]),_:2},1032,["to"])]),socketAddress:t(({row:e})=>[e.zoneIngress.socketAddress.length>0?(r(),m(_,{key:0,text:e.zoneIngress.socketAddress},null,8,["text"])):(r(),z(k,{key:1},[d(p(i("common.collection.none")),1)],64))]),advertisedSocketAddress:t(({row:e})=>[e.zoneIngress.advertisedSocketAddress.length>0?(r(),m(_,{key:0,text:e.zoneIngress.advertisedSocketAddress},null,8,["text"])):(r(),z(k,{key:1},[d(p(i("common.collection.none")),1)],64))]),status:t(({row:e})=>[o(B,{status:e.state},null,8,["status"])]),actions:t(({row:e})=>[o(g,null,{default:t(()=>[o(u,{to:{name:"zone-ingress-detail-view",params:{zoneIngress:e.id}}},{default:t(()=>[d(p(i("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["headers","items","is-selected-row","onResize"]),l[4]||(l[4]=d()),a.child()?(r(),m(A,{key:0},{default:t(({Component:e})=>[o(L,{onClose:T=>a.replace({name:"zone-ingress-list-view",params:{zone:a.params.zone},query:{page:1,size:100}})},{default:t(()=>[typeof n<"u"?(r(),m(D(e),{key:0,items:n.items},null,8,["items"])):w("",!0)]),_:2},1032,["onClose"])]),_:2},1024)):w("",!0)]),_:2},1032,["items","total","onChange"])]),_:2},1032,["src"])]),_:2},1024)]),_:2},1032,["docs"])]),_:1})}}});export{F as default};
