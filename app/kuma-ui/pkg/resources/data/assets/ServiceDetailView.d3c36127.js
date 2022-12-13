import{d as y,o as r,j as h,l as g,a as S,b as D,c as i,z as O,F as P,p as B,r as n,f as w,k as f,q as E}from"./index.0cb244cf.js";import{_ as V}from"./EmptyBlock.vue_vue_type_script_setup_true_lang.2f1a3317.js";import{E as $}from"./ErrorBlock.d22fdbf7.js";import{_ as q}from"./LoadingBlock.vue_vue_type_script_setup_true_lang.bf98f3b7.js";import{D as L}from"./DataPlaneList.e289135b.js";import{S as N}from"./ServiceSummary.edac1b2e.js";import"./ContentWrapper.9abbd166.js";import"./patchQueryParam.e9e28acb.js";import"./StatusBadge.291bc99c.js";import"./TagList.9a369e5a.js";import"./YamlView.vue_vue_type_script_setup_true_lang.a2d41d2e.js";import"./index.58caa11d.js";import"./CodeBlock.vue_vue_type_style_index_0_lang.bc379a4d.js";import"./_commonjsHelpers.f037b798.js";const b={class:"component-frame"},j=y({__name:"ServiceDetails",props:{service:{type:Object,required:!0},externalService:{type:Object,required:!1,default:null},dataPlaneOverviews:{type:Array,required:!1,default:null}},emits:["load-data"],setup(p,{emit:e}){const s=p;function a(t){e("load-data",t)}return(t,o)=>(r(),h(P,null,[g("div",b,[S(N,{service:s.service,"external-service":p.externalService},null,8,["service","external-service"])]),D(),s.dataPlaneOverviews!==null?(r(),i(L,{key:0,class:"mt-4","data-plane-overviews":s.dataPlaneOverviews,onLoadData:a},null,8,["data-plane-overviews"])):O("",!0)],64))}}),A={class:"service-details"},X=y({__name:"ServiceDetailView",setup(p){const e=B(),s=E(),a=n(null),t=n(null),o=n(null),d=n(!0),c=n(null);w(()=>e.params.mesh,function(){e.name==="service-insights-detail-view"&&v()}),w(()=>e.params.name,function(){e.name==="service-insights-detail-view"&&v()}),s.dispatch("updatePageTitle",e.params.service),v();async function v(){var _;d.value=!0,c.value=null,a.value=null,t.value=null,o.value=null;const u=e.params.mesh,m=e.params.service,x=`kuma.io/service:${m}`,k=!1;try{if(a.value=await f.getServiceInsight({mesh:u,name:m}),a.value.serviceType==="external")t.value=await f.getExternalService({mesh:u,name:m});else{const l=await f.getAllDataplaneOverviewsFromMesh({mesh:u},{gateway:k,tag:x});o.value=(_=l.items)!=null?_:[]}}catch(l){l instanceof Error?c.value=l:console.error(l)}finally{d.value=!1}}return(u,m)=>(r(),h("div",A,[d.value?(r(),i(q,{key:0})):c.value!==null?(r(),i($,{key:1,error:c.value},null,8,["error"])):a.value===null?(r(),i(V,{key:2})):(r(),i(j,{key:3,service:a.value,"data-plane-overviews":o.value,"external-service":t.value,onLoadData:v},null,8,["service","data-plane-overviews","external-service"]))]))}});export{X as default};
