var ie=Object.defineProperty;var le=(o,i,a)=>i in o?ie(o,i,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[i]=a;var K=(o,i,a)=>(le(o,typeof i!="symbol"?i+"":i,a),a);import{d as oe,c as M,r as re,o as p,a as z,w as y,z as ae,h as w,g as d,t as _,e as k,F as E,b as v,L as ue,v as P,V as ce,D as de,H as pe,K as me,j as D,I as X,q as T,O as fe,P as ge,n as ee,s as ve,f as G,k as ye,A as he,p as be,m as ke}from"./index-d1d97159.js";import{A as _e}from"./AppCollection-e319d9a2.js";import{e as Se,g as Te,S as we,f as ne}from"./RouteView.vue_vue_type_script_setup_true_lang-3fa7796e.js";import{d as Ce,a as Ae,c as De,C as xe,e as Ne}from"./dataplane-30467516.js";function Ie(o){return o!=null}const Ue=oe({__name:"DataPlaneList",props:{total:{default:0},pageNumber:{},pageSize:{},items:{},error:{},gateways:{type:Boolean,default:!1}},emits:["load-data","change"],setup(o,{emit:i}){const a=o,h=Se(),{t:n,formatIsoDate:u}=Te(),c=M(()=>h.getters["config/getMulticlusterStatus"]);function b(m){return m.map(r=>{var R,I,A,q,t,l;const S=r.mesh,s=r.name,C=((R=r.dataplane.networking.gateway)==null?void 0:R.type)||"STANDARD",$={name:C==="STANDARD"?"data-plane-detail-view":"gateway-detail-view",params:{mesh:S,dataPlane:s}},V=["kuma.io/protocol","kuma.io/service","kuma.io/zone"],x=Ce(r.dataplane).filter(e=>V.includes(e.label)),U=(I=x.find(e=>e.label==="kuma.io/service"))==null?void 0:I.value,O=(A=x.find(e=>e.label==="kuma.io/protocol"))==null?void 0:A.value,N=(q=x.find(e=>e.label==="kuma.io/zone"))==null?void 0:q.value;let F;U!==void 0&&(F={name:"service-detail-view",params:{mesh:S,service:U}});let j;N!==void 0&&(j={name:"zone-cp-detail-view",params:{zone:N}});const{status:B}=Ae(r.dataplane,r.dataplaneInsight),Q=((t=r.dataplaneInsight)==null?void 0:t.subscriptions)??[],H={totalUpdates:0,totalRejectedUpdates:0,dpVersion:null,envoyVersion:null,selectedTime:NaN,selectedUpdateTime:NaN,version:null},f=Q.reduce((e,g)=>{var J,W;if(g.connectTime){const Y=Date.parse(g.connectTime);(!e.selectedTime||Y>e.selectedTime)&&(e.selectedTime=Y)}const Z=Date.parse(g.status.lastUpdateTime);return Z&&(!e.selectedUpdateTime||Z>e.selectedUpdateTime)&&(e.selectedUpdateTime=Z),{totalUpdates:e.totalUpdates+parseInt(g.status.total.responsesSent??"0",10),totalRejectedUpdates:e.totalRejectedUpdates+parseInt(g.status.total.responsesRejected??"0",10),dpVersion:((J=g.version)==null?void 0:J.kumaDp.version)||e.dpVersion,envoyVersion:((W=g.version)==null?void 0:W.envoy.version)||e.envoyVersion,selectedTime:e.selectedTime,selectedUpdateTime:e.selectedUpdateTime,version:g.version||e.version}},H),L={name:s,detailViewRoute:$,type:C,zone:{title:N??n("common.collection.none"),route:j},service:{title:U??n("common.collection.none"),route:F},protocol:O??n("common.collection.none"),status:B,totalUpdates:f.totalUpdates,totalRejectedUpdates:f.totalRejectedUpdates,envoyVersion:f.envoyVersion??n("common.collection.none"),warnings:[],lastUpdated:f.selectedUpdateTime?u(new Date(f.selectedUpdateTime).toUTCString()):n("common.collection.none"),lastConnected:f.selectedTime?u(new Date(f.selectedTime).toUTCString()):n("common.collection.none"),overview:r};if(f.version){const{kind:e}=De(f.version);e!==xe&&L.warnings.push(e)}return c.value&&f.dpVersion&&x.find(g=>g.label===me)&&typeof((l=f.version)==null?void 0:l.kumaDp.kumaCpCompatible)=="boolean"&&!f.version.kumaDp.kumaCpCompatible&&L.warnings.push(Ne),L})}return(m,r)=>{const S=re("RouterLink");return p(),z(_e,{"empty-state-title":v(n)("common.emptyState.title"),"empty-state-message":v(n)("common.emptyState.message",{type:a.gateways?"Gateways":"Data Plane Proxies"}),headers:[{label:"Name",key:"name"},a.gateways?{label:"Type",key:"type"}:void 0,{label:"Service",key:"service"},a.gateways?void 0:{label:"Protocol",key:"protocol"},c.value?{label:"Zone",key:"zone"}:void 0,{label:"Last Updated",key:"lastUpdated"},{label:"Status",key:"status"},{label:"Warnings",key:"warnings",hideLabel:!0},{label:"Actions",key:"actions",hideLabel:!0}].filter(v(Ie)),"page-number":a.pageNumber,"page-size":a.pageSize,total:a.total,items:a.items?b(a.items):void 0,error:a.error,onChange:r[0]||(r[0]=s=>i("change",s))},{toolbar:y(()=>[ae(m.$slots,"toolbar",{},void 0,!0)]),name:y(({row:s})=>[w(S,{to:{name:a.gateways?"gateway-detail-view":"data-plane-detail-view",params:{dataPlane:s.name}},"data-testid":"detail-view-link"},{default:y(()=>[d(_(s.name),1)]),_:2},1032,["to"])]),service:y(({rowValue:s})=>[s.route?(p(),z(S,{key:0,to:s.route},{default:y(()=>[d(_(s.title),1)]),_:2},1032,["to"])):(p(),k(E,{key:1},[d(_(s.title),1)],64))]),zone:y(({rowValue:s})=>[s.route?(p(),z(S,{key:0,to:s.route},{default:y(()=>[d(_(s.title),1)]),_:2},1032,["to"])):(p(),k(E,{key:1},[d(_(s.title),1)],64))]),status:y(({rowValue:s})=>[s?(p(),z(we,{key:0,status:s},null,8,["status"])):(p(),k(E,{key:1},[d(_(v(n)("common.collection.none")),1)],64))]),warnings:y(({rowValue:s})=>[s.length>0?(p(),z(v(ue),{key:0,label:v(n)("data-planes.list.version_mismatch")},{default:y(()=>[w(v(P),{class:"mr-1",icon:"warning",color:"var(--black-500)","secondary-color":"var(--yellow-300)",size:"20","hide-title":""})]),_:1},8,["label"])):(p(),k(E,{key:1},[d(`
         
      `)],64))]),actions:y(({row:s})=>[w(v(ce),{class:"actions-dropdown","kpop-attributes":{placement:"bottomEnd",popoverClasses:"mt-5 more-actions-popover"},width:"150"},{default:y(()=>[w(v(de),{class:"non-visual-button",appearance:"secondary",size:"small"},{icon:y(()=>[w(v(P),{color:"var(--black-400)",icon:"more",size:"16"})]),_:1})]),items:y(()=>[w(v(pe),{item:{to:{name:a.gateways?"gateway-detail-view":"data-plane-detail-view",params:{dataPlane:s.name}},label:v(n)("common.collection.actions.view")}},null,8,["item"])]),_:2},1024)]),_:3},8,["empty-state-title","empty-state-message","headers","page-number","page-size","total","items","error"])}}});const ot=ne(Ue,[["__scopeId","data-v-66c9dcb2"]]);function Le(o,i,a){return Math.max(i,Math.min(o,a))}const ze=["ControlLeft","ControlRight","ShiftLeft","ShiftRight","AltLeft"];class Me{constructor(i,a){K(this,"commands");K(this,"keyMap");K(this,"boundTriggerShortcuts");this.commands=a,this.keyMap=Object.fromEntries(Object.entries(i).map(([h,n])=>[h.toLowerCase(),n])),this.boundTriggerShortcuts=this.triggerShortcuts.bind(this)}registerListener(){document.addEventListener("keydown",this.boundTriggerShortcuts)}unRegisterListener(){document.removeEventListener("keydown",this.boundTriggerShortcuts)}triggerShortcuts(i){Ee(i,this.keyMap,this.commands)}}function Ee(o,i,a){const h=Pe(o.code),n=[o.ctrlKey?"ctrl":"",o.shiftKey?"shift":"",o.altKey?"alt":"",h].filter(b=>b!=="").join("+"),u=i[n];if(!u)return;const c=a[u];c.isAllowedContext&&!c.isAllowedContext(o)||(c.shouldPreventDefaultAction&&o.preventDefault(),!(c.isDisabled&&c.isDisabled())&&c.trigger(o))}function Pe(o){return ze.includes(o)?"":o.replace(/^Key/,"").toLowerCase()}function Fe(o,i){const a=" "+o,h=a.matchAll(/ ([-\s\w]+):\s*/g),n=[];for(const u of Array.from(h)){if(u.index===void 0)continue;const c=je(u[1]);if(i.length>0&&!i.includes(c))throw new Error(`Unknown field “${c}”. Known fields: ${i.join(", ")}`);const b=u.index+u[0].length,m=a.substring(b);let r;if(/^\s*["']/.test(m)){const s=m.match(/['"](.*?)['"]/);if(s!==null)r=s[1];else throw new Error(`Quote mismatch for field “${c}”.`)}else{const s=m.indexOf(" "),C=s===-1?m.length:s;r=m.substring(0,C)}r!==""&&n.push([c,r])}return n}function je(o){return o.trim().replace(/\s+/g,"-").replace(/-[a-z]/g,(i,a)=>a===0?i:i.substring(1).toUpperCase())}let te=0;const Be=(o="unique")=>(te++,`${o}-${te}`),se=o=>(be("data-v-121f7a4c"),o=o(),ke(),o),Re=se(()=>T("span",{class:"visually-hidden"},"Focus filter",-1)),qe=["for"],Ke=["id","placeholder"],$e={key:0,class:"k-suggestion-box","data-testid":"k-filter-bar-suggestion-box"},Ve={class:"k-suggestion-list"},Oe={key:0,class:"k-filter-bar-error"},Qe={key:0},He=["title","data-filter-field"],Ze={class:"visually-hidden"},Ge=se(()=>T("span",{class:"visually-hidden"},"Clear query",-1)),Je=oe({__name:"KFilterBar",props:{id:{type:String,required:!1,default:()=>Be("k-filter-bar")},fields:{type:Object,required:!0},placeholder:{type:String,required:!1,default:null},query:{type:String,required:!1,default:""}},emits:["fields-change"],setup(o,{emit:i}){const a=o,h=D(null),n=D(null),u=D(a.query),c=D([]),b=D(null),m=D(!1),r=D(-1),S=M(()=>Object.keys(a.fields)),s=M(()=>Object.entries(a.fields).slice(0,5).map(([t,l])=>({fieldName:t,...l}))),C=M(()=>S.value.length>0?`Filter by ${S.value.join(", ")}`:"Filter"),$=M(()=>a.placeholder??C.value);X(()=>c.value,function(t,l){q(t,l)||(b.value=null,i("fields-change",{fields:t,query:u.value}))}),X(()=>u.value,function(){u.value===""&&(b.value=null),m.value=!0});const V={Enter:"submitQuery",Escape:"closeSuggestionBox",ArrowDown:"jumpToNextSuggestion",ArrowUp:"jumpToPreviousSuggestion"},x={submitQuery:{trigger:N,isAllowedContext(t){return n.value!==null&&t.composedPath().includes(n.value)},shouldPreventDefaultAction:!0},jumpToNextSuggestion:{trigger:F,isAllowedContext(t){return n.value!==null&&t.composedPath().includes(n.value)},shouldPreventDefaultAction:!0},jumpToPreviousSuggestion:{trigger:j,isAllowedContext(t){return n.value!==null&&t.composedPath().includes(n.value)},shouldPreventDefaultAction:!0},closeSuggestionBox:{trigger:I,isAllowedContext(t){return h.value!==null&&t.composedPath().includes(h.value)}}};function U(){const t=new Me(V,x);ye(function(){t.registerListener()}),he(function(){t.unRegisterListener()}),A(u.value)}U();function O(t){const l=t.target;A(l.value)}function N(){if(n.value instanceof HTMLInputElement)if(r.value===-1)A(n.value.value),m.value=!1;else{const t=s.value[r.value].fieldName;t&&f(n.value,t)}}function F(){B(1)}function j(){B(-1)}function B(t){r.value=Le(r.value+t,-1,s.value.length-1)}function Q(){n.value instanceof HTMLInputElement&&n.value.focus()}function H(t){const e=t.currentTarget.getAttribute("data-filter-field");e&&n.value instanceof HTMLInputElement&&f(n.value,e)}function f(t,l){const e=u.value===""||u.value.endsWith(" ")?"":" ";u.value+=e+l+":",t.focus(),r.value=-1}function L(){u.value="",n.value instanceof HTMLInputElement&&(n.value.value="",n.value.focus(),A(""))}function R(t){t.relatedTarget===null&&I(),h.value instanceof HTMLElement&&t.relatedTarget instanceof Node&&!h.value.contains(t.relatedTarget)&&I()}function I(){m.value=!1}function A(t){b.value=null;try{const l=Fe(t,S.value);l.sort((e,g)=>e[0].localeCompare(g[0])),c.value=l}catch(l){if(l instanceof Error)b.value=l,m.value=!0;else throw l}}function q(t,l){return JSON.stringify(t)===JSON.stringify(l)}return(t,l)=>(p(),k("div",{ref_key:"filterBar",ref:h,class:"k-filter-bar","data-testid":"k-filter-bar"},[T("button",{class:"k-focus-filter-input-button",title:"Focus filter",type:"button","data-testid":"k-filter-bar-focus-filter-input-button",onClick:Q},[Re,d(),w(v(P),{"aria-hidden":"true",class:"k-filter-icon",color:"var(--grey-400)","data-testid":"k-filter-bar-filter-icon","hide-title":"",icon:"filter",size:"20"})]),d(),T("label",{for:`${a.id}-filter-bar-input`,class:"visually-hidden"},[ae(t.$slots,"default",{},()=>[d(_(C.value),1)],!0)],8,qe),d(),fe(T("input",{id:`${a.id}-filter-bar-input`,ref_key:"filterInput",ref:n,"onUpdate:modelValue":l[0]||(l[0]=e=>u.value=e),class:"k-filter-bar-input",type:"text",placeholder:$.value,"data-testid":"k-filter-bar-filter-input",onFocus:l[1]||(l[1]=e=>m.value=!0),onBlur:R,onChange:O},null,40,Ke),[[ge,u.value]]),d(),m.value?(p(),k("div",$e,[T("div",Ve,[b.value!==null?(p(),k("p",Oe,_(b.value.message),1)):(p(),k("button",{key:1,class:ee(["k-submit-query-button",{"k-submit-query-button-is-selected":r.value===-1}]),title:"Submit query",type:"button","data-testid":"k-filter-bar-submit-query-button",onClick:N},`
          Submit `+_(u.value),3)),d(),(p(!0),k(E,null,ve(s.value,(e,g)=>(p(),k("div",{key:`${a.id}-${g}`,class:ee(["k-suggestion-list-item",{"k-suggestion-list-item-is-selected":r.value===g}])},[T("b",null,_(e.fieldName),1),e.description!==""?(p(),k("span",Qe,": "+_(e.description),1)):G("",!0),d(),T("button",{class:"k-apply-suggestion-button",title:`Add ${e.fieldName}:`,type:"button","data-filter-field":e.fieldName,"data-testid":"k-filter-bar-apply-suggestion-button",onClick:H},[T("span",Ze,"Add "+_(e.fieldName)+":",1),d(),w(v(P),{"aria-hidden":"true",color:"currentColor","hide-title":"",icon:"chevronRight",size:"16"})],8,He)],2))),128))])])):G("",!0),d(),u.value!==""?(p(),k("button",{key:1,class:"k-clear-query-button",title:"Clear query",type:"button","data-testid":"k-filter-bar-clear-query-button",onClick:L},[Ge,d(),w(v(P),{"aria-hidden":"true",color:"currentColor",icon:"clear","hide-title":"",size:"20"})])):G("",!0)],512))}});const at=ne(Je,[["__scopeId","data-v-121f7a4c"]]);export{ot as D,at as K};
