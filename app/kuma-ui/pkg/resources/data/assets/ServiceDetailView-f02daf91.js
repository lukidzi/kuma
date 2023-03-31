import{d as P,o as n,c as F,a as T,e as q,k as d,x as A,F as L,l as B,m as I,i as z,r as m,n as O}from"./index-0be248c4.js";import{S as V}from"./ServiceSummary-783ab73b.js";import{D as $}from"./DataPlaneList-24989aeb.js";import{_ as j}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-12f1a66a.js";import{E as R}from"./ErrorBlock-f4ceb6b7.js";import{_ as C}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-e65555f3.js";import{Q as G}from"./QueryParameter-70743f73.js";import"./StatusBadge-f388e2f2.js";import"./TagList-777ca8e8.js";import"./YamlView.vue_vue_type_script_setup_true_lang-9e6ca5fd.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-82aa021d.js";import"./toYaml-4e00099e.js";import"./ContentWrapper-efa20b98.js";import"./DataOverview-f7d22b1c.js";const Q=P({__name:"ServiceDetails",props:{service:{type:Object,required:!0},externalService:{type:Object,required:!1,default:null},dataPlaneOverviews:{type:Array,required:!1,default:null},dppFilterFields:{type:Object,required:!0},selectedDppName:{type:String,required:!1,default:null}},emits:["load-dataplane-overviews"],setup(f,{emit:g}){const a=f;function _(e,v){var o;(((o=a.service.serviceType)==null?void 0:o.startsWith("gateway"))??!1)||delete v.gateway,g("load-dataplane-overviews",e,v)}return(e,v)=>{var t;return n(),F(L,null,[T(V,{service:a.service,"external-service":f.externalService},null,8,["service","external-service"]),q(),a.dataPlaneOverviews!==null?(n(),d($,{key:0,class:"mt-4","data-plane-overviews":a.dataPlaneOverviews,"dpp-filter-fields":a.dppFilterFields,"selected-dpp-name":a.selectedDppName,"is-gateway-view":((t=a.dataPlaneOverviews[0])==null?void 0:t.dataplane.networking.gateway)!==void 0,onLoadData:_},null,8,["data-plane-overviews","dpp-filter-fields","selected-dpp-name","is-gateway-view"])):A("",!0)],64)}}}),W={class:"service-details"},le=P({__name:"ServiceDetailView",props:{selectedDppName:{type:String,required:!1,default:null}},setup(f){const g=f,a=B(),_={name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"},zone:{description:"filter by “kuma.io/zone” value"}},e=I(),v=z(),t=m(null),o=m(null),y=m(null),h=m(!0),w=m(null);O(()=>e.params.mesh,function(){e.name==="service-detail-view"&&S(0)}),O(()=>e.params.name,function(){e.name==="service-detail-view"&&S(0)});function N(){v.dispatch("updatePageTitle",e.params.service);const r=G.get("filterFields"),l=r!==null?JSON.parse(r):{};S(0,l)}N();async function S(r,l={}){h.value=!0,w.value=null,t.value=null,o.value=null,y.value=null;const c=e.params.mesh,p=e.params.service;try{t.value=await a.getServiceInsight({mesh:c,name:p}),t.value.serviceType==="external"?o.value=await a.getExternalServiceByServiceInsightName(c,p):await x(r,l)}catch(s){s instanceof Error?w.value=s:console.error(s)}finally{h.value=!1}}async function x(r,l){const c=e.params.mesh,p=e.params.service;try{const s=b(p,r,l),i=await a.getAllDataplaneOverviewsFromMesh({mesh:c},s);y.value=i.items??[]}catch{y.value=null}}function b(r,l,c){const s=`kuma.io/service:${r}`,i={...c,offset:l,size:50};if(i.tag){const D=Array.isArray(i.tag)?i.tag:[i.tag],k=[];for(const[u,E]of D.entries())E.startsWith("kuma.io/service:")&&k.push(u);for(let u=k.length-1;u===0;u--)D.splice(k[u],1);i.tag=D.concat(s)}else i.tag=s;return i}return(r,l)=>(n(),F("div",W,[h.value?(n(),d(C,{key:0})):w.value!==null?(n(),d(R,{key:1,error:w.value},null,8,["error"])):t.value===null?(n(),d(j,{key:2})):(n(),d(Q,{key:3,service:t.value,"data-plane-overviews":y.value,"external-service":o.value,"dpp-filter-fields":_,"selected-dpp-name":g.selectedDppName,onLoadDataplaneOverviews:x},null,8,["service","data-plane-overviews","external-service","selected-dpp-name"]))]))}});export{le as default};
