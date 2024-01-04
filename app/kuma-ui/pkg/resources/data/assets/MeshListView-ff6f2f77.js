import{K as z}from"./index-fce48c05.js";import{d as b,a as n,o as i,b as l,w as s,e as m,p as y,f as p,t as r,q as g,R,D as x,s as f,_ as S}from"./index-e5aa0c15.js";import{A as B}from"./AppCollection-f39e374e.js";import{E as D}from"./ErrorBlock-81d576c6.js";import{S as I}from"./SummaryView-83c42fd4.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-e8c0123c.js";import"./TextWithCopyButton-a30e2023.js";import"./CopyButton-f402d0b6.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-1f206a29.js";const L={class:"stack"},N=b({__name:"MeshListView",setup(T){return(A,K)=>{const w=n("RouteTitle"),_=n("RouterLink"),k=n("KCard"),v=n("RouterView"),C=n("AppView"),d=n("DataSource"),V=n("RouteView");return i(),l(d,{src:"/me"},{default:s(({data:h})=>[h?(i(),l(V,{key:0,name:"mesh-list-view",params:{page:1,size:h.pageSize,mesh:""}},{default:s(({route:e,t:o})=>[m(d,{src:`/mesh-insights?page=${e.params.page}&size=${e.params.size}`},{default:s(({data:t,error:c})=>[m(C,null,{title:s(()=>[y("h1",null,[m(w,{title:o("meshes.routes.items.title")},null,8,["title"])])]),default:s(()=>[p(),y("div",L,[m(k,null,{default:s(()=>[c!==void 0?(i(),l(D,{key:0,error:c},null,8,["error"])):(i(),l(B,{key:1,class:"mesh-collection","data-testid":"mesh-collection",headers:[{label:o("meshes.common.name"),key:"name"},{label:o("meshes.routes.items.collection.services"),key:"services"},{label:o("meshes.routes.items.collection.dataplanes"),key:"dataplanes"},{label:"Details",key:"details",hideLabel:!0}],"page-number":parseInt(e.params.page),"page-size":parseInt(e.params.size),total:t==null?void 0:t.total,items:t==null?void 0:t.items,error:c,"empty-state-message":o("common.emptyState.message",{type:"Meshes"}),"empty-state-cta-to":o("meshes.href.docs"),"empty-state-cta-text":o("common.documentation"),"is-selected-row":a=>a.name===e.params.mesh,onChange:e.update},{name:s(({row:a})=>[m(_,{to:{name:"mesh-detail-view",params:{mesh:a.name},query:{page:e.params.page,size:e.params.size}}},{default:s(()=>[p(r(a.name),1)]),_:2},1032,["to"])]),services:s(({row:a})=>[p(r(a.services.internal),1)]),dataplanes:s(({row:a})=>[p(r(a.dataplanesByType.standard.online)+" / "+r(a.dataplanesByType.standard.total),1)]),details:s(({row:a})=>[m(_,{class:"details-link","data-testid":"details-link",to:{name:"mesh-detail-view",params:{mesh:a.name}}},{default:s(()=>[p(r(o("common.collection.details_link"))+" ",1),m(g(R),{display:"inline-block",decorative:"",size:g(z)},null,8,["size"])]),_:2},1032,["to"])]),_:2},1032,["headers","page-number","page-size","total","items","error","empty-state-message","empty-state-cta-to","empty-state-cta-text","is-selected-row","onChange"]))]),_:2},1024),p(),e.params.mesh?(i(),l(v,{key:0},{default:s(a=>[m(I,{onClose:u=>e.replace({name:"mesh-list-view",params:{mesh:e.params.mesh},query:{page:e.params.page,size:e.params.size}})},{default:s(()=>[(i(),l(x(a.Component),{name:e.params.mesh,"mesh-insight":t==null?void 0:t.items.find(u=>u.name===e.params.mesh)},null,8,["name","mesh-insight"]))]),_:2},1032,["onClose"])]),_:2},1024)):f("",!0)])]),_:2},1024)]),_:2},1032,["src"])]),_:2},1032,["params"])):f("",!0)]),_:1})}}});const G=S(N,[["__scopeId","data-v-97a2ac6b"]]);export{G as default};
