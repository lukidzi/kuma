import{a as l}from"./kongponents.es-00e47166.js";import{O as u,a as _,b as m}from"./OnboardingPage-51c09792.js";import{d as h,r as b,c as g,e as f,w as a,o as v,g as s,h as e,i as n,t as y,b as o,P as x,p as S,m as A}from"./index-78b8321a.js";import{u as C}from"./store-554912aa.js";import{_ as N}from"./_plugin-vue_export-helper-c27b6911.js";const r=t=>(S("data-v-bc48623a"),t=t(),A(),t),P={class:"mb-4 text-center"},k=r(()=>n("i",null,"default",-1)),D=r(()=>n("p",{class:"mt-4 text-center"},`
        This mesh is empty. Next, you add services and their data plane proxies.
      `,-1)),M=h({__name:"CreateMesh",setup(t){const c=[{label:"Name",key:"name"},{label:"Services",key:"servicesAmount"},{label:"DPPs",key:"dppsAmount"}],i=C(),d=b({total:1,data:[{name:"default",servicesAmount:0,dppsAmount:0}]}),p=g(()=>i.getters["config/getMulticlusterStatus"]?"onboarding-multi-zone":"onboarding-configuration-types");return(O,B)=>(v(),f(u,null,{header:a(()=>[s(_,null,{title:a(()=>[e(`
          Create the mesh
        `)]),_:1})]),content:a(()=>[n("p",P,[e(`
        When you install, `+y(o(x))+" creates a ",1),k,e(` mesh, but you can add as many meshes as you need.
      `)]),e(),s(o(l),{class:"table",fetcher:()=>d.value,headers:c,"disable-pagination":""},null,8,["fetcher"]),e(),D]),navigation:a(()=>[s(m,{"next-step":"onboarding-add-services","previous-step":o(p)},null,8,["previous-step"])]),_:1}))}});const H=N(M,[["__scopeId","data-v-bc48623a"]]);export{H as default};
