import{d as D,z as M,o as u,b as N,k as a,t as o,A as e,j as t,_ as T,Q as b,i as r,a as v,w as c,g as w,E as V,e as x}from"./index-DJJJbhb4.js";import{_ as A}from"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-LPxexqbV.js";import{p as I}from"./kong-icons.es249-B2cFYeBL.js";import"./CodeBlock-BBaehSk1.js";import"./toYaml-DB9FPXFY.js";const $={class:"date-status"},j=D({__name:"ResourceDateStatus",props:{creationTime:{},modificationTime:{}},setup(l){const{t:s}=M(),n=l;return(i,g)=>(u(),N("span",$,[a(o(e(s)("common.detail.created"))+": "+o(e(s)("common.formats.datetime",{value:Date.parse(n.creationTime)}))+" "+o()+" ",1),t(e(I)),a(" "+o(e(s)("common.detail.modified"))+":"+o(e(s)("common.formats.datetime",{value:Date.parse(n.modificationTime)})),1)]))}}),y=T(j,[["__scopeId","data-v-785cac69"]]),z={class:"stack"},Q={class:"date-status-wrapper"},q=D({__name:"MeshDetailView",props:{mesh:{}},setup(l){const s=l,n=b();return(i,g)=>{const k=r("RouteTitle"),_=r("DataSource"),C=r("AppView"),S=r("RouteView");return u(),v(S,{name:"mesh-detail-view",params:{mesh:""}},{default:c(({route:d,t:R,uri:h})=>[t(k,{title:R("meshes.routes.overview.title"),render:!1},null,8,["title"]),a(),t(C,null,{default:c(()=>[w("div",z,[t(_,{src:h(e(V),"/mesh-insights/:name",{name:d.params.mesh})},{default:c(({data:m})=>[t(e(n),{mesh:s.mesh,"mesh-insight":m},null,8,["mesh","mesh-insight"])]),_:2},1032,["src"]),a(),t(A,{resource:i.mesh.config},{default:c(({copy:m,copying:B})=>[B?(u(),v(_,{key:0,src:h(e(V),"/meshes/:name/as/kubernetes",{name:d.params.mesh},{cacheControl:"no-store"}),onChange:p=>{m(f=>f(p))},onError:p=>{m((f,E)=>E(p))}},null,8,["src","onChange","onError"])):x("",!0)]),_:2},1032,["resource"]),a(),w("div",Q,[t(y,{"creation-time":i.mesh.creationTime,"modification-time":i.mesh.modificationTime},null,8,["creation-time","modification-time"])])])]),_:2},1024)]),_:1})}}}),L=T(q,[["__scopeId","data-v-3b0f5e65"]]);export{L as default};