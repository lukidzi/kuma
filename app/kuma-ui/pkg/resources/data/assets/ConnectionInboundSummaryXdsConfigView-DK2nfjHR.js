import{d as x,r as a,o as y,q as R,w as n,b as t,e as d,p as w,Y as V,t as b}from"./index-U3igbuyl.js";const E=x({__name:"ConnectionInboundSummaryXdsConfigView",props:{data:{},routeName:{}},setup(i){const s=i;return(k,r)=>{const p=a("RouteTitle"),l=a("XAction"),m=a("XCodeBlock"),u=a("DataLoader"),_=a("AppView"),g=a("RouteView");return y(),R(g,{params:{codeSearch:"",codeFilter:!1,codeRegExp:!1,mesh:"",dataPlane:"",connection:""},name:s.routeName},{default:n(({t:c,route:e,uri:f})=>[t(p,{render:!1,title:c("connections.routes.item.navigation.xds")},null,8,["title"]),r[0]||(r[0]=d()),t(_,null,{default:n(()=>[t(u,{src:f(w(V),"/meshes/:mesh/dataplanes/:dataplane/inbound/:inbound/xds",{mesh:e.params.mesh,dataplane:e.params.dataPlane,inbound:`${s.data.port}`})},{default:n(({data:h,refresh:C})=>[t(m,{language:"json",code:JSON.stringify(h,null,2),"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:o=>e.update({codeSearch:o}),onFilterModeChange:o=>e.update({codeFilter:o}),onRegExpModeChange:o=>e.update({codeRegExp:o})},{"primary-actions":n(()=>[t(l,{action:"refresh",appearance:"primary",onClick:C},{default:n(()=>[d(b(c("common.refresh")),1)]),_:2},1032,["onClick"])]),_:2},1032,["code","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1032,["src"])]),_:2},1024)]),_:1},8,["name"])}}});export{E as default};