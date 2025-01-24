import{d as B,r as o,o as c,q as i,w as e,b as n,Q as f,m as L,e as a,L as N,t as d,G as $,s as b}from"./index-U3igbuyl.js";const P=B({__name:"ZoneDetailTabsView",setup(G){return(Z,t)=>{const z=o("RouteTitle"),X=o("XCopyButton"),u=o("XAction"),C=o("XI18n"),_=o("DataLoader"),w=o("XPrompt"),x=o("DataSink"),y=o("XTeleportTemplate"),V=o("XDisclosure"),T=o("XActionGroup"),k=o("XTabs"),D=o("RouterView"),v=o("AppView"),A=o("RouteView");return c(),i(A,{name:"zone-cp-detail-tabs-view",params:{zone:""}},{default:e(({can:R,route:m,t:l})=>[n(_,{src:`/zone-cps/${m.params.zone}`},{default:e(({data:r})=>[r?(c(),i(v,{key:0,breadcrumbs:[{to:{name:"zone-cp-list-view"},text:l("zone-cps.routes.item.breadcrumbs")}]},f({title:e(()=>[L("h1",null,[n(X,{text:m.params.zone},{default:e(()=>[n(z,{title:l("zone-cps.routes.item.title",{name:m.params.zone})},null,8,["title"])]),_:2},1032,["text"])])]),default:e(()=>{var p;return[t[4]||(t[4]=a()),t[5]||(t[5]=a()),n(k,{selected:(p=m.child())==null?void 0:p.name},f({_:2},[N(m.children,({name:s})=>({name:`${s}-tab`,fn:e(()=>[n(u,{to:{name:s}},{default:e(()=>[a(d(l(`zone-cps.routes.item.navigation.${s}`)),1)]),_:2},1032,["to"])])}))]),1032,["selected"]),t[6]||(t[6]=a()),n(D,null,{default:e(s=>[(c(),i($(s.Component),{data:r},null,8,["data"]))]),_:2},1024)]}),_:2},[R("create zones")?{name:"actions",fn:e(()=>[n(T,null,{control:e(()=>[n(u,{action:"expand",appearance:"primary"},{default:e(()=>[a(d(l("zones.action_menu.toggle_button")),1)]),_:2},1024)]),default:e(()=>[t[3]||(t[3]=a()),n(V,null,{default:e(({expanded:p,toggle:s})=>[n(u,{appearance:"danger","data-testid":"delete-button",onClick:s},{default:e(()=>[a(d(l("zones.action_menu.delete_button")),1)]),_:2},1032,["onClick"]),t[2]||(t[2]=a()),n(y,{to:{name:"modal-layer"}},{default:e(()=>[p?(c(),i(x,{key:0,src:`/zone-cps/${r.name}/delete`,onChange:()=>m.replace({name:"zone-cp-list-view"})},{default:e(({submit:S,error:g})=>[n(w,{action:l("common.delete_modal.proceed_button"),expected:r.name,"data-testid":"delete-zone-modal",onCancel:s,onSubmit:()=>S({})},{title:e(()=>[a(d(l("common.delete_modal.title",{type:"Zone"})),1)]),default:e(()=>[t[0]||(t[0]=a()),n(C,{path:"common.delete_modal.text",params:{type:"Zone",name:r.name}},null,8,["params"]),t[1]||(t[1]=a()),n(_,{class:"mt-4",errors:[g],loader:!1},null,8,["errors"])]),_:2},1032,["action","expected","onCancel","onSubmit"])]),_:2},1032,["src","onChange"])):b("",!0)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),key:"0"}:void 0]),1032,["breadcrumbs"])):b("",!0)]),_:2},1032,["src"])]),_:1})}}});export{P as default};