import{d as w,r as o,o as R,p as k,w as n,b as t,e as d,m as y,$ as V}from"./index-Ch1waQC_.js";const E=w({__name:"ConnectionOutboundSummaryStatsView",props:{networking:{},routeName:{}},setup(p){const c=p;return(S,s)=>{const i=o("RouteTitle"),m=o("XAction"),l=o("XCodeBlock"),u=o("DataCollection"),_=o("DataLoader"),f=o("AppView"),g=o("RouteView");return R(),k(g,{params:{codeSearch:"",codeFilter:!1,codeRegExp:!1,mesh:"",dataPlane:"",connection:""},name:c.routeName},{default:n(({route:e,uri:C})=>[t(i,{render:!1,title:"Stats"}),s[1]||(s[1]=d()),t(f,null,{default:n(()=>[t(_,{src:C(y(V),"/meshes/:mesh/dataplanes/:name/stats/:address",{mesh:e.params.mesh,name:e.params.dataPlane,address:c.networking.inboundAddress})},{default:n(({data:h,refresh:x})=>[t(u,{items:h.raw.split(`
`),predicate:r=>r.includes(`.${e.params.connection}.`)},{default:n(({items:r})=>[t(l,{language:"json",code:r.map(a=>a.replace(`${e.params.connection}.`,"")).join(`
`),"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:a=>e.update({codeSearch:a}),onFilterModeChange:a=>e.update({codeFilter:a}),onRegExpModeChange:a=>e.update({codeRegExp:a})},{"primary-actions":n(()=>[t(m,{action:"refresh",appearance:"primary",onClick:x},{default:n(()=>s[0]||(s[0]=[d(`
                Refresh
              `)])),_:2},1032,["onClick"])]),_:2},1032,["code","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1032,["items","predicate"])]),_:2},1032,["src"])]),_:2},1024)]),_:1},8,["name"])}}});export{E as default};