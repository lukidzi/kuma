import{d as X,j as b,F as T,a2 as q,e as a,o as v,c as I,a as i,w as s,l as p,b as u,t as R,r as S}from"./index-Dx_kP1mI.js";const F=X({__name:"ResourceCodeBlock",props:{resource:{},codeMaxHeight:{default:void 0},isSearchable:{type:Boolean,default:!1},query:{default:""},isFilterMode:{type:Boolean,default:!1},isRegExpMode:{type:Boolean,default:!1}},emits:["query-change","filter-mode-change","reg-exp-mode-change"],setup(f,{emit:y}){const{t:c}=b(),n=f,l=y,g=T(()=>d(n.resource));function d(t){return"creationTime"in t&&delete t.creationTime,"modificationTime"in t&&delete t.modificationTime,q.stringify(t)}return(t,o)=>{const h=a("XIcon"),C=a("KCodeBlockIconButton"),x=a("XCopyButton"),B=a("XDisclosure"),_=a("XCodeBlock");return v(),I("div",null,[i(_,{language:"yaml",code:g.value,"is-searchable":n.isSearchable,"code-max-height":n.codeMaxHeight,query:n.query,"is-filter-mode":n.isFilterMode,"is-reg-exp-mode":n.isRegExpMode,onQueryChange:o[0]||(o[0]=e=>l("query-change",e)),onFilterModeChange:o[1]||(o[1]=e=>l("filter-mode-change",e)),onRegExpModeChange:o[2]||(o[2]=e=>l("reg-exp-mode-change",e))},{"secondary-actions":s(()=>[i(B,null,{default:s(({expanded:e,toggle:m})=>[i(C,{"copy-tooltip":p(c)("common.copyKubernetesText"),theme:"dark",onClick:()=>{e||m()}},{default:s(()=>[i(h,{name:"copy"}),u(R(p(c)("common.copyKubernetesShortText")),1)]),_:2},1032,["copy-tooltip","onClick"]),o[3]||(o[3]=u()),i(x,{format:"hidden"},{default:s(({copy:k})=>[S(t.$slots,"default",{copy:M=>{e&&m(),M(r=>k(d(r)),r=>console.error(r))},copying:e})]),_:2},1024)]),_:3})]),_:3},8,["code","is-searchable","code-max-height","query","is-filter-mode","is-reg-exp-mode"])])}}});export{F as _};
