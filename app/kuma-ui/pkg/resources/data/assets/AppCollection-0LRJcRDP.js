import{d as I,l as x,o as u,c as M,e as _,q as o,K as A,a5 as q,f as i,m as B,r as S,t as m,_ as D,S as K,C as r,M as P,a6 as w,b as g,X as N,w as l,V as E,J as j,a2 as H,H as J,a7 as U,a8 as W}from"./index-2mpecEEN.js";const F=["href"],X=I({__name:"DocumentationLink",props:{href:{}},setup(f){const{t:p}=x(),h=f;return(e,v)=>(u(),M("a",{class:"docs-link",href:h.href,target:"_blank"},[_(o(q),{size:o(A),title:o(p)("common.documentation")},null,8,["size","title"]),i(),B("span",null,[S(e.$slots,"default",{},()=>[i(m(o(p)("common.documentation")),1)],!0)])],8,F))}}),Z=D(X,[["__scopeId","data-v-1e7645ce"]]),G={key:0,class:"app-collection-toolbar"},z=5,Q=I({__name:"AppCollection",props:{isSelectedRow:{type:[Function,null],default:null},total:{default:0},pageNumber:{default:0},pageSize:{default:30},items:{},headers:{},error:{default:void 0},emptyStateTitle:{default:void 0},emptyStateMessage:{default:void 0},emptyStateCtaTo:{default:void 0},emptyStateCtaText:{default:void 0}},emits:["change"],setup(f,{emit:p}){const{t:h}=x(),e=f,v=p,L=K(),k=r(e.items),b=r(0),C=r(0),y=r(e.pageNumber),T=r(e.pageSize),O=P(()=>{const t=e.headers.filter(s=>["details","warnings","actions"].includes(s.key));if(t.length>4)return"initial";const a=100-t.length*z,n=e.headers.length-t.length;return`calc(${a}% / ${n})`});w(()=>e.items,(t,a)=>{t!==a&&(b.value++,k.value=e.items)}),w(()=>e.pageNumber,function(){e.pageNumber!==y.value&&C.value++});function R(t){if(!t)return{};const a={};return e.isSelectedRow!==null&&e.isSelectedRow(t)&&(a.class="is-selected"),a}const V=t=>{const a=t.target.closest("tr");if(a){const n=a.querySelector("td:first-child a");n!==null&&n.closest("tr, li")===a&&n.click()}};return(t,a)=>{var n;return u(),g(o(W),{key:C.value,class:"app-collection",style:U(`--column-width: ${O.value}; --special-column-width: ${z}%;`),"has-error":typeof e.error<"u","pagination-total-items":e.total,"initial-fetcher-params":{page:e.pageNumber,pageSize:e.pageSize},headers:e.headers,"fetcher-cache-key":String(b.value),fetcher:({page:s,pageSize:c,query:$})=>{const d={};return y.value!==s&&(d.page=s),T.value!==c&&(d.size=c),y.value=s,T.value=c,Object.keys(d).length>0&&v("change",d),{data:k.value}},"cell-attrs":({headerKey:s})=>({class:`${s}-column`}),"row-attrs":R,"disable-sorting":"","disable-pagination":e.pageNumber===0,"hide-pagination-when-optional":"","onRow:click":V},N({_:2},[((n=e.items)==null?void 0:n.length)===0?{name:"empty-state",fn:l(()=>[_(H,null,N({default:l(()=>[i(m(e.emptyStateTitle??o(h)("common.emptyState.title"))+" ",1),i()]),_:2},[e.emptyStateMessage?{name:"message",fn:l(()=>[i(m(e.emptyStateMessage),1)]),key:"0"}:void 0,e.emptyStateCtaTo?{name:"cta",fn:l(()=>[typeof e.emptyStateCtaTo=="string"?(u(),g(Z,{key:0,href:e.emptyStateCtaTo},{default:l(()=>[i(m(e.emptyStateCtaText),1)]),_:1},8,["href"])):(u(),g(o(E),{key:1,appearance:"primary",to:e.emptyStateCtaTo},{default:l(()=>[_(o(j),{size:o(A)},null,8,["size"]),i(" "+m(e.emptyStateCtaText),1)]),_:1},8,["to"]))]),key:"1"}:void 0]),1024)]),key:"0"}:void 0,J(Object.keys(o(L)),s=>({name:s,fn:l(({row:c,rowValue:$})=>[s==="toolbar"?(u(),M("div",G,[S(t.$slots,"toolbar",{},void 0,!0)])):S(t.$slots,s,{key:1,row:c,rowValue:$},void 0,!0)])}))]),1032,["style","has-error","pagination-total-items","initial-fetcher-params","headers","fetcher-cache-key","fetcher","cell-attrs","disable-pagination"])}}}),ee=D(Q,[["__scopeId","data-v-7c15c2a2"]]);export{ee as A,Z as D};
