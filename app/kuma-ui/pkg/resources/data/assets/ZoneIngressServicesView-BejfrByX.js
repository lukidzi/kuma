import{d as w,e as a,o as h,m as g,w as o,a as t,b as s,A as f,t as n}from"./index-uDOFM6ir.js";const C=w({__name:"ZoneIngressServicesView",props:{data:{}},setup(r){const i=r;return(b,k)=>{const m=a("RouteTitle"),c=a("XAction"),p=a("XActionGroup"),_=a("DataCollection"),u=a("KCard"),d=a("AppView"),v=a("RouteView");return h(),g(v,{name:"zone-ingress-services-view"},{default:o(({t:l})=>[t(m,{render:!1,title:l("zone-ingresses.routes.item.navigation.zone-ingress-services-view")},null,8,["title"]),s(),t(d,null,{default:o(()=>[t(u,null,{default:o(()=>[t(_,{type:"services",items:i.data.zoneIngress.availableServices,total:i.data.zoneIngress.availableServices.length},{default:o(()=>[t(f,{"data-testid":"available-services-collection",headers:[{label:"Name",key:"name"},{label:"Mesh",key:"mesh"},{label:"Protocol",key:"protocol"},{label:"No. Instances",key:"instances"},{label:"Actions",key:"actions",hideLabel:!0}],items:i.data.zoneIngress.availableServices},{name:o(({row:e})=>[t(c,{to:{name:"service-detail-view",params:{mesh:e.mesh,service:e.tags["kuma.io/service"]}}},{default:o(()=>[s(n(e.tags["kuma.io/service"]),1)]),_:2},1032,["to"])]),mesh:o(({row:e})=>[t(c,{to:{name:"mesh-detail-view",params:{mesh:e.mesh}}},{default:o(()=>[s(n(e.mesh),1)]),_:2},1032,["to"])]),protocol:o(({row:e})=>[s(n(e.tags["kuma.io/protocol"]??l("common.collection.none")),1)]),instances:o(({row:e})=>[s(n(e.instances),1)]),actions:o(({row:e})=>[t(p,null,{default:o(()=>[t(c,{to:{name:"service-detail-view",params:{mesh:e.mesh,service:e.tags["kuma.io/service"]}}},{default:o(()=>[s(n(l("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["items"])]),_:2},1032,["items","total"])]),_:2},1024)]),_:2},1024)]),_:1})}}});export{C as default};
