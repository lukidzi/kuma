import{d as C,g as L,r,o as i,i as _,w as s,j as o,n,H as l,k as e,f as K,l as v,F as z,I as M,Y as O,Z as N,p as m,E as R,$ as T,K as Z,m as b,t as A}from"./index-86e7dfd3.js";import{A as S}from"./AppCollection-5da9e3fd.js";import{S as E}from"./StatusBadge-7b8cfc33.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-23b93b05.js";const D=C({__name:"MeshInsightsList",props:{items:{}},setup(f){const{t}=L(),d=f;return(g,x)=>{var u;const y=r("RouterLink");return i(),_(S,{headers:[{label:e(t)("meshes.components.mesh-insights-list.name"),key:"name"},{label:e(t)("meshes.components.mesh-insights-list.services"),key:"services"},{label:e(t)("meshes.components.mesh-insights-list.dataplanes"),key:"dataplanes"}],items:d.items,total:(u=d.items)==null?void 0:u.length,"empty-state-message":e(t)("common.emptyState.message",{type:e(t)("meshes.common.type",{count:2})}),"empty-state-cta-to":e(t)("meshes.href.docs"),"empty-state-cta-text":e(t)("common.documentation")},{name:s(({row:a})=>[o(y,{to:{name:"mesh-detail-view",params:{mesh:a.name}}},{default:s(()=>[n(l(a.name),1)]),_:2},1032,["to"])]),services:s(({row:a})=>[n(l(a.services.internal??"0"),1)]),dataplanes:s(({row:a})=>[n(l(a.dataplanesByType.standard.online??"0")+" / "+l(a.dataplanesByType.standard.total??"0"),1)]),_:1},8,["headers","items","total","empty-state-message","empty-state-cta-to","empty-state-cta-text"])}}}),F=C({__name:"ZoneControlPlanesList",props:{items:{}},setup(f){const{t}=L(),d=K(),g=f;return(x,y)=>{var a;const u=r("RouterLink");return i(),_(S,{headers:[{label:e(t)("zone-cps.components.zone-control-planes-list.name"),key:"name"},{label:e(t)("zone-cps.components.zone-control-planes-list.status"),key:"status"}],items:g.items,total:(a=g.items)==null?void 0:a.length,"empty-state-title":e(t)("zone-cps.empty_state.title"),"empty-state-message":e(d)("create zones")?e(t)("zone-cps.empty_state.message"):e(t)("common.emptyState.message",{type:"Zones"}),"empty-state-cta-to":e(d)("create zones")?{name:"zone-create-view"}:void 0,"empty-state-cta-text":e(t)("zones.index.create")},{name:s(({row:p})=>[o(u,{to:{name:"zone-cp-detail-view",params:{zone:p.name}}},{default:s(()=>[n(l(p.name),1)]),_:2},1032,["to"])]),status:s(({row:p})=>[(i(!0),v(z,null,M([e(O)(p)],w=>(i(),v(z,{key:w},[w?(i(),_(E,{key:0,status:w},null,8,["status"])):(i(),v(z,{key:1},[n(l(e(t)("common.collection.none")),1)],64))],64))),128))]),_:1},8,["headers","items","total","empty-state-title","empty-state-message","empty-state-cta-to","empty-state-cta-text"])}}}),$={class:"stack","data-testid":"detail-view-details"},P={class:"columns"},j={class:"card-header"},H={class:"card-title"},U={key:0,class:"card-actions"},Y={class:"card-header"},q={class:"card-title"},G=C({__name:"MainOverviewView",setup(f){const t=N();return(d,g)=>{const x=r("RouteTitle"),y=r("RouterLink"),u=r("KButton"),a=r("DataSource"),p=r("KCard"),w=r("AppView"),I=r("RouteView");return i(),_(I,{name:"home"},{default:s(({can:V,t:h})=>[o(w,null,{title:s(()=>[m("h1",null,[o(x,{title:h("main-overview.routes.item.title"),render:!0},null,8,["title"])])]),default:s(()=>[n(),m("div",$,[o(e(t)),n(),m("div",P,[V("use zones")?(i(),_(p,{key:0},{body:s(()=>[o(a,{src:"/zone-cps?page=1&size=10"},{default:s(({data:c,error:k})=>{var B;return[k?(i(),_(R,{key:0,error:k},null,8,["error"])):(i(),v(z,{key:1},[m("div",j,[m("div",H,[m("h2",null,l(h("main-overview.detail.zone_control_planes.title")),1),n(),o(y,{to:{name:"zone-cp-list-view"}},{default:s(()=>[n(l(h("main-overview.detail.health.view_all")),1)]),_:2},1024)]),n(),V("create zones")&&(((B=c==null?void 0:c.items)==null?void 0:B.length)??0>0)?(i(),v("div",U,[o(u,{appearance:"primary",to:{name:"zone-create-view"}},{default:s(()=>[o(e(T),{size:e(Z)},null,8,["size"]),n(" "+l(h("zones.index.create")),1)]),_:2},1024)])):b("",!0)]),n(),o(F,{"data-testid":"zone-control-planes-details",items:c==null?void 0:c.items},null,8,["items"])],64))]}),_:2},1024)]),_:2},1024)):b("",!0),n(),o(p,null,{body:s(()=>[o(a,{src:"/meshes?page=1&size=10"},{default:s(({data:c,error:k})=>[k?(i(),_(R,{key:0,error:k},null,8,["error"])):(i(),v(z,{key:1},[m("div",Y,[m("div",q,[m("h2",null,l(h("main-overview.detail.meshes.title")),1),n(),o(y,{to:{name:"mesh-list-view"}},{default:s(()=>[n(l(h("main-overview.detail.health.view_all")),1)]),_:2},1024)])]),n(),o(D,{"data-testid":"meshes-details",items:c==null?void 0:c.items},null,8,["items"])],64))]),_:2},1024)]),_:2},1024)])])]),_:2},1024)]),_:1})}}});const ee=A(G,[["__scopeId","data-v-def7344b"]]);export{ee as default};