import{q as h,e as a,o as g,m as C,w as o,a as t,b as c}from"./index-uDOFM6ir.js";const x={};function R(w,V){const s=a("RouteTitle"),r=a("XAction"),d=a("XCodeBlock"),l=a("DataLoader"),p=a("KCard"),i=a("AppView"),m=a("RouteView");return g(),C(m,{name:"data-plane-clusters-view",params:{mesh:"",dataPlane:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:o(({route:e,t:_})=>[t(i,null,{default:o(()=>[t(s,{render:!1,title:_("data-planes.routes.item.navigation.data-plane-clusters-view")},null,8,["title"]),c(),t(p,null,{default:o(()=>[t(l,{src:`/meshes/${e.params.mesh}/dataplanes/${e.params.dataPlane}/data-path/clusters`},{default:o(({data:u,refresh:f})=>[t(d,{language:"json",code:u,"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:n=>e.update({codeSearch:n}),onFilterModeChange:n=>e.update({codeFilter:n}),onRegExpModeChange:n=>e.update({codeRegExp:n})},{"primary-actions":o(()=>[t(r,{action:"refresh",appearance:"primary",onClick:f},{default:o(()=>[c(`
                Refresh
              `)]),_:2},1032,["onClick"])]),_:2},1032,["code","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1032,["src"])]),_:2},1024)]),_:2},1024)]),_:1})}const y=h(x,[["render",R]]);export{y as default};
