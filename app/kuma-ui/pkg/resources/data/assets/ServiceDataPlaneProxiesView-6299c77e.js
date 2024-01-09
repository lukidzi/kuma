import{E as C}from"./ErrorBlock-a09a5c02.js";import{D as S,F as V}from"./FilterBar-3c51fe57.js";import{S as x}from"./SummaryView-e6b381ec.js";import{d as b,a as s,o as i,b as n,w as t,e as o,m as P,f as p,t as z,C as k,p as u,_ as q}from"./index-a963f507.js";import"./index-fce48c05.js";import"./TextWithCopyButton-442c5ee6.js";import"./CopyButton-003985ad.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-0ab8cf0c.js";import"./AppCollection-3309b5c4.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-3297bc03.js";import"./StatusBadge-61c0813f.js";import"./uniqueId-90cc9b93.js";const T=b({__name:"ServiceDataPlaneProxiesView",setup(R){return($,B)=>{const f=s("RouteTitle"),y=s("KSelect"),g=s("KCard"),v=s("RouterView"),m=s("DataSource"),w=s("AppView"),h=s("RouteView");return i(),n(m,{src:"/me"},{default:t(({data:c})=>[c?(i(),n(h,{key:0,name:"service-data-plane-proxies-view",params:{page:1,size:c.pageSize,query:"",dataplaneType:"all",s:"",mesh:"",service:"",dataPlane:""}},{default:t(({route:e,t:d})=>[o(w,null,{title:t(()=>[P("h2",null,[o(f,{title:d("services.routes.item.navigation.service-data-plane-proxies-view")},null,8,["title"])])]),default:t(()=>[p(),o(m,{src:`/meshes/${e.params.mesh}/dataplanes/for/${e.params.service}/of/${e.params.dataplaneType}?page=${e.params.page}&size=${e.params.size}&search=${e.params.s}`},{default:t(({data:r,error:l})=>[o(g,null,{default:t(()=>[l!==void 0?(i(),n(C,{key:0,error:l},null,8,["error"])):(i(),n(S,{key:1,"data-testid":"data-plane-collection","page-number":parseInt(e.params.page),"page-size":parseInt(e.params.size),total:r==null?void 0:r.total,items:r==null?void 0:r.items,error:l,"is-selected-row":a=>a.name===e.params.dataPlane,"summary-route-name":"service-data-plane-summary-view",onChange:e.update},{toolbar:t(()=>[o(V,{class:"data-plane-proxy-filter",placeholder:"tag: 'kuma.io/protocol: http'",query:e.params.query,fields:{name:{description:"filter by name or parts of a name"},protocol:{description:"filter by “kuma.io/protocol” value"},tag:{description:"filter by tags (e.g. “tag: version:2”)"},zone:{description:"filter by “kuma.io/zone” value"}},onFieldsChange:a=>e.update({query:a.query,s:a.query.length>0?JSON.stringify(a.fields):""})},null,8,["placeholder","query","fields","onFieldsChange"]),p(),o(y,{class:"filter-select",label:"Type",items:["all","standard","builtin","delegated"].map(a=>({value:a,label:d(`data-planes.type.${a}`),selected:a===e.params.dataplaneType})),appearance:"select",onSelected:a=>e.update({dataplaneType:String(a.value)})},{"item-template":t(({item:a})=>[p(z(a.label),1)]),_:2},1032,["items","onSelected"])]),_:2},1032,["page-number","page-size","total","items","error","is-selected-row","onChange"]))]),_:2},1024),p(),e.params.dataPlane?(i(),n(v,{key:0},{default:t(a=>[o(x,{onClose:_=>e.replace({name:"service-data-plane-proxies-view",params:{mesh:e.params.mesh},query:{page:e.params.page,size:e.params.size}})},{default:t(()=>[(i(),n(k(a.Component),{name:e.params.dataPlane,"dataplane-overview":r==null?void 0:r.items.find(_=>_.name===e.params.dataPlane)},null,8,["name","dataplane-overview"]))]),_:2},1032,["onClose"])]),_:2},1024)):u("",!0)]),_:2},1032,["src"])]),_:2},1024)]),_:2},1032,["params"])):u("",!0)]),_:1})}}});const M=q(T,[["__scopeId","data-v-22fd7310"]]);export{M as default};
