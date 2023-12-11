import{d as v,l as V,m as S,a as l,o as a,c,e as t,q as f,ax as b,f as n,w as s,b as p,F as E,I as F,t as P,ar as q,u as B,p as w}from"./index-364a2367.js";import{_ as L}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-3f5123fb.js";import{E as $}from"./ErrorBlock-470e75db.js";import{_ as R}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-99252db2.js";import{_ as N}from"./ResourceCodeBlock.vue_vue_type_style_index_0_lang-260d2682.js";import{T}from"./TextWithCopyButton-331646e6.js";import"./index-fce48c05.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-0e53d9b2.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-2e327125.js";import"./CopyButton-0c187074.js";import"./toYaml-4e00099e.js";const A={key:3,"data-testid":"affected-data-plane-proxies"},M=v({__name:"PolicyConnections",props:{mesh:{type:String,required:!0},policyPath:{type:String,required:!0},policyName:{type:String,required:!0}},setup(g){const{t:_}=V(),m=g,d=S("");return(x,u)=>{const y=l("RouterLink");return a(),c("div",null,[t(f(b),{id:"dataplane-search",modelValue:d.value,"onUpdate:modelValue":u[0]||(u[0]=o=>d.value=o),type:"text",placeholder:f(_)("policies.detail.dataplane_input_placeholder"),required:"","data-testid":"dataplane-search-input"},null,8,["modelValue","placeholder"]),n(),t(q,{src:`/meshes/${m.mesh}/policy-path/${m.policyPath}/policy/${m.policyName}/dataplanes`},{default:s(({data:o,error:h})=>[h?(a(),p($,{key:0,error:h},null,8,["error"])):o===void 0?(a(),p(R,{key:1})):o.items.length===0?(a(),p(L,{key:2})):(a(),c("ul",A,[(a(!0),c(E,null,F(o.items.filter(e=>e.name.toLowerCase().includes(d.value.toLowerCase())),(e,r)=>(a(),c("li",{key:r,"data-testid":"dataplane-name"},[t(y,{to:{name:"data-plane-detail-view",params:{mesh:e.mesh,dataPlane:e.name}}},{default:s(()=>[n(P(e.name),1)]),_:2},1032,["to"])]))),128))]))]),_:1},8,["src"])])}}}),I={key:2,class:"stack","data-testid":"detail-view-details"},X=v({__name:"PolicyDetailView",setup(g){const _=B();return(m,d)=>{const x=l("RouteTitle"),u=l("KCard"),y=l("DataSource"),o=l("AppView"),h=l("RouteView");return a(),p(h,{name:"policy-detail-view",params:{mesh:"",policy:"",policyPath:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:s(({route:e,t:r})=>[t(o,{breadcrumbs:[{to:{name:"mesh-detail-view",params:{mesh:e.params.mesh}},text:e.params.mesh},{to:{name:"policy-list-view",params:{mesh:e.params.mesh,policyPath:e.params.policyPath}},text:r("policies.routes.item.breadcrumbs")}]},{title:s(()=>[w("h1",null,[t(T,{text:e.params.policy},{default:s(()=>[t(x,{title:r("policies.routes.item.title",{name:e.params.policy})},null,8,["title"])]),_:2},1032,["text"])])]),default:s(()=>[n(),t(y,{src:`/meshes/${e.params.mesh}/policy-path/${e.params.policyPath}/policy/${e.params.policy}`},{default:s(({data:k,error:C})=>[C?(a(),p($,{key:0,error:C},null,8,["error"])):k===void 0?(a(),p(R,{key:1})):(a(),c("div",I,[t(u,null,{default:s(()=>[w("h2",null,P(r("policies.detail.affected_dpps")),1),n(),t(M,{class:"mt-4",mesh:e.params.mesh,"policy-name":e.params.policy,"policy-path":e.params.policyPath},null,8,["mesh","policy-name","policy-path"])]),_:2},1024),n(),t(N,{id:"code-block-policy",resource:k,"resource-fetcher":i=>f(_).getSinglePolicyEntity({name:e.params.policy,mesh:e.params.mesh,path:e.params.policyPath},i),"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter==="true","is-reg-exp-mode":e.params.codeRegExp==="true",onQueryChange:i=>e.update({codeSearch:i}),onFilterModeChange:i=>e.update({codeFilter:i}),onRegExpModeChange:i=>e.update({codeRegExp:i})},null,8,["resource","resource-fetcher","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]))]),_:2},1032,["src"])]),_:2},1032,["breadcrumbs"])]),_:1})}}});export{X as default};
