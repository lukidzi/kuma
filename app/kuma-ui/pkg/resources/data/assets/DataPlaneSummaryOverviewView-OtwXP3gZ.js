import{d as D,e as m,o as r,m as u,w as e,a as s,k as d,Q as p,b as a,t as o,S as R,c as _,J as z,K as c,l as v,a1 as $,L as A,p as g,a0 as k,q as K}from"./index-CKcsX_-l.js";import{q as O}from"./kong-icons.es678-uIuWh5JE.js";import{T as b}from"./TagList-CHVNmOAj.js";const S={class:"stack"},I={class:"stack-with-borders"},L={class:"status-with-reason"},P={key:0},U={class:"mt-4"},X={class:"stack-with-borders"},E={class:"mt-4 stack"},q={class:"mt-2 stack-with-borders"},Z=D({__name:"DataPlaneSummaryOverviewView",props:{data:{},routeName:{}},setup(x){const n=x;return(F,t)=>{const T=m("KTooltip"),w=m("DataCollection"),C=m("XAction"),f=m("XBadge"),V=m("AppView"),N=m("RouteView");return r(),u(N,{name:n.routeName,params:{dataPlane:""}},{default:e(({t:l,can:h})=>[s(V,null,{default:e(()=>[d("div",S,[d("div",I,[s(p,{layout:"horizontal"},{title:e(()=>[a(o(l("http.api.property.status")),1)]),body:e(()=>[d("div",L,[s(R,{status:n.data.status},null,8,["status"]),t[1]||(t[1]=a()),n.data.dataplaneType==="standard"?(r(),u(w,{key:0,items:n.data.dataplane.networking.inbounds,predicate:y=>y.state!=="Ready",empty:!1},{default:e(({items:y})=>[s(T,{class:"reason-tooltip"},{content:e(()=>[d("ul",null,[(r(!0),_(z,null,c(y,i=>(r(),_("li",{key:`${i.service}:${i.port}`},o(l("data-planes.routes.item.unhealthy_inbound",{service:i.service,port:i.port})),1))),128))])]),default:e(()=>[s(v(O),{color:v($),size:v(A)},null,8,["color","size"]),t[0]||(t[0]=a())]),_:2},1024)]),_:2},1032,["items","predicate"])):g("",!0)])]),_:2},1024),t[9]||(t[9]=a()),s(p,{layout:"horizontal"},{title:e(()=>t[3]||(t[3]=[a(`
              Type
            `)])),body:e(()=>[a(o(l(`data-planes.type.${n.data.dataplaneType}`)),1)]),_:2},1024),t[10]||(t[10]=a()),n.data.namespace.length>0?(r(),u(p,{key:0,layout:"horizontal"},{title:e(()=>[a(o(l("data-planes.routes.item.namespace")),1)]),body:e(()=>[a(o(n.data.namespace),1)]),_:2},1024)):g("",!0),t[11]||(t[11]=a()),h("use zones")&&n.data.zone?(r(),u(p,{key:1,layout:"horizontal"},{title:e(()=>t[6]||(t[6]=[a(`
              Zone
            `)])),body:e(()=>[s(C,{to:{name:"zone-cp-detail-view",params:{zone:n.data.zone}}},{default:e(()=>[a(o(n.data.zone),1)]),_:1},8,["to"])]),_:1})):g("",!0),t[12]||(t[12]=a()),s(p,{layout:"horizontal"},{title:e(()=>[a(o(l("data-planes.routes.item.last_updated")),1)]),body:e(()=>[a(o(l("common.formats.datetime",{value:Date.parse(n.data.modificationTime)})),1)]),_:2},1024)]),t[24]||(t[24]=a()),n.data.dataplane.networking.gateway?(r(),_("div",P,[d("h3",null,o(l("data-planes.routes.item.gateway")),1),t[16]||(t[16]=a()),d("div",U,[d("div",X,[s(p,{layout:"horizontal"},{title:e(()=>[a(o(l("http.api.property.tags")),1)]),body:e(()=>[s(b,{alignment:"right",tags:n.data.dataplane.networking.gateway.tags},null,8,["tags"])]),_:2},1024),t[15]||(t[15]=a()),s(p,{layout:"horizontal"},{title:e(()=>[a(o(l("http.api.property.address")),1)]),body:e(()=>[s(k,{text:`${n.data.dataplane.networking.address}`},null,8,["text"])]),_:2},1024)])])])):g("",!0),t[25]||(t[25]=a()),n.data.dataplaneType==="standard"?(r(),u(w,{key:1,items:n.data.dataplane.networking.inbounds},{default:e(({items:y})=>[d("div",null,[d("h3",null,o(l("data-planes.routes.item.inbounds")),1),t[23]||(t[23]=a()),d("div",E,[(r(!0),_(z,null,c(y,(i,B)=>(r(),_("div",{key:B,class:"inbound"},[d("h4",null,[s(k,{text:i.tags["kuma.io/service"]},{default:e(()=>[a(o(l("data-planes.routes.item.inbound_name",{service:i.tags["kuma.io/service"]})),1)]),_:2},1032,["text"])]),t[22]||(t[22]=a()),d("div",q,[s(p,{layout:"horizontal"},{title:e(()=>[a(o(l("http.api.property.state")),1)]),body:e(()=>[i.state==="Ready"?(r(),u(f,{key:0,appearance:"success"},{default:e(()=>[a(o(l(`http.api.value.${i.state}`)),1)]),_:2},1024)):(r(),u(f,{key:1,appearance:"danger"},{default:e(()=>[a(o(l(`http.api.value.${i.state}`)),1)]),_:2},1024))]),_:2},1024),t[20]||(t[20]=a()),s(p,{layout:"horizontal"},{title:e(()=>[a(o(l("http.api.property.tags")),1)]),body:e(()=>[s(b,{alignment:"right",tags:i.tags},null,8,["tags"])]),_:2},1024),t[21]||(t[21]=a()),s(p,{layout:"horizontal"},{title:e(()=>[a(o(l("http.api.property.address")),1)]),body:e(()=>[s(k,{text:i.addressPort},null,8,["text"])]),_:2},1024)])]))),128))])])]),_:2},1032,["items"])):g("",!0)])]),_:2},1024)]),_:1},8,["name"])}}}),j=K(Z,[["__scopeId","data-v-43044578"]]);export{j as default};
