import{d as z,x as F,o as e,j as s,h as l,F as m,q as O,i as v,t as g,g as u,w as t,f as I,b as d,z as Ce,e as R,p as fe,m as ge,c as G,A as ke,r as Q,v as se,B as Ee,D as oe,E as Oe,G as Ue,H as Qe,I as Me,J as Ge,K as Ie,L as Le,u as Re}from"./index-574d45b5.js";import{I as ze,c as xe,r as ve,Z as _e}from"./kongponents.es-3b634060.js";import{A as J,a as W}from"./AccordionList-72088eb6.js";import{_ as x}from"./_plugin-vue_export-helper-c27b6911.js";import{_ as Te}from"./CodeBlock.vue_vue_type_style_index_0_lang-45c04b00.js";import{u as X}from"./store-e583704e.js";import{T as q}from"./TagList-913f985e.js";import{_ as De}from"./EmptyBlock.vue_vue_type_script_setup_true_lang-0e5f40af.js";import{E as Be}from"./ErrorBlock-c529b0a4.js";import{_ as we}from"./LoadingBlock.vue_vue_type_script_setup_true_lang-c65e601c.js";import{u as ne,a as Se}from"./index-58b06467.js";import{t as ie}from"./toYaml-4e00099e.js";import{D as te,a as N}from"./DefinitionListItem-73363cac.js";import{E as ae}from"./EnvoyData-c7d3978a.js";import{_ as Ye}from"./ResourceCodeBlock.vue_vue_type_script_setup_true_lang-a885226a.js";import{S as Ne}from"./StatusBadge-08e76456.js";import{_ as He}from"./StatusInfo.vue_vue_type_script_setup_true_lang-3ac53131.js";import{_ as Ke,S as qe}from"./SubscriptionHeader.vue_vue_type_script_setup_true_lang-4ad475fb.js";import{T as je}from"./TabsWidget-9b5362c9.js";import{T as Fe}from"./TextWithCopyButton-ac5e81f5.js";import{_ as Je}from"./WarningsWidget.vue_vue_type_script_setup_true_lang-722c63aa.js";import"./datadogLogEvents-302eea7b.js";import"./QueryParameter-70743f73.js";const H=c=>(fe("data-v-a67bcff4"),c=c(),ge(),c),We={class:"mesh-gateway-policy-list"},Xe=H(()=>v("h3",null,"Gateway policies",-1)),Ve={key:0,class:"policy-list"},Ze=H(()=>v("h3",{class:"mt-6"},`
      Listeners
    `,-1)),$e=H(()=>v("b",null,"Host",-1)),et=H(()=>v("h4",{class:"mt-2"},`
              Routes
            `,-1)),tt={class:"dataplane-policy-header"},at=H(()=>v("b",null,"Route",-1)),st=H(()=>v("b",null,"Service",-1)),nt={key:0,class:"badge-list"},lt={class:"policy-list mt-1"},ot=z({__name:"MeshGatewayDataplanePolicyList",props:{meshGatewayDataplane:{type:Object,required:!0},meshGatewayListenerEntries:{type:Array,required:!0},meshGatewayRoutePolicies:{type:Array,required:!0}},setup(c){const A=c;return(D,C)=>{const T=F("router-link");return e(),s("div",We,[Xe,l(),c.meshGatewayRoutePolicies.length>0?(e(),s("ul",Ve,[(e(!0),s(m,null,O(c.meshGatewayRoutePolicies,(h,f)=>(e(),s("li",{key:f},[v("span",null,g(h.type),1),l(`:

        `),u(T,{to:h.route},{default:t(()=>[l(g(h.name),1)]),_:2},1032,["to"])]))),128))])):I("",!0),l(),Ze,l(),v("div",null,[(e(!0),s(m,null,O(A.meshGatewayListenerEntries,(h,f)=>(e(),s("div",{key:f},[v("div",null,[v("div",null,[$e,l(": "+g(h.hostName)+":"+g(h.port)+" ("+g(h.protocol)+`)
          `,1)]),l(),h.routeEntries.length>0?(e(),s(m,{key:0},[et,l(),u(W,{"initially-open":[],"multiple-open":""},{default:t(()=>[(e(!0),s(m,null,O(h.routeEntries,(r,B)=>(e(),d(J,{key:B},Ce({"accordion-header":t(()=>[v("div",tt,[v("div",null,[v("div",null,[at,l(": "),u(T,{to:r.route},{default:t(()=>[l(g(r.routeName),1)]),_:2},1032,["to"])]),l(),v("div",null,[st,l(": "+g(r.service),1)])]),l(),r.policies.length>0?(e(),s("div",nt,[(e(!0),s(m,null,O(r.policies,(n,y)=>(e(),d(R(ze),{key:`${f}-${y}`},{default:t(()=>[l(g(n.type),1)]),_:2},1024))),128))])):I("",!0)])]),_:2},[r.policies.length>0?{name:"accordion-content",fn:t(()=>[v("ul",lt,[(e(!0),s(m,null,O(r.policies,(n,y)=>(e(),s("li",{key:`${f}-${y}`},[l(g(n.type)+`:

                      `,1),u(T,{to:n.route},{default:t(()=>[l(g(n.name),1)]),_:2},1032,["to"])]))),128))])]),key:"0"}:void 0]),1024))),128))]),_:2},1024)],64)):I("",!0)])]))),128))])])}}});const it=x(ot,[["__scopeId","data-v-a67bcff4"]]),Ae="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAVFBMVEXa2tra2tra2tra2tra2tra2tr////a2toAfd6izPLvzPnRfvDYteSKr86zas0Aar4AhODY6vr3+Prx8v2Kv+9aqOk3muUOj+N5t+211vXhqfW01fXvn55GAAAABnRSTlMC9s/Hbhsvz/I3AAABVklEQVRo3u3b3Y6CMBCG4SJYhnV/KD+K7v3f57bN7AFJTcDUmZB+74lH5EmMA5hmjK+pq1awqm5M6HxqxTudPSzssmxM06rUmDp8DFawIYi1qYRdlisTeCtcMAGnAgwYMGDAgJ8GGPDB4B8frepnl9cZH5d1374E7GmX1WVuA0xzTvixA+5zwpc0/OXrVgU5N/yx6tMHGDBgwIABvxmeiBZhmF3fPMjDFLuOSjDdnBJMvVOAb1G+y8PjlUKdOGyHOcpLJniiDfEVC/FYZYA3unxFx2OVAd7sTjZ073msRGB2Yy7KvcsC2z05Hitx2P6PVTEwf9W/h/5xvTBOB76ByN8ydzRRzofELln1schjVNCrTxyjsl5vtV7ol7L+tAEGDLhMWOAw5ADHPxIHXmpHfAWepgJOBBgwYMCAAT8NMGDAgJOw2hKO2tqR2qKV1mqZ3jKd2vrgH/W3idgykdWgAAAAAElFTkSuQmCC",At="data:image/png;base64,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",ce="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAAD4/042AAAEj0lEQVRoBe1aS28TVxT+7ngydhwnPGISTBKHEB6iUtOWHTvWqCtKqQhISC2vBbCpRDf9BUgsgAWbdlGppWqlSl1UXfMLCmXRqgXUxmCclOCWxI4Tv4Zz7s00BntmLh4rTCSfxJ4755458333fHfuTTQCZFOHTo+ijCs2cAi2nWJfaE2InABuw8Lle7e/eCwYvL2CXwF7a2hBtwQm8iKKdwwe+Y0HnhnRgBN2Q8qmJcPwOxm7EXrNe40jzVfDq38j9HUJvOkqdSvQrUDAEeiIhGaPH8bsyfe1oWQuTuPxhePa8V6BplenTl85tQ2l9A7YMUsnHMsTIyjtm9CK1QkKXIHC3nEI2l3RgqhzPzw/sB/g+A5ZYAKlPTsVFMnCH1Xx3f26XP2TUUQgAuXhJKr9fQqQRgVYPpUtA7IANvQq5sciEIHi7jHKb5OE9DQh5SOvoGs6pKNABJYn06tAaDQ1SLB82DoFnnO1TaA8NIhqIo7IQkFLDI58zPx/WvEMTsfaJlAiPbPF789oiWHxPTX6A3f/kPGdmQEBKlCaGJUE+oiANJ9JvEAEeOL23/ldHvVmjUrt9d1WBSrJLaiRfMzCEqzcU8pPcDzmAMunSk8f699FxP7KqngvVK/R19ZKvDy+Qy5cvQ8z8la2xuhzII8+m9foF9+axOz0YRm3/dbP6PvtoWy7fZm1iIV6tAd1i4+W3BLUrR7Y1Jb+1T7eKqg41ccajj94JPPy4DskaoleZM8cRYmeUGyO1hm0Q6DRz5XMnj2KpV1jTcSYyOTnNzjc1Uw1eCwBpQIFhNWqfvhKCZDPZbCQoGK5eVhz82uJKYjBPDp/DFwhBswZnEcmT3YlnzV/jRbBzKVplFNDTeDXEnu3TLNeBpb44x3o20vksh8fQYU2d1GaF+nr3yBCc6SVOaQyl05gxYm/9rWMf1VCra5v9LU1BxoT/N+mCpSHB2HNzmP05neu4J14ltZKKqnIroLnPta8n2ycHHzsHAGqgPXPM4x8+QOBLzXeo6ntSMsiGaYbwDcFajg6QiA6k0M9EQM/NSJFb/CMqe/PDD0QTKrU976V8uMg3j74ifOg8IsNZX9bC1mYmHQJvOlqBJ7EcUPgw8EELFq5vn1WQKHmPaX6IwIXhzdJ3jfmnmPRJ95vgAJJqJfAf0Tgx3pMpGn7cW5oExIE0M0Y/GepzdgT65EfbrPvVZuKW7g6vlV+uO1lYurgWTtmGHIEo7QYxYhSlM6jlJf9UT6nNvtiBFj5+SjUNeRbrNWpLTBmRSiOc6h8bjfOlquya8TyEQDdN1+t4dOZvFsqXsjU3ob/rqVfMv5iGaijbdORO2ihUlshiqdu5RZ4Uqnix3wRBsWcSiawj/8/xAEqGSd8ye4vV8DS4e3EheEBWYmXAl7zJJTrAMvm1LaEpPLV0wLu8V7NxUJJwAVrS3egSdwy4zo7uwTWecCbbtetQNOQrLPDoOd1bp3v2bnbEXZaN+nFiQ1qjJ3WfFymZdN9rQ4tOcJM2CNzf/+ysH33gVuiLlIkpyTh7Q8tZgbGr9sI8RO9qfIBv27zAiEVYZQrGIvuAAAAAElFTkSuQmCC",re="data:image/png;base64,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",ue="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB5CAYAAADyOOV3AAAFOklEQVR4Ae2dP2tUQRTFp7S385MofgRFiGBhKr9GuqBiI9iktwosCAnRLo0g8Q+ojSaNBomumESTIAqSLiPTTc4k7+bmztudu3sCAztv7p137/nNebtuREMIIXz9eXBluLO/NNzZe8sxCRrsL23tHlxObMP33b3ZzeHO0edv25FjcjRITBPbsPXj12+CnRywOcvENtC9kwk3gU5sQ048vf7775DDsQbIswAc+eNaAQJ2jU8unoBljVxHELBrfHLxBCxr5DqCgF3jk4snYFkj1xEE7BqfXDwByxq5jiBg1/jk4glY1sh1BAG7xicXT8CyRq4jCNg1Prl4ApY1ch1BwK7xycUTsKyR6wgCdo1PLp6AZY1cRxCwa3xy8QQsa+Q6goBd45OLJ2BZI9cRBOwan1w8AcsauY4gYNf45OIJWNbIdQQBu8YnF0/AskauIwjYNT65eAKWNXIdUQD+c2sm5iPemY2mIcnD/bsVMuqTs0yvQ7wQYtXRXb79XtxfpSEB4wH3foCgHwIGQSS+5qeddAOsxzgPOwsLMR9xsBhNQ2qA+3crZNQnZ5le89/o6Jbb3WrxKRovuOuIBR9TAHnSwcfk8T8hYP8MOzsg4E55/C8SsH+GnR0QcKc8/hcJ2D/Dzg4IuFMe/4sE7J9hZwcE3CmP/8WpAzz7cCnm48bdQaw58r3T63H/TB3gcG0+jnIQ8IgVGCXcdK9x/9DBPTuagEesADr43uBFrDlwf217+B5unV+fX4z5mPjfJiGA95vbsebA/bWAMb/6HJ/Z2gJbj0fBasJNe+H+Wj0wv/qcgG2ORiAErFXAGI8AWnfwo5U30TLmHq/GfPA92PiejAdIex4x33oAl9c+xnwQMAFrz2Rb8bUdgg7D/bXdYz7ur53n7k2v6WA6WHsm24qv7RB0FO6v7R7zcX/tnA42OhYFR0AErFXAGI8AEJB1jvtry8V8az2Fg/PvLdNr63ehmK9tuHZ8bQERAO6vrR/zcX/tvACMN6g91zZcOx770QomxeP+2voxX7qftE7A0/YejCeo9lx7omvHYz+SA7TruL+2fszX3h/jCwfn31um15bvQVMuFqxtGN/DrXOsBwWxznF/bb+Yb62nAIwXrDfAgq0N437WubU/zMd6rP3i/to58gx4QbshxtduGPezzrFe6xzrIWBBARSs9twKFPOxPqG9YhnzcX/tHA3bvIOtnwkwXyuYFI+ACoLCBcyX7ietuwMsNTTudQQk8CyWMd/aDwFP25+Dkbj1BOGJLI6scAHzrfX0nY/1Cu0Vy5hvrRd5Nv8ebG2473wEVBAULmC+tV4C5iO6rb9Gaj3RfeejAwXDFsuYb62XDqaD6WCNi9CBhUWFC5ivufdJsXQwHUwHn+SM066hAwXDFsuYf9p9znqdDqaD6zpY+/vc2if6rCf/vHFY77j7HbmDUQDt/LzCjypP248Ub62bgHt+REsApXUCrgzIKqgETLturad3B+PvX61za8N951v7w3xrvb0DthbIfNuHXAJu7BFf+0ATMAHbHhG1TyT30/Ggg+lg3Ymhw9rSiw6mg9s6kXxC6HjQwXSw7sTQYW3pRQfTwW2dSD4hdDzoYDpYd2LosLb0ooPp4LZOJJ8QOh50MB2sOzF0WFt60cF0cFsnkk8IHQ86mA7WnRg6rC296OBpd/Dqu0+Rw68GhYNXXq4f4UXOj//fQ171SGzD8tr60GsDrFs6iOvDcPP+k5mnrzYOKZYklq/1xDSxDWHmwcWr84NLz15v3H7+4csch38NEsvENLH9DwLs1co+Fv2iAAAAAElFTkSuQmCC",pe=""+new URL("Retry-8b2ec896.png",import.meta.url).href,de=""+new URL("Timeout-dcabf0f7.jpg",import.meta.url).href,ye="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAAD4/042AAABYklEQVRoBe2av0oDQRDGZxbRxhfwDRI0NhKtRAhWPkM6Ex9KTOczWElArBRsAuEeIS+QRpvJfJdcqkWRLWYH5or7s7N797v59j4Odph2m4hw//xywsT3JHQqJMddrIajcq2Jaalcs2bx+cTMAi7Grn9xfSI/388kMsJ19RvznA+Pxs3X+yoh867gkV1NNJjBzr3BcKpT5rH6rOcAmR5SO+dzQQdtYE/4YB2w5hGVPdXmNnnSfCvYUz7kpzVewFor9woc/DeDb/OXX4fcjO728b/67jsWnLhXgHtnw/anqCAJpkPdKxAvYDp/9OHhQtYKhAtZKxAuZK1AuJC1AuFC1gqEC1krEC5krUC4kLUC4ULWCoQLWSsQLmStQLhQKFCYAaxSrgvvYTYc7AnL92YEpQ9WdqxSzkrvYzUe7Lwt8rh6dVMn0WVL6yWaxcdtQtUHCidIG7pY9cddsUfL3sF6LbfZAN5wf/+tIkpkAAAAAElFTkSuQmCC",me="data:image/png;base64,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",ct="data:image/png;base64,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",he="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAAD4/042AAAEs0lEQVRoBe1azWtUVxQ/781HkslHzQwpDfkQUUpdaHZtaUtTuhACYtC/wI22FHd+bMSlFNSdIhjcddFNKW0pZlfS0BayEdSFqAjRJMbGfBgTZ+JM8p7nd27ezMvkvsy7yUucAS+898479+P8zj3n3nvembGIy8xMttOhwiVy6RuX3HbwqrVYZE2SRUM2Jc5lMqlxaxX8Hdd109UKWofLsqxZVqLHxszXGngoBMzAbsNtdBrWBI+x29Xu8xtNJLDbGzWohbr3CrxrK8W3A4BtW9SYqqdEQg1fKCzT6+wSOY4bubjIFQD41g+ayLZL3hmrS1KSlZmbX4xciZKUiOYGMw/wfz/M0ldXnsgFGjzURV2sfRceF+3KhwPxCYdDQslhml+ImVq54KKlVwv6v7Pd9GFzXIA/f7Ui/T5qidE/Z3bT1MIyfXn5qfRBhb9/ptGmvv11dOLzFCVi0i3ULe560mVEBr/6lN4igW/+Nr5hRU+u8/TlfdlXqychr9QO8tQUTGcd+ul2TmT98EVK31nDtaamX1aWqukYxGpuaqB69nm4zfk/Xkizi0faqPfjFC29ydPCIoPUlH9H83T61gKlUzbdOt6qaaFnRa6AbhFDtOM4FRfxpzdmxNgj32X0aDXcyHchbJXYbTa1jTIa0502cgXUbLuBrqKZxCJrhffEgP2i2Kac2BYFyoWEfmc0pguyqhRwePusaQu4cW9bDW0z2hYLbDYWcmOmDkTRK6DbRsPGQuJC4SdfWm5bLDQ4sURdv07KBbpSLDT8f55c9oc0hxQmxciFCg7RtUdZ+v1ZnqbfOBIz+WMn0HePdhFCtpMjczSe4w6r9NixdprnffLA4CxzAlwlZlF/d530CXszUuDq4yzdfLqkgh+eKMDwLzuhA+ImAEIc5LCfl3YaNFajtNXZ1N+epFN7w8dBGNNIgd+m8gJgoKeFvs4k0H9daeZEDcrAZ61iBY/GcxfX3T8UPkxAn0rFKBb6ZHhW3OZBbzAI3SIGiDCxUCWwunojCzichPHZXzeefHFtOhbSjrgx00gBHDRhCgK6oLA5TH+TNkYKYAFWWzFSgOSory4VjBRQFgjnRjulptGxJ8FWiA9u7ET4tEy3NssFGrytlO9fLNLMynoXNlOAW1daB942iu/iGKdScIFWuaLNK/FnNk/fTr4kPP3FSIG2es7Gs9P99brgH2MN7eWFBl/lqOv+hFygK8VCawYJeIEFYAm/NYwOsh/ncnR9PldMo3hhgHpCqkWjB7uoPRkX4OMFlRfq5ETP2P4Omswv0557Y3IYKoywiAolpDe/+tNQHi1pm7KpznDcdDHdaBZKnNnVwPGMS78s5mlqhUMGBDUiX7mGCFKkwld+R/PVSwDzrQSf3ZPfMaQKRvCCrBEz+Mm/jaHLumJkgXW9NQwvLwS3OTmByJPjoo409bU0bJgX0gy1htX5RI0F5uFUUmYfVjDaRteMGPCCLDQSuQA81tJRbIVYCHVbKZ7bQAGvRK7AlvJCHirN0z/r/urIXcg/+E7QZWt7J0RGK+O9AtHOp/loHKHwfw9qtAC7zefDUI3i5wOOhmr/zx74ywr+9cE5nZ9rwZ2AEViBGdjfAhPs4mowdpbkAAAAAElFTkSuQmCC",rt=""+new URL("VirtualOutbound-3bb05b70.png",import.meta.url).href,ut={class:"policy-type-tag"},pt=["src"],dt=z({__name:"PolicyTypeTag",props:{policyType:{type:String,required:!0}},setup(c){const A=c,D=X(),C={CircuitBreaker:{iconUrl:Ae},FaultInjection:{iconUrl:At},HealthCheck:{iconUrl:ce},MeshAccessLog:{iconUrl:ye},MeshCircuitBreaker:{iconUrl:Ae},MeshGateway:{iconUrl:null},MeshGatewayRoute:{iconUrl:null},MeshHealthCheck:{iconUrl:ce},MeshProxyPatch:{iconUrl:re},MeshRateLimit:{iconUrl:ue},MeshRetry:{iconUrl:pe},MeshTimeout:{iconUrl:de},MeshTrace:{iconUrl:he},MeshTrafficPermission:{iconUrl:me},ProxyTemplate:{iconUrl:re},RateLimit:{iconUrl:ue},Retry:{iconUrl:pe},Timeout:{iconUrl:de},TrafficLog:{iconUrl:ye},TrafficPermission:{iconUrl:me},TrafficRoute:{iconUrl:ct},TrafficTrace:{iconUrl:he},VirtualOutbound:{iconUrl:rt}},T=G(()=>{const f=D.state.policyTypes.map(r=>{const B=C[r.name]??{iconUrl:null};return[r.name,B]});return Object.fromEntries(f)}),h=G(()=>T.value[A.policyType]);return(f,r)=>(e(),s("span",ut,[h.value.iconUrl!==null?(e(),s("img",{key:0,class:"policy-type-tag-icon",src:h.value.iconUrl,alt:""},null,8,pt)):(e(),d(R(xe),{key:1,icon:"brain",size:"24"})),l(),ke(f.$slots,"default",{},()=>[l(g(A.policyType),1)],!0)]))}});const Pe=x(dt,[["__scopeId","data-v-0052ac03"]]),yt={class:"policy-type-heading"},mt={class:"policy-list"},ht={key:0,class:"origin-list"},ft=z({__name:"PolicyTypeEntryList",props:{id:{type:String,required:!1,default:"entry-list"},policyTypeEntries:{type:Object,required:!0}},setup(c){const A=c,D=[{label:"From",key:"sourceTags"},{label:"To",key:"destinationTags"},{label:"On",key:"name"},{label:"Conf",key:"config"},{label:"Origin policies",key:"origins"}];function C({headerKey:T}){return{class:`cell-${T}`}}return(T,h)=>{const f=F("router-link");return e(),d(W,{"initially-open":[],"multiple-open":""},{default:t(()=>[(e(!0),s(m,null,O(A.policyTypeEntries,(r,B)=>(e(),d(J,{key:B},{"accordion-header":t(()=>[v("h3",yt,[u(Pe,{"policy-type":r.type},{default:t(()=>[l(g(r.type)+" ("+g(r.connections.length)+`)
          `,1)]),_:2},1032,["policy-type"])])]),"accordion-content":t(()=>[v("div",mt,[u(R(ve),{class:"policy-type-table",fetcher:()=>({data:r.connections,total:r.connections.length}),headers:D,"cell-attrs":C,"disable-pagination":"","is-clickable":""},{sourceTags:t(({rowValue:n})=>[n.length>0?(e(),d(q,{key:0,class:"tag-list",tags:n},null,8,["tags"])):(e(),s(m,{key:1},[l(`
                —
              `)],64))]),destinationTags:t(({rowValue:n})=>[n.length>0?(e(),d(q,{key:0,class:"tag-list",tags:n},null,8,["tags"])):(e(),s(m,{key:1},[l(`
                —
              `)],64))]),name:t(({rowValue:n})=>[n!==null?(e(),s(m,{key:0},[l(g(n),1)],64)):(e(),s(m,{key:1},[l(`
                —
              `)],64))]),origins:t(({rowValue:n})=>[n.length>0?(e(),s("ul",ht,[(e(!0),s(m,null,O(n,(y,k)=>(e(),s("li",{key:`${B}-${k}`},[u(f,{to:y.route},{default:t(()=>[l(g(y.name),1)]),_:2},1032,["to"])]))),128))])):(e(),s(m,{key:1},[l(`
                —
              `)],64))]),config:t(({rowValue:n,rowKey:y})=>[n!==null?(e(),d(Te,{key:0,id:`${A.id}-${B}-${y}-code-block`,code:n,language:"yaml","show-copy-button":!1},null,8,["id","code"])):(e(),s(m,{key:1},[l(`
                —
              `)],64))]),_:2},1032,["fetcher"])])]),_:2},1024))),128))]),_:1})}}});const gt=x(ft,[["__scopeId","data-v-e55b8bdf"]]),vt={class:"policy-type-heading"},Tt={class:"policy-list"},Dt={key:1,class:"tag-list-wrapper"},Bt={key:0},wt={key:1},Pt={key:0,class:"list"},bt={key:0,class:"list"},Ct=z({__name:"RuleEntryList",props:{id:{type:String,required:!1,default:"entry-list"},ruleEntries:{type:Object,required:!0}},setup(c){const A=c,D=[{label:"Type",key:"type"},{label:"Addresses",key:"addresses"},{label:"Conf",key:"config"},{label:"Origin policies",key:"origins"}];function C({headerKey:T}){return{class:`cell-${T}`}}return(T,h)=>{const f=F("router-link");return e(),d(W,{"initially-open":[],"multiple-open":""},{default:t(()=>[(e(!0),s(m,null,O(A.ruleEntries,(r,B)=>(e(),d(J,{key:B},{"accordion-header":t(()=>[v("h3",vt,[u(Pe,{"policy-type":r.type},{default:t(()=>[l(g(r.type)+" ("+g(r.connections.length)+`)
          `,1)]),_:2},1032,["policy-type"])])]),"accordion-content":t(()=>[v("div",Tt,[u(R(ve),{class:"policy-type-table",fetcher:()=>({data:r.connections,total:r.connections.length}),headers:D,"cell-attrs":C,"disable-pagination":"","is-clickable":""},{type:t(({rowValue:n})=>[n.sourceTags.length===0&&n.destinationTags.length===0?(e(),s(m,{key:0},[l(`
                —
              `)],64)):(e(),s("div",Dt,[n.sourceTags.length>0?(e(),s("div",Bt,[l(`
                  From

                  `),u(q,{class:"tag-list",tags:n.sourceTags},null,8,["tags"])])):I("",!0),l(),n.destinationTags.length>0?(e(),s("div",wt,[l(`
                  To

                  `),u(q,{class:"tag-list",tags:n.destinationTags},null,8,["tags"])])):I("",!0)]))]),addresses:t(({rowValue:n})=>[n.length>0?(e(),s("ul",Pt,[(e(!0),s(m,null,O(n,(y,k)=>(e(),s("li",{key:`${B}-${k}`},g(y),1))),128))])):(e(),s(m,{key:1},[l(`
                —
              `)],64))]),origins:t(({rowValue:n})=>[n.length>0?(e(),s("ul",bt,[(e(!0),s(m,null,O(n,(y,k)=>(e(),s("li",{key:`${B}-${k}`},[u(f,{to:y.route},{default:t(()=>[l(g(y.name),1)]),_:2},1032,["to"])]))),128))])):(e(),s(m,{key:1},[l(`
                —
              `)],64))]),config:t(({rowValue:n,rowKey:y})=>[n!==null?(e(),d(Te,{key:0,id:`${A.id}-${B}-${y}-code-block`,code:n,language:"yaml","show-copy-button":!1},null,8,["id","code"])):(e(),s(m,{key:1},[l(`
                —
              `)],64))]),_:2},1032,["fetcher"])])]),_:2},1024))),128))]),_:1})}}});const kt=x(Ct,[["__scopeId","data-v-7558548e"]]),be=c=>(fe("data-v-ed201f38"),c=c(),ge(),c),Et=be(()=>v("h2",{class:"visually-hidden"},`
    Policies
  `,-1)),Ot={key:0,class:"mt-2"},Ut=be(()=>v("h2",null,"Rules",-1)),Qt=z({__name:"SidecarDataplanePolicyList",props:{dppName:{type:String,required:!0},policyTypeEntries:{type:Object,required:!0},ruleEntries:{type:Array,required:!0}},setup(c){const A=c;return(D,C)=>(e(),s(m,null,[Et,l(),u(gt,{id:"policies","policy-type-entries":A.policyTypeEntries},null,8,["policy-type-entries"]),l(),c.ruleEntries.length>0?(e(),s("div",Ot,[Ut,l(),u(kt,{id:"rules","rule-entries":A.ruleEntries},null,8,["rule-entries"])])):I("",!0)],64))}});const Mt=x(Qt,[["__scopeId","data-v-ed201f38"]]),Gt={key:2,class:"policies-list"},It={key:3,class:"policies-list"},Lt=z({__name:"DataplanePolicies",props:{dataPlane:{type:Object,required:!0}},setup(c){const A=c,D=ne(),C=X(),T=Q(null),h=Q([]),f=Q([]),r=Q([]),B=Q([]),n=Q(!0),y=Q(null);se(()=>A.dataPlane.name,function(){k()}),k();async function k(){var o,p;y.value=null,n.value=!0,h.value=[],f.value=[],r.value=[],B.value=[];try{if(((p=(o=A.dataPlane.networking.gateway)==null?void 0:o.type)==null?void 0:p.toUpperCase())==="BUILTIN")T.value=await D.getMeshGatewayDataplane({mesh:A.dataPlane.mesh,name:A.dataPlane.name}),r.value=j(T.value),B.value=K(T.value.policies);else{const{items:a}=await D.getSidecarDataplanePolicies({mesh:A.dataPlane.mesh,name:A.dataPlane.name});h.value=V(a??[]);const{items:w}=await D.getDataplaneRules({mesh:A.dataPlane.mesh,name:A.dataPlane.name});f.value=$(w??[])}}catch(i){i instanceof Error?y.value=i:console.error(i)}finally{n.value=!1}}function j(o){const p=[];for(const i of o.listeners)for(const a of i.hosts)for(const w of a.routes){const b=[];for(const U of w.destinations){const M=K(U.policies),P={routeName:w.route,route:{name:"policy-detail-view",params:{mesh:o.gateway.mesh,policyPath:"meshgatewayroutes",policy:w.route}},service:U.tags["kuma.io/service"],policies:M};b.push(P)}p.push({protocol:i.protocol,port:i.port,hostName:a.hostName,routeEntries:b})}return p}function K(o){if(o===void 0)return[];const p=[];for(const i of Object.values(o)){const a=C.state.policyTypesByName[i.type];p.push({type:i.type,name:i.name,route:{name:"policy-detail-view",params:{mesh:i.mesh,policyPath:a.path,policy:i.name}}})}return p}function V(o){const p=new Map;for(const a of o){const{type:w,service:b}=a,U=typeof b=="string"&&b!==""?[{label:"kuma.io/service",value:b}]:[],M=w==="inbound"||w==="outbound"?a.name:null;for(const[P,_]of Object.entries(a.matchedPolicies)){p.has(P)||p.set(P,{type:P,connections:[]});const S=p.get(P),Y=C.state.policyTypesByName[P];for(const le of _){const L=Z(le,Y,a,U,M);S.connections.push(...L)}}}const i=Array.from(p.values());return i.sort((a,w)=>a.type.localeCompare(w.type)),i}function Z(o,p,i,a,w){const b=o.conf&&Object.keys(o.conf).length>0?ie(o.conf):null,M=[{name:o.name,route:{name:"policy-detail-view",params:{mesh:o.mesh,policyPath:p.path,policy:o.name}}}],P=[];if(i.type==="inbound"&&Array.isArray(o.sources))for(const{match:_}of o.sources){const Y={sourceTags:[{label:"kuma.io/service",value:_["kuma.io/service"]}],destinationTags:a,name:w,config:b,origins:M};P.push(Y)}else{const S={sourceTags:[],destinationTags:a,name:w,config:b,origins:M};P.push(S)}return P}function $(o){const p=new Map;for(const a of o){p.has(a.policyType)||p.set(a.policyType,{type:a.policyType,connections:[]});const w=p.get(a.policyType),b=C.state.policyTypesByName[a.policyType],U=E(a,b);w.connections.push(...U)}const i=Array.from(p.values());return i.sort((a,w)=>a.type.localeCompare(w.type)),i}function E(o,p){const{type:i,service:a,subset:w,conf:b}=o,U=w?Object.entries(w):[];let M,P;i==="ClientSubset"?U.length>0?M=U.map(([L,ee])=>({label:L,value:ee})):M=[{label:"kuma.io/service",value:"*"}]:M=[],i==="DestinationSubset"?U.length>0?P=U.map(([L,ee])=>({label:L,value:ee})):typeof a=="string"&&a!==""?P=[{label:"kuma.io/service",value:a}]:P=[{label:"kuma.io/service",value:"*"}]:i==="ClientSubset"&&typeof a=="string"&&a!==""?P=[{label:"kuma.io/service",value:a}]:P=[];const _=o.addresses??[],S=b&&Object.keys(b).length>0?ie(b):null,Y=[];for(const L of o.origins)Y.push({name:L.name,route:{name:"policy-detail-view",params:{mesh:L.mesh,policyPath:p.path,policy:L.name}}});return[{type:{sourceTags:M,destinationTags:P},addresses:_,config:S,origins:Y}]}return(o,p)=>n.value?(e(),d(we,{key:0})):y.value!==null?(e(),d(Be,{key:1,error:y.value},null,8,["error"])):h.value.length>0?(e(),s("div",Gt,[u(Mt,{"dpp-name":c.dataPlane.name,"policy-type-entries":h.value,"rule-entries":f.value},null,8,["dpp-name","policy-type-entries","rule-entries"])])):r.value.length>0&&T.value!==null?(e(),s("div",It,[u(it,{"mesh-gateway-dataplane":T.value,"mesh-gateway-listener-entries":r.value,"mesh-gateway-route-policies":B.value},null,8,["mesh-gateway-dataplane","mesh-gateway-listener-entries","mesh-gateway-route-policies"])])):(e(),d(De,{key:4}))}});const Rt=x(Lt,[["__scopeId","data-v-7f7a5a45"]]),zt={class:"entity-heading"},xt={class:"columns",style:{"--columns":"2"}},_t=["href"],St=z({__name:"DataPlaneDetails",props:{dataPlane:{type:Object,required:!0},dataPlaneOverview:{type:Object,required:!0}},setup(c){const A=c,D=Se(),C=ne(),T=X(),h=[{hash:"#overview",title:"Overview"},{hash:"#insights",title:"DPP Insights"},{hash:"#dpp-policies",title:"Policies"},{hash:"#xds-configuration",title:"XDS Configuration"},{hash:"#envoy-stats",title:"Stats"},{hash:"#envoy-clusters",title:"Clusters"},{hash:"#mtls",title:"Certificate Insights"},{hash:"#warnings",title:"Warnings"}],f=Q([]),r=G(()=>({name:"data-plane-detail-view",params:{mesh:A.dataPlane.mesh,dataPlane:A.dataPlane.name}})),B=G(()=>{const{type:E,name:o,mesh:p}=A.dataPlane;return{type:E,name:o,mesh:p}}),n=G(()=>Ee(A.dataPlane,A.dataPlaneOverview.dataplaneInsight)),y=G(()=>oe(A.dataPlane)),k=G(()=>Oe(A.dataPlaneOverview.dataplaneInsight)),j=G(()=>Ue(A.dataPlaneOverview)),K=G(()=>{var o;const E=Array.from(((o=A.dataPlaneOverview.dataplaneInsight)==null?void 0:o.subscriptions)??[]);return E.reverse(),E}),V=G(()=>f.value.length===0?h.filter(E=>E.hash!=="#warnings"):h);function Z(){var i;const E=((i=A.dataPlaneOverview.dataplaneInsight)==null?void 0:i.subscriptions)??[];if(E.length===0||!("version"in E[0]))return;const o=E[0].version;if(o&&o.kumaDp&&o.envoy){const a=Qe(o);a.kind!==Me&&a.kind!==Ge&&f.value.push(a)}T.getters["config/getMulticlusterStatus"]&&o&&oe(A.dataPlane).find(b=>b.label===Ie)&&typeof o.kumaDp.kumaCpCompatible=="boolean"&&!o.kumaDp.kumaCpCompatible&&f.value.push({kind:Le,payload:{kumaDp:o.kumaDp.version}})}Z();async function $(E){const{mesh:o,name:p}=A.dataPlane;return await C.getDataplaneFromMesh({mesh:o,name:p},E)}return(E,o)=>{const p=F("router-link");return e(),d(je,{tabs:V.value},{tabHeader:t(()=>[v("h1",zt,[l(`
        DPP:

        `),u(Fe,{text:c.dataPlane.name},{default:t(()=>[u(p,{to:r.value},{default:t(()=>[l(g(c.dataPlane.name),1)]),_:1},8,["to"])]),_:1},8,["text"])])]),overview:t(()=>[v("div",xt,[u(te,null,{default:t(()=>[(e(!0),s(m,null,O(B.value,(i,a)=>(e(),d(N,{key:a,term:a},{default:t(()=>[l(g(i),1)]),_:2},1032,["term"]))),128))]),_:1}),l(),u(te,null,{default:t(()=>[y.value.length>0?(e(),d(N,{key:0,term:"Tags"},{default:t(()=>[u(q,{tags:y.value},null,8,["tags"])]),_:1})):I("",!0),l(),n.value.status?(e(),d(N,{key:1,term:"Status"},{default:t(()=>[u(Ne,{status:n.value.status},null,8,["status"])]),_:1})):I("",!0),l(),n.value.reason.length>0?(e(),d(N,{key:2,term:"Reason"},{default:t(()=>[(e(!0),s(m,null,O(n.value.reason,(i,a)=>(e(),s("div",{key:a,class:"reason"},g(i),1))),128))]),_:1})):I("",!0),l(),k.value!==null?(e(),d(N,{key:3,term:"Dependencies"},{default:t(()=>[v("ul",null,[(e(!0),s(m,null,O(k.value,(i,a)=>(e(),s("li",{key:a,class:"tag-cols"},g(a)+": "+g(i),1))),128))])]),_:1})):I("",!0)]),_:1})]),l(),u(Ye,{id:"code-block-data-plane",class:"mt-4","resource-fetcher":$,"resource-fetcher-watch-key":A.dataPlane.name,"is-searchable":""},null,8,["resource-fetcher-watch-key"])]),insights:t(()=>[u(He,{"is-empty":K.value.length===0},{default:t(()=>[u(W,{"initially-open":0},{default:t(()=>[(e(!0),s(m,null,O(K.value,(i,a)=>(e(),d(J,{key:a},{"accordion-header":t(()=>[u(Ke,{details:i},null,8,["details"])]),"accordion-content":t(()=>[u(qe,{details:i,"is-discovery-subscription":""},null,8,["details"])]),_:2},1024))),128))]),_:1})]),_:1},8,["is-empty"])]),"dpp-policies":t(()=>[u(Rt,{"data-plane":c.dataPlane},null,8,["data-plane"])]),"xds-configuration":t(()=>[u(ae,{"data-path":"xds",mesh:c.dataPlane.mesh,"dpp-name":c.dataPlane.name,"query-key":"envoy-data-data-plane"},null,8,["mesh","dpp-name"])]),"envoy-stats":t(()=>[u(ae,{"data-path":"stats",mesh:c.dataPlane.mesh,"dpp-name":c.dataPlane.name,"query-key":"envoy-data-data-plane"},null,8,["mesh","dpp-name"])]),"envoy-clusters":t(()=>[u(ae,{"data-path":"clusters",mesh:c.dataPlane.mesh,"dpp-name":c.dataPlane.name,"query-key":"envoy-data-data-plane"},null,8,["mesh","dpp-name"])]),mtls:t(()=>[j.value===null?(e(),d(R(_e),{key:0,appearance:"danger"},{alertMessage:t(()=>[l(`
          This data plane proxy does not yet have mTLS configured —
          `),v("a",{href:`${R(D)("KUMA_DOCS_URL")}/policies/mutual-tls/?${R(D)("KUMA_UTM_QUERY_PARAMS")}`,class:"external-link",target:"_blank"},`
            Learn About Certificates in `+g(R(D)("KUMA_PRODUCT_NAME")),9,_t)]),_:1})):(e(),d(te,{key:1},{default:t(()=>[(e(!0),s(m,null,O(j.value,(i,a)=>(e(),d(N,{key:a,term:a},{default:t(()=>[l(g(i),1)]),_:2},1032,["term"]))),128))]),_:1}))]),warnings:t(()=>[u(Je,{warnings:f.value},null,8,["warnings"])]),_:1},8,["tabs"])}}});const Yt=x(St,[["__scopeId","data-v-5286c759"]]),Nt={class:"kcard-border"},pa=z({__name:"DataPlaneDetailView",setup(c){const A=ne(),D=Re(),C=X(),T=Q(null),h=Q(null),f=Q(!0),r=Q(null);async function B(){r.value=null,f.value=!0;const n=D.params.mesh,y=D.params.dataPlane;try{T.value=await A.getDataplaneFromMesh({mesh:n,name:y}),h.value=await A.getDataplaneOverviewFromMesh({mesh:n,name:y})}catch(k){T.value=null,k instanceof Error?r.value=k:console.error(k)}finally{f.value=!1}}return se(()=>D.params.mesh,function(){D.name==="data-plane-detail-view"&&B()}),se(()=>D.params.dataPlane,function(){D.name==="data-plane-detail-view"&&B()}),B(),C.dispatch("updatePageTitle",D.params.dataPlane),(n,y)=>(e(),s("div",Nt,[f.value?(e(),d(we,{key:0})):r.value!==null?(e(),d(Be,{key:1,error:r.value},null,8,["error"])):T.value===null||h.value===null?(e(),d(De,{key:2})):(e(),d(Yt,{key:3,"data-plane":T.value,"data-plane-overview":h.value},null,8,["data-plane","data-plane-overview"]))]))}});export{pa as default};
