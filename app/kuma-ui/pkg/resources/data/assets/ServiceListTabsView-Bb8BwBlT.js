import{d as x,s as A,i as R,V as y,e as t,o as a,m as c,w as s,k as _,a as l,c as h,J as w,K as B,l as L,n as N,b as m,t as T,p as X,F as M}from"./index-CKcsX_-l.js";const $={class:"stack"},D=["innerHTML"],G=x({__name:"ServiceListTabsView",props:{mesh:{}},setup(f){const r=f,u=A(),d=R();return y(()=>u.currentRoute.value.name,p=>{p==="service-list-tabs-view"&&u.replace(d("use service-insights",r.mesh)?{name:"service-list-view"}:{name:"mesh-service-list-view"})},{immediate:!0}),(p,i)=>{const V=t("XAction"),b=t("XActionGroup"),g=t("RouterView"),k=t("AppView"),C=t("RouteView");return a(),c(C,{name:"service-list-tabs-view",params:{mesh:""}},{default:s(({route:n,t:v})=>[_("div",$,[l(k,null,{actions:s(()=>[l(b,{expanded:!0},{default:s(()=>[(a(!0),h(w,null,B(n.children,({name:e})=>{var o;return a(),h(w,{key:e},[!L(d)("use service-insights",r.mesh)&&["service-list-view","external-service-list-view"].includes(e)?X("",!0):(a(),c(V,{key:0,class:N({active:((o=n.child())==null?void 0:o.name)===e}),to:{name:e,params:{mesh:n.params.mesh}},"data-testid":`${e}-sub-tab`},{default:s(()=>[m(T(v(`services.routes.items.navigation.${e}.label`)),1)]),_:2},1032,["class","to","data-testid"]))],64)}),128))]),_:2},1024)]),default:s(()=>{var e;return[i[0]||(i[0]=m()),_("div",{innerHTML:v(`services.routes.items.navigation.${(e=n.child())==null?void 0:e.name}.description`,{},{defaultMessage:""})},null,8,D),i[1]||(i[1]=m()),l(g,null,{default:s(({Component:o})=>[(a(),c(M(o),{mesh:r.mesh},null,8,["mesh"]))]),_:1})]}),_:2},1024)])]),_:1})}}});export{G as default};
