import{_ as l}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-f1ae2cb1.js";import{E as s}from"./ErrorBlock-aec5b3c8.js";import{_ as n}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-314c9b25.js";import{d as f,o as e,j as a,e as o,J as i}from"./index-78b8321a.js";const m={key:3},k=f({__name:"StatusInfo",props:{isLoading:{type:Boolean,default:!1},hasError:{type:Boolean,default:!1},isEmpty:{type:Boolean,default:!1},error:{type:[Error,null],required:!1,default:null}},setup(r){return(t,d)=>(e(),a("div",null,[r.isLoading?(e(),o(n,{key:0})):r.hasError?(e(),o(s,{key:1,error:r.error},null,8,["error"])):r.isEmpty?(e(),o(l,{key:2})):(e(),a("div",m,[i(t.$slots,"default")]))]))}});export{k as _};
