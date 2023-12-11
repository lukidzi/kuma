import{b as v}from"./index-fce48c05.js";import{d as b,l as x,M as B,a5 as _,o as a,c as o,e as i,w as l,p as n,q as t,f as r,r as k,a6 as m,t as s,b as g,s as c,F as E,I,a7 as w,_ as C}from"./index-364a2367.js";import{T as N}from"./TextWithCopyButton-331646e6.js";import{_ as S}from"./WarningIcon.vue_vue_type_script_setup_true_lang-0e53d9b2.js";const V={"data-testid":"error-state",class:"error-block"},$={class:"error-block-header"},q={class:"error-block-title"},A={key:0,class:"badge-list"},T={class:"error-block-message"},z={key:1},F={key:2,"data-testid":"error-invalid-parameters"},P=b({__name:"ErrorBlock",props:{error:{type:Error,required:!0},badgeAppearance:{type:String,required:!1,default:"warning"}},setup(e){const{t:p}=x(),d=e,f=B(()=>d.error instanceof _?d.error.invalidParameters:[]);return(u,D)=>(a(),o("div",V,[i(t(w),{"cta-is-hidden":""},{title:l(()=>[n("div",$,[n("div",q,[i(S,{display:"inline-block",size:t(v)},null,8,["size"]),r(),k(u.$slots,"default",{},()=>[n("p",null,s(e.error instanceof t(_)?e.error.detail:t(p)("common.error_state.title")),1)],!0)]),r(),e.error instanceof t(_)?(a(),o("span",A,[i(t(m),{appearance:d.badgeAppearance,"data-testid":"error-status"},{default:l(()=>[r(s(e.error.status),1)]),_:1},8,["appearance"]),r(),e.error.type?(a(),g(t(m),{key:0,appearance:"neutral","data-testid":"error-type","max-width":"auto"},{default:l(()=>[r(`
              type: `+s(e.error.type),1)]),_:1})):c("",!0),r(),e.error.instance?(a(),g(t(m),{key:1,appearance:"neutral","data-testid":"error-trace","max-width":"auto"},{default:l(()=>[r(`
              trace: `),i(N,{text:e.error.instance},null,8,["text"])]),_:1})):c("",!0)])):c("",!0)])]),message:l(()=>[n("div",T,[u.$slots.message?k(u.$slots,"message",{key:0},void 0,!0):(a(),o("p",z,s(e.error.message),1)),r(),f.value.length>0?(a(),o("ul",F,[(a(!0),o(E,null,I(f.value,(y,h)=>(a(),o("li",{key:h},[r(s(t(p)("common.error_state.field"))+" ",1),n("b",null,[n("code",null,s(y.field),1)]),r(": "+s(y.reason),1)]))),128))])):c("",!0)])]),_:3})]))}});const U=C(P,[["__scopeId","data-v-e0829cfe"]]);export{U as E};
