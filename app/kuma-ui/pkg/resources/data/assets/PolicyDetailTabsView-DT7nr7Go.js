import{d as D,r as a,o as c,p as l,w as t,b as o,m as R,ap as v,c as C,V as T,q as P,e as p,R as k,K as A,t as S,F as X}from"./index-DEIC-piS.js";const B={key:0},g=D({__name:"PolicyDetailTabsView",setup(L){return(N,m)=>{const _=a("RouteTitle"),d=a("XAction"),u=a("XTabs"),h=a("RouterView"),f=a("DataLoader"),y=a("AppView"),b=a("DataSource"),w=a("RouteView");return c(),l(w,{name:"policy-detail-tabs-view",params:{mesh:"",policy:"",policyPath:""}},{default:t(({route:e,t:i,uri:V})=>[o(b,{src:V(R(v),"/meshes/:mesh/policy-path/:path/policy/:name",{mesh:e.params.mesh,path:e.params.policyPath,name:e.params.policy})},{default:t(({data:s,error:x})=>[o(y,{breadcrumbs:[{to:{name:"mesh-detail-view",params:{mesh:e.params.mesh}},text:e.params.mesh},{to:{name:"policy-list-view",params:{mesh:e.params.mesh,policyPath:e.params.policyPath}},text:i("policies.routes.item.breadcrumbs")}]},{title:t(()=>[s?(c(),C("h1",B,[o(T,{text:s.name},{default:t(()=>[o(_,{title:i("policies.routes.item.title",{name:s.name})},null,8,["title"])]),_:2},1032,["text"])])):P("",!0)]),default:t(()=>[m[1]||(m[1]=p()),o(f,{data:[s],errors:[x]},{default:t(()=>{var r;return[o(u,{selected:(r=e.child())==null?void 0:r.name},k({_:2},[A(e.children,({name:n})=>({name:`${n}-tab`,fn:t(()=>[o(d,{to:{name:n}},{default:t(()=>[p(S(i(`policies.routes.item.navigation.${n}`)),1)]),_:2},1032,["to"])])}))]),1032,["selected"]),m[0]||(m[0]=p()),o(h,null,{default:t(n=>[(c(),l(X(n.Component),{data:s},null,8,["data"]))]),_:2},1024)]}),_:2},1032,["data","errors"])]),_:2},1032,["breadcrumbs"])]),_:2},1032,["src"])]),_:1})}}});export{g as default};
