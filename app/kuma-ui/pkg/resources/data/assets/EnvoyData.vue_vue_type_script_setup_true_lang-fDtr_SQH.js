import{d as y,a as p,o as n,c as _,e as i,w as l,E as k,b as t,A as x,a2 as C,a4 as B,p as h,f as E}from"./index-VS3FVx2q.js";import{C as q}from"./CodeBlock-OxYcIgo-.js";const D=y({__name:"EnvoyData",props:{resource:{},src:{},query:{default:""},isFilterMode:{type:Boolean,default:!1},isRegExpMode:{type:Boolean,default:!1}},emits:["query-change","filter-mode-change","reg-exp-mode-change"],setup(m,{emit:u}){const s=m,a=u;return(M,e)=>{const d=p("KButton"),f=p("DataSource");return n(),_("div",null,[i(f,{src:s.src},{default:l(({data:o,error:c,refresh:g})=>[c?(n(),t(k,{key:0,error:c},null,8,["error"])):o===void 0?(n(),t(x,{key:1})):o===""?(n(),t(C,{key:2})):(n(),t(q,{key:3,language:"json",code:typeof o=="string"?o:JSON.stringify(o,null,2),"is-searchable":"",query:s.query,"is-filter-mode":s.isFilterMode,"is-reg-exp-mode":s.isRegExpMode,onQueryChange:e[0]||(e[0]=r=>a("query-change",r)),onFilterModeChange:e[1]||(e[1]=r=>a("filter-mode-change",r)),onRegExpModeChange:e[2]||(e[2]=r=>a("reg-exp-mode-change",r))},{"primary-actions":l(()=>[i(d,{appearance:"primary",onClick:g},{default:l(()=>[i(h(B)),E(`

            Refresh
          `)]),_:2},1032,["onClick"])]),_:2},1032,["code","query","is-filter-mode","is-reg-exp-mode"]))]),_:1},8,["src"])])}}});export{D as _};
