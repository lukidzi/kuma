import{d as x,e as t,o as m,m as l,w as e,a,l as D,as as T,c as C,a1 as R,p as z,b as r,T as S,J as k,t as A,E as X}from"./index-COT-_p62.js";const y={key:0},g=x({__name:"MeshMultiZoneServiceDetailTabsView",setup(B){return(L,N)=>{const _=t("RouteTitle"),p=t("XAction"),u=t("XTabs"),d=t("RouterView"),h=t("DataLoader"),v=t("AppView"),f=t("DataSource"),w=t("RouteView");return m(),l(w,{name:"mesh-multi-zone-service-detail-tabs-view",params:{mesh:"",service:""}},{default:e(({route:s,t:n,uri:b})=>[a(f,{src:b(D(T),"/meshes/:mesh/mesh-multi-zone-service/:name",{mesh:s.params.mesh,name:s.params.service})},{default:e(({data:c,error:V})=>[a(v,{docs:n("services.mesh-multi-zone-service.href.docs"),breadcrumbs:[{to:{name:"mesh-detail-view",params:{mesh:s.params.mesh}},text:s.params.mesh},{to:{name:"mesh-multi-zone-service-list-view",params:{mesh:s.params.mesh}},text:n("services.routes.mesh-multi-zone-service-list-view.title")}]},{title:e(()=>[c?(m(),C("h1",y,[a(R,{text:s.params.service},{default:e(()=>[a(_,{title:n("services.routes.item.title",{name:c.name})},null,8,["title"])]),_:2},1032,["text"])])):z("",!0)]),default:e(()=>[r(),a(h,{data:[c],errors:[V]},{default:e(()=>{var i;return[a(u,{selected:(i=s.child())==null?void 0:i.name},S({_:2},[k(s.children,({name:o})=>({name:`${o}-tab`,fn:e(()=>[a(p,{to:{name:o}},{default:e(()=>[r(A(n(`services.routes.item.navigation.${o}`)),1)]),_:2},1032,["to"])])}))]),1032,["selected"]),r(),a(d,null,{default:e(o=>[(m(),l(X(o.Component),{data:c},null,8,["data"]))]),_:2},1024)]}),_:2},1032,["data","errors"])]),_:2},1032,["docs","breadcrumbs"])]),_:2},1032,["src"])]),_:1})}}});export{g as default};
