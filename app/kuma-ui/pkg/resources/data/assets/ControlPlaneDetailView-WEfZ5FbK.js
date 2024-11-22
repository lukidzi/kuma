import{d as V,j as P,e as i,o as g,c as B,a as s,w as t,A as T,l as r,b as o,t as m,x as X,y as L,z as R,m as A,k as a,B as S,C as N,p as x,D as I,q as $}from"./index-DpJ_igul.js";const G=V({__name:"MeshInsightsList",props:{items:{default:void 0},storage:{default:()=>({get:()=>({}),set:()=>{}})}},setup(w){const{t:c}=P(),u=w;return(d,_)=>{const e=i("XAction"),v=i("DataCollection");return g(),B("div",null,[s(v,{items:u.items??[void 0],type:"meshes"},{default:t(()=>[s(T,{headers:[{...d.storage.get("mesh.headers.name"),label:r(c)("meshes.components.mesh-insights-list.name"),key:"name"},{...d.storage.get("mesh.headers.services"),label:r(c)("meshes.components.mesh-insights-list.services"),key:"services"},{...d.storage.get("mesh.headers.dataplanes"),label:r(c)("meshes.components.mesh-insights-list.dataplanes"),key:"dataplanes"}],items:u.items,onResize:_[0]||(_[0]=n=>{d.storage.set({mesh:n})})},{name:t(({row:n})=>[s(e,{to:{name:"mesh-detail-view",params:{mesh:n.name}}},{default:t(()=>[o(m(n.name),1)]),_:2},1032,["to"])]),services:t(({row:n})=>[o(m(n.services.internal),1)]),dataplanes:t(({row:n})=>[o(m(n.dataplanesByType.standard.online)+" / "+m(n.dataplanesByType.standard.total),1)]),_:1},8,["headers","items"])]),_:1},8,["items"])])}}}),K={class:"stack"},Z={class:"columns"},j={class:"card-header"},q={class:"card-title"},E={class:"card-actions"},M={class:"card-header"},F={class:"card-title"},H=V({__name:"ControlPlaneDetailView",setup(w){const c=X(),u=L(),d=R();return(_,e)=>{const v=i("RouteTitle"),n=i("DataLoader"),f=i("XAction"),b=i("XTeleportSlot"),C=i("KCard"),k=i("AppView"),D=i("RouteView");return g(),A(D,{name:"home"},{default:t(({can:z,t:p,uri:h,me:y})=>[s(k,null,{title:t(()=>[a("h1",null,[s(v,{title:p("main-overview.routes.item.title")},null,8,["title"])])]),actions:t(()=>[s(r(u))]),default:t(()=>[e[7]||(e[7]=o()),e[8]||(e[8]=o()),a("div",K,[s(n,{src:h(r(S),"/global-insight",{})},{default:t(({data:l})=>[s(r(c),{"can-use-zones":z("use zones"),"global-insight":l},null,8,["can-use-zones","global-insight"])]),_:2},1032,["src"]),e[6]||(e[6]=o()),a("div",Z,[z("use zones")?(g(),A(C,{key:0},{default:t(()=>[s(n,{src:h(r(N),"/zone-cps",{},{page:1,size:10})},{loadable:t(({data:l})=>[a("div",j,[a("div",q,[a("h2",null,m(p("main-overview.detail.zone_control_planes.title")),1),e[0]||(e[0]=o()),s(f,{to:{name:"zone-cp-list-view"}},{default:t(()=>[o(m(p("main-overview.detail.health.view_all")),1)]),_:2},1024)]),e[1]||(e[1]=o()),a("div",E,[s(b,{name:"control-plane-detail-view-zone-actions"})])]),e[2]||(e[2]=o()),s(r(d),{"data-testid":"zone-control-planes-details",items:l==null?void 0:l.items,storage:y},null,8,["items","storage"])]),_:2},1032,["src"])]),_:2},1024)):x("",!0),e[5]||(e[5]=o()),s(C,null,{default:t(()=>[s(n,{src:h(r(I),"/mesh-insights",{},{page:1,size:10})},{loadable:t(({data:l})=>[a("div",M,[a("div",F,[a("h2",null,m(p("main-overview.detail.meshes.title")),1),e[3]||(e[3]=o()),s(f,{to:{name:"mesh-list-view"}},{default:t(()=>[o(m(p("main-overview.detail.health.view_all")),1)]),_:2},1024)])]),e[4]||(e[4]=o()),s(G,{"data-testid":"meshes-details",items:l==null?void 0:l.items,storage:y},null,8,["items","storage"])]),_:2},1032,["src"])]),_:2},1024)])])]),_:2},1024)]),_:1})}}}),O=$(H,[["__scopeId","data-v-63924270"]]);export{O as default};
