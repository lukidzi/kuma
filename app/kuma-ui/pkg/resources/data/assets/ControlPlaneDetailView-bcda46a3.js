import{K as N}from"./index-52545d1d.js";import{d as x,l as b,a as c,o as i,b as p,w as e,e as o,f as a,t as m,q as t,x as T,B as A,p as r,c as z,F as S,C as I,v as L,_ as E}from"./index-d015481a.js";import{E as C}from"./ErrorBlock-90874856.js";import{_ as Z}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-5a848316.js";import{A as D}from"./AppCollection-47b71b41.js";import{S as $}from"./StatusBadge-ed77f93c.js";import"./TextWithCopyButton-b83bb297.js";import"./CopyButton-7634543f.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-32f2be0a.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-b301e74b.js";const F=x({__name:"MeshInsightsList",props:{items:{}},setup(f){const{t:s}=b(),u=f;return(w,k)=>{var d;const y=c("RouterLink");return i(),p(D,{headers:[{label:t(s)("meshes.components.mesh-insights-list.name"),key:"name"},{label:t(s)("meshes.components.mesh-insights-list.services"),key:"services"},{label:t(s)("meshes.components.mesh-insights-list.dataplanes"),key:"dataplanes"}],items:u.items,total:(d=u.items)==null?void 0:d.length,"empty-state-message":t(s)("common.emptyState.message",{type:t(s)("meshes.common.type",{count:2})}),"empty-state-cta-to":t(s)("meshes.href.docs"),"empty-state-cta-text":t(s)("common.documentation")},{name:e(({row:n})=>[o(y,{to:{name:"mesh-detail-view",params:{mesh:n.name}}},{default:e(()=>[a(m(n.name),1)]),_:2},1032,["to"])]),services:e(({row:n})=>[a(m(n.services.internal??"0"),1)]),dataplanes:e(({row:n})=>[a(m(n.dataplanesByType.standard.online??"0")+" / "+m(n.dataplanesByType.standard.total??"0"),1)]),_:1},8,["headers","items","total","empty-state-message","empty-state-cta-to","empty-state-cta-text"])}}}),q=x({__name:"ZoneControlPlanesList",props:{items:{}},setup(f){const{t:s}=b(),u=T(),w=f;return(k,y)=>{var n;const d=c("RouterLink");return i(),p(D,{headers:[{label:t(s)("zone-cps.components.zone-control-planes-list.name"),key:"name"},{label:t(s)("zone-cps.components.zone-control-planes-list.status"),key:"status"}],items:w.items,total:(n=w.items)==null?void 0:n.length,"empty-state-title":t(s)("zone-cps.empty_state.title"),"empty-state-message":t(u)("create zones")?t(s)("zone-cps.empty_state.message"):t(s)("common.emptyState.message",{type:"Zones"}),"empty-state-cta-to":t(u)("create zones")?{name:"zone-create-view"}:void 0,"empty-state-cta-text":t(s)("zones.index.create")},{name:e(({row:_})=>[o(d,{to:{name:"zone-cp-detail-view",params:{zone:_.name}}},{default:e(()=>[a(m(_.name),1)]),_:2},1032,["to"])]),status:e(({row:_})=>[o($,{status:_.state},null,8,["status"])]),_:1},8,["headers","items","total","empty-state-title","empty-state-message","empty-state-cta-to","empty-state-cta-text"])}}}),M={key:2,class:"stack","data-testid":"detail-view-details"},O={class:"columns"},U={class:"card-header"},j={class:"card-title"},G={key:0,class:"card-actions"},H={class:"card-header"},J={class:"card-title"},Q=x({__name:"ControlPlaneDetailView",setup(f){const s=A();return(u,w)=>{const k=c("RouteTitle"),y=c("RouterLink"),d=c("KButton"),n=c("DataSource"),_=c("KCard"),K=c("AppView"),P=c("RouteView");return i(),p(P,{name:"home"},{default:e(({can:g,t:h})=>[o(K,null,{title:e(()=>[r("h1",null,[o(k,{title:h("main-overview.routes.item.title")},null,8,["title"])])]),default:e(()=>[a(),o(n,{src:"/global-insight"},{default:e(({data:B,error:V})=>[V?(i(),p(C,{key:0,error:V},null,8,["error"])):B===void 0?(i(),p(Z,{key:1})):(i(),z("div",M,[o(t(s),{"can-use-zones":g("use zones"),"global-insight":B},null,8,["can-use-zones","global-insight"]),a(),r("div",O,[g("use zones")?(i(),p(_,{key:0},{default:e(()=>[o(n,{src:"/zone-cps?page=1&size=10"},{default:e(({data:l,error:v})=>{var R;return[v?(i(),p(C,{key:0,error:v},null,8,["error"])):(i(),z(S,{key:1},[r("div",U,[r("div",j,[r("h2",null,m(h("main-overview.detail.zone_control_planes.title")),1),a(),o(y,{to:{name:"zone-cp-list-view"}},{default:e(()=>[a(m(h("main-overview.detail.health.view_all")),1)]),_:2},1024)]),a(),g("create zones")&&(((R=l==null?void 0:l.items)==null?void 0:R.length)??0>0)?(i(),z("div",G,[o(d,{appearance:"primary",to:{name:"zone-create-view"}},{default:e(()=>[o(t(I),{size:t(N)},null,8,["size"]),a(" "+m(h("zones.index.create")),1)]),_:2},1024)])):L("",!0)]),a(),o(q,{"data-testid":"zone-control-planes-details",items:l==null?void 0:l.items},null,8,["items"])],64))]}),_:2},1024)]),_:2},1024)):L("",!0),a(),o(_,null,{default:e(()=>[o(n,{src:"/mesh-insights?page=1&size=10"},{default:e(({data:l,error:v})=>[v?(i(),p(C,{key:0,error:v},null,8,["error"])):(i(),z(S,{key:1},[r("div",H,[r("div",J,[r("h2",null,m(h("main-overview.detail.meshes.title")),1),a(),o(y,{to:{name:"mesh-list-view"}},{default:e(()=>[a(m(h("main-overview.detail.health.view_all")),1)]),_:2},1024)])]),a(),o(F,{"data-testid":"meshes-details",items:l==null?void 0:l.items},null,8,["items"])],64))]),_:2},1024)]),_:2},1024)])]))]),_:2},1024)]),_:2},1024)]),_:1})}}});const le=E(Q,[["__scopeId","data-v-a360c612"]]);export{le as default};
