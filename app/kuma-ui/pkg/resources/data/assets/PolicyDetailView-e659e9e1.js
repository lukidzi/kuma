import{d as r,u as i,c as s,o as c,b as n,f as l}from"./index-04ca1e16.js";import{_ as u}from"./PolicyDetails.vue_vue_type_script_setup_true_lang-3baf52c5.js";import{u as y}from"./store-34c42dad.js";import"./StatusInfo.vue_vue_type_script_setup_true_lang-d6db3d5d.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-9c3782af.js";import"./kongponents.es-bec0b636.js";import"./ErrorBlock-cd18e62e.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang-744d045c.js";import"./index-24620e6e.js";import"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-8c7dd68e.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-8260ebe8.js";import"./TextWithCopyButton-f525338a.js";import"./toYaml-4e00099e.js";import"./TabsWidget-924fc433.js";import"./QueryParameter-70743f73.js";const S=r({__name:"PolicyDetailView",props:{mesh:{},policyPath:{},policyName:{}},setup(p){const t=p,a=i(),o=y(),e=s(()=>o.state.policyTypesByPath[t.policyPath]);m();function m(){o.dispatch("updatePageTitle",a.params.policy)}return(h,f)=>e.value?(c(),n(u,{key:0,name:t.policyName,mesh:t.mesh,path:t.policyPath,type:e.value.name},null,8,["name","mesh","path","type"])):l("",!0)}});export{S as default};
