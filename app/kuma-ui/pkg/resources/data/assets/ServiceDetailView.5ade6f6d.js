import{d as O,o as n,c as F,e as q,a as L,b as T,i as m,j as A,F as B,cv as C,f as V,bP as d,h as S,c8 as x}from"./index.bd548025.js";import{Q as $}from"./DataOverview.c2f3fb00.js";import{_ as j}from"./EmptyBlock.vue_vue_type_script_setup_true_lang.0d00632b.js";import{E as z}from"./ErrorBlock.ee0cc1df.js";import{_ as I}from"./LoadingBlock.vue_vue_type_script_setup_true_lang.f0102383.js";import{D as R}from"./DataPlaneList.3e7010ea.js";import{S as Q}from"./ServiceSummary.d2ab49ab.js";import"./StatusBadge.fafdc81c.js";import"./TagList.4378af73.js";import"./ContentWrapper.92bb9d03.js";import"./YamlView.vue_vue_type_script_setup_true_lang.bc9d3e4b.js";import"./index.58caa11d.js";import"./CodeBlock.vue_vue_type_style_index_0_lang.867fc141.js";import"./_commonjsHelpers.f037b798.js";const J={class:"component-frame"},M=O({__name:"ServiceDetails",props:{service:{type:Object,required:!0},externalService:{type:Object,required:!1,default:null},dataPlaneOverviews:{type:Array,required:!1,default:null},dppFilterFields:{type:Object,required:!0},selectedDppName:{type:String,required:!1,default:null}},emits:["load-dataplane-overviews"],setup(f,{emit:_}){const s=f;function e(g,l){_("load-dataplane-overviews",g,l)}return(g,l)=>{var o;return n(),F(B,null,[q("div",J,[L(Q,{service:s.service,"external-service":f.externalService},null,8,["service","external-service"])]),T(),s.dataPlaneOverviews!==null?(n(),m(R,{key:0,class:"mt-4","data-plane-overviews":s.dataPlaneOverviews,"dpp-filter-fields":s.dppFilterFields,"selected-dpp-name":s.selectedDppName,"is-gateway-view":((o=s.dataPlaneOverviews[0])==null?void 0:o.dataplane.networking.gateway)!==void 0,onLoadData:e},null,8,["data-plane-overviews","dpp-filter-fields","selected-dpp-name","is-gateway-view"])):A("",!0)],64)}}}),W={class:"service-details"},ne=O({__name:"ServiceDetailView",props:{selectedDppName:{type:String,required:!1,default:null}},setup(f){const _=f,s={name:{description:"filter by name or parts of a name"},protocol:{description:"filter by \u201Ckuma.io/protocol\u201D value"},tag:{description:"filter by tags (e.g. \u201Ctag: version:2\u201D)"},zone:{description:"filter by \u201Ckuma.io/zone\u201D value"}},e=C(),g=V(),l=d(null),o=d(null),w=d(null),D=d(!0),y=d(null);S(()=>e.params.mesh,function(){e.name==="service-detail-view"&&h(0)}),S(()=>e.params.name,function(){e.name==="service-detail-view"&&h(0)});function b(){g.dispatch("updatePageTitle",e.params.service);const t=$.get("filterFields"),i=t!==null?JSON.parse(t):{};h(0,i)}b();async function h(t,i={}){D.value=!0,y.value=null,l.value=null,o.value=null,w.value=null;const c=e.params.mesh,p=e.params.service;try{l.value=await x.getServiceInsight({mesh:c,name:p}),l.value.serviceType==="external"?o.value=await x.getExternalService({mesh:c,name:p}):await P(t,i)}catch(r){r instanceof Error?y.value=r:console.error(r)}finally{D.value=!1}}async function P(t,i){var r;const c=e.params.mesh,p=e.params.service;try{const a=N(p,t,i),u=await x.getAllDataplaneOverviewsFromMesh({mesh:c},a);w.value=(r=u.items)!=null?r:[]}catch{w.value=null}}function N(t,i,c){const r=`kuma.io/service:${t}`,a={...c,offset:i,size:50};if(a.tag){const u=Array.isArray(a.tag)?a.tag:[a.tag],k=[];for(const[v,E]of u.entries())E.startsWith("kuma.io/service:")&&k.push(v);for(let v=k.length-1;v===0;v--)u.splice(k[v],1);a.tag=u.concat(r)}else a.tag=r;return a}return(t,i)=>(n(),F("div",W,[D.value?(n(),m(I,{key:0})):y.value!==null?(n(),m(z,{key:1,error:y.value},null,8,["error"])):l.value===null?(n(),m(j,{key:2})):(n(),m(M,{key:3,service:l.value,"data-plane-overviews":w.value,"external-service":o.value,"dpp-filter-fields":s,"selected-dpp-name":_.selectedDppName,onLoadDataplaneOverviews:P},null,8,["service","data-plane-overviews","external-service","selected-dpp-name"]))]))}});export{ne as default};
