import{L as x}from"./LoadingBox-DGH-O7hy.js";import{O as y,a as V,b as D}from"./OnboardingPage-D69_I4LW.js";import{d as N,r as o,o as s,m as d,w as t,b as n,e as l,c as u,F as _,G as m,t as p,k as i,S as O,p as S,q as B}from"./index-JFoySG5Y.js";const L={class:"status-loading-box mb-4"},T={key:0},C=N({__name:"OnboardingDataplanesView",setup(R){return(F,P)=>{const g=o("RouteTitle"),b=o("KTable"),h=o("DataLoader"),w=o("DataSource"),v=o("AppView"),f=o("RouteView");return s(),d(f,{name:"onboarding-dataplanes-view"},{default:t(({t:c})=>[n(g,{title:c("onboarding.routes.dataplanes-overview.title"),render:!1},null,8,["title"]),l(),n(v,null,{default:t(()=>[n(w,{src:"/dataplanes/poll?page=1&size=10"},{default:t(({data:e,error:k})=>[(s(!0),u(_,null,m([((e==null?void 0:e.items)??[]).some(r=>r.status!=="online")],r=>(s(),d(y,{key:r},{header:t(()=>[(s(!0),u(_,null,m([r?"waiting":"success"],a=>(s(),d(V,{key:a,"data-testid":`state-${a}`},{title:t(()=>[l(p(c(`onboarding.routes.dataplanes-overview.header.${a}.title`)),1)]),description:t(()=>[i("p",null,p(c(`onboarding.routes.dataplanes-overview.header.${a}.description`)),1)]),_:2},1032,["data-testid"]))),128))]),content:t(()=>[n(h,{data:[e],errors:[k]},{connecting:t(()=>[i("div",L,[n(x)])]),default:t(()=>[l(),e?(s(),u("div",T,[i("p",null,[i("strong",null,`
                      Found `+p(e.items.length)+` DPPs:
                    `,1)]),l(),n(b,{class:"mb-4","data-testid":"dataplanes-table","fetcher-cache-key":JSON.stringify(e),fetcher:(a=>()=>({data:a.items,total:a.items.length}))(e),headers:[{label:"Mesh",key:"mesh"},{label:"Name",key:"name"},{label:"Status",key:"status"}],"disable-pagination":""},{status:t(({row:a})=>[n(O,{status:a.status},null,8,["status"])]),_:2},1032,["fetcher-cache-key","fetcher"])])):S("",!0)]),_:2},1032,["data","errors"])]),navigation:t(()=>[n(D,{"next-step":"onboarding-completed-view","previous-step":"onboarding-add-new-services-code-view","should-allow-next":((e==null?void 0:e.items)??[]).length>0},null,8,["should-allow-next"])]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)]),_:1})}}}),q=B(C,[["__scopeId","data-v-887f0dbe"]]);export{q as default};
