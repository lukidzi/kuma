import{d as C,a as n,o as w,b as x,w as t,e as o,m as c,f as r,a4 as v,p as R}from"./index-VS3FVx2q.js";import{C as y}from"./CodeBlock-OxYcIgo-.js";const E=C({__name:"ConnectionOutboundSummaryStatsView",props:{dataplaneOverview:{}},setup(p){const i=p;return(V,k)=>{const d=n("RouteTitle"),l=n("KButton"),m=n("DataCollection"),u=n("DataLoader"),_=n("AppView"),f=n("RouteView");return w(),x(f,{params:{codeSearch:"",codeFilter:!1,codeRegExp:!1,mesh:"",dataPlane:"",service:""},name:"connection-outbound-summary-stats-view"},{default:t(({route:e})=>[o(_,null,{title:t(()=>[c("h3",null,[o(d,{title:"Stats"})])]),default:t(()=>[r(),c("div",null,[o(u,{src:`/meshes/${e.params.mesh}/dataplanes/${e.params.dataPlane}/stats/${i.dataplaneOverview.dataplane.networking.address}`},{default:t(({data:h,refresh:g})=>[o(m,{items:h.raw.split(`
`),predicate:s=>s.includes(`.${e.params.service}.`)},{default:t(({items:s})=>[o(y,{language:"json",code:s.map(a=>a.replace(`${e.params.service}.`,"")).join(`
`),"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:a=>e.update({codeSearch:a}),onFilterModeChange:a=>e.update({codeFilter:a}),onRegExpModeChange:a=>e.update({codeRegExp:a})},{"primary-actions":t(()=>[o(l,{appearance:"primary",onClick:g},{default:t(()=>[o(R(v)),r(`

                  Refresh
                `)]),_:2},1032,["onClick"])]),_:2},1032,["code","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1032,["items","predicate"])]),_:2},1032,["src"])])]),_:2},1024)]),_:1})}}});export{E as default};
