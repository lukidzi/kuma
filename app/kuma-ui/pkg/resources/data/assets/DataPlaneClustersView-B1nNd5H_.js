import{q as C,e as a,o as h,m as x,w as o,a as t,b as r}from"./index-CKcsX_-l.js";const R={};function w(V,s){const c=a("RouteTitle"),d=a("XAction"),l=a("XCodeBlock"),p=a("DataLoader"),i=a("KCard"),m=a("AppView"),_=a("RouteView");return h(),x(_,{name:"data-plane-clusters-view",params:{mesh:"",dataPlane:"",codeSearch:"",codeFilter:!1,codeRegExp:!1}},{default:o(({route:e,t:u})=>[t(m,null,{default:o(()=>[t(c,{render:!1,title:u("data-planes.routes.item.navigation.data-plane-clusters-view")},null,8,["title"]),s[1]||(s[1]=r()),t(i,null,{default:o(()=>[t(p,{src:`/meshes/${e.params.mesh}/dataplanes/${e.params.dataPlane}/data-path/clusters`},{default:o(({data:f,refresh:g})=>[t(l,{language:"json",code:f,"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:n=>e.update({codeSearch:n}),onFilterModeChange:n=>e.update({codeFilter:n}),onRegExpModeChange:n=>e.update({codeRegExp:n})},{"primary-actions":o(()=>[t(d,{action:"refresh",appearance:"primary",onClick:g},{default:o(()=>s[0]||(s[0]=[r(`
                Refresh
              `)])),_:2},1032,["onClick"])]),_:2},1032,["code","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1032,["src"])]),_:2},1024)]),_:2},1024)]),_:1})}const y=C(R,[["render",w]]);export{y as default};
