import{d as I,k as g,T as k,a as l,o as c,b as p,w as t,e as _,m as r,f as m,t as f,l as y,c as x,B as R,v as S,x as N,a1 as B,_ as C}from"./index-bbd71513.js";import{_ as D}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-6ca86ba2.js";import{N as P}from"./NavTabs-0fb989a6.js";const T=a=>(S("data-v-1fc90608"),a=a(),N(),a),A={class:"summary-title-wrapper"},$=T(()=>r("img",{"aria-hidden":"true",src:B},null,-1)),E={class:"summary-title"},j={key:1,class:"stack"},q=I({__name:"DataPlaneInboundSummaryView",props:{data:{}},setup(a){var w;const{t:i}=g(),h=k(),v=a,V=(((w=h.getRoutes().find(e=>e.name==="data-plane-inbound-summary-view"))==null?void 0:w.children)??[]).map(e=>{var n,s;const u=typeof e.name>"u"?(n=e.children)==null?void 0:n[0]:e,o=u.name,d=((s=u.meta)==null?void 0:s.module)??"";return{title:i(`data-planes.routes.item.navigation.${o}`),routeName:o,module:d}});return(e,u)=>{const o=l("RouterView"),d=l("AppView"),b=l("RouteView");return c(),p(b,{name:"data-plane-inbound-summary-view",params:{service:""}},{default:t(({route:n})=>[_(d,null,{title:t(()=>[r("div",A,[$,m(),r("h2",E,`
            Inbound :`+f(n.params.service),1)])]),default:t(()=>[m(),typeof v.data>"u"?(c(),p(D,{key:0},{message:t(()=>[r("p",null,f(y(i)("common.collection.summary.empty_message",{type:"Inbound"})),1)]),default:t(()=>[m(f(y(i)("common.collection.summary.empty_title",{type:"Inbound"}))+" ",1)]),_:1})):(c(),x("div",j,[_(P,{tabs:y(V)},null,8,["tabs"]),m(),_(o,null,{default:t(s=>[(c(),p(R(s.Component),{data:v.data},null,8,["data"]))]),_:1})]))]),_:2},1024)]),_:1})}}});const J=C(q,[["__scopeId","data-v-1fc90608"]]);export{J as default};
