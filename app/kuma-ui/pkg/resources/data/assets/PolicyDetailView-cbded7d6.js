import{d as r,u as i,c as s,o as c,b as n,f as l}from"./index-7d40e60e.js";import{_ as u}from"./PolicyDetails.vue_vue_type_script_setup_true_lang-b35ad4a3.js";import{u as y}from"./store-d8c948d6.js";import"./StatusInfo.vue_vue_type_script_setup_true_lang-e5df6bc1.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-6c8ad92b.js";import"./kongponents.es-ebaf3b61.js";import"./ErrorBlock-676f4185.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang-dca6d5d5.js";import"./index-e5240843.js";import"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-2d1fdef5.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-68d7f61f.js";import"./TextWithCopyButton-4857102d.js";import"./toYaml-4e00099e.js";import"./TabsWidget-782a4327.js";import"./datadogLogEvents-302eea7b.js";import"./QueryParameter-70743f73.js";const $=r({__name:"PolicyDetailView",props:{mesh:{},policyPath:{},policyName:{}},setup(p){const t=p,a=i(),o=y(),e=s(()=>o.state.policyTypesByPath[t.policyPath]);m();function m(){o.dispatch("updatePageTitle",a.params.policy)}return(h,f)=>e.value?(c(),n(u,{key:0,name:t.policyName,mesh:t.mesh,path:t.policyPath,type:e.value.name},null,8,["name","mesh","path","type"])):l("",!0)}});export{$ as default};
