import{d as v,e as t,o as x,m as b,w as s,a,k as w,a0 as f,b as i,R as V,K as h,t as R}from"./index-DpJ_igul.js";const k=v({__name:"ExternalServiceDetailTabsView",setup(T){return(A,n)=>{const m=t("RouteTitle"),l=t("XAction"),p=t("XTabs"),d=t("RouterView"),_=t("AppView"),u=t("RouteView");return x(),b(u,{name:"external-service-detail-tabs-view",params:{mesh:"",service:""}},{default:s(({route:e,t:r})=>[a(_,{docs:r("external-services.href.docs"),breadcrumbs:[{to:{name:"mesh-detail-view",params:{mesh:e.params.mesh}},text:e.params.mesh},{to:{name:"external-service-list-view",params:{mesh:e.params.mesh}},text:r("external-services.routes.item.breadcrumbs")}]},{title:s(()=>[w("h1",null,[a(f,{text:e.params.service},{default:s(()=>[a(m,{title:r("external-services.routes.item.title",{name:e.params.service})},null,8,["title"])]),_:2},1032,["text"])])]),default:s(()=>{var c;return[n[0]||(n[0]=i()),a(p,{selected:(c=e.child())==null?void 0:c.name},V({_:2},[h(e.children,({name:o})=>({name:`${o}-tab`,fn:s(()=>[a(l,{to:{name:o}},{default:s(()=>[i(R(r(`external-services.routes.item.navigation.${o}`)),1)]),_:2},1032,["to"])])}))]),1032,["selected"]),n[1]||(n[1]=i()),a(d)]}),_:2},1032,["docs","breadcrumbs"])]),_:1})}}});export{k as default};
