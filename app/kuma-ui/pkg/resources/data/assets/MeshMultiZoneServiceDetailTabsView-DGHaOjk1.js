import{d as D,e as t,o as i,p,w as e,a,m as R,an as C,c as T,V as z,q as S,b as c,R as k,K as A,t as X,F as y}from"./index-DH1Ug2X_.js";const B={key:0},g=D({__name:"MeshMultiZoneServiceDetailTabsView",setup(L){return(N,n)=>{const _=t("RouteTitle"),u=t("XAction"),d=t("XTabs"),h=t("RouterView"),v=t("DataLoader"),f=t("AppView"),w=t("DataSource"),V=t("RouteView");return i(),p(V,{name:"mesh-multi-zone-service-detail-tabs-view",params:{mesh:"",service:""}},{default:e(({route:s,t:m,uri:b})=>[a(w,{src:b(R(C),"/meshes/:mesh/mesh-multi-zone-service/:name",{mesh:s.params.mesh,name:s.params.service})},{default:e(({data:r,error:x})=>[a(f,{docs:m("services.mesh-multi-zone-service.href.docs"),breadcrumbs:[{to:{name:"mesh-detail-view",params:{mesh:s.params.mesh}},text:s.params.mesh},{to:{name:"mesh-multi-zone-service-list-view",params:{mesh:s.params.mesh}},text:m("services.routes.mesh-multi-zone-service-list-view.title")}]},{title:e(()=>[r?(i(),T("h1",B,[a(z,{text:s.params.service},{default:e(()=>[a(_,{title:m("services.routes.item.title",{name:r.name})},null,8,["title"])]),_:2},1032,["text"])])):S("",!0)]),default:e(()=>[n[1]||(n[1]=c()),a(v,{data:[r],errors:[x]},{default:e(()=>{var l;return[a(d,{selected:(l=s.child())==null?void 0:l.name},k({_:2},[A(s.children,({name:o})=>({name:`${o}-tab`,fn:e(()=>[a(u,{to:{name:o}},{default:e(()=>[c(X(m(`services.routes.item.navigation.${o}`)),1)]),_:2},1032,["to"])])}))]),1032,["selected"]),n[0]||(n[0]=c()),a(h,null,{default:e(o=>[(i(),p(y(o.Component),{data:r},null,8,["data"]))]),_:2},1024)]}),_:2},1032,["data","errors"])]),_:2},1032,["docs","breadcrumbs"])]),_:2},1032,["src"])]),_:1})}}});export{g as default};
