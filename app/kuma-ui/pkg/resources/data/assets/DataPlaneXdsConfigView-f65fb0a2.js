import{E as l}from"./EnvoyData-43012907.js";import{d as m,a as t,o as c,b as u,w as o,e as n,m as _,f as g}from"./index-0b4678e0.js";import"./index-fce48c05.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-be520aa5.js";import"./uniqueId-90cc9b93.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-3b71f9a1.js";import"./ErrorBlock-1570e211.js";import"./TextWithCopyButton-bc8c6ef3.js";import"./CopyButton-18f43ddc.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-0acf695d.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang-6507e090.js";const D=m({__name:"DataPlaneXdsConfigView",setup(f){return(h,x)=>{const r=t("RouteTitle"),p=t("KCard"),s=t("AppView"),i=t("RouteView");return c(),u(i,{name:"data-plane-xds-config-view",params:{mesh:"",dataPlane:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:o(({route:e,t:d})=>[n(s,null,{title:o(()=>[_("h2",null,[n(r,{title:d("data-planes.routes.item.navigation.data-plane-xds-config-view")},null,8,["title"])])]),default:o(()=>[g(),n(p,null,{default:o(()=>[n(l,{resource:"Data Plane Proxy",src:`/meshes/${e.params.mesh}/dataplanes/${e.params.dataPlane}/data-path/xds`,query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter==="true","is-reg-exp-mode":e.params.codeRegExp==="true",onQueryChange:a=>e.update({codeSearch:a}),onFilterModeChange:a=>e.update({codeFilter:a}),onRegExpModeChange:a=>e.update({codeRegExp:a})},null,8,["src","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1024)]),_:2},1024)]),_:1})}}});export{D as default};
