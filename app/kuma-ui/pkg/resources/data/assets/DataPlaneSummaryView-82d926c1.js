import{d as D,l as I,M as S,a as m,o as r,c as d,p as i,e as o,w as a,f as t,t as n,q as e,b as v,a1 as V,s as k,a0 as c,F as x,I as z,_ as R,C,y as B,z as $,a4 as K}from"./index-364a2367.js";import{_ as L}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-3f5123fb.js";import{a as N,K as U}from"./index-fce48c05.js";import{g as A,a as E}from"./index-3d038f44.js";import{S as F}from"./StatusBadge-639d9a83.js";import{T}from"./TagList-7a0fabd2.js";import{T as b}from"./TextWithCopyButton-331646e6.js";import"./CopyButton-0c187074.js";const W={class:"stack"},j={class:"stack-with-borders"},q={class:"status-with-reason"},G={key:0},M={class:"mt-4"},Z={class:"stack-with-borders"},H={key:1},J={class:"mt-4"},Q={class:"stack"},X={class:"mt-2 stack-with-borders"},Y=D({__name:"DataPlaneSummary",props:{dataplaneOverview:{}},setup(p){const{t:s,formatIsoDate:g}=I(),l=p,y=S(()=>A(l.dataplaneOverview)),w=S(()=>{const u=E(l.dataplaneOverview);return u!==void 0?g(u):s("common.detail.none")});return(u,O)=>{const f=m("KTooltip"),h=m("KBadge");return r(),d("div",W,[i("div",j,[o(c,{layout:"horizontal"},{title:a(()=>[t(n(e(s)("http.api.property.status")),1)]),body:a(()=>[i("div",q,[o(F,{status:y.value.status},null,8,["status"]),t(),y.value.reason.length>0?(r(),v(f,{key:0,label:y.value.reason.join(", "),class:"reason-tooltip","position-fixed":""},{default:a(()=>[o(e(V),{color:e(N),size:e(U),"hide-title":""},null,8,["color","size"])]),_:1},8,["label"])):k("",!0)])]),_:1}),t(),o(c,{layout:"horizontal"},{title:a(()=>[t(n(e(s)("data-planes.routes.item.last_updated")),1)]),body:a(()=>[w.value?(r(),d(x,{key:0},[t(n(w.value),1)],64)):(r(),d(x,{key:1},[t(n(e(s)("common.detail.none")),1)],64))]),_:1})]),t(),l.dataplaneOverview.dataplane.networking.gateway?(r(),d("div",G,[i("h3",null,n(e(s)("data-planes.routes.item.gateway")),1),t(),i("div",M,[i("div",Z,[o(c,{layout:"horizontal"},{title:a(()=>[t(n(e(s)("http.api.property.tags")),1)]),body:a(()=>[o(T,{alignment:"right",tags:l.dataplaneOverview.dataplane.networking.gateway.tags},null,8,["tags"])]),_:1}),t(),o(c,{layout:"horizontal"},{title:a(()=>[t(n(e(s)("http.api.property.address")),1)]),body:a(()=>[o(b,{text:`${l.dataplaneOverview.dataplane.networking.address}`},null,8,["text"])]),_:1})])])])):k("",!0),t(),l.dataplaneOverview.dataplane.networking.inbound?(r(),d("div",H,[i("h3",null,n(e(s)("data-planes.routes.item.inbounds")),1),t(),i("div",J,[i("div",Q,[(r(!0),d(x,null,z(l.dataplaneOverview.dataplane.networking.inbound,(_,P)=>(r(),d("div",{key:P,class:"inbound"},[i("h4",null,[o(b,{text:_.tags["kuma.io/service"]},{default:a(()=>[t(n(e(s)("data-planes.routes.item.inbound_name",{service:_.tags["kuma.io/service"]})),1)]),_:2},1032,["text"])]),t(),i("div",X,[o(c,{layout:"horizontal"},{title:a(()=>[t(n(e(s)("http.api.property.status")),1)]),body:a(()=>[!_.health||_.health.ready?(r(),v(h,{key:0,appearance:"success"},{default:a(()=>[t(n(e(s)("data-planes.routes.item.health.ready")),1)]),_:1})):(r(),v(h,{key:1,appearance:"danger"},{default:a(()=>[t(n(e(s)("data-planes.routes.item.health.not_ready")),1)]),_:1}))]),_:2},1024),t(),o(c,{layout:"horizontal"},{title:a(()=>[t(n(e(s)("http.api.property.tags")),1)]),body:a(()=>[o(T,{alignment:"right",tags:_.tags},null,8,["tags"])]),_:2},1024),t(),o(c,{layout:"horizontal"},{title:a(()=>[t(n(e(s)("http.api.property.address")),1)]),body:a(()=>[o(b,{text:`${_.address??l.dataplaneOverview.dataplane.networking.advertisedAddress??l.dataplaneOverview.dataplane.networking.address}:${_.port}`},null,8,["text"])]),_:2},1024)])]))),128))])])])):k("",!0)])}}});const tt=R(Y,[["__scopeId","data-v-f1b39a8a"]]),at=p=>(B("data-v-a062a5b1"),p=p(),$(),p),et={class:"summary-title-wrapper"},st=at(()=>i("img",{"aria-hidden":"true",src:K},null,-1)),ot={class:"summary-title"},nt={key:1,class:"stack"},lt=D({__name:"DataPlaneSummaryView",props:{name:{},dataplaneOverview:{default:void 0}},setup(p){const{t:s}=I(),g=C(),l=p;return(y,w)=>{const u=m("RouteTitle"),O=m("RouterLink"),f=m("AppView"),h=m("RouteView");return r(),v(h,{name:e(g).name},{default:a(()=>[o(f,null,{title:a(()=>[i("div",et,[st,t(),i("h2",ot,[o(O,{to:{name:"data-plane-detail-view",params:{dataPlane:l.name}}},{default:a(()=>[o(u,{title:e(s)("data-planes.routes.item.title",{name:l.name})},null,8,["title"])]),_:1},8,["to"])])])]),default:a(()=>[t(),l.dataplaneOverview===void 0?(r(),v(L,{key:0},{message:a(()=>[i("p",null,n(e(s)("common.collection.summary.empty_message",{type:"Data Plane Proxy"})),1)]),default:a(()=>[t(n(e(s)("common.collection.summary.empty_title",{type:"Data Plane Proxy"}))+" ",1)]),_:1})):(r(),d("div",nt,[o(tt,{class:"mt-4","dataplane-overview":l.dataplaneOverview},null,8,["dataplane-overview"])]))]),_:1})]),_:1},8,["name"])}}});const vt=R(lt,[["__scopeId","data-v-a062a5b1"]]);export{vt as default};
