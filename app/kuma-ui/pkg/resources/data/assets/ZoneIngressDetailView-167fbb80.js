import{d as y,a as m,o as a,b as c,w as t,e as o,p as u,a0 as g,f as n,t as i,q as z,c as l,F as p,I as v,s as x}from"./index-364a2367.js";import{S as V}from"./StatusBadge-639d9a83.js";import{T as w}from"./TextWithCopyButton-331646e6.js";import{_ as C}from"./SubscriptionList.vue_vue_type_script_setup_true_lang-bf3cccc2.js";import{g as B}from"./dataplane-7a46b268.js";import"./CopyButton-0c187074.js";import"./index-fce48c05.js";import"./AccordionList-87e5ec5d.js";const b={class:"stack","data-testid":"detail-view-details"},A={class:"columns"},$={key:0},L=y({__name:"ZoneIngressDetailView",props:{data:{}},setup(f){const e=f;return(N,S)=>{const _=m("KCard"),I=m("AppView"),h=m("RouteView");return a(),c(h,{name:"zone-ingress-detail-view"},{default:t(({t:r})=>[o(I,null,{default:t(()=>{var k;return[u("div",b,[o(_,null,{default:t(()=>[u("div",A,[o(g,null,{title:t(()=>[n(i(r("http.api.property.status")),1)]),body:t(()=>[o(V,{status:z(B)(e.data.zoneIngressInsight)},null,8,["status"])]),_:2},1024),n(),o(g,null,{title:t(()=>[n(i(r("http.api.property.address")),1)]),body:t(()=>{var s,d;return[(s=e.data.zoneIngress.networking)!=null&&s.address&&((d=e.data.zoneIngress.networking)!=null&&d.port)?(a(),c(w,{key:0,text:`${e.data.zoneIngress.networking.address}:${e.data.zoneIngress.networking.port}`},null,8,["text"])):(a(),l(p,{key:1},[n(i(r("common.detail.none")),1)],64))]}),_:2},1024),n(),o(g,null,{title:t(()=>[n(i(r("http.api.property.advertisedAddress")),1)]),body:t(()=>{var s,d;return[(s=e.data.zoneIngress.networking)!=null&&s.advertisedAddress&&((d=e.data.zoneIngress.networking)!=null&&d.advertisedPort)?(a(),c(w,{key:0,text:`${e.data.zoneIngress.networking.advertisedAddress}:${e.data.zoneIngress.networking.advertisedPort}`},null,8,["text"])):(a(),l(p,{key:1},[n(i(r("common.detail.none")),1)],64))]}),_:2},1024)])]),_:2},1024),n(),(a(!0),l(p,null,v([((k=e.data.zoneIngressInsight)==null?void 0:k.subscriptions)??[]],s=>(a(),l(p,{key:s},[s.length>0?(a(),l("div",$,[u("h2",null,i(r("zone-ingresses.routes.item.subscriptions.title")),1),n(),o(_,{class:"mt-4"},{default:t(()=>[o(C,{subscriptions:s},null,8,["subscriptions"])]),_:2},1024)])):x("",!0)],64))),128))])]}),_:2},1024)]),_:1})}}});export{L as default};
