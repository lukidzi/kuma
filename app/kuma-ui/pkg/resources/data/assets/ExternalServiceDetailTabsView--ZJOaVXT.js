import{_ as u}from"./NavTabs.vue_vue_type_script_setup_true_lang-FAfvMKMY.js";import{d,a as s,o as v,b as x,w as t,W as f,e as a,m as h,f as n,t as w,H as b,X as V}from"./index-2mpecEEN.js";const $=d({__name:"ExternalServiceDetailTabsView",setup(R){return(T,k)=>{const m=s("RouteTitle"),c=s("RouterLink"),l=s("RouterView"),p=s("AppView"),_=s("RouteView");return v(),x(_,{name:"external-service-detail-tabs-view",params:{mesh:"",service:""}},{default:t(({route:e,t:i})=>[a(p,{breadcrumbs:[{to:{name:"mesh-detail-view",params:{mesh:e.params.mesh}},text:e.params.mesh},{to:{name:"external-service-list-view",params:{mesh:e.params.mesh}},text:i("external-services.routes.item.breadcrumbs")}]},{title:t(()=>[h("h1",null,[a(f,{text:e.params.service},{default:t(()=>[a(m,{title:i("external-services.routes.item.title",{name:e.params.service})},null,8,["title"])]),_:2},1032,["text"])])]),default:t(()=>{var o;return[n(),a(u,{"active-route-name":(o=e.active)==null?void 0:o.name},V({_:2},[b(e.children,({name:r})=>({name:`${r}`,fn:t(()=>[a(c,{to:{name:r},"data-testid":`${r}-tab`},{default:t(()=>[n(w(i(`external-services.routes.item.navigation.${r}`)),1)]),_:2},1032,["to","data-testid"])])}))]),1032,["active-route-name"]),n(),a(l)]}),_:2},1032,["breadcrumbs"])]),_:1})}}});export{$ as default};
