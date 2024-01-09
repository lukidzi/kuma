import{L as x}from"./LoadingBox-607efc89.js";import{O as D,a as V,b as B}from"./OnboardingPage-b46202a6.js";import{E as O}from"./ErrorBlock-1570e211.js";import{_ as S}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-6507e090.js";import{S as N}from"./StatusBadge-bd1b63e1.js";import{d as T,B as g,J as A,a as l,o,b as r,w as t,e as n,f as d,c,F as C,D as R,t as u,m as p,_ as $}from"./index-0b4678e0.js";import"./index-fce48c05.js";import"./TextWithCopyButton-bc8c6ef3.js";import"./CopyButton-18f43ddc.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-0acf695d.js";const E={key:0,class:"status-loading-box mb-4"},F={key:1},K={class:"mb-4"},L=T({__name:"OnboardingDataplanesView",setup(P){const e=g(),_=g(0),m=A(()=>Array.isArray(e.value)?e.value.some(s=>s.status==="offline"):!0);function f(s){s&&(e.value=s.items,_.value++)}return(s,z)=>{const b=l("RouteTitle"),h=l("KTable"),w=l("DataSource"),y=l("AppView"),k=l("RouteView");return o(),r(k,{name:"onboarding-dataplanes-view"},{default:t(({t:i})=>[n(b,{title:i("onboarding.routes.dataplanes-overview.title"),render:!1},null,8,["title"]),d(),n(y,null,{default:t(()=>[n(w,{src:m.value?"/dataplanes/poll?page=1&size=10":"",onChange:f},{default:t(({error:v})=>[v!==void 0?(o(),r(O,{key:0,error:v},null,8,["error"])):e.value===void 0?(o(),r(S,{key:1})):(o(),r(D,{key:2},{header:t(()=>[(o(!0),c(C,null,R([m.value?"waiting":"success"],a=>(o(),r(V,{key:a,"data-testid":`state-${a}`},{title:t(()=>[d(u(i(`onboarding.routes.dataplanes-overview.header.${a}.title`)),1)]),description:t(()=>[p("p",null,u(i(`onboarding.routes.dataplanes-overview.header.${a}.description`)),1)]),_:2},1032,["data-testid"]))),128))]),content:t(()=>[e.value.length===0?(o(),c("div",E,[n(x)])):(o(),c("div",F,[p("p",K,[p("b",null,"Found "+u(e.value.length)+" DPPs:",1)]),d(),n(h,{class:"mb-4","data-testid":"dataplanes-table","fetcher-cache-key":String(_.value),fetcher:()=>{var a;return{data:e.value,total:(a=e.value)==null?void 0:a.length}},headers:[{label:"Mesh",key:"mesh"},{label:"Name",key:"name"},{label:"Status",key:"status"}],"disable-pagination":""},{status:t(({row:a})=>[n(N,{status:a.status},null,8,["status"])]),_:1},8,["fetcher-cache-key","fetcher"])]))]),navigation:t(()=>[n(B,{"next-step":"onboarding-completed-view","previous-step":"onboarding-add-new-services-code-view","should-allow-next":e.value.length>0},null,8,["should-allow-next"])]),_:2},1024))]),_:2},1032,["src"])]),_:2},1024)]),_:1})}}});const X=$(L,[["__scopeId","data-v-f140547b"]]);export{X as default};
