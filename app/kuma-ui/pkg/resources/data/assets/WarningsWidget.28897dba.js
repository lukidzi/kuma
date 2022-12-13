import{d as l,o as a,j as s,t as r,b as n,l as t,E as P,y as b,M as f,cr as h,cv as D,cw as O,cx as N,i as p,c as i,w as _,n as A,a as E,V as I,F as K}from"./index.0cb244cf.js";const V=l({__name:"WarningDefault",props:{payload:{type:[String,Object],required:!0}},setup(e){return(c,o)=>(a(),s("span",null,r(e.payload),1))}}),W=l({__name:"WarningEnvoyIncompatible",props:{payload:{type:Object,required:!0}},setup(e){return(c,o)=>(a(),s("span",null,[n(`
    Envoy (`),t("strong",null,r(e.payload.envoy),1),n(") is unsupported by the current version of Kuma DP ("),t("strong",null,r(e.payload.kumaDp),1),n(") [Requirements: "),t("strong",null,r(e.payload.requirements),1),n(`].
  `)]))}}),v=l({__name:"WarningZoneAndKumaDPVersionsIncompatible",props:{payload:{type:Object,required:!0}},setup(e){return(c,o)=>(a(),s("span",null,[n(`
    There is a mismatch between versions of Kuma DP (`),t("strong",null,r(e.payload.kumaDp),1),n(`) and the Zone CP.
  `)]))}}),x=l({__name:"WarningUnsupportedKumaDPVersion",props:{payload:{type:Object,required:!0}},setup(e){return(c,o)=>(a(),s("span",null,[n(`
    Unsupported version of Kuma DP (`),t("strong",null,r(e.payload.kumaDp),1),n(`)
  `)]))}}),B=l({__name:"WarningZoneAndGlobalCPSVersionsIncompatible",props:{payload:{type:Object,required:!0}},setup(e){return(c,o)=>(a(),s("span",null,[n(`
    There is mismatch between versions of Zone CP (`),t("strong",null,r(e.payload.zoneCpVersion),1),n(`)
    and the Global CP (`),t("strong",null,r(e.payload.globalCpVersion),1),n(`)
  `)]))}}),S={name:"WarningsWidget",components:{KAlert:b,KCard:f},props:{warnings:{type:Array,required:!0}},methods:{getWarningComponent(e=""){switch(e){case N:return W;case O:return x;case D:return v;case h:return B;default:return V}}}};function w(e,c,o,T,$,d){const m=p("KAlert"),y=p("KCard");return a(),i(y,{"border-variant":"noBorder"},{body:_(()=>[t("ul",null,[(a(!0),s(K,null,A(o.warnings,({kind:u,payload:g,index:C})=>(a(),s("li",{key:`${u}/${C}`,class:"mb-1"},[E(m,{appearance:"warning"},{alertMessage:_(()=>[(a(),i(I(d.getWarningComponent(u)),{payload:g},null,8,["payload"]))]),_:2},1024)]))),128))])]),_:1})}const M=P(S,[["render",w]]);export{M as W};
