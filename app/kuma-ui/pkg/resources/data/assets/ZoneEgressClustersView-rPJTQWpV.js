import{_ as i}from"./EnvoyData.vue_vue_type_script_setup_true_lang-qImP0YTk.js";import{d,a as s,o as m,b as u,w as a,e as t,m as _,f as g}from"./index-2mpecEEN.js";import"./CodeBlock-MuT-Pggn.js";const E=d({__name:"ZoneEgressClustersView",setup(f){return(h,C)=>{const n=s("RouteTitle"),r=s("KCard"),c=s("AppView"),l=s("RouteView");return m(),u(l,{name:"zone-egress-clusters-view",params:{zoneEgress:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:a(({route:e,t:p})=>[t(c,null,{title:a(()=>[_("h2",null,[t(n,{title:p("zone-egresses.routes.item.navigation.zone-egress-clusters-view")},null,8,["title"])])]),default:a(()=>[g(),t(r,null,{default:a(()=>[t(i,{resource:"Zone",src:`/zone-egresses/${e.params.zoneEgress}/data-path/clusters`,query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:o=>e.update({codeSearch:o}),onFilterModeChange:o=>e.update({codeFilter:o}),onRegExpModeChange:o=>e.update({codeRegExp:o})},null,8,["src","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1024)]),_:2},1024)]),_:1})}}});export{E as default};
