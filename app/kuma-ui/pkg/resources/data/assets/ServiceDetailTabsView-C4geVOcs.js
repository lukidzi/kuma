import{d as u,h as t,o as v,a as h,w as s,j as a,g as w,X as b,k as n,V,B as f,t as x}from"./index-9gITI0JG.js";const B=u({__name:"ServiceDetailTabsView",setup(R){return(T,X)=>{const r=t("RouteTitle"),m=t("XAction"),l=t("XTabs"),p=t("RouterView"),_=t("AppView"),d=t("RouteView");return v(),h(d,{name:"service-detail-tabs-view",params:{mesh:"",service:""}},{default:s(({route:e,t:o})=>[a(_,{breadcrumbs:[{to:{name:"mesh-detail-view",params:{mesh:e.params.mesh}},text:e.params.mesh},{to:{name:"service-list-view",params:{mesh:e.params.mesh}},text:o("services.routes.item.breadcrumbs")}]},{title:s(()=>[w("h1",null,[a(b,{text:e.params.service},{default:s(()=>[a(r,{title:o("services.routes.item.title",{name:e.params.service})},null,8,["title"])]),_:2},1032,["text"])])]),default:s(()=>{var c;return[n(),a(l,{selected:(c=e.child())==null?void 0:c.name},V({_:2},[f(e.children,({name:i})=>({name:`${i}-tab`,fn:s(()=>[a(m,{to:{name:i}},{default:s(()=>[n(x(o(`services.routes.item.navigation.${i}`)),1)]),_:2},1032,["to"])])}))]),1032,["selected"]),n(),a(p)]}),_:2},1032,["breadcrumbs"])]),_:1})}}});export{B as default};
