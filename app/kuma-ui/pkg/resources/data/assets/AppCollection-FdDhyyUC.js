import{d as A,l as B,o as c,c as d,e as k,p as l,K,a4 as V,f as n,m as E,r as b,t as m,_ as L,Q as F,B as u,J as P,a5 as S,b as v,U as z,w as r,F as I,q as x,X as U,z as j,a0 as H,D as W,a6 as X,a7 as J}from"./index-ZzOj224k.js";const Q=["href"],Z=A({__name:"DocumentationLink",props:{href:{}},setup(f){const{t:h}=B(),y=f;return(e,C)=>(c(),d("a",{class:"docs-link",href:y.href,target:"_blank"},[k(l(V),{size:l(K)},null,8,["size"]),n(),E("span",null,[b(e.$slots,"default",{},()=>[n(m(l(h)("common.documentation")),1)],!0)])],8,Q))}}),G=L(Z,[["__scopeId","data-v-b5a70c14"]]),Y={key:0,class:"app-collection-toolbar"},D=5,ee=A({__name:"AppCollection",props:{isSelectedRow:{type:[Function,null],default:null},total:{default:0},pageNumber:{default:0},pageSize:{default:30},items:{},headers:{},error:{default:void 0},emptyStateTitle:{default:void 0},emptyStateMessage:{default:void 0},emptyStateCtaTo:{default:void 0},emptyStateCtaText:{default:void 0}},emits:["change"],setup(f,{emit:h}){const{t:y}=B(),e=f,C=h,M=F(),N=u(e.items),T=u(0),g=u(0),_=u(e.pageNumber),$=u(e.pageSize),O=P(()=>{const a=e.headers.filter(t=>["details","warnings","actions"].includes(t.key));if(a.length>4)return"initial";const s=100-a.length*D,o=e.headers.length-a.length;return`calc(${s}% / ${o})`});S(()=>e.items,(a,s)=>{a!==s&&(T.value++,N.value=e.items)}),S(()=>e.pageNumber,function(){e.pageNumber!==_.value&&g.value++}),S(()=>e.headers,function(){g.value++});function R(a){if(!a)return{};const s={};return e.isSelectedRow!==null&&e.isSelectedRow(a)&&(s.class="is-selected"),s}const q=a=>{const s=a.target.closest("tr");if(s){const o=["td:first-child a","[data-action]"].reduce((t,i)=>t===null?s.querySelector(i):t,null);o!==null&&o.closest("tr, li")===s&&o.click()}};return(a,s)=>{var o;return c(),v(l(J),{key:g.value,class:"app-collection",style:X(`--column-width: ${O.value}; --special-column-width: ${D}%;`),"has-error":typeof e.error<"u","pagination-total-items":e.total,"initial-fetcher-params":{page:e.pageNumber,pageSize:e.pageSize},headers:e.headers,"fetcher-cache-key":String(T.value),fetcher:({page:t,pageSize:i,query:w})=>{const p={};return _.value!==t&&(p.page=t),$.value!==i&&(p.size=i),_.value=t,$.value=i,Object.keys(p).length>0&&C("change",p),{data:N.value}},"cell-attrs":({headerKey:t})=>({class:`${t}-column`}),"row-attrs":R,"disable-sorting":"","disable-pagination":e.pageNumber===0,"hide-pagination-when-optional":"","onRow:click":q},z({_:2},[((o=e.items)==null?void 0:o.length)===0?{name:"empty-state",fn:r(()=>[k(H,null,z({title:r(()=>[n(m(e.emptyStateTitle??l(y)("common.emptyState.title")),1)]),default:r(()=>[n(),e.emptyStateMessage?(c(),d(I,{key:0},[n(m(e.emptyStateMessage),1)],64)):x("",!0),n()]),_:2},[e.emptyStateCtaTo?{name:"action",fn:r(()=>[typeof e.emptyStateCtaTo=="string"?(c(),v(G,{key:0,href:e.emptyStateCtaTo},{default:r(()=>[n(m(e.emptyStateCtaText),1)]),_:1},8,["href"])):(c(),v(l(U),{key:1,appearance:"primary",to:e.emptyStateCtaTo},{default:r(()=>[k(l(j)),n(" "+m(e.emptyStateCtaText),1)]),_:1},8,["to"]))]),key:"0"}:void 0]),1024)]),key:"0"}:void 0,W(Object.keys(l(M)),t=>({name:t,fn:r(({row:i,rowValue:w})=>[t==="toolbar"?(c(),d("div",Y,[b(a.$slots,"toolbar",{},void 0,!0)])):(c(),d(I,{key:1},[(e.items??[]).length>0?b(a.$slots,t,{key:0,row:i,rowValue:w},void 0,!0):x("",!0)],64))])}))]),1032,["style","has-error","pagination-total-items","initial-fetcher-params","headers","fetcher-cache-key","fetcher","cell-attrs","disable-pagination"])}}}),ae=L(ee,[["__scopeId","data-v-765f6ee2"]]);export{ae as A,G as D};