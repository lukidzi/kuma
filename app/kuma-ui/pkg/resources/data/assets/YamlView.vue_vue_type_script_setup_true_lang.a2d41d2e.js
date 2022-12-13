import{j as y}from"./index.58caa11d.js";import{d as B,r as E,e as j,o as n,j as k,c as s,w as g,a as b,u as i,Y as S,q as V}from"./index.0cb244cf.js";import{_ as v}from"./CodeBlock.vue_vue_type_style_index_0_lang.bc379a4d.js";import{_ as w}from"./EmptyBlock.vue_vue_type_script_setup_true_lang.2f1a3317.js";import{E as H}from"./ErrorBlock.d22fdbf7.js";import{_ as C}from"./LoadingBlock.vue_vue_type_script_setup_true_lang.bf98f3b7.js";const M={class:"yaml-view"},O={key:3,class:"yaml-view-content"},z=B({__name:"YamlView",props:{id:{type:String,required:!0},content:{type:Object,required:!1,default:null},isLoading:{type:Boolean,required:!1,default:!1},hasError:{type:Boolean,required:!1,default:!1},isEmpty:{type:Boolean,required:!1,default:!1},codeMaxHeight:{type:String,required:!1,default:null},isSearchable:{type:Boolean,required:!1,default:!1}},setup(e){const a=e,p=V(),c=[{hash:"#universal",title:"Universal"},{hash:"#kubernetes",title:"Kubernetes"}],o=E(c[0].hash),l=p.getters["config/getEnvironment"];typeof l=="string"&&(o.value="#"+l);const m=j(()=>{var f;const t={};if(t.apiVersion="kuma.io/v1alpha1",t.kind=a.content.type,a.content.mesh!==void 0&&(t.mesh=a.content.mesh),(f=a.content.name)!=null&&f.includes(".")){const h=a.content.name.split("."),q=h.pop(),x=h.join(".");t.metadata={name:x,namespace:q}}else t.metadata={name:a.content.name};const{type:r,name:d,mesh:Y,...u}=a.content;return Object.keys(u).length>0&&(t.spec=u),{universal:y(a.content),kubernetes:y(t)}});return(t,r)=>(n(),k("div",M,[e.isLoading?(n(),s(C,{key:0})):e.hasError?(n(),s(H,{key:1})):e.isEmpty?(n(),s(w,{key:2})):(n(),k("div",O,[(n(),s(i(S),{key:i(l),modelValue:o.value,"onUpdate:modelValue":r[0]||(r[0]=d=>o.value=d),tabs:c},{universal:g(()=>[b(v,{id:e.id,language:"yaml",code:i(m).universal,"is-searchable":e.isSearchable,"query-key":e.id,"code-max-height":e.codeMaxHeight},null,8,["id","code","is-searchable","query-key","code-max-height"])]),kubernetes:g(()=>[b(v,{id:e.id,language:"yaml",code:i(m).kubernetes,"is-searchable":e.isSearchable,"query-key":e.id,"code-max-height":e.codeMaxHeight},null,8,["id","code","is-searchable","query-key","code-max-height"])]),_:1},8,["modelValue"]))]))]))}});export{z as _};
