import{d as y,e as n,o as p,p as d,w as e,a as o,l as O,t as m,b as c,R,K as x,F as A}from"./index-DH1Ug2X_.js";const N=y({__name:"ConnectionOutboundSummaryView",props:{data:{},dataplaneOverview:{}},setup(u){const l=u;return(D,i)=>{const _=n("XAction"),v=n("XTabs"),w=n("DataCollection"),f=n("RouterView"),V=n("AppView"),b=n("RouteView");return p(),d(b,{name:"connection-outbound-summary-view",params:{connection:"",inactive:!1}},{default:e(({route:t,t:C})=>[o(V,null,{title:e(()=>[O("h2",null,`
          Outbound `+m(t.params.connection),1)]),default:e(()=>{var r;return[i[0]||(i[0]=c()),o(v,{selected:(r=t.child())==null?void 0:r.name},R({_:2},[x(t.children,a=>({name:`${a.name}-tab`,fn:e(()=>[o(_,{to:{name:a.name,query:{inactive:t.params.inactive}}},{default:e(()=>[c(m(C(`connections.routes.item.navigation.${a.name.split("-")[3]}`)),1)]),_:2},1032,["to"])])}))]),1032,["selected"]),i[1]||(i[1]=c()),o(f,null,{default:e(({Component:a})=>[o(w,{items:Object.entries(l.data),predicate:([s,X])=>s===t.params.connection,find:!0},{default:e(({items:s})=>[(p(),d(A(a),{data:s[0][1],"dataplane-overview":l.dataplaneOverview},null,8,["data","dataplane-overview"]))]),_:2},1032,["items","predicate"])]),_:2},1024)]}),_:2},1024)]),_:1})}}});export{N as default};
