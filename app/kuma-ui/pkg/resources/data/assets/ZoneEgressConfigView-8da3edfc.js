import{E as f}from"./ErrorBlock-90874856.js";import{_ as h}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-5a848316.js";import{_ as C}from"./ResourceCodeBlock.vue_vue_type_style_index_0_lang-e3bcc72c.js";import{d as E,u as x,a as r,o as a,b as n,w as s,e as t,p as w,f as R,q as k}from"./index-d015481a.js";import"./index-52545d1d.js";import"./TextWithCopyButton-b83bb297.js";import"./CopyButton-7634543f.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-32f2be0a.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-c74a2004.js";import"./toYaml-4e00099e.js";const T=E({__name:"ZoneEgressConfigView",setup(z){const p=x();return(V,y)=>{const m=r("RouteTitle"),l=r("DataSource"),d=r("KCard"),u=r("AppView"),g=r("RouteView");return a(),n(g,{name:"zone-egress-config-view",params:{zoneEgress:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:s(({route:e,t:_})=>[t(u,null,{title:s(()=>[w("h2",null,[t(m,{title:_("zone-egresses.routes.item.navigation.zone-egress-config-view")},null,8,["title"])])]),default:s(()=>[R(),t(d,null,{default:s(()=>[t(l,{src:`/zone-egresses/${e.params.zoneEgress}`},{default:s(({data:c,error:i})=>[i!==void 0?(a(),n(f,{key:0,error:i},null,8,["error"])):c===void 0?(a(),n(h,{key:1})):(a(),n(C,{key:2,id:"code-block-zone-egress",resource:c,"resource-fetcher":o=>k(p).getZoneEgress({name:e.params.zoneEgress},o),"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter==="true","is-reg-exp-mode":e.params.codeRegExp==="true",onQueryChange:o=>e.update({codeSearch:o}),onFilterModeChange:o=>e.update({codeFilter:o}),onRegExpModeChange:o=>e.update({codeRegExp:o})},null,8,["resource","resource-fetcher","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"]))]),_:2},1032,["src"])]),_:2},1024)]),_:2},1024)]),_:1})}}});export{T as default};
