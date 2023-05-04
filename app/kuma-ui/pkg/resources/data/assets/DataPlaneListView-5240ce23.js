import{d as h,k as P,l as S,r as s,i as T,m as k,o as x,j as I,u as b}from"./index-5f1fbf13.js";import{D as G}from"./DataPlaneList-196aae86.js";import{Q as f}from"./QueryParameter-70743f73.js";import"./ContentWrapper-a22c553b.js";import"./DataOverview-bb21a126.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-e38c62d0.js";import"./ErrorBlock-7fdfff5d.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang-48d7a99c.js";import"./TagList-da3971ac.js";import"./StatusBadge-a0fac783.js";import"./YamlView.vue_vue_type_script_setup_true_lang-79d0d539.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-e910dc2a.js";import"./toYaml-4e00099e.js";const U=h({__name:"DataPlaneListView",props:{selectedDppName:{type:String,required:!1,default:null},gatewayType:{type:String,required:!1,default:"true"},offset:{type:Number,required:!1,default:0},isGatewayView:{type:Boolean,required:!1,default:!1}},setup(d){const t=d,v=P(),w=50,g={name:{description:"filter by name or parts of a name"},service:{description:"filter by “kuma.io/service” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"},zone:{description:"filter by “kuma.io/zone” value"}},_={protocol:{description:"filter by “kuma.io/protocol” value"}},D={},l=S(),i=s([]),p=s(!0),m=s(null),o=s(null),y=s(t.offset),E=T(()=>({...g,...t.isGatewayView?D:_}));k(()=>l.params.mesh,function(){l.name!=="data-plane-list-view"&&l.name!=="gateway-list-view"||u(0)});function F(){const a=f.get("filterFields"),r=a!==null?JSON.parse(a):{};u(t.offset,{...r,gateway:t.gatewayType})}F();async function u(a,r={}){y.value=a,f.set("offset",a>0?a:null),f.set("gatewayType",r.gateway==="true"?"all":r.gateway),p.value=!0;const c=l.params.mesh,n=L(r,w,a,t.isGatewayView);try{const{items:e,next:A}=await v.getAllDataplaneOverviewsFromMesh({mesh:c},n);Array.isArray(e)&&e.length>0?(i.value=e,o.value=A):(i.value=[],o.value=null)}catch(e){e instanceof Error?m.value=e:console.error(e),i.value=[],o.value=null}finally{p.value=!1}}function L(a,r,c,n){const e={...a,size:r,offset:c};return n&&(!("gateway"in e)||e.gateway==="false")?e.gateway="true":n||(e.gateway="false"),e}return(a,r)=>(x(),I(G,{"data-plane-overviews":i.value,"is-loading":p.value,error:m.value,"next-url":o.value,"page-offset":y.value,"selected-dpp-name":t.selectedDppName,"is-gateway-view":t.isGatewayView,"gateway-type":t.gatewayType,"dpp-filter-fields":b(E),onLoadData:u},null,8,["data-plane-overviews","is-loading","error","next-url","page-offset","selected-dpp-name","is-gateway-view","gateway-type","dpp-filter-fields"]))}});export{U as default};
