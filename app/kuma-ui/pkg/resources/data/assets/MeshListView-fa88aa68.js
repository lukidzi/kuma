import{d as b,u as w,r as s,v as k,o as D,j as E,i as x,g as A,e as T,M as f}from"./index-574d45b5.js";import{D as M}from"./DataOverview-f8ab0be8.js";import{b as N,u as S}from"./index-58b06467.js";import{Q as V}from"./QueryParameter-70743f73.js";import"./kongponents.es-3b634060.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-0e5f40af.js";import"./ErrorBlock-c529b0a4.js";import"./_plugin-vue_export-helper-c27b6911.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang-c65e601c.js";import"./datadogLogEvents-302eea7b.js";import"./TagList-913f985e.js";import"./StatusBadge-08e76456.js";const L={class:"kcard-stack"},z={class:"kcard-border"},K=b({__name:"MeshListView",props:{selectedMeshName:{type:[String,null],required:!1,default:null},offset:{type:Number,required:!1,default:0}},setup(v){const i=v,u=N(),h=S(),g={title:u.t("meshes.list.emptyState.title"),message:u.t("meshes.list.emptyState.message")},m=w(),o=s(!0),l=s(null),r=s({headers:[{label:"Name",key:"entity"}],data:[]}),c=s(null),p=s(i.offset);k(()=>m.params.mesh,function(){m.name==="mesh-list-view"&&n(0)}),_();function _(){n(i.offset)}async function n(e){p.value=e,V.set("offset",e>0?e:null),o.value=!0,l.value=null;const a=f;try{const{items:t,next:d}=await h.getAllMeshes({size:a,offset:e});c.value=d,r.value.data=y(t??[])}catch(t){r.value.data=[],t instanceof Error?l.value=t:console.error(t)}finally{o.value=!1}}function y(e){return e.map(a=>{const{name:t}=a;return{entity:a,detailViewRoute:{name:"mesh-detail-view",params:{mesh:t}}}})}return(e,a)=>(D(),E("div",L,[x("div",z,[A(M,{"page-size":T(f),"is-loading":o.value,error:l.value,"empty-state":g,"table-data":r.value,"table-data-is-empty":r.value.data.length===0,next:c.value,"page-offset":p.value,onLoadData:n},null,8,["page-size","is-loading","error","table-data","table-data-is-empty","next","page-offset"])])]))}});export{K as default};
