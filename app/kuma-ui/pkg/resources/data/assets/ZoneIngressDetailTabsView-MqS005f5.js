import{_ as v}from"./NavTabs.vue_vue_type_script_setup_true_lang-Dwvgmcf1.js";import{d as V,a as o,o as m,b as u,w as e,e as t,V as l,f as i,D as x,t as D,C as R,m as C,U as h}from"./index-BhX43DFC.js";const B=V({__name:"ZoneIngressDetailTabsView",setup(k){return(L,T)=>{const _=o("RouteTitle"),p=o("RouterLink"),d=o("RouterView"),f=o("DataLoader"),z=o("AppView"),b=o("DataSource"),w=o("RouteView");return m(),u(w,{name:"zone-ingress-detail-tabs-view",params:{zone:"",zoneIngress:""}},{default:e(({route:a,t:r})=>[t(b,{src:`/zone-ingress-overviews/${a.params.zoneIngress}`},{default:e(({data:s,error:g})=>[t(z,{breadcrumbs:[{to:{name:"zone-cp-list-view"},text:r("zone-cps.routes.item.breadcrumbs")},{to:{name:"zone-ingress-list-view",params:{zone:a.params.zone}},text:r("zone-ingresses.routes.item.breadcrumbs")}]},l({default:e(()=>[i(),t(f,{data:[s],errors:[g]},{default:e(()=>{var c;return[t(v,{"active-route-name":(c=a.active)==null?void 0:c.name,"data-testid":"zone-ingress-tabs"},l({_:2},[x(a.children,({name:n})=>({name:`${n}`,fn:e(()=>[t(p,{to:{name:n},"data-testid":`${n}-tab`},{default:e(()=>[i(D(r(`zone-ingresses.routes.item.navigation.${n}`)),1)]),_:2},1032,["to","data-testid"])])}))]),1032,["active-route-name"]),i(),t(d,null,{default:e(n=>[(m(),u(R(n.Component),{data:s},null,8,["data"]))]),_:2},1024)]}),_:2},1032,["data","errors"])]),_:2},[s?{name:"title",fn:e(()=>[C("h1",null,[t(h,{text:s.name},{default:e(()=>[t(_,{title:r("zone-ingresses.routes.item.title",{name:s.name})},null,8,["title"])]),_:2},1032,["text"])])]),key:"0"}:void 0]),1032,["breadcrumbs"])]),_:2},1032,["src"])]),_:1})}}});export{B as default};
