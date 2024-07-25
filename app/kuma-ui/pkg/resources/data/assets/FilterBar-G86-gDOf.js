var Y=Object.defineProperty;var Z=(e,t,i)=>t in e?Y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var k=(e,t,i)=>Z(e,typeof t!="symbol"?t+"":t,i);import{d as D,W as $,M as _,o as u,m as G,w as j,c as f,t as y,p as N,X as Q,E as X,H as P,I as E,k as a,Y as J,af as ee,v as b,a6 as te,a5 as ie,az as re,r as se,b as C,a0 as oe,e as h,l as x,aA as ne,K as M,a as ae,aB as le,aC as ue,n as q,F as ce,G as de,q as fe}from"./index-JFoySG5Y.js";const ge=e=>(P("data-v-72dec7c8"),e=e(),E(),e),pe=["aria-hidden"],he={key:0,"data-testid":"kui-icon-svg-title"},me=ge(()=>a("path",{d:"M9.4 18L8 16.6L12.6 12L8 7.4L9.4 6L15.4 12L9.4 18Z",fill:"currentColor"},null,-1)),ve=D({__name:"ChevronRightIcon",props:{title:{type:String,required:!1,default:""},color:{type:String,required:!1,default:"currentColor"},display:{type:String,required:!1,default:"block"},decorative:{type:Boolean,required:!1,default:!1},size:{type:[Number,String],required:!1,default:$,validator:e=>{if(typeof e=="number"&&e>0)return!0;if(typeof e=="string"){const t=String(e).replace(/px/gi,""),i=Number(t);if(i&&!isNaN(i)&&Number.isInteger(i)&&i>0)return!0}return!1}},as:{type:String,required:!1,default:"span"}},setup(e){const t=e,i=_(()=>{if(typeof t.size=="number"&&t.size>0)return`${t.size}px`;if(typeof t.size=="string"){const c=String(t.size).replace(/px/gi,""),n=Number(c);if(n&&!isNaN(n)&&Number.isInteger(n)&&n>0)return`${n}px`}return $}),g=_(()=>({boxSizing:"border-box",color:t.color,display:t.display,flexShrink:"0",height:i.value,lineHeight:"0",width:i.value}));return(c,n)=>(u(),G(X(e.as),{"aria-hidden":e.decorative?"true":void 0,class:"kui-icon chevron-right-icon","data-testid":"kui-icon-wrapper-chevron-right-icon",style:Q(g.value)},{default:j(()=>[(u(),f("svg",{"aria-hidden":e.decorative?"true":void 0,"data-testid":"kui-icon-svg-chevron-right-icon",fill:"none",height:"100%",role:"img",viewBox:"0 0 24 24",width:"100%",xmlns:"http://www.w3.org/2000/svg"},[e.title?(u(),f("title",he,y(e.title),1)):N("",!0),me],8,pe))]),_:1},8,["aria-hidden","style"]))}}),be=J(ve,[["__scopeId","data-v-72dec7c8"]]),ye=["ControlLeft","ControlRight","ShiftLeft","ShiftRight","AltLeft"];class Se{constructor(t,i){k(this,"commands");k(this,"keyMap");k(this,"boundTriggerShortcuts");this.commands=i,this.keyMap=Object.fromEntries(Object.entries(t).map(([g,c])=>[g.toLowerCase(),c])),this.boundTriggerShortcuts=this.triggerShortcuts.bind(this)}registerListener(){document.addEventListener("keydown",this.boundTriggerShortcuts)}unRegisterListener(){document.removeEventListener("keydown",this.boundTriggerShortcuts)}triggerShortcuts(t){_e(t,this.keyMap,this.commands)}}function _e(e,t,i){const g=we(e.code),c=[e.ctrlKey?"ctrl":"",e.shiftKey?"shift":"",e.altKey?"alt":"",g].filter(S=>S!=="").join("+"),n=t[c];if(!n)return;const p=i[n];p.isAllowedContext&&!p.isAllowedContext(e)||(p.shouldPreventDefaultAction&&e.preventDefault(),!(p.isDisabled&&p.isDisabled())&&p.trigger(e))}function we(e){return ye.includes(e)?"":e.replace(/^Key/,"").toLowerCase()}const ke=e=>(P("data-v-2016eda0"),e=e(),E(),e),xe=ke(()=>a("span",{class:"visually-hidden"},"Focus filter",-1)),Ie={class:"filter-bar-icon"},Ce=["for"],Ne=["id","placeholder"],Fe={key:0,class:"suggestion-box","data-testid":"filter-bar-suggestion-box"},Le={class:"suggestion-list"},Te={key:0,class:"filter-bar-error"},ze={key:0},Ae=["title","data-filter-field"],Be={class:"visually-hidden"},$e=D({__name:"FilterBar",props:{fields:{},placeholder:{default:""},query:{default:""},id:{default:()=>ee("filter-bar")}},emits:["change"],setup(e,{emit:t}){const i=e,g=b(),c=t,n=r=>{r!=null&&r.target&&(c("change",new FormData(r.target)),m.value=!1)},p=r=>{c("change",new FormData(g.value))},S=b(null),d=b(null),F=b(null),m=b(!1),v=b(i.query);te(()=>i.query,r=>{v.value=r});const w=b(0),L=_(()=>Object.keys(i.fields)),T=_(()=>Object.entries(i.fields).slice(0,5).map(([r,s])=>({fieldName:r,...s}))),z=_(()=>L.value.length>0?`Filter by ${L.value.join(", ")}`:"Filter"),K=_(()=>i.placeholder??z.value),O={ArrowDown:"jumpToNextSuggestion",ArrowUp:"jumpToPreviousSuggestion"},R={jumpToNextSuggestion:{trigger:()=>B(1),isAllowedContext(r){return d.value!==null&&r.composedPath().includes(d.value)},shouldPreventDefaultAction:!0},jumpToPreviousSuggestion:{trigger:()=>B(-1),isAllowedContext(r){return d.value!==null&&r.composedPath().includes(d.value)},shouldPreventDefaultAction:!0}},A=new Se(O,R);ie(function(){A.registerListener()}),re(function(){A.unRegisterListener()});function B(r){const s=T.value.length;let l=w.value+r;l===-1&&(l=s),w.value=l%(s+1)}function H(){d.value instanceof HTMLInputElement&&d.value.focus()}function V(r){const l=r.currentTarget.getAttribute("data-filter-field");l&&d.value instanceof HTMLInputElement&&U(d.value,l)}function U(r,s){const l=v.value===""||v.value.endsWith(" ")?"":" ";v.value+=l+s+":",r.focus(),w.value=0}function W(r){r.relatedTarget===null&&(m.value=!1),S.value instanceof HTMLElement&&r.relatedTarget instanceof Node&&!S.value.contains(r.relatedTarget)&&(m.value=!1)}return(r,s)=>{const l=se("search");return u(),f("div",{ref_key:"filterBar",ref:S,class:"filter-bar","data-testid":"filter-bar"},[C(l,null,{default:j(()=>[a("form",{ref_key:"$form",ref:g,onSubmit:oe(n,["prevent"])},[a("button",{class:"focus-filter-input-button",title:"Focus filter",type:"button","data-testid":"filter-bar-focus-filter-input-button",onClick:H},[xe,h(),a("span",Ie,[C(x(ne),{decorative:"","data-testid":"filter-bar-filter-icon","hide-title":"",size:x(M)},null,8,["size"])])]),h(),a("label",{for:`${i.id}-filter-bar-input`,class:"visually-hidden"},[ae(r.$slots,"default",{},()=>[h(y(z.value),1)],!0)],8,Ce),h(),le(a("input",{id:`${i.id}-filter-bar-input`,ref_key:"filterInput",ref:d,"onUpdate:modelValue":s[0]||(s[0]=o=>v.value=o),class:"filter-bar-input",type:"search",placeholder:K.value,"data-testid":"filter-bar-filter-input",name:"s",onFocus:s[1]||(s[1]=o=>m.value=!0),onInput:s[2]||(s[2]=o=>m.value=!0),onBlur:W,onSearch:s[3]||(s[3]=o=>{o.target.value.length===0&&(p(o),m.value=!0)})},null,40,Ne),[[ue,v.value]]),h(),m.value?(u(),f("div",Fe,[a("div",Le,[F.value!==null?(u(),f("p",Te,y(F.value.message),1)):(u(),f("button",{key:1,type:"submit",class:q(["submit-query-button",{"submit-query-button-is-selected":w.value===0}]),"data-testid":"filter-bar-submit-query-button"},`
              Submit `+y(v.value),3)),h(),(u(!0),f(ce,null,de(T.value,(o,I)=>(u(),f("div",{key:`${i.id}-${I}`,class:q(["suggestion-list-item",{"suggestion-list-item-is-selected":w.value===I+1}])},[a("b",null,y(o.fieldName),1),o.description!==""?(u(),f("span",ze,": "+y(o.description),1)):N("",!0),h(),a("button",{class:"apply-suggestion-button",title:`Add ${o.fieldName}:`,type:"button","data-filter-field":o.fieldName,"data-testid":"filter-bar-apply-suggestion-button",onClick:V},[a("span",Be,"Add "+y(o.fieldName)+":",1),h(),C(x(be),{decorative:"","hide-title":"",size:x(M)},null,8,["size"])],8,Ae)],2))),128))])])):N("",!0)],544)]),_:3})],512)}}}),De=fe($e,[["__scopeId","data-v-2016eda0"]]);export{De as F};
