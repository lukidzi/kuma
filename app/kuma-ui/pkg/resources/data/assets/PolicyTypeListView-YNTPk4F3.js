import{d as A,a as o,o as a,b as _,w as e,e as i,m as d,f as u,F as y,n as F,t as C,c as r,H as w,D as K,q as T,_ as $}from"./index-VS3FVx2q.js";const q={class:"policy-list-content"},E={class:"policy-count"},H={class:"policy-list"},j=A({__name:"PolicyTypeListView",setup(G){return(J,M)=>{const R=o("RouteTitle"),D=o("RouterLink"),L=o("DataCollection"),B=o("DataLoader"),x=o("KCard"),P=o("RouterView"),m=o("DataSource"),N=o("AppView"),S=o("RouteView");return a(),_(m,{src:"/me"},{default:e(({data:k})=>[k?(a(),_(S,{key:0,name:"policy-list-view",params:{page:1,size:k.pageSize,mesh:"",policyPath:"",policy:""}},{default:e(({route:f,t:z})=>[i(N,null,{title:e(()=>[d("h2",null,[i(R,{title:z("policies.routes.types.title")},null,8,["title"])])]),default:e(()=>[u(),i(m,{src:`/mesh-insights/${f.params.mesh}`},{default:e(({data:t})=>[i(m,{src:"/*/policy-types"},{default:e(({data:c,error:b})=>[d("div",q,[i(x,{class:"policy-type-list","data-testid":"policy-type-list"},{default:e(()=>[i(B,{data:[c],errors:[b]},{default:e(()=>[(a(!0),r(y,null,w([typeof(t==null?void 0:t.policies)>"u"?c.policies:c.policies.filter(s=>{var p,l;return!s.isTargetRefBased&&(((l=(p=t.policies)==null?void 0:p[s.name])==null?void 0:l.total)??0)>0})],s=>(a(),_(L,{key:s,predicate:typeof(t==null?void 0:t.policies)>"u"?void 0:p=>s.length>0||p.isTargetRefBased,items:c.policies},{default:e(({items:p})=>[(a(!0),r(y,null,w([p.find(l=>l.path===f.params.policyPath)],l=>(a(),r(y,{key:l},[(a(!0),r(y,null,w(p,n=>{var V,v;return a(),r("div",{key:n.path,class:F(["policy-type-link-wrapper",{"policy-type-link-wrapper--is-active":l&&l.path===n.path}])},[i(D,{class:"policy-type-link",to:{name:"policy-list-view",params:{mesh:f.params.mesh,policyPath:n.path}},"data-testid":`policy-type-link-${n.name}`},{default:e(()=>[u(C(n.name),1)]),_:2},1032,["to","data-testid"]),u(),d("div",E,C(((v=(V=t==null?void 0:t.policies)==null?void 0:V[n.name])==null?void 0:v.total)??0),1)],2)}),128))],64))),128))]),_:2},1032,["predicate","items"]))),128))]),_:2},1032,["data","errors"])]),_:2},1024),u(),d("div",H,[i(P,null,{default:e(({Component:s})=>[(a(),_(K(s),{"policy-types":c==null?void 0:c.policies},null,8,["policy-types"]))]),_:2},1024)])])]),_:2},1024)]),_:2},1032,["src"])]),_:2},1024)]),_:2},1032,["params"])):T("",!0)]),_:1})}}}),Q=$(j,[["__scopeId","data-v-6ca13c7b"]]);export{Q as default};
