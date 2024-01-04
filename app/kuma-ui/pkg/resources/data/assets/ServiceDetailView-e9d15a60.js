import{d as f,l as y,a as d,o as t,c as u,e as r,w as e,b as i,p as k,t as c,q as l,X as h,f as n,s as w,F as V,S as C}from"./index-e5aa0c15.js";import{_ as I}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-e8c0123c.js";import{E as $}from"./ErrorBlock-81d576c6.js";import{_ as B}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-bef0b446.js";import{T as D}from"./TagList-ef9a8087.js";import{T as x}from"./TextWithCopyButton-a30e2023.js";import{S}from"./StatusBadge-e24d822f.js";import"./index-fce48c05.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-1f206a29.js";import"./CopyButton-f402d0b6.js";const T={key:3,class:"columns"},b=f({__name:"ExternalServiceDetails",props:{mesh:{},service:{}},setup(m){const{t:a}=y(),s=m;return(g,v)=>{const p=d("DataSource");return t(),u("div",null,[r(p,{src:`/meshes/${s.mesh}/external-services/for/${s.service}`},{default:e(({data:o,error:_})=>[_?(t(),i($,{key:0,error:_},null,8,["error"])):o===void 0?(t(),i(B,{key:1})):o===null?(t(),i(I,{key:2,"data-testid":"no-matching-external-service"},{title:e(()=>[k("p",null,c(l(a)("services.detail.no_matching_external_service",{name:s.service})),1)]),_:1})):(t(),u("div",T,[r(h,null,{title:e(()=>[n(c(l(a)("http.api.property.address")),1)]),body:e(()=>[r(x,{text:o.networking.address},null,8,["text"])]),_:2},1024),n(),o.tags!==null?(t(),i(h,{key:0},{title:e(()=>[n(c(l(a)("http.api.property.tags")),1)]),body:e(()=>[r(D,{tags:o.tags},null,8,["tags"])]),_:2},1024)):w("",!0)]))]),_:1},8,["src"])])}}}),E={class:"columns"},N=f({__name:"ServiceInsightDetails",props:{serviceInsight:{}},setup(m){const{t:a}=y(),s=m;return(g,v)=>{var p,o;return t(),u("div",E,[r(h,null,{title:e(()=>[n(c(l(a)("http.api.property.status")),1)]),body:e(()=>[r(S,{status:s.serviceInsight.status},null,8,["status"])]),_:1}),n(),r(h,null,{title:e(()=>[n(c(l(a)("http.api.property.address")),1)]),body:e(()=>[s.serviceInsight.addressPort?(t(),i(x,{key:0,text:s.serviceInsight.addressPort},null,8,["text"])):(t(),u(V,{key:1},[n(c(l(a)("common.detail.none")),1)],64))]),_:1}),n(),r(C,{online:((p=s.serviceInsight.dataplanes)==null?void 0:p.online)??0,total:((o=s.serviceInsight.dataplanes)==null?void 0:o.total)??0},{title:e(()=>[n(c(l(a)("http.api.property.dataPlaneProxies")),1)]),_:1},8,["online","total"])])}}}),P={class:"stack"},G=f({__name:"ServiceDetailView",props:{data:{}},setup(m){const a=m;return(s,g)=>{const v=d("KCard"),p=d("AppView"),o=d("RouteView");return t(),i(o,{name:"service-detail-view",params:{mesh:"",service:""}},{default:e(({route:_})=>[r(p,null,{default:e(()=>[k("div",P,[r(v,null,{default:e(()=>[a.data.serviceType==="external"?(t(),i(b,{key:0,mesh:_.params.mesh,service:_.params.service},null,8,["mesh","service"])):(t(),i(N,{key:1,"service-insight":s.data},null,8,["service-insight"]))]),_:2},1024)])]),_:2},1024)]),_:1})}}});export{G as default};
