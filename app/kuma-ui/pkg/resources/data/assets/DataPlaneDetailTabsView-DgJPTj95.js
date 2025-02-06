import{d as G,x as H,r as o,o as d,q as b,w as t,b as a,p as S,Y as A,T as N,e as n,m as f,Z as K,c as w,M as X,N as V,t as h,s as C,I as Q,_ as W}from"./index-DRTqvjTb.js";const ee=["onSubmit"],te=["disabled"],ae={key:0},oe={key:0},ne=G({__name:"DataPlaneDetailTabsView",props:{mesh:{}},setup(U){const E=U,s=H({eds:!1,xds:!0,clusters:!0,stats:!0,dataplane:!0,policies:!0}),I=k=>async e=>{const p=document.createElement("a");p.download=e.name,p.href=e.url,setTimeout(()=>{window.URL.revokeObjectURL(p.href)},6e4),await Promise.resolve(),p.click(),await Promise.resolve(),k()};return(k,e)=>{const p=o("RouteTitle"),M=o("XCopyButton"),x=o("XAction"),D=o("XI18n"),T=o("XCheckbox"),P=o("XAlert"),g=o("DataLoader"),O=o("XLayout"),$=o("XModal"),B=o("XDisclosure"),j=o("XTeleportTemplate"),q=o("XTabs"),F=o("RouterView"),J=o("AppView"),Y=o("DataSource"),Z=o("RouteView");return d(),b(Z,{name:"data-plane-detail-tabs-view",params:{mesh:"",proxy:""}},{default:t(({route:l,t:i,uri:R})=>[a(Y,{src:R(S(A),"/meshes/:mesh/dataplane-overviews/:name",{mesh:l.params.mesh,name:l.params.proxy})},{default:t(({data:m,error:z})=>[a(J,{breadcrumbs:[{to:{name:"mesh-detail-view",params:{mesh:l.params.mesh}},text:l.params.mesh},{to:{name:"data-plane-list-view",params:{mesh:l.params.mesh}},text:i("data-planes.routes.item.breadcrumbs")}]},N({actions:t(()=>[a(B,null,{default:t(({expanded:v,toggle:r})=>[a(x,{appearance:"primary",onClick:r},{default:t(()=>e[1]||(e[1]=[n(`
              Download Bundle
            `)])),_:2},1032,["onClick"]),e[6]||(e[6]=n()),v?(d(),b(j,{key:0,to:{name:"modal-layer"}},{default:t(()=>[a(B,null,{default:t(({expanded:y,toggle:L})=>[f("form",{onSubmit:K(L,["prevent"])},[a($,{title:i("data-planes.routes.item.download.title"),onCancel:r},{"footer-actions":t(()=>[a(O,{type:"separated"},{default:t(()=>[(d(!0),w(X,null,V([I(r)],u=>(d(),b(g,{key:typeof u,variant:"spinner",src:y?R(S(A),"/meshes/:mesh/dataplanes/:name/as/tarball/:spec",{mesh:l.params.mesh,name:l.params.proxy,spec:JSON.stringify(s.value)},{cacheControl:"no-cache"}):"",onChange:u,onError:L},{error:t(()=>[a(P,{appearance:"warning","show-icon":""},{default:t(()=>[a(D,{t:"data-planes.routes.item.download.error"})]),_:1})]),_:2},1032,["src","onChange","onError"]))),128)),e[4]||(e[4]=n()),a(x,{appearance:"primary",type:"submit",disabled:y||Object.values(s.value).every(u=>!u)},{default:t(()=>[n(h(i("data-planes.routes.item.download.action")),1)]),_:2},1032,["disabled"])]),_:2},1024)]),default:t(()=>[f("fieldset",{disabled:y},[a(D,{path:"data-planes.routes.item.download.description"}),e[3]||(e[3]=n()),f("ul",null,[(d(!0),w(X,null,V(s.value,(u,c)=>(d(),w(X,{key:typeof u},[c!=="eds"?(d(),w("li",ae,[a(T,{modelValue:s.value[c],"onUpdate:modelValue":_=>s.value[c]=_,onChange:_=>{c==="xds"&&!_&&(s.value.eds=!1)}},{default:t(()=>[n(h(i(`data-planes.routes.item.download.options.${c}`)),1)]),_:2},1032,["modelValue","onUpdate:modelValue","onChange"]),e[2]||(e[2]=n()),c==="xds"?(d(),w("ul",oe,[f("li",null,[a(T,{modelValue:s.value.eds,"onUpdate:modelValue":e[0]||(e[0]=_=>s.value.eds=_),disabled:!s.value.xds},{default:t(()=>[n(h(i("data-planes.routes.item.download.options.eds")),1)]),_:2},1032,["modelValue","disabled"])])])):C("",!0)])):C("",!0)],64))),128))])],8,te),e[5]||(e[5]=n())]),_:2},1032,["title","onCancel"])],40,ee)]),_:2},1024)]),_:2},1024)):C("",!0)]),_:2},1024)]),default:t(()=>[e[8]||(e[8]=n()),e[9]||(e[9]=n()),a(g,{data:[m],errors:[z]},{default:t(()=>{var v;return[a(q,{selected:(v=l.child())==null?void 0:v.name},N({_:2},[V(l.children,({name:r})=>({name:`${r}-tab`,fn:t(()=>[a(x,{to:{name:r}},{default:t(()=>[n(h(i(`data-planes.routes.item.navigation.${r}`)),1)]),_:2},1032,["to"])])}))]),1032,["selected"]),e[7]||(e[7]=n()),a(F,null,{default:t(({Component:r})=>[(d(),b(Q(r),{data:m,networking:m==null?void 0:m.dataplane.networking,mesh:E.mesh},null,8,["data","networking","mesh"]))]),_:2},1024)]}),_:2},1032,["data","errors"])]),_:2},[m?{name:"title",fn:t(()=>[f("h1",null,[a(M,{text:m.name},{default:t(()=>[a(p,{title:i("data-planes.routes.item.title",{name:m.name})},null,8,["title"])]),_:2},1032,["text"])])]),key:"0"}:void 0]),1032,["breadcrumbs"])]),_:2},1032,["src"])]),_:1})}}}),le=W(ne,[["__scopeId","data-v-da181781"]]);export{le as default};
