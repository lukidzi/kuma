import{d as p,ab as y,x as o,H as A,o as l,c,m as h,a as s,e as O,b,w as x,s as I,ac as $,n as B,_ as f,a9 as C}from"./index-U3igbuyl.js";const E=["aria-expanded"],L={key:0,class:"accordion-item-content","data-testid":"accordion-item-content"},N=p({__name:"AccordionItem",setup(r){const e=y("parentAccordion"),t=o(null),n=A(()=>e===void 0?!1:e.multipleOpen&&Array.isArray(e.active.value)&&t.value!==null?e.active.value.includes(t.value):t.value===e.active.value);e!==void 0&&(t.value=e.count.value++);function i(){n.value?u():m()}function u(){e!==void 0&&(e.multipleOpen&&Array.isArray(e.active.value)&&t.value!==null?e.active.value.splice(e.active.value.indexOf(t.value),1):e.active.value=null)}function m(){e!==void 0&&(e.multipleOpen&&Array.isArray(e.active.value)&&t.value!==null?e.active.value.push(t.value):e.active.value=t.value)}function d(a){a instanceof HTMLElement&&(a.style.height=`${a.scrollHeight}px`)}function _(a){a instanceof HTMLElement&&(a.style.height="auto")}return(a,v)=>(l(),c("li",{class:B(["accordion-item",{active:n.value}])},[h("button",{class:"accordion-item-header",type:"button","aria-expanded":n.value?"true":"false","data-testid":"accordion-item-button",onClick:i},[s(a.$slots,"accordion-header",{},void 0,!0)],8,E),v[0]||(v[0]=O()),b($,{name:"accordion",onEnter:d,onAfterEnter:_,onBeforeLeave:d},{default:x(()=>[n.value?(l(),c("div",L,[s(a.$slots,"accordion-content",{},void 0,!0)])):I("",!0)]),_:3})],2))}}),V=f(N,[["__scopeId","data-v-53a0b6ce"]]),k={class:"accordion-list"},H=p({__name:"AccordionList",props:{initiallyOpen:{type:[Number,Array],required:!1,default:null},multipleOpen:{type:Boolean,required:!1,default:!1}},setup(r){const e=r,t=o(0),n=o(e.initiallyOpen!==null?e.initiallyOpen:e.multipleOpen?[]:null);return C("parentAccordion",{multipleOpen:e.multipleOpen,active:n,count:t}),(i,u)=>(l(),c("ul",k,[s(i.$slots,"default",{},void 0,!0)]))}}),g=f(H,[["__scopeId","data-v-bdbadd5e"]]);export{g as A,V as a};