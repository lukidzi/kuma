import{L as y}from"./LoadingBox-inaePmuF.js";import{O as L,a as V,b as x}from"./OnboardingPage-DLWLhpxV.js";import{d as T,e as i,o as a,m as k,w as e,a as n,b as r,k as u,c as p,H as f,J as H,p as B}from"./index-Dx_kP1mI.js";const M=["innerHTML"],N=["data-testid","innerHTML"],O={key:0,class:"onboarding-multi-zone-view-status-loading"},$=T({__name:"OnboardingMultiZoneView",setup(C){return(D,o)=>{const g=i("RouteTitle"),c=i("DataLoader"),m=i("DataSource"),_=i("AppView"),z=i("RouteView");return a(),k(z,{name:"onboarding-multi-zone-view"},{default:e(({t:s})=>[n(g,{title:s("onboarding.routes.multizone.title"),render:!1},null,8,["title"]),o[5]||(o[5]=r()),n(_,null,{default:e(()=>[n(m,{src:"/zone-cps/~online?page=1&size=10"},{default:e(({data:l,error:b})=>[n(m,{src:"/zone-ingress-overviews/~online?page=1&size=10"},{default:e(({data:d,error:v})=>[n(L,null,{header:e(()=>[n(V,null,{title:e(()=>o[0]||(o[0]=[r(`
                  Add zones
                `)])),_:1})]),content:e(()=>[u("div",{class:"onboarding-multi-zone-view-body",innerHTML:s("onboarding.routes.multizone.body")},null,8,M),o[2]||(o[2]=r()),u("div",null,[n(c,{data:[l,d],errors:[b,v],loader:!1},{default:e(()=>[(a(!0),p(f,null,H([{zone:typeof l<"u"?"online":"offline",ingress:typeof d<"u"?"online":"offline"}],t=>(a(),p(f,{key:t},[u("div",{class:"onboarding-multi-zone-view-status","data-testid":`zone-${t.zone}-ingress-${t.ingress}`,innerHTML:s("onboarding.routes.multizone.status",{zone:t.zone,ingress:t.ingress})},null,8,N),o[1]||(o[1]=r()),["zone","ingress"].some(w=>t[w]==="offline")?(a(),p("div",O,[n(y)])):B("",!0)],64))),128))]),_:2},1032,["data","errors"])])]),navigation:e(()=>[n(x,{"next-step":"onboarding-create-mesh-view","previous-step":"onboarding-configuration-types-view","should-allow-next":typeof d<"u"||typeof l<"u"},null,8,["should-allow-next"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:1})}}});export{$ as default};
