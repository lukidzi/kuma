import{_ as k}from"./CodeBlock.vue_vue_type_style_index_0_lang-e467052f.js";import{C as K}from"./CopyButton-f402d0b6.js";import{d as T,l as q,K as B,m as M,a as g,o as w,b as F,w as i,e as d,q as m,f as h,t as R,r as S}from"./index-e5aa0c15.js";import{t as E}from"./toYaml-4e00099e.js";import{u as Y}from"./uniqueId-90cc9b93.js";const A=T({__name:"ResourceCodeBlock",props:{id:{default:()=>Y("resource-code-block")},resource:{},resourceFetcher:{type:Function,default:void 0},codeMaxHeight:{default:void 0},isSearchable:{type:Boolean,default:!1},query:{default:""},isFilterMode:{type:Boolean,default:!1},isRegExpMode:{type:Boolean,default:!1}},emits:["query-change","filter-mode-change","reg-exp-mode-change"],setup(x,{emit:b}){const{t:l}=q(),t=x,c=b,_=B(()=>f(t.resource)),u=M(()=>{});let p=new Promise((o,e)=>{u.value=r=>r(o,e)});const v=async o=>{let e;try{e=await p}finally{p=new Promise((r,s)=>{u.value=n=>n(r,s)})}return e};async function C(){const o=await(typeof t.resourceFetcher<"u"?t.resourceFetcher({format:"kubernetes"}):v());return f(o)}function f(o){const{creationTime:e,modificationTime:r,...s}=o;return E(s)}return(o,e)=>{const r=g("KTooltip"),s=g("KToggle");return w(),F(s,{toggled:!1},{default:i(({isToggled:n,toggle:y})=>[d(k,{id:o.id,language:"yaml",code:_.value,"is-searchable":t.isSearchable,"code-max-height":t.codeMaxHeight,query:t.query,"is-filter-mode":t.isFilterMode,"is-reg-exp-mode":t.isRegExpMode,onQueryChange:e[0]||(e[0]=a=>c("query-change",a)),onFilterModeChange:e[1]||(e[1]=a=>c("filter-mode-change",a)),onRegExpModeChange:e[2]||(e[2]=a=>c("reg-exp-mode-change",a))},{"secondary-actions":i(()=>[d(r,{class:"kubernetes-copy-button-tooltip",label:m(l)("common.copyKubernetesText"),placement:"bottomEnd","max-width":"200","position-fixed":""},{default:i(()=>[d(K,{class:"kubernetes-copy-button","get-text":C,"copy-text":m(l)("common.copyKubernetesText"),"has-border":"","hide-title":"",onClick:()=>{n.value===!1&&y()}},{default:i(()=>[h(R(m(l)("common.copyKubernetesShortText")),1)]),_:2},1032,["copy-text","onClick"])]),_:2},1032,["label"])]),_:2},1032,["id","code","is-searchable","code-max-height","query","is-filter-mode","is-reg-exp-mode"]),h(),S(o.$slots,"default",{copy:a=>{n.value!==!1&&y(),u.value(a)},copying:n.value})]),_:3})}}});export{A as _};
