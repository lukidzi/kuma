import{E as d}from"./EnvoyData-fe61b3c6.js";import{d as l,a as t,o as m,b as g,w as a,e as n,p as u,f as _}from"./index-e5aa0c15.js";import"./index-fce48c05.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-e467052f.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-e8c0123c.js";import"./ErrorBlock-81d576c6.js";import"./TextWithCopyButton-a30e2023.js";import"./CopyButton-f402d0b6.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-1f206a29.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang-bef0b446.js";const B=l({__name:"ZoneEgressXdsConfigView",setup(f){return(x,h)=>{const s=t("RouteTitle"),r=t("KCard"),i=t("AppView"),p=t("RouteView");return m(),g(p,{name:"zone-egress-xds-config-view",params:{zoneEgress:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:a(({route:e,t:c})=>[n(i,null,{title:a(()=>[u("h2",null,[n(s,{title:c("zone-egresses.routes.item.navigation.zone-egress-xds-config-view")},null,8,["title"])])]),default:a(()=>[_(),n(r,null,{default:a(()=>[n(d,{resource:"Zone",src:`/zone-egresses/${e.params.zoneEgress}/data-path/xds`,query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter==="true","is-reg-exp-mode":e.params.codeRegExp==="true",onQueryChange:o=>e.update({codeSearch:o}),onFilterModeChange:o=>e.update({codeFilter:o}),onRegExpModeChange:o=>e.update({codeRegExp:o})},null,8,["src","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1024)]),_:2},1024)]),_:1})}}});export{B as default};