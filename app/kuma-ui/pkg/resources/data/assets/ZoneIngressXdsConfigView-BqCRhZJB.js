import{d as h,e as n,o as x,m as V,w as s,a,b as t,l as E,at as R}from"./index-uDOFM6ir.js";const z=h({__name:"ZoneIngressXdsConfigView",setup(w){return(k,y)=>{const c=n("RouteTitle"),d=n("XCheckbox"),l=n("XAction"),r=n("XCodeBlock"),i=n("DataLoader"),p=n("KCard"),m=n("AppView"),_=n("RouteView");return x(),V(_,{name:"zone-ingress-xds-config-view",params:{zoneIngress:"",codeSearch:"",codeFilter:!1,codeRegExp:!1,includeEds:!1}},{default:s(({route:e,t:u,uri:g})=>[a(c,{render:!1,title:u("zone-ingresses.routes.item.navigation.zone-ingress-xds-config-view")},null,8,["title"]),t(),a(m,null,{default:s(()=>[a(p,null,{default:s(()=>[a(i,{src:g(E(R),"/zone-ingresses/:name/xds/:endpoints",{name:e.params.zoneIngress,endpoints:String(e.params.includeEds)})},{default:s(({data:f,refresh:C})=>[a(r,{language:"json",code:JSON.stringify(f,null,2),"is-searchable":"",query:e.params.codeSearch,"is-filter-mode":e.params.codeFilter,"is-reg-exp-mode":e.params.codeRegExp,onQueryChange:o=>e.update({codeSearch:o}),onFilterModeChange:o=>e.update({codeFilter:o}),onRegExpModeChange:o=>e.update({codeRegExp:o})},{"primary-actions":s(()=>[a(d,{modelValue:e.params.includeEds,"onUpdate:modelValue":o=>e.params.includeEds=o,label:"Include Endpoints"},null,8,["modelValue","onUpdate:modelValue"]),t(),a(l,{action:"refresh",appearance:"primary",onClick:C},{default:s(()=>[t(`
                Refresh
              `)]),_:2},1032,["onClick"])]),_:2},1032,["code","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])]),_:2},1032,["src"])]),_:2},1024)]),_:2},1024)]),_:1})}}});export{z as default};
