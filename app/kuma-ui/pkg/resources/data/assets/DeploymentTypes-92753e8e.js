import{d as g,an as b,ao as v,h as y,r as f,i as h,a5 as z,o as i,j as u,w as e,a as t,e as n,f as d,z as V,u as s,G as x,a2 as G,ap as r,J as M}from"./index-5f1fbf13.js";import{O as S,a as D,b as C}from"./OnboardingPage-503a3bf7.js";const N={class:"graph-list mb-6"},O={class:"radio-button-group"},T=g({__name:"DeploymentTypes",setup(w){const p=b(),m={standalone:v(),"multi-zone":p},c=y(),a=f("standalone"),_=h(()=>m[a.value]);return z(function(){a.value=c.getters["config/getMulticlusterStatus"]?"multi-zone":"standalone"}),(U,o)=>(i(),u(C,{"with-image":""},{header:e(()=>[t(S,null,{title:e(()=>[n(`
          Learn about deployments
        `)]),description:e(()=>[d("p",null,V(s(x))+" can be deployed in standalone or multi-zone mode.",1)]),_:1})]),content:e(()=>[d("div",N,[(i(),u(G(s(_))))]),n(),d("div",O,[t(s(r),{modelValue:a.value,"onUpdate:modelValue":o[0]||(o[0]=l=>a.value=l),name:"mode","selected-value":"standalone","data-testid":"onboarding-standalone-radio-button"},{default:e(()=>[n(`
          Standalone deployment
        `)]),_:1},8,["modelValue"]),n(),t(s(r),{modelValue:a.value,"onUpdate:modelValue":o[1]||(o[1]=l=>a.value=l),name:"mode","selected-value":"multi-zone","data-testid":"onboarding-multi-zone-radio-button"},{default:e(()=>[n(`
          Multi-zone deployment
        `)]),_:1},8,["modelValue"])])]),navigation:e(()=>[t(D,{"next-step":"onboarding-configuration-types","previous-step":"onboarding-welcome"})]),_:1}))}});const j=M(T,[["__scopeId","data-v-711049bb"]]);export{j as default};
