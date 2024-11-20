import{d as h,e as r,o as p,m as d,w as e,a as s,k as f,P as g,b as t,t as m,p as c,c as C,l as B,ao as X,A as x,H as L,E as S}from"./index-Dx_kP1mI.js";import{S as E}from"./SummaryView-CkTdfI05.js";const G={class:"columns"},K={key:0},H=h({__name:"PolicyDetailView",props:{data:{}},setup(b){const i=b;return(T,a)=>{const y=r("XAction"),_=r("XBadge"),k=r("KCard"),v=r("XActionGroup"),V=r("RouterView"),R=r("DataCollection"),A=r("DataLoader"),P=r("AppView"),D=r("RouteView");return p(),d(D,{name:"policy-detail-view",params:{page:1,size:50,s:"",mesh:"",policy:"",policyPath:"",dataPlane:""}},{default:e(({route:o,t:z,uri:N,can:w,me:u})=>[s(P,null,{default:e(()=>[s(k,null,{default:e(()=>[f("div",G,[s(g,null,{title:e(()=>a[0]||(a[0]=[t(`
              Type
            `)])),body:e(()=>[t(m(i.data.type),1)]),_:1}),a[9]||(a[9]=t()),i.data.namespace.length>0?(p(),d(g,{key:0},{title:e(()=>a[2]||(a[2]=[t(`
              Namespace
            `)])),body:e(()=>[t(m(i.data.namespace),1)]),_:1})):c("",!0),a[10]||(a[10]=t()),w("use zones")&&i.data.zone?(p(),d(g,{key:1},{title:e(()=>a[4]||(a[4]=[t(`
              Zone
            `)])),body:e(()=>[s(y,{to:{name:"zone-cp-detail-view",params:{zone:i.data.zone}}},{default:e(()=>[t(m(i.data.zone),1)]),_:1},8,["to"])]),_:1})):c("",!0),a[11]||(a[11]=t()),i.data.spec?(p(),d(g,{key:2},{title:e(()=>[t(m(z("http.api.property.targetRef")),1)]),body:e(()=>[i.data.spec.targetRef?(p(),d(_,{key:0,appearance:"neutral"},{default:e(()=>[t(m(i.data.spec.targetRef.kind),1),i.data.spec.targetRef.name?(p(),C("span",K,[a[6]||(a[6]=t(":")),f("b",null,m(i.data.spec.targetRef.name),1)])):c("",!0)]),_:1})):(p(),d(_,{key:1,appearance:"neutral"},{default:e(()=>a[7]||(a[7]=[t(`
                Mesh
              `)])),_:1}))]),_:2},1024)):c("",!0)])]),_:2},1024),a[18]||(a[18]=t()),f("div",null,[a[16]||(a[16]=f("h3",null,`
          Affected Data Plane Proxies
        `,-1)),a[17]||(a[17]=t()),s(k,{class:"mt-4"},{default:e(()=>[s(A,{src:N(B(X),"/meshes/:mesh/policy-path/:path/policy/:name/dataplanes",{mesh:o.params.mesh,path:o.params.policyPath,name:o.params.policy},{page:o.params.page,size:o.params.size})},{loadable:e(({data:l})=>[s(R,{type:"data-planes",items:(l==null?void 0:l.items)??[void 0],page:o.params.page,"page-size":o.params.size,total:l==null?void 0:l.total,onChange:o.update},{default:e(()=>[s(x,{headers:[{...u.get("headers.name"),label:"Name",key:"name"},{...u.get("headers.namespace"),label:"Namespace",key:"namespace"},...w("use zones")?[{...u.get("headers.zone"),label:"Zone",key:"zone"}]:[],{...u.get("headers.actions"),label:"Actions",key:"actions",hideLabel:!0}],items:l==null?void 0:l.items,"is-selected-row":n=>n.id===o.params.dataPlane,onResize:u.set},{name:e(({row:n})=>[s(y,{"data-action":"",to:{name:"data-plane-detail-view",params:{dataPlane:n.id}}},{default:e(()=>[t(m(n.name),1)]),_:2},1032,["to"])]),namespace:e(({row:n})=>[t(m(n.namespace),1)]),zone:e(({row:n})=>[n.zone?(p(),d(y,{key:0,to:{name:"zone-cp-detail-view",params:{zone:n.zone}}},{default:e(()=>[t(m(n.zone),1)]),_:2},1032,["to"])):(p(),C(L,{key:1},[t(m(z("common.collection.none")),1)],64))]),actions:e(({row:n})=>[s(v,null,{default:e(()=>[s(y,{to:{name:"data-plane-detail-view",params:{dataPlane:n.id}}},{default:e(()=>[t(m(z("common.collection.actions.view")),1)]),_:2},1032,["to"])]),_:2},1024)]),_:2},1032,["headers","items","is-selected-row","onResize"]),a[15]||(a[15]=t()),s(V,null,{default:e(({Component:n})=>[o.child()?(p(),d(E,{key:0,onClose:Z=>o.replace({params:{mesh:o.params.mesh},query:{page:o.params.page,size:o.params.size,s:o.params.s}})},{default:e(()=>[typeof l<"u"?(p(),d(S(n),{key:0,items:l.items},null,8,["items"])):c("",!0)]),_:2},1032,["onClose"])):c("",!0)]),_:2},1024)]),_:2},1032,["items","page","page-size","total","onChange"])]),_:2},1032,["src"])]),_:2},1024)])]),_:2},1024)]),_:1})}}});export{H as default};
