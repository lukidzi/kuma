import{O as h,a as b,b as g}from"./OnboardingPage-80763a54.js";import{d as v,t as f,r as o,o as y,g as x,w as e,h as t,l as a,m as s,C as A,z as C,B as w,q as T}from"./index-a63a3d32.js";const c=n=>(C("data-v-11d1e65d"),n=n(),w(),n),V={class:"mb-4 text-center"},N=c(()=>s("i",null,"default",-1)),S=c(()=>s("p",{class:"mt-4 text-center"},`
            This mesh is empty. Next, you add services and their data plane proxies.
          `,-1)),k=v({__name:"CreateMesh",setup(n){const d=[{label:"Name",key:"name"},{label:"Services",key:"servicesAmount"},{label:"DPPs",key:"dppsAmount"}],l=f({total:1,data:[{name:"default",servicesAmount:0,dppsAmount:0}]});return(B,R)=>{const r=o("RouteTitle"),p=o("KTable"),_=o("AppView"),u=o("RouteView");return y(),x(u,{name:"onboarding-create-mesh"},{default:e(({can:m,t:i})=>[t(r,{title:i("onboarding.routes.create-mesh.title")},null,8,["title"]),a(),t(_,null,{default:e(()=>[t(h,null,{header:e(()=>[t(b,null,{title:e(()=>[a(`
              Create the mesh
            `)]),_:1})]),content:e(()=>[s("p",V,[a(`
            When you install, `+A(i("common.product.name"))+" creates a ",1),N,a(` mesh, but you can add as many meshes as you need.
          `)]),a(),t(p,{class:"table",fetcher:()=>l.value,headers:d,"disable-pagination":""},null,8,["fetcher"]),a(),S]),navigation:e(()=>[t(g,{"next-step":"onboarding-add-services","previous-step":m("use zones")?"onboarding-multi-zone":"onboarding-configuration-types"},null,8,["previous-step"])]),_:2},1024)]),_:2},1024)]),_:1})}}});const O=T(k,[["__scopeId","data-v-11d1e65d"]]);export{O as default};
