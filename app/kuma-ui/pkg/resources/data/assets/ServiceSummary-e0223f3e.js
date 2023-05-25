import{z as D}from"./kongponents.es-3b634060.js";import{a as o,D as B}from"./DefinitionListItem-73363cac.js";import{_ as C}from"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-a885226a.js";import{S as P}from"./StatusBadge-08e76456.js";import{T as V}from"./TagList-913f985e.js";import{T as L}from"./TextWithCopyButton-ac5e81f5.js";import{u as N}from"./index-58b06467.js";import{d as j,c,x as A,o as l,b as u,w as s,i as v,h as t,g as i,f as m,t as d,j as h,F as g,e as E}from"./index-574d45b5.js";import{_ as I}from"./_plugin-vue_export-helper-c27b6911.js";const O={class:"entity-section-list"},$={class:"entity-title"},q=j({__name:"ServiceSummary",props:{service:{type:Object,required:!0},externalService:{type:Object,required:!1,default:null}},setup(k){const e=k,f=N(),T=c(()=>({name:"service-detail-view",params:{service:e.service.name,mesh:e.service.mesh}})),p=c(()=>e.service.serviceType==="external"&&e.externalService!==null?e.externalService.networking.address:e.service.addressPort??null),_=c(()=>{var r;return e.service.serviceType==="external"&&e.externalService!==null?(r=e.externalService.networking.tls)!=null&&r.enabled?"Enabled":"Disabled":null}),x=c(()=>{var r,a;if(e.service.serviceType==="external")return null;{const n=((r=e.service.dataplanes)==null?void 0:r.online)??0,w=((a=e.service.dataplanes)==null?void 0:a.total)??0;return`${n} online / ${w} total`}}),y=c(()=>e.service.serviceType==="external"?null:e.service.status??null),S=c(()=>e.service.serviceType==="external"&&e.externalService!==null?e.externalService.tags:null);async function b(r){if(e.service.serviceType==="external"&&e.externalService!==null){const{mesh:a,name:n}=e.externalService;return await f.getExternalService({mesh:a,name:n},r)}else{const{mesh:a,name:n}=e.service;return await f.getServiceInsight({mesh:a,name:n},r)}}return(r,a)=>{const n=A("router-link");return l(),u(E(D),null,{body:s(()=>[v("div",O,[v("section",null,[v("h1",$,[v("span",null,[t(`
              Service:

              `),i(n,{to:T.value},{default:s(()=>[i(L,{text:e.service.name},null,8,["text"])]),_:1},8,["to"])]),t(),y.value?(l(),u(P,{key:0,status:y.value},null,8,["status"])):m("",!0)]),t(),i(B,{class:"mt-4"},{default:s(()=>[i(o,{term:"Mesh"},{default:s(()=>[t(d(e.service.mesh),1)]),_:1}),t(),i(o,{term:"Address"},{default:s(()=>[p.value!==null?(l(),h(g,{key:0},[t(d(p.value),1)],64)):(l(),h(g,{key:1},[t(`
                —
              `)],64))]),_:1}),t(),_.value!==null?(l(),u(o,{key:0,term:"TLS"},{default:s(()=>[t(d(_.value),1)]),_:1})):m("",!0),t(),x.value!==null?(l(),u(o,{key:1,term:"Data Plane Proxies"},{default:s(()=>[t(d(x.value),1)]),_:1})):m("",!0),t(),S.value!==null?(l(),u(o,{key:2,term:"Tags"},{default:s(()=>[i(V,{tags:S.value},null,8,["tags"])]),_:1})):m("",!0)]),_:1})]),t(),i(C,{id:"code-block-service","resource-fetcher":b,"resource-fetcher-watch-key":e.service.name,"is-searchable":"","code-max-height":"250px"},null,8,["resource-fetcher-watch-key"])])]),_:1})}}});const Q=I(q,[["__scopeId","data-v-fa9122dc"]]);export{Q as S};
