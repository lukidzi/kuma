import{_ as P}from"./PolicySummary.vue_vue_type_script_setup_true_lang-BAZ1Moc8.js";import{_ as T}from"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-Du4Gf9y3.js";import{d as v,e as t,o as s,m as l,w as o,a as p,k as y,t as u,b as f,c as D,H as $,J as b,p as h,q as A}from"./index-Dx_kP1mI.js";const B=v({__name:"PolicySummaryView",props:{items:{},policyType:{}},setup(g){const i=g;return(M,c)=>{const C=t("XEmptyState"),x=t("RouteTitle"),w=t("XAction"),E=t("DataSource"),S=t("AppView"),V=t("DataCollection"),R=t("RouteView");return s(),l(R,{name:"policy-summary-view",params:{mesh:"",policyPath:"",policy:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:o(({route:e,t:m})=>[p(V,{items:i.items,predicate:r=>r.id===e.params.policy,find:!0},{empty:o(()=>[p(C,null,{title:o(()=>[y("h2",null,u(m("common.collection.summary.empty_title",{type:i.policyType.name})),1)]),default:o(()=>[c[0]||(c[0]=f()),y("p",null,u(m("common.collection.summary.empty_message",{type:i.policyType.name})),1)]),_:2},1024)]),default:o(({items:r})=>[(s(!0),D($,null,b([r[0]],n=>(s(),l(S,{key:n.id},{title:o(()=>[y("h2",null,[p(w,{to:{name:"policy-detail-view",params:{mesh:e.params.mesh,policyPath:e.params.policyPath,policy:e.params.policy}}},{default:o(()=>[p(x,{title:m("policies.routes.item.title",{name:n.name})},null,8,["title"])]),_:2},1032,["to"])])]),default:o(()=>[c[1]||(c[1]=f()),n?(s(),l(P,{key:0,policy:n},{default:o(()=>[p(T,{resource:n.config,"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:a=>e.update({codeSearch:a}),onFilterModeChange:a=>e.update({codeFilter:a}),onRegExpModeChange:a=>e.update({codeRegExp:a})},{default:o(({copy:a,copying:k})=>[k?(s(),l(E,{key:0,src:`/meshes/${e.params.mesh}/policy-path/${e.params.policyPath}/policy/${e.params.policy}/as/kubernetes?no-store`,onChange:d=>{a(_=>_(d))},onError:d=>{a((_,F)=>F(d))}},null,8,["src","onChange","onError"])):h("",!0)]),_:2},1032,["resource","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1032,["policy"])):h("",!0)]),_:2},1024))),128))]),_:2},1032,["items","predicate"])]),_:1})}}}),Q=A(B,[["__scopeId","data-v-a4c6b92f"]]);export{Q as default};
