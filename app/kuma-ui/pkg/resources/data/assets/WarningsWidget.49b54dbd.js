import{d as l,o as a,j as s,t as r,b as n,l as t,C as P,cs as b,cw as f,cx as D,cy as O,c as p,w as i,n as h,a as N,cz as A,F as E,i as _}from"./index.8aebf6c5.js";const I=l({__name:"WarningDefault",props:{payload:{type:[String,Object],required:!0}},setup(e){return(c,o)=>(a(),s("span",null,r(e.payload),1))}}),W=l({__name:"WarningEnvoyIncompatible",props:{payload:{type:Object,required:!0}},setup(e){return(c,o)=>(a(),s("span",null,[n(" Envoy ("),t("strong",null,r(e.payload.envoy),1),n(") is unsupported by the current version of Kuma DP ("),t("strong",null,r(e.payload.kumaDp),1),n(") [Requirements: "),t("strong",null,r(e.payload.requirements),1),n("]. ")]))}}),x=l({__name:"WarningZoneAndKumaDPVersionsIncompatible",props:{payload:{type:Object,required:!0}},setup(e){return(c,o)=>(a(),s("span",null,[n(" There is a mismatch between versions of Kuma DP ("),t("strong",null,r(e.payload.kumaDp),1),n(") and the Zone CP. ")]))}}),K=l({__name:"WarningUnsupportedKumaDPVersion",props:{payload:{type:Object,required:!0}},setup(e){return(c,o)=>(a(),s("span",null,[n(" Unsupported version of Kuma DP ("),t("strong",null,r(e.payload.kumaDp),1),n(") ")]))}}),V=l({__name:"WarningZoneAndGlobalCPSVersionsIncompatible",props:{payload:{type:Object,required:!0}},setup(e){return(c,o)=>(a(),s("span",null,[n(" There is mismatch between versions of Zone CP ("),t("strong",null,r(e.payload.zoneCpVersion),1),n(") and the Global CP ("),t("strong",null,r(e.payload.globalCpVersion),1),n(") ")]))}}),v={name:"WarningsWidget",props:{warnings:{type:Array,required:!0}},methods:{getWarningComponent(e=""){switch(e){case O:return W;case D:return K;case f:return x;case b:return V;default:return I}}}};function B(e,c,o,S,w,d){const m=_("KAlert"),y=_("KCard");return a(),p(y,{"border-variant":"noBorder"},{body:i(()=>[t("ul",null,[(a(!0),s(E,null,h(o.warnings,({kind:u,payload:g,index:C})=>(a(),s("li",{key:`${u}/${C}`,class:"mb-1"},[N(m,{appearance:"warning"},{alertMessage:i(()=>[(a(),p(A(d.getWarningComponent(u)),{payload:g},null,8,["payload"]))]),_:2},1024)]))),128))])]),_:1})}const $=P(v,[["render",B]]);export{$ as W};
