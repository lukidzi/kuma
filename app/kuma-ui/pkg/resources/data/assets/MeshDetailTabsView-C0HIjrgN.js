import{d as x,e as t,o as r,m as p,w as s,a as o,k as v,b as i,Q as C,J as R,t as T,E as X}from"./index-Dx_kP1mI.js";const A=x({__name:"MeshDetailTabsView",props:{mesh:{}},setup(c){const u=c;return(B,n)=>{const _=t("RouteTitle"),d=t("XCopyButton"),h=t("XAction"),f=t("XTabs"),w=t("RouterView"),V=t("AppView"),b=t("RouteView");return r(),p(b,{name:"mesh-detail-tabs-view",params:{mesh:""}},{default:s(({route:a,t:l})=>[o(V,null,{title:s(()=>[v("h1",null,[o(d,{text:a.params.mesh},{default:s(()=>[o(_,{title:l("meshes.routes.item.title",{name:a.params.mesh})},null,8,["title"])]),_:2},1032,["text"])])]),default:s(()=>{var m;return[n[0]||(n[0]=i()),o(f,{selected:(m=a.child())==null?void 0:m.name,"data-testid":"mesh-tabs"},C({_:2},[R(a.children.filter(({name:e})=>e!=="external-service-list-view"),({name:e})=>({name:`${e}-tab`,fn:s(()=>[o(h,{to:{name:e}},{default:s(()=>[i(T(l(`meshes.routes.item.navigation.${e}`)),1)]),_:2},1032,["to"])])}))]),1032,["selected"]),n[1]||(n[1]=i()),o(w,null,{default:s(({Component:e})=>[(r(),p(X(e),{mesh:u.mesh},null,8,["mesh"]))]),_:1})]}),_:2},1024)]),_:1})}}});export{A as default};
