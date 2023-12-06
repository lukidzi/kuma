import{d as S,l as A,N as b,o,c as l,b as g,w as v,e as k,q as a,ak as x,f as t,t as e,s as B,r as T,v as I,p as n,F as f,J as D,_ as L,z as N,A as P}from"./index-d015481a.js";import{A as R,a as U}from"./AccordionList-cad8a61c.js";const V={class:"stack"},q={key:1},C={key:0,class:"intro"},H={class:"row"},O={class:"header"},F={class:"header"},z=["data-testid"],E={class:"type"},J=S({__name:"SubscriptionDetails",props:{subscription:{type:Object,required:!0},isDiscoverySubscription:{type:Boolean,default:!1}},setup(d){const{t:c}=A(),p=d,s=b(()=>{var u;let i;if("controlPlaneInstanceId"in p.subscription){const{lastUpdateTime:r,total:_,...m}=p.subscription.status;i=m}else i=((u=p.subscription.status)==null?void 0:u.stat)??{};return i?Object.entries(i).map(([r,_])=>{const{responsesSent:m="0",responsesAcknowledged:h="0",responsesRejected:y="0"}=_;return{type:r,responsesSent:m,responsesAcknowledged:h,responsesRejected:y}}):[]});return(i,u)=>(o(),l("div",V,[s.value.length===0?(o(),g(a(B),{key:0,appearance:"info"},{alertIcon:v(()=>[k(a(x))]),alertMessage:v(()=>[t(e(a(c)("common.detail.subscriptions.no_stats",{id:p.subscription.id})),1)]),_:1})):(o(),l("div",q,[i.$slots.default?(o(),l("div",C,[T(i.$slots,"default",{},void 0,!0)])):I("",!0),t(),n("div",H,[n("div",O,e(a(c)("common.detail.subscriptions.type")),1),t(),n("div",F,e(a(c)("common.detail.subscriptions.responses_sent_acknowledged")),1)]),t(),(o(!0),l(f,null,D(s.value,(r,_)=>(o(),l("div",{key:_,class:"row","data-testid":`subscription-status-${r.type}`},[n("div",E,e(a(c)(`http.api.property.${r.type}`)),1),t(),n("div",null,e(r.responsesSent)+"/"+e(r.responsesAcknowledged),1)],8,z))),128))]))]))}});const M=L(J,[["__scopeId","data-v-c3ee36ce"]]),G=""+new URL("icon-deployed-code-e3c999ba.svg",import.meta.url).href,K=""+new URL("icon-connected-037e001a.svg",import.meta.url).href,Q=""+new URL("icon-disconnected-ba3c2624.svg",import.meta.url).href,$=d=>(N("data-v-991b71e7"),d=d(),P(),d),W={class:"subscription-header"},X={class:"instance-id"},Y=$(()=>n("img",{src:G},null,-1)),Z=$(()=>n("img",{src:K},null,-1)),ss={key:0},es=$(()=>n("img",{src:Q},null,-1)),ts={class:"responses-sent-acknowledged"},ns=S({__name:"SubscriptionHeader",props:{subscription:{type:Object,required:!0}},setup(d){const{t:c,formatIsoDate:p}=A(),s=d,i=b(()=>"globalInstanceId"in s.subscription?s.subscription.globalInstanceId:null),u=b(()=>"controlPlaneInstanceId"in s.subscription?s.subscription.controlPlaneInstanceId:null),r=b(()=>s.subscription.connectTime?p(s.subscription.connectTime):null),_=b(()=>s.subscription.disconnectTime?p(s.subscription.disconnectTime):null),m=b(()=>{var w;const{responsesSent:h=0,responsesAcknowledged:y=0,responsesRejected:j=0}=((w=s.subscription.status)==null?void 0:w.total)??{};return{responsesSent:h,responsesAcknowledged:y,responsesRejected:j}});return(h,y)=>(o(),l("header",W,[n("span",X,[Y,t(),i.value?(o(),l(f,{key:0},[n("b",null,e(a(c)("http.api.property.globalInstanceId")),1),t(": "+e(i.value),1)],64)):u.value?(o(),l(f,{key:1},[n("b",null,e(a(c)("http.api.property.controlPlaneInstanceId")),1),t(": "+e(u.value),1)],64)):I("",!0)]),t(),n("span",null,[Z,t(),n("b",null,e(a(c)("common.detail.subscriptions.connect_time")),1),t(": "+e(r.value),1)]),t(),_.value?(o(),l("span",ss,[es,t(),n("b",null,e(a(c)("common.detail.subscriptions.disconnect_time")),1),t(": "+e(_.value),1)])):I("",!0),t(),n("span",ts,e(a(c)("common.detail.subscriptions.responses_sent_acknowledged"))+`:

      `+e(m.value.responsesSent)+"/"+e(m.value.responsesAcknowledged),1)]))}});const os=L(ns,[["__scopeId","data-v-991b71e7"]]),rs=S({__name:"SubscriptionList",props:{subscriptions:{}},setup(d){const c=d,p=b(()=>{const s=Array.from(c.subscriptions);return s.reverse(),s});return(s,i)=>(o(),g(U,null,{default:v(()=>[(o(!0),l(f,null,D(p.value,(u,r)=>(o(),g(R,{key:r},{"accordion-header":v(()=>[k(os,{subscription:u},null,8,["subscription"])]),"accordion-content":v(()=>[k(M,{subscription:u},{default:v(()=>[s.$slots.default?T(s.$slots,"default",{key:0}):I("",!0)]),_:2},1032,["subscription"])]),_:2},1024))),128))]),_:3}))}});export{rs as _};
