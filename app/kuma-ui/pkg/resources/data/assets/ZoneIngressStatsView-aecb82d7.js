import{E as m}from"./EnvoyData-3f59fe7f.js";import{d as l,a as e,o as u,b as _,w as t,e as o,p as d,f as g}from"./index-eeb8fb94.js";import"./index-52545d1d.js";import"./CodeBlock.vue_vue_type_style_index_0_lang-9954ba89.js";import"./EmptyBlock.vue_vue_type_script_setup_true_lang-15b5853f.js";import"./ErrorBlock-987710fd.js";import"./TextWithCopyButton-aef3169a.js";import"./CopyButton-c9ea289f.js";import"./WarningIcon.vue_vue_type_script_setup_true_lang-30df6cde.js";import"./LoadingBlock.vue_vue_type_script_setup_true_lang-87dc8241.js";const N=l({__name:"ZoneIngressStatsView",setup(h){return(w,f)=>{const s=e("RouteTitle"),a=e("KCard"),r=e("AppView"),i=e("RouteView");return u(),_(i,{name:"zone-ingress-stats-view",params:{zoneIngress:"",codeSearch:""}},{default:t(({route:n,t:p})=>[o(r,null,{title:t(()=>[d("h2",null,[o(s,{title:p("zone-ingresses.routes.item.navigation.zone-ingress-stats-view")},null,8,["title"])])]),default:t(()=>[g(),o(a,null,{body:t(()=>[o(m,{resource:"Zone",src:`/zone-ingresses/${n.params.zoneIngress}/data-path/stats`,query:n.params.codeSearch,onQueryChange:c=>n.update({codeSearch:c})},null,8,["src","query","onQueryChange"])]),_:2},1024)]),_:2},1024)]),_:1})}}});export{N as default};
