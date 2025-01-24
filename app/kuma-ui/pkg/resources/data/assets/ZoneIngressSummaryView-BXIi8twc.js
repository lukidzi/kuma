import{d as F,r as p,o as d,q as c,w as e,b as r,m,t as i,e as t,c as u,K as f,L as C,Q as L,R as g,S as M,s as x,_ as N}from"./index-U3igbuyl.js";import{_ as Z}from"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-DqTPb1Kg.js";const $={key:0,class:"stack-with-borders","data-testid":"structured-view"},q={key:1},Q={class:"mt-4"},T=F({__name:"ZoneIngressSummaryView",props:{items:{}},setup(S){const I=S;return(K,o)=>{const v=p("XEmptyState"),w=p("RouteTitle"),b=p("XAction"),E=p("XSelect"),z=p("XLayout"),h=p("XCopyButton"),R=p("DataSource"),V=p("AppView"),X=p("DataCollection"),A=p("RouteView");return d(),c(A,{name:"zone-ingress-summary-view",params:{zoneIngress:"",codeSearch:"",codeFilter:!1,codeRegExp:!1,format:"structured"}},{default:e(({route:l,t:n})=>[r(X,{items:I.items,predicate:y=>y.id===l.params.zoneIngress,find:!0},{empty:e(()=>[r(v,null,{title:e(()=>[m("h2",null,i(n("common.collection.summary.empty_title",{type:"ZoneIngress"})),1)]),default:e(()=>[o[0]||(o[0]=t()),m("p",null,i(n("common.collection.summary.empty_message",{type:"ZoneIngress"})),1)]),_:2},1024)]),default:e(({items:y})=>[(d(!0),u(f,null,C([y[0]],a=>(d(),c(V,{key:a.id},{title:e(()=>[m("h2",null,[r(b,{to:{name:"zone-ingress-detail-view",params:{zone:a.zoneIngress.zone,zoneIngress:a.id}}},{default:e(()=>[r(w,{title:n("zone-ingresses.routes.item.title",{name:a.name})},null,8,["title"])]),_:2},1032,["to"])])]),default:e(()=>[o[10]||(o[10]=t()),r(z,{type:"stack"},{default:e(()=>[m("header",null,[r(z,{type:"separated",size:"max"},{default:e(()=>[m("h3",null,i(n("zone-ingresses.routes.item.config")),1),o[1]||(o[1]=t()),m("div",null,[r(E,{label:n("zone-ingresses.routes.items.format"),selected:l.params.format,onChange:s=>{l.update({format:s})}},L({_:2},[C(["structured","yaml"],s=>({name:`${s}-option`,fn:e(()=>[t(i(n(`zone-ingresses.routes.items.formats.${s}`)),1)])}))]),1032,["label","selected","onChange"])])]),_:2},1024)]),o[9]||(o[9]=t()),l.params.format==="structured"?(d(),u("div",$,[r(g,{layout:"horizontal"},{title:e(()=>[t(i(n("http.api.property.status")),1)]),body:e(()=>[r(M,{status:a.state},null,8,["status"])]),_:2},1024),o[6]||(o[6]=t()),a.namespace.length>0?(d(),c(g,{key:0,layout:"horizontal"},{title:e(()=>[t(i(n("data-planes.routes.item.namespace")),1)]),body:e(()=>[t(i(a.namespace),1)]),_:2},1024)):x("",!0),o[7]||(o[7]=t()),r(g,{layout:"horizontal"},{title:e(()=>[t(i(n("http.api.property.address")),1)]),body:e(()=>[a.zoneIngress.socketAddress.length>0?(d(),c(h,{key:0,text:a.zoneIngress.socketAddress},null,8,["text"])):(d(),u(f,{key:1},[t(i(n("common.detail.none")),1)],64))]),_:2},1024),o[8]||(o[8]=t()),r(g,{layout:"horizontal"},{title:e(()=>[t(i(n("http.api.property.advertisedAddress")),1)]),body:e(()=>[a.zoneIngress.advertisedSocketAddress.length>0?(d(),c(h,{key:0,text:a.zoneIngress.advertisedSocketAddress},null,8,["text"])):(d(),u(f,{key:1},[t(i(n("common.detail.none")),1)],64))]),_:2},1024)])):(d(),u("div",q,[m("div",Q,[r(Z,{resource:a.config,"is-searchable":"",query:l.params.codeSearch,"is-filter-mode":l.params.codeFilter,"is-reg-exp-mode":l.params.codeRegExp,onQueryChange:s=>l.update({codeSearch:s}),onFilterModeChange:s=>l.update({codeFilter:s}),onRegExpModeChange:s=>l.update({codeRegExp:s})},{default:e(({copy:s,copying:B})=>[B?(d(),c(R,{key:0,src:`/zone-ingresses/${l.params.zoneIngress}/as/kubernetes?no-store`,onChange:_=>{s(k=>k(_))},onError:_=>{s((k,D)=>D(_))}},null,8,["src","onChange","onError"])):x("",!0)]),_:2},1032,["resource","query","is-filter-mode","is-reg-exp-mode","onQueryChange","onFilterModeChange","onRegExpModeChange"])])]))]),_:2},1024)]),_:2},1024))),128))]),_:2},1032,["items","predicate"])]),_:1})}}}),H=N(T,[["__scopeId","data-v-cf676183"]]);export{H as default};