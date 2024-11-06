import{d as R,e as n,o as m,m as i,w as e,a as t,Q as u,k as f,$ as S,b as o,J as $,t as p,E as g,p as b}from"./index-uDOFM6ir.js";const L=["innerHTML"],H=R({__name:"ZoneDetailTabsView",setup(N){return(B,Z)=>{const z=n("RouteTitle"),_=n("XAction"),d=n("DataLoader"),w=n("XPrompt"),C=n("DataSink"),T=n("XTeleportTemplate"),X=n("XDisclosure"),x=n("XActionGroup"),V=n("XTabs"),k=n("RouterView"),y=n("AppView"),D=n("RouteView");return m(),i(D,{name:"zone-cp-detail-tabs-view",params:{zone:""}},{default:e(({can:h,route:s,t:a})=>[t(d,{src:`/zone-cps/${s.params.zone}`},{default:e(({data:l})=>[l?(m(),i(y,{key:0,breadcrumbs:[{to:{name:"zone-cp-list-view"},text:a("zone-cps.routes.item.breadcrumbs")}]},u({title:e(()=>[f("h1",null,[t(S,{text:s.params.zone},{default:e(()=>[t(z,{title:a("zone-cps.routes.item.title",{name:s.params.zone})},null,8,["title"])]),_:2},1032,["text"])])]),default:e(()=>{var r;return[o(),o(),t(V,{selected:(r=s.child())==null?void 0:r.name},u({_:2},[$(s.children,({name:c})=>({name:`${c}-tab`,fn:e(()=>[t(_,{to:{name:c}},{default:e(()=>[o(p(a(`zone-cps.routes.item.navigation.${c}`)),1)]),_:2},1032,["to"])])}))]),1032,["selected"]),o(),t(k,null,{default:e(c=>[(m(),i(g(c.Component),{data:l},null,8,["data"]))]),_:2},1024)]}),_:2},[h("create zones")?{name:"actions",fn:e(()=>[t(x,null,{control:e(()=>[t(_,{action:"expand",appearance:"primary"},{default:e(()=>[o(p(a("zones.action_menu.toggle_button")),1)]),_:2},1024)]),default:e(()=>[o(),t(X,null,{default:e(({expanded:r,toggle:c})=>[t(_,{appearance:"danger","data-testid":"delete-button",onClick:c},{default:e(()=>[o(p(a("zones.action_menu.delete_button")),1)]),_:2},1032,["onClick"]),o(),t(T,{to:{name:"modal-layer"}},{default:e(()=>[r?(m(),i(C,{key:0,src:`/zone-cps/${l.name}/delete`,onChange:()=>s.replace({name:"zone-cp-list-view"})},{default:e(({submit:v,error:A})=>[t(w,{action:a("common.delete_modal.proceed_button"),expected:l.name,"data-testid":"delete-zone-modal",onCancel:c,onSubmit:()=>v({})},{title:e(()=>[o(p(a("common.delete_modal.title",{type:"Zone"})),1)]),default:e(()=>[o(),f("div",{innerHTML:a("common.delete_modal.text",{type:"Zone",name:l.name})},null,8,L),o(),t(d,{class:"mt-4",errors:[A],loader:!1},null,8,["errors"])]),_:2},1032,["action","expected","onCancel","onSubmit"])]),_:2},1032,["src","onChange"])):b("",!0)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),key:"0"}:void 0]),1032,["breadcrumbs"])):b("",!0)]),_:2},1032,["src"])]),_:1})}}});export{H as default};
