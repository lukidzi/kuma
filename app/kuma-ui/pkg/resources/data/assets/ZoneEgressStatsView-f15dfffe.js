import{E as d}from"./EnvoyData-580057d4.js";import{d as l,a as t,o as m,b as g,w as a,e as s,p as u,f as _}from"./index-d015481a.js";import"./index-52545d1d.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-c74a2004.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-b301e74b.js";import"./ErrorBlock-90874856.js";import"./TextWithCopyButton-b83bb297.js";import"./CopyButton-7634543f.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-32f2be0a.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang-5a848316.js";const S=l({__name:"ZoneEgressStatsView",setup(f){return(h,x)=>{const r=t("RouteTitle"),n=t("KCard"),p=t("AppView"),i=t("RouteView");return m(),g(i,{name:"zone-egress-stats-view",params:{zoneEgress:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:a(({route:e,t:c})=>[s(p,null,{title:a(()=>[u("h2",null,[s(r,{title:c("zone-egresses.routes.item.navigation.zone-egress-stats-view")},null,8,["title"])])]),default:a(()=>[_(),s(n,null,{default:a(()=>[s(d,{resource:"Zone",src:`/zone-egresses/${e.params.zoneEgress}/data-path/stats`,query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter==="true","is-reg-exp-mode":e.params.codeRegExp==="true",onQueryChange:o=>e.update({codeSearch:o}),onFilterModeChange:o=>e.update({codeFilter:o}),onRegExpModeChange:o=>e.update({codeRegExp:o})},null,8,["src","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1024)]),_:2},1024)]),_:1})}}});export{S as default};
