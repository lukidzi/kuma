import{d as P,o as n,j as F,g as T,h as q,b as d,f as A,F as L,u as B,r as m,v as O}from"./index-574d45b5.js";import{S as I}from"./ServiceSummary-e0223f3e.js";import{D as j}from"./DataPlaneList-7a2675da.js";import{_ as z}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-0e5f40af.js";import{E as V}from"./ErrorBlock-c529b0a4.js";import{_ as $}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-c65e601c.js";import{u as R}from"./store-e583704e.js";import{u as C}from"./index-58b06467.js";import{Q as G}from"./QueryParameter-70743f73.js";import"./kongponents.es-3b634060.js";import"./DefinitionListItem-73363cac.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-a885226a.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-45c04b00.js";import"./TextWithCopyButton-ac5e81f5.js";import"./StatusInfo.vue_vue_type_script_setup_true_lang-3ac53131.js";import"./toYaml-4e00099e.js";import"./StatusBadge-08e76456.js";import"./TagList-913f985e.js";import"./ContentWrapper-05eb3317.js";import"./DataOverview-f8ab0be8.js";import"./datadogLogEvents-302eea7b.js";const Q=P({__name:"ServiceDetails",props:{service:{type:Object,required:!0},externalService:{type:Object,required:!1,default:null},dataPlaneOverviews:{type:Array,required:!1,default:null},dppFilterFields:{type:Object,required:!0},selectedDppName:{type:String,required:!1,default:null}},emits:["load-dataplane-overviews"],setup(f,{emit:h}){const e=f;function a(y,p){var o;(((o=e.service.serviceType)==null?void 0:o.startsWith("gateway"))??!1)||delete p.gateway,h("load-dataplane-overviews",y,p)}return(y,p)=>{var t;return n(),F(L,null,[T(I,{service:e.service,"external-service":f.externalService},null,8,["service","external-service"]),q(),e.dataPlaneOverviews!==null?(n(),d(j,{key:0,class:"mt-4","data-plane-overviews":e.dataPlaneOverviews,"dpp-filter-fields":e.dppFilterFields,"selected-dpp-name":e.selectedDppName,"is-gateway-view":((t=e.dataPlaneOverviews[0])==null?void 0:t.dataplane.networking.gateway)!==void 0,onLoadData:a},null,8,["data-plane-overviews","dpp-filter-fields","selected-dpp-name","is-gateway-view"])):A("",!0)],64)}}}),W={class:"service-details"},de=P({__name:"ServiceDetailView",props:{selectedDppName:{type:String,required:!1,default:null}},setup(f){const h=f,e=C(),a=B(),y=R(),p={name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"},zone:{description:"filter by “kuma.io/zone” value"}},t=m(null),o=m(null),g=m(null),_=m(!0),w=m(null);O(()=>a.params.mesh,function(){a.name==="service-detail-view"&&S(0)}),O(()=>a.params.name,function(){a.name==="service-detail-view"&&S(0)});function N(){y.dispatch("updatePageTitle",a.params.service);const r=G.get("filterFields"),l=r!==null?JSON.parse(r):{};S(0,l)}N();async function S(r,l={}){_.value=!0,w.value=null,t.value=null,o.value=null,g.value=null;const c=a.params.mesh,v=a.params.service;try{t.value=await e.getServiceInsight({mesh:c,name:v}),t.value.serviceType==="external"?o.value=await e.getExternalServiceByServiceInsightName(c,v):await x(r,l)}catch(s){s instanceof Error?w.value=s:console.error(s)}finally{_.value=!1}}async function x(r,l){const c=a.params.mesh,v=a.params.service;try{const s=b(v,r,l),i=await e.getAllDataplaneOverviewsFromMesh({mesh:c},s);g.value=i.items??[]}catch{g.value=null}}function b(r,l,c){const s=`kuma.io/service:${r}`,i={...c,offset:l,size:50};if(i.tag){const D=Array.isArray(i.tag)?i.tag:[i.tag],k=[];for(const[u,E]of D.entries())E.startsWith("kuma.io/service:")&&k.push(u);for(let u=k.length-1;u===0;u--)D.splice(k[u],1);i.tag=D.concat(s)}else i.tag=s;return i}return(r,l)=>(n(),F("div",W,[_.value?(n(),d($,{key:0})):w.value!==null?(n(),d(V,{key:1,error:w.value},null,8,["error"])):t.value===null?(n(),d(z,{key:2})):(n(),d(Q,{key:3,service:t.value,"data-plane-overviews":g.value,"external-service":o.value,"dpp-filter-fields":p,"selected-dpp-name":h.selectedDppName,onLoadDataplaneOverviews:x},null,8,["service","data-plane-overviews","external-service","selected-dpp-name"]))]))}});export{de as default};
