import{d as f,e as b,a4 as g,h,o as r,l,F as y,I as k,i,w as p,q as x,n as L,H as d,p as w,k as T,ag as B,t as z}from"./index-9e09c995.js";function C(o){return Object.entries(o??{}).map(([s,a])=>({label:s,value:a}))}const R={class:"tag-list"},j=f({__name:"TagList",props:{tags:{type:Object,required:!0}},setup(o){const s=b(),a=g(),n=o,m=h(()=>(Array.isArray(n.tags)?n.tags:C(n.tags)).map(u=>{const{label:t,value:c}=u,v=_(u);return{label:t,value:c,route:v}}));function _(e){if(e.value!=="*")try{switch(e.label){case"kuma.io/zone":return a.resolve({name:"zone-cp-detail-view",params:{zone:e.value}});case"kuma.io/service":return"mesh"in s.params?a.resolve({name:"service-detail-view",params:{mesh:s.params.mesh,service:e.value}}):void 0;default:return}}catch{return}}return(e,u)=>(r(),l("span",R,[(r(!0),l(y,null,k(m.value,(t,c)=>(r(),i(T(B),{key:c,class:"tag-badge"},{default:p(()=>[(r(),i(x(t.route?"router-link":"span"),{to:t.route},{default:p(()=>[L(d(t.label)+":",1),w("b",null,d(t.value),1)]),_:2},1032,["to"]))]),_:2},1024))),128))]))}});const A=z(j,[["__scopeId","data-v-94e5d380"]]);export{A as T};
