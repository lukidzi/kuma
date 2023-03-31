import{_ as P}from"./PolicyConnections.vue_vue_type_script_setup_true_lang-0af3feeb.js";import{_ as x}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-12f1a66a.js";import{E as B}from"./ErrorBlock-f4ceb6b7.js";import{_ as E}from"./LabelList.vue_vue_type_style_index_0_lang-c5bb0283.js";import{_ as N}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-e65555f3.js";import{T as V}from"./TabsWidget-1980411d.js";import{_ as $}from"./YamlView.vue_vue_type_script_setup_true_lang-9e6ca5fd.js";import{d as D,l as T,r as u,o as a,c as s,k as r,x as m,e as p,w as i,g as l,y as d,a as _,F as h,z as A,u as C,J as F}from"./index-0be248c4.js";import"./QueryParameter-70743f73.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-82aa021d.js";import"./toYaml-4e00099e.js";const L={class:"policy-details kcard-border"},S={class:"entity-heading","data-testid":"policy-single-entity"},z={"data-testid":"policy-overview-tab"},H={key:0},U=D({__name:"PolicyDetailView",props:{mesh:null,policyPath:null,policyName:null},setup(k){const f=k,g=T(),w=[{hash:"#overview",title:"Overview"},{hash:"#affected-dpps",title:"Affected DPPs"}],e=u(null),n=u(!0),o=u(null);async function b({mesh:y,policyPath:v,policyName:c}){n.value=!0,o.value=null,e.value=null;try{e.value=await g.getSinglePolicyEntity({mesh:y,path:v,name:c})}catch(t){t instanceof Error?o.value=t:console.error(t)}finally{n.value=!1}}return b(f),(y,v)=>(a(),s("div",L,[n.value?(a(),r(N,{key:0})):o.value!==null?(a(),r(B,{key:1,error:o.value},null,8,["error"])):e.value===null?(a(),r(x,{key:2})):m("",!0),p(),e.value!==null?(a(),r(V,{key:3,tabs:w},{tabHeader:i(()=>[l("h1",S,d(e.value.name),1)]),overview:i(()=>[_(E,null,{default:i(()=>[l("div",z,[l("ul",null,[(a(!0),s(h,null,A(e.value,(c,t)=>(a(),s(h,{key:t},[["type","mesh","name"].includes(t)?(a(),s("li",H,[l("h4",null,d(t),1),p(),l("p",null,d(c),1)])):m("",!0)],64))),128))])])]),_:1}),p(),_($,{id:"code-block-policy",class:"mt-4",content:C(F)(e.value),"is-searchable":""},null,8,["content"])]),"affected-dpps":i(()=>[_(P,{mesh:e.value.mesh,"policy-name":e.value.name,"policy-type":f.policyPath},null,8,["mesh","policy-name","policy-type"])]),_:1})):m("",!0)]))}});export{U as default};
