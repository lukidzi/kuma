import{K as y}from"./index-fce48c05.js";import{d as S,a as t,o as n,b as r,w as s,e as o,m as c,f as l,c as x,l as d,a0 as v,_ as C}from"./index-fb2eded6.js";import{_ as w}from"./CodeBlock.vue_vue_type_style_index_0_lang-d11e4561.js";import{E as R}from"./ErrorBlock-9db074cb.js";import{_ as V}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-49a3177e.js";import"./uniqueId-90cc9b93.js";import"./TextWithCopyButton-e5ad58f3.js";import"./CopyButton-cc9318d8.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-2b371e68.js";const k={key:2},E={class:"toolbar"},b=S({__name:"DataPlaneInboundSummaryStatsView",setup(B){return(I,$)=>{const m=t("RouteTitle"),_=t("KButton"),u=t("DataSource"),f=t("AppView"),h=t("RouteView");return n(),r(h,{params:{codeSearch:"",codeFilter:!1,codeRegExp:!1,mesh:"",dataPlane:"",service:""},name:"data-plane-inbound-summary-stats-view"},{default:s(({route:e})=>[o(f,null,{title:s(()=>[c("h3",null,[o(m,{title:"Stats"})])]),default:s(()=>[l(),c("div",null,[o(u,{src:`/meshes/${e.params.mesh}/dataplanes/${e.params.dataPlane}/data-path/stats`},{default:s(({data:i,error:p,refresh:g})=>[p?(n(),r(R,{key:0,error:p},null,8,["error"])):i===void 0?(n(),r(V,{key:1})):(n(),x("div",k,[c("div",E,[o(_,{appearance:"primary",onClick:g},{default:s(()=>[o(d(v),{size:d(y)},null,8,["size"]),l(`
                  Refresh
                `)]),_:2},1032,["onClick"])]),l(),o(w,{language:"json",code:(()=>`${i.split(`
`).filter(a=>a.includes(`.localhost_${e.params.service}.`)).map(a=>a.replace(`localhost_${e.params.service}.`,"")).join(`
`)}`)(),"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:a=>e.update({codeSearch:a}),onFilterModeChange:a=>e.update({codeFilter:a}),onRegExpModeChange:a=>e.update({codeRegExp:a})},null,8,["code","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]))]),_:2},1032,["src"])])]),_:2},1024)]),_:1})}}});const z=C(b,[["__scopeId","data-v-8d0a1e45"]]);export{z as default};
