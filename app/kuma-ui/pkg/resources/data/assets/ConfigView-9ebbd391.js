import{d as g,Q as k,r as e,o as s,i as n,w as o,j as r,p as w,n as z,E as V,x as h,k as v}from"./index-9e09c995.js";import{_ as C}from"./ResourceCodeBlock.vue_vue_type_style_index_0_lang-692e94e7.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-5aea095c.js";import"./toYaml-4e00099e.js";const K=g({__name:"ConfigView",setup(E){const i=k();return(x,y)=>{const u=e("RouteTitle"),l=e("DataSource"),_=e("KCard"),p=e("AppView"),m=e("RouteView");return s(),n(m,{name:"zone-egress-config-view",params:{zoneEgress:""}},{default:o(({route:t,t:d})=>[r(p,null,{title:o(()=>[w("h2",null,[r(u,{title:d("zone-egresses.routes.item.navigation.zone-egress-config-view"),render:!0},null,8,["title"])])]),default:o(()=>[z(),r(_,null,{body:o(()=>[r(l,{src:`/zone-egresses/${t.params.zoneEgress}`},{default:o(({data:a,error:c})=>[c!==void 0?(s(),n(V,{key:0,error:c},null,8,["error"])):a===void 0?(s(),n(h,{key:1})):(s(),n(C,{key:2,id:"code-block-zone-egress",resource:a,"resource-fetcher":f=>v(i).getZoneEgress({name:t.params.zoneEgress},f),"is-searchable":""},null,8,["resource","resource-fetcher"]))]),_:2},1032,["src"])]),_:2},1024)]),_:2},1024)]),_:1})}}});export{K as default};
