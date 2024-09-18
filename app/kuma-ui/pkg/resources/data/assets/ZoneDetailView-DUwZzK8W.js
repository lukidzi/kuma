import{d as R,r as p,o as d,m as z,w as t,b as a,l as w,z as B,T as O,e as n,k as m,Z as f,t as o,S as x,n as E,a3 as K,N as M,p as k,c as _,A as Z,L as y,M as g,E as H,q as U}from"./index-7nBR05ck.js";import{m as $}from"./kong-icons.es338-ClZTzwod.js";import{S as G}from"./SummaryView-BcRATzm9.js";const P=["data-testid","innerHTML"],X={"data-testid":"detail-view-details",class:"stack"},q={class:"columns"},F=["innerHTML"],j={key:0},J=R({__name:"ZoneDetailView",props:{data:{}},setup(C){const i=C;return(Q,W)=>{const v=p("KTooltip"),V=p("KCard"),T=p("XAction"),S=p("RouterView"),A=p("AppView"),N=p("DataSource"),D=p("RouteView");return d(),z(D,{name:"zone-cp-detail-view",params:{zone:"",subscription:""}},{default:t(({t:s,uri:L,route:h,me:u})=>{var I,b;return[a(N,{src:L(w(B),"/control-plane/outdated/:version",{version:((b=(I=i.data.zoneInsight.version)==null?void 0:I.kumaCp)==null?void 0:b.version)??"-"})},{default:t(({data:r})=>[a(A,{docs:s("zones.href.docs.cta")},O({default:t(()=>[n(),m("div",X,[a(V,null,{default:t(()=>[m("div",q,[a(f,null,{title:t(()=>[n(o(s("http.api.property.status")),1)]),body:t(()=>[a(x,{status:i.data.state},null,8,["status"])]),_:2},1024),n(),a(f,{class:E({version:!0,outdated:r==null?void 0:r.outdated})},{title:t(()=>[n(o(s("zone-cps.routes.item.version"))+" ",1),(r==null?void 0:r.outdated)===!0?(d(),z(v,{key:0,"max-width":"300"},{content:t(()=>[m("div",{innerHTML:s("zone-cps.routes.item.version_warning")},null,8,F)]),default:t(()=>[a(w($),{color:w(K),size:w(M)},null,8,["color","size"]),n()]),_:2},1024)):k("",!0)]),body:t(()=>{var e,c;return[n(o(((c=(e=i.data.zoneInsight.version)==null?void 0:e.kumaCp)==null?void 0:c.version)??"—"),1)]}),_:2},1032,["class"]),n(),a(f,null,{title:t(()=>[n(o(s("http.api.property.type")),1)]),body:t(()=>[n(o(s(`common.product.environment.${i.data.zoneInsight.environment||"unknown"}`)),1)]),_:2},1024),n(),a(f,null,{title:t(()=>[n(o(s("zone-cps.routes.item.authentication_type")),1)]),body:t(()=>[n(o(i.data.zoneInsight.authenticationType||s("common.not_applicable")),1)]),_:2},1024)])]),_:2},1024),n(),i.data.zoneInsight.subscriptions.length>0?(d(),_("div",j,[m("h2",null,o(s("zone-cps.detail.subscriptions")),1),n(),a(Z,{headers:[{...u.get("headers.zoneInstanceId"),label:s("zone-cps.routes.items.headers.zoneInstanceId"),key:"zoneInstanceId"},{...u.get("headers.version"),label:s("zone-cps.routes.items.headers.version"),key:"version"},{...u.get("headers.connected"),label:s("zone-cps.routes.items.headers.connected"),key:"connected"},{...u.get("headers.disconnected"),label:s("zone-cps.routes.items.headers.disconnected"),key:"disconnected"},{...u.get("headers.responses"),label:s("zone-cps.routes.items.headers.responses"),key:"responses"}],"is-selected-row":e=>e.id===h.params.subscription,items:i.data.zoneInsight.subscriptions.map((e,c,l)=>l[l.length-(c+1)]),onResize:u.set},{zoneInstanceId:t(({row:e})=>[a(T,{"data-action":"",to:{name:"subscription-summary-view",params:{subscription:e.id}}},{default:t(()=>[n(o(e.zoneInstanceId),1)]),_:2},1032,["to"])]),version:t(({row:e})=>{var c,l;return[n(o(((l=(c=e.version)==null?void 0:c.kumaCp)==null?void 0:l.version)??"-"),1)]}),connected:t(({row:e})=>[n(o(s("common.formats.datetime",{value:Date.parse(e.connectTime??"")})),1)]),disconnected:t(({row:e})=>[e.disconnectTime?(d(),_(y,{key:0},[n(o(s("common.formats.datetime",{value:Date.parse(e.disconnectTime)})),1)],64)):k("",!0)]),responses:t(({row:e})=>{var c;return[(d(!0),_(y,null,g([((c=e.status)==null?void 0:c.total)??{}],l=>(d(),_(y,null,[n(o(l.responsesSent)+"/"+o(l.responsesAcknowledged),1)],64))),256))]}),_:2},1032,["headers","is-selected-row","items","onResize"]),n(),a(S,null,{default:t(({Component:e})=>[h.child()?(d(),z(G,{key:0,width:"670px",onClose:function(){h.replace({name:"zone-cp-detail-view",params:{zone:h.params.zone}})}},{default:t(()=>[(d(),z(H(e),{data:i.data.zoneInsight.subscriptions},{default:t(()=>[m("p",null,o(s("zone-cps.routes.item.subscription_intro")),1)]),_:2},1032,["data"]))]),_:2},1032,["onClose"])):k("",!0)]),_:2},1024)])):k("",!0)])]),_:2},[i.data.warnings.length>0?{name:"notifications",fn:t(()=>[m("ul",null,[(d(!0),_(y,null,g(i.data.warnings,e=>(d(),_("li",{key:e.kind,"data-testid":`warning-${e.kind}`,innerHTML:s(`common.warnings.${e.kind}`,{...e.payload,...e.kind==="INCOMPATIBLE_ZONE_AND_GLOBAL_CPS_VERSIONS"?{globalCpVersion:(r==null?void 0:r.version)??""}:{}})},null,8,P))),128))])]),key:"0"}:void 0]),1032,["docs"])]),_:2},1032,["src"])]}),_:1})}}}),ne=U(J,[["__scopeId","data-v-150f6de6"]]);export{ne as default};
