import{d as V,a3 as R,a4 as x,r as n,o,g as c,w as t,h as s,i as p,m as h,a5 as k,l as w,E as y,s as B,j as C,F as I,n as N}from"./index-77212499.js";import{N as T}from"./NavTabs-e0c1bcdf.js";const S=V({__name:"ZoneIngressDetailTabsView",setup(D){var _;const{t:l}=R(),v=(((_=x().getRoutes().find(e=>e.name==="zone-ingress-detail-tabs-view"))==null?void 0:_.children)??[]).map(e=>{var r,i;const u=typeof e.name>"u"?(r=e.children)==null?void 0:r[0]:e,a=u.name,m=((i=u.meta)==null?void 0:i.module)??"";return{title:l(`zone-ingresses.routes.item.navigation.${a}`),routeName:a,module:m}});return(e,u)=>{const a=n("RouteTitle"),m=n("RouterView"),g=n("DataSource"),r=n("AppView"),i=n("RouteView");return o(),c(i,{name:"zone-ingress-detail-tabs-view",params:{zoneIngress:""}},{default:t(({route:d})=>[s(r,{breadcrumbs:[{to:{name:"zone-ingress-list-view"},text:p(l)("zone-ingresses.routes.item.breadcrumbs")}]},{title:t(()=>[h("h1",null,[s(k,{text:d.params.zoneIngress},{default:t(()=>[s(a,{title:p(l)("zone-ingresses.routes.item.title",{name:d.params.zoneIngress}),render:!0},null,8,["title"])]),_:2},1032,["text"])])]),default:t(()=>[w(),s(g,{src:`/zone-ingress-overviews/${d.params.zoneIngress}`},{default:t(({data:f,error:b})=>[b!==void 0?(o(),c(y,{key:0,error:b},null,8,["error"])):f===void 0?(o(),c(B,{key:1})):(o(),C(I,{key:2},[s(T,{class:"route-zone-ingress-detail-view-tabs",tabs:p(v)},null,8,["tabs"]),w(),s(m,null,{default:t(z=>[(o(),c(N(z.Component),{data:f},null,8,["data"]))]),_:2},1024)],64))]),_:2},1032,["src"])]),_:2},1032,["breadcrumbs"])]),_:1})}}});export{S as default};
