import{d as c,I as n,c as s,o as a,a as u,w as p,b as d,t as g,e as f,n as m,r as h,p as y,f as v,g as k,s as b}from"./index-vd7wH-Zb.js";const N=e=>(y("data-v-f4631730"),e=e(),v(),e),S=["aria-hidden"],w={key:0,"data-testid":"kui-icon-svg-title"},x=N(()=>k("path",{d:"M9.7 18.025L4 12.325L5.425 10.9L9.7 15.175L18.875 6L20.3 7.425L9.7 18.025Z",fill:"currentColor"},null,-1)),z=c({__name:"CheckIcon",props:{title:{type:String,required:!1,default:""},color:{type:String,required:!1,default:"currentColor"},display:{type:String,required:!1,default:"block"},decorative:{type:Boolean,required:!1,default:!1},size:{type:[Number,String],required:!1,default:n,validator:e=>{if(typeof e=="number"&&e>0)return!0;if(typeof e=="string"){const t=String(e).replace(/px/gi,""),i=Number(t);if(i&&!isNaN(i)&&Number.isInteger(i)&&i>0)return!0}return!1}},as:{type:String,required:!1,default:"span"}},setup(e){const t=e,i=s(()=>{if(typeof t.size=="number"&&t.size>0)return`${t.size}px`;if(typeof t.size=="string"){const o=String(t.size).replace(/px/gi,""),r=Number(o);if(r&&!isNaN(r)&&Number.isInteger(r)&&r>0)return`${r}px`}return n}),l=s(()=>({boxSizing:"border-box",color:t.color,display:t.display,height:i.value,lineHeight:"0",width:i.value}));return(o,r)=>(a(),u(h(e.as),{"aria-hidden":e.decorative?"true":void 0,class:"kui-icon check-icon","data-testid":"kui-icon-wrapper-check-icon",style:m(l.value)},{default:p(()=>[(a(),d("svg",{"aria-hidden":e.decorative?"true":void 0,"data-testid":"kui-icon-svg-check-icon",fill:"none",height:"100%",role:"img",viewBox:"0 0 24 24",width:"100%",xmlns:"http://www.w3.org/2000/svg"},[e.title?(a(),d("title",w,g(e.title),1)):f("",!0),x],8,S))]),_:1},8,["aria-hidden","style"]))}}),C=b(z,[["__scopeId","data-v-f4631730"]]);export{C as m};
