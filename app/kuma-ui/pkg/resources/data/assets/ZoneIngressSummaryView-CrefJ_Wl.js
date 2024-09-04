import{d as V,r as l,o as a,m as i,w as e,b as r,a4 as x,e as t,t as n,k as p,c as m,L as u,M as v,Z as c,S as A,p as C,a2 as _,q as S}from"./index-of_8QwXw.js";const b={class:"stack-with-borders"},R=V({__name:"ZoneIngressSummaryView",props:{items:{}},setup(y){const g=y;return(B,Z)=>{const k=l("RouteTitle"),z=l("RouterLink"),h=l("AppView"),f=l("DataCollection"),I=l("RouteView");return a(),i(I,{name:"zone-ingress-summary-view",params:{zoneIngress:""}},{default:e(({route:w,t:o})=>[r(f,{items:g.items,predicate:d=>d.id===w.params.zoneIngress,find:!0},{empty:e(()=>[r(x,null,{title:e(()=>[t(n(o("common.collection.summary.empty_title",{type:"ZoneIngress"})),1)]),default:e(()=>[t(),p("p",null,n(o("common.collection.summary.empty_message",{type:"ZoneIngress"})),1)]),_:2},1024)]),default:e(({items:d})=>[(a(!0),m(u,null,v([d[0]],s=>(a(),i(h,{key:s.id},{title:e(()=>[p("h2",null,[r(z,{to:{name:"zone-ingress-detail-view",params:{zone:s.zoneIngress.zone,zoneIngress:s.id}}},{default:e(()=>[r(k,{title:o("zone-ingresses.routes.item.title",{name:s.name})},null,8,["title"])]),_:2},1032,["to"])])]),default:e(()=>[t(),p("div",b,[r(c,{layout:"horizontal"},{title:e(()=>[t(n(o("http.api.property.status")),1)]),body:e(()=>[r(A,{status:s.state},null,8,["status"])]),_:2},1024),t(),s.namespace.length>0?(a(),i(c,{key:0,layout:"horizontal"},{title:e(()=>[t(n(o("data-planes.routes.item.namespace")),1)]),body:e(()=>[t(n(s.namespace),1)]),_:2},1024)):C("",!0),t(),r(c,{layout:"horizontal"},{title:e(()=>[t(n(o("http.api.property.address")),1)]),body:e(()=>[s.zoneIngress.socketAddress.length>0?(a(),i(_,{key:0,text:s.zoneIngress.socketAddress},null,8,["text"])):(a(),m(u,{key:1},[t(n(o("common.detail.none")),1)],64))]),_:2},1024),t(),r(c,{layout:"horizontal"},{title:e(()=>[t(n(o("http.api.property.advertisedAddress")),1)]),body:e(()=>[s.zoneIngress.advertisedSocketAddress.length>0?(a(),i(_,{key:0,text:s.zoneIngress.advertisedSocketAddress},null,8,["text"])):(a(),m(u,{key:1},[t(n(o("common.detail.none")),1)],64))]),_:2},1024)])]),_:2},1024))),128))]),_:2},1032,["items","predicate"])]),_:1})}}}),L=S(R,[["__scopeId","data-v-d7a49617"]]);export{L as default};
