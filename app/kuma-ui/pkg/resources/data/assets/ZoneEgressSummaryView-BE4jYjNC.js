import{d as L,r as i,o as m,q as c,w as e,b as a,m as p,t as d,e as s,c as y,K as z,L as C,Q as M,R as f,S as N,s as h,_ as Z}from"./index-U3igbuyl.js";import{_ as $}from"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-DqTPb1Kg.js";const q={key:1},Q={class:"mt-4"},T=L({__name:"ZoneEgressSummaryView",props:{items:{}},setup(k){const x=k;return(I,o)=>{const S=i("XEmptyState"),w=i("RouteTitle"),b=i("XAction"),R=i("XSelect"),u=i("XLayout"),V=i("XCopyButton"),X=i("DataSource"),v=i("AppView"),B=i("DataCollection"),A=i("RouteView");return m(),c(A,{name:"zone-egress-summary-view",params:{zoneEgress:"",codeSearch:"",codeFilter:!1,codeRegExp:!1,format:"structured"}},{default:e(({route:n,t:r})=>[a(B,{items:x.items,predicate:g=>g.id===n.params.zoneEgress,find:!0},{empty:e(()=>[a(S,null,{title:e(()=>[p("h2",null,d(r("common.collection.summary.empty_title",{type:"ZoneEgress"})),1)]),default:e(()=>[o[0]||(o[0]=s()),p("p",null,d(r("common.collection.summary.empty_message",{type:"ZoneEgress"})),1)]),_:2},1024)]),default:e(({items:g})=>[(m(!0),y(z,null,C([g[0]],l=>(m(),c(v,{key:l.id},{title:e(()=>[p("h2",null,[a(b,{to:{name:"zone-egress-detail-view",params:{zone:l.zoneEgress.zone,zoneEgress:l.id}}},{default:e(()=>[a(w,{title:r("zone-egresses.routes.item.title",{name:l.name})},null,8,["title"])]),_:2},1032,["to"])])]),default:e(()=>[o[8]||(o[8]=s()),a(u,{type:"stack"},{default:e(()=>[p("header",null,[a(u,{type:"separated",size:"max"},{default:e(()=>[p("h3",null,d(r("zone-ingresses.routes.item.config")),1),o[1]||(o[1]=s()),p("div",null,[a(R,{label:r("zone-ingresses.routes.items.format"),selected:n.params.format,onChange:t=>{n.update({format:t})}},M({_:2},[C(["structured","yaml"],t=>({name:`${t}-option`,fn:e(()=>[s(d(r(`zone-ingresses.routes.items.formats.${t}`)),1)])}))]),1032,["label","selected","onChange"])])]),_:2},1024)]),o[7]||(o[7]=s()),n.params.format==="structured"?(m(),c(u,{key:0,type:"stack",class:"stack-with-borders","data-testid":"structured-view"},{default:e(()=>[a(f,{layout:"horizontal"},{title:e(()=>[s(d(r("http.api.property.status")),1)]),body:e(()=>[a(N,{status:l.state},null,8,["status"])]),_:2},1024),o[5]||(o[5]=s()),l.namespace.length>0?(m(),c(f,{key:0,layout:"horizontal"},{title:e(()=>[s(d(r("data-planes.routes.item.namespace")),1)]),body:e(()=>[s(d(l.namespace),1)]),_:2},1024)):h("",!0),o[6]||(o[6]=s()),a(f,{layout:"horizontal"},{title:e(()=>[s(d(r("http.api.property.address")),1)]),body:e(()=>[l.zoneEgress.socketAddress.length>0?(m(),c(V,{key:0,text:l.zoneEgress.socketAddress},null,8,["text"])):(m(),y(z,{key:1},[s(d(r("common.detail.none")),1)],64))]),_:2},1024)]),_:2},1024)):(m(),y("div",q,[p("div",Q,[a($,{resource:l.config,"is-searchable":"",query:n.params.codeSearch,"is-filter-mode":n.params.codeFilter,"is-reg-exp-mode":n.params.codeRegExp,onQueryChange:t=>n.update({codeSearch:t}),onFilterModeChange:t=>n.update({codeFilter:t}),onRegExpModeChange:t=>n.update({codeRegExp:t})},{default:e(({copy:t,copying:D})=>[D?(m(),c(X,{key:0,src:`/zone-egresses/${n.params.zoneEgress}/as/kubernetes?no-store`,onChange:_=>{t(E=>E(_))},onError:_=>{t((E,F)=>F(_))}},null,8,["src","onChange","onError"])):h("",!0)]),_:2},1032,["resource","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])])]))]),_:2},1024)]),_:2},1024))),128))]),_:2},1032,["items","predicate"])]),_:1})}}}),G=Z(T,[["__scopeId","data-v-18152b37"]]);export{G as default};