import{d as v,a as i,o,b as r,w as e,E as h,V as x,t as m,f as p,e as s,F as w,c as z,U as C,q as g,K as V,p as S,_ as b}from"./index-x388g6ZS.js";import{A as E}from"./AppCollection-rwblJMZf.js";const A=v({__name:"ExternalServiceListView",setup(B){return(L,N)=>{const d=i("RouterLink"),k=i("KCard"),y=i("AppView"),_=i("DataSource"),f=i("RouteView");return o(),r(_,{src:"/me"},{default:e(({data:u})=>[u?(o(),r(f,{key:0,name:"external-service-list-view",params:{page:1,size:u.pageSize,mesh:""}},{default:e(({route:t,t:l})=>[s(_,{src:`/meshes/${t.params.mesh}/external-services?page=${t.params.page}&size=${t.params.size}`},{default:e(({data:n,error:c})=>[s(y,null,{default:e(()=>[s(k,null,{default:e(()=>[c!==void 0?(o(),r(h,{key:0,error:c},null,8,["error"])):(o(),r(E,{key:1,class:"external-service-collection","data-testid":"external-service-collection","empty-state-message":l("common.emptyState.message",{type:"External Services"}),"empty-state-cta-to":l("external-services.href.docs"),"empty-state-cta-text":l("common.documentation"),headers:[{label:"Name",key:"name"},{label:"Address",key:"address"},{label:"Details",key:"details",hideLabel:!0}],"page-number":t.params.page,"page-size":t.params.size,total:n==null?void 0:n.total,items:n==null?void 0:n.items,error:c,onChange:t.update},{name:e(({row:a})=>[s(x,{text:a.name},{default:e(()=>[s(d,{to:{name:"external-service-detail-view",params:{mesh:a.mesh,service:a.name},query:{page:t.params.page,size:t.params.size}}},{default:e(()=>[p(m(a.name),1)]),_:2},1032,["to"])]),_:2},1032,["text"])]),address:e(({row:a})=>[a.networking.address?(o(),r(x,{key:0,text:a.networking.address},null,8,["text"])):(o(),z(w,{key:1},[p(m(l("common.collection.none")),1)],64))]),details:e(({row:a})=>[s(d,{class:"details-link","data-testid":"details-link",to:{name:"external-service-detail-view",params:{mesh:a.mesh,service:a.name}}},{default:e(()=>[p(m(l("common.collection.details_link"))+" ",1),s(g(C),{display:"inline-block",decorative:"",size:g(V)},null,8,["size"])]),_:2},1032,["to"])]),_:2},1032,["empty-state-message","empty-state-cta-to","empty-state-cta-text","page-number","page-size","total","items","error","onChange"]))]),_:2},1024)]),_:2},1024)]),_:2},1032,["src"])]),_:2},1032,["params"])):S("",!0)]),_:1})}}}),K=b(A,[["__scopeId","data-v-3c780ff7"]]);export{K as default};
