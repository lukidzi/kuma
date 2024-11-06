import{d as J,e as p,o as e,m as d,w as t,a as c,c as o,H as i,J as _,X as M,b as a,t as h,l as S,a4 as K,k as l,p as g,a2 as D,L as q,M as E,q as Y}from"./index-uDOFM6ir.js";import{a as G,A as Q}from"./AccordionList-eCqNi2El.js";import{P as X}from"./PolicyTypeTag-jH-d3CDC.js";import{R as U}from"./RuleMatchers-OsQ19QN9.js";const z=v=>(q("data-v-d86b4bd4"),v=v(),E(),v),W={key:0,class:"rules"},Z=z(()=>l("h3",null,"Rules",-1)),ee={class:"stack-with-borders mt-4"},te={class:"stack-with-borders mt-4"},ae={class:"mt-4"},oe={class:"stack-with-borders"},ne=z(()=>l("dt",null,`
                                          Config
                                        `,-1)),se={class:"mt-2"},re=J({__name:"ConnectionOutboundSummaryOverviewView",props:{data:{},dataplaneOverview:{}},setup(v){const k=v,V=(w,f)=>w.$resourceMeta.name===f.name&&w.$resourceMeta.namespace===f.namespace&&w.$resourceMeta.zone===f.zone&&(f.resourceSectionName===""||w.$resourceMeta.port===f.port);return(w,f)=>{const L=p("XBadge"),R=p("XAction"),O=p("DataCollection"),$=p("XCodeBlock"),N=p("KCard"),x=p("DataLoader"),I=p("DataSource"),j=p("AppView"),F=p("RouteView");return e(),d(F,{params:{mesh:"",dataPlane:"",connection:""},name:"connection-outbound-summary-overview-view"},{default:t(({t:T,route:B,uri:H})=>[c(j,null,{default:t(()=>[(e(!0),o(i,null,_([B.params.connection.replace(/-([a-f0-9]){16}$/,"")],P=>(e(),o("div",{key:P,class:"stack-with-borders"},[c(M,{layout:"horizontal"},{title:t(()=>[a(`
              Protocol
            `)]),body:t(()=>[c(L,{appearance:"info"},{default:t(()=>[a(h(T(`http.api.value.${["grpc","http","tcp"].find(b=>typeof k.data[b]<"u")}`)),1)]),_:2},1024)]),_:2},1024),a(),k.data?(e(),o("div",W,[Z,a(),c(I,{src:"/policy-types"},{default:t(({data:b})=>[(e(!0),o(i,null,_([Object.groupBy((b==null?void 0:b.policies)??[],y=>y.name)],y=>(e(),d(x,{key:typeof y,src:H(S(K),"/meshes/:mesh/rules/for/:dataplane",{mesh:B.params.mesh,dataplane:B.params.dataPlane})},{default:t(({data:A})=>[k.data.$resourceMeta.type!==""?(e(),d(O,{key:0,predicate:u=>u.resourceMeta.type==="Mesh"||V(k.data,u),items:A.toResourceRules},{default:t(({items:u})=>[l("div",ee,[(e(!0),o(i,null,_(Object.groupBy(u,n=>n.type),(n,m)=>(e(),o("div",{key:m},[c(X,{"policy-type":m},{default:t(()=>[a(h(m),1)]),_:2},1032,["policy-type"]),a(),l("div",te,[(e(!0),o(i,null,_(n.length>1?n.filter(s=>V(k.data,s)):n,s=>(e(),o("div",{key:s},[s.origins.length>0?(e(),d(M,{key:0,layout:"horizontal"},{title:t(()=>[a(`
                                      Origin Policies
                                    `)]),body:t(()=>[c(O,{predicate:r=>typeof r.resourceMeta<"u",items:s.origins,empty:!1},{default:t(({items:r})=>[l("ul",null,[(e(!0),o(i,null,_(r,C=>(e(),o("li",{key:JSON.stringify(C)},[Object.keys(y).length>0?(e(),d(R,{key:0,to:{name:"policy-detail-view",params:{policyPath:y[m][0].path,mesh:C.resourceMeta.mesh,policy:C.resourceMeta.name}}},{default:t(()=>[a(h(C.resourceMeta.name),1)]),_:2},1032,["to"])):g("",!0)]))),128))])]),_:2},1032,["predicate","items"])]),_:2},1024)):g("",!0),a(),c($,{class:"mt-2",code:S(D).stringify(s.raw),language:"yaml","show-copy-button":!1},null,8,["code"])]))),128))])]))),128))])]),_:2},1032,["predicate","items"])):(e(),d(O,{key:1,predicate:u=>u.ruleType==="to"&&!["MeshHTTPRoute","MeshTCPRoute"].includes(u.type)&&u.matchers.every(n=>n.key==="kuma.io/service"&&(n.not?n.value!==P:n.value===P)),items:A.rules},{default:t(({items:u})=>[l("div",ae,[c(G,{"initially-open":0,"multiple-open":"",class:"stack"},{default:t(()=>[(e(!0),o(i,null,_(Object.groupBy(u,n=>n.type),(n,m)=>(e(),d(N,{key:m},{default:t(()=>[c(Q,null,{"accordion-header":t(()=>[c(X,{"policy-type":m},{default:t(()=>[a(h(m)+" ("+h(n.length)+`)
                                  `,1)]),_:2},1032,["policy-type"])]),"accordion-content":t(()=>[l("div",oe,[(e(!0),o(i,null,_(n,s=>(e(),o(i,{key:s},[s.matchers.length>0?(e(),d(M,{key:0,layout:"horizontal"},{title:t(()=>[a(`
                                          From
                                        `)]),body:t(()=>[l("p",null,[c(U,{items:s.matchers},null,8,["items"])])]),_:2},1024)):g("",!0),a(),s.origins.length>0?(e(),d(M,{key:1,layout:"horizontal"},{title:t(()=>[a(`
                                          Origin Policies
                                        `)]),body:t(()=>[l("ul",null,[(e(!0),o(i,null,_(s.origins,r=>(e(),o("li",{key:`${r.mesh}-${r.name}`},[y[r.type]?(e(),d(R,{key:0,to:{name:"policy-detail-view",params:{mesh:r.mesh,policyPath:y[r.type][0].path,policy:r.name}}},{default:t(()=>[a(h(r.name),1)]),_:2},1032,["to"])):(e(),o(i,{key:1},[a(h(r.name),1)],64))]))),128))])]),_:2},1024)):g("",!0),a(),l("div",null,[ne,a(),l("dd",se,[l("div",null,[c($,{code:S(D).stringify(s.raw),language:"yaml","show-copy-button":!1},null,8,["code"])])])])],64))),128))])]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)])]),_:2},1032,["predicate","items"]))]),_:2},1032,["src"]))),128))]),_:2},1024)])):g("",!0)]))),128))]),_:2},1024)]),_:1})}}}),ie=Y(re,[["__scopeId","data-v-d86b4bd4"]]);export{ie as default};
