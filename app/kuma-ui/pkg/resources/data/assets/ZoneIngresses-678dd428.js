import{d as R,k as U,l as j,h as G,r as o,m as H,n as K,s as W,t as X,o as l,c as v,u as b,j as f,f as d,a as u,w as a,e as I,_ as Y,y as N,P as O,z,F as q,A as C,C as J,D as ee}from"./index-5f1fbf13.js";import{_ as se}from"./MultizoneInfo.vue_vue_type_script_setup_true_lang-4c70e09e.js";import{D as ae}from"./DataOverview-bb21a126.js";import{E as k}from"./EnvoyData-f83c79b3.js";import{_ as te}from"./LabelList.vue_vue_type_style_index_0_lang-b2669f10.js";import{_ as ne,S as re}from"./SubscriptionHeader.vue_vue_type_script_setup_true_lang-e1a40d90.js";import{T as oe}from"./TabsWidget-04238cbf.js";import{Q as B}from"./QueryParameter-70743f73.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-e38c62d0.js";import"./ErrorBlock-7fdfff5d.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang-48d7a99c.js";import"./TagList-da3971ac.js";import"./StatusBadge-a0fac783.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-e910dc2a.js";const le={class:"zoneingresses"},ie={key:1,class:"kcard-stack"},ue={class:"kcard-border"},ce={class:"kcard-border"},de={class:"entity-heading"},De=R({__name:"ZoneIngresses",props:{selectedZoneIngressName:{type:String,required:!1,default:null},offset:{type:Number,required:!1,default:0}},setup(L){const p=L,w=U(),V={title:"No Data",message:"There are no Zone Ingresses present."},F=[{hash:"#overview",title:"Overview"},{hash:"#insights",title:"Zone Ingress Insights"},{hash:"#xds-configuration",title:"XDS Configuration"},{hash:"#envoy-stats",title:"Stats"},{hash:"#envoy-clusters",title:"Clusters"}],y=j(),S=G(),m=o(!0),c=o(!1),g=o(null),h=o({headers:[{label:"Status",key:"status"},{label:"Name",key:"name"}],data:[]}),i=o(null),D=o([]),x=o(null),A=o([]),E=o(p.offset);H(()=>y.params.mesh,function(){y.name==="zoneingresses"&&(m.value=!0,c.value=!1,g.value=null,_(0))}),K(function(){M(p.offset)});function M(s){S.getters["config/getMulticlusterStatus"]&&_(s)}async function _(s){E.value=s,B.set("offset",s>0?s:null),m.value=!0,c.value=!1;const t=y.query.ns||null,r=O;try{const{data:e,next:n}=await P(t,r,s);x.value=n,e.length?(c.value=!1,D.value=e,T({name:p.selectedZoneIngressName??e[0].name}),h.value.data=e.map(Z=>{const{zoneIngressInsight:$={}}=Z,Q=W($);return{...Z,status:Q}})):(h.value.data=[],c.value=!0)}catch(e){e instanceof Error?g.value=e:console.error(e),c.value=!0}finally{m.value=!1}}function T({name:s}){var e;const t=D.value.find(n=>n.name===s),r=((e=t==null?void 0:t.zoneIngressInsight)==null?void 0:e.subscriptions)??[];A.value=Array.from(r).reverse(),i.value=X(t,["type","name"]),B.set("zoneIngress",s)}async function P(s,t,r){if(s)return{data:[await w.getZoneIngressOverview({name:s},{size:t,offset:r})],next:null};{const{items:e,next:n}=await w.getAllZoneIngressOverviews({size:t,offset:r});return{data:e??[],next:n}}}return(s,t)=>{var r;return l(),v("div",le,[b(S).getters["config/getMulticlusterStatus"]===!1?(l(),f(se,{key:0})):(l(),v("div",ie,[d("div",ue,[u(ae,{"selected-entity-name":(r=i.value)==null?void 0:r.name,"page-size":b(O),"is-loading":m.value,error:g.value,"empty-state":V,"table-data":h.value,"table-data-is-empty":c.value,next:x.value,"page-offset":E.value,onTableAction:T,onLoadData:_},{additionalControls:a(()=>[s.$route.query.ns?(l(),f(b(Y),{key:0,class:"back-button",appearance:"primary",icon:"arrowLeft",to:{name:"zoneingresses"}},{default:a(()=>[I(`
              View all
            `)]),_:1})):N("",!0)]),_:1},8,["selected-entity-name","page-size","is-loading","error","table-data","table-data-is-empty","next","page-offset"])]),I(),d("div",ce,[c.value===!1&&i.value!==null?(l(),f(oe,{key:0,"has-error":g.value!==null,"is-loading":m.value,tabs:F},{tabHeader:a(()=>[d("h1",de,`
              Zone Ingress: `+z(i.value.name),1)]),overview:a(()=>[u(te,null,{default:a(()=>[d("div",null,[d("ul",null,[(l(!0),v(q,null,C(i.value,(e,n)=>(l(),v("li",{key:n},[d("h4",null,z(n),1),I(),d("p",null,z(e),1)]))),128))])])]),_:1})]),insights:a(()=>[u(ee,{"initially-open":0},{default:a(()=>[(l(!0),v(q,null,C(A.value,(e,n)=>(l(),f(J,{key:n},{"accordion-header":a(()=>[u(ne,{details:e},null,8,["details"])]),"accordion-content":a(()=>[u(re,{details:e,"is-discovery-subscription":""},null,8,["details"])]),_:2},1024))),128))]),_:1})]),"xds-configuration":a(()=>[u(k,{"data-path":"xds","zone-ingress-name":i.value.name,"query-key":"envoy-data-zone-ingress"},null,8,["zone-ingress-name"])]),"envoy-stats":a(()=>[u(k,{"data-path":"stats","zone-ingress-name":i.value.name,"query-key":"envoy-data-zone-ingress"},null,8,["zone-ingress-name"])]),"envoy-clusters":a(()=>[u(k,{"data-path":"clusters","zone-ingress-name":i.value.name,"query-key":"envoy-data-zone-ingress"},null,8,["zone-ingress-name"])]),_:1},8,["has-error","is-loading"])):N("",!0)])]))])}}});export{De as default};
