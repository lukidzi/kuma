import{O as f,a as g,b as x}from"./OnboardingPage-503a3bf7.js";import{d as _,o as v,c as S,R as w,a9 as h,J as m,h as y,i as k,j as B,w as o,a as c,e as s,f as e,u as l,N,O as C}from"./index-5f1fbf13.js";const A=""+new URL("new-service-demo-bff0792e.svg",import.meta.url).href,I=""+new URL("new-service-manually-5bec5301.svg",import.meta.url).href,O=_({__name:"ServiceBox",props:{active:{type:Boolean,required:!1,default:!1}},emits:["clicked"],setup(t,{emit:a}){const r=t;return(i,n)=>(v(),S("div",{class:h(["box",{"box--active":r.active}]),"data-testid":"box",onClick:n[0]||(n[0]=d=>a("clicked"))},[w(i.$slots,"default",{},void 0,!0)],2))}});const p=m(O,[["__scopeId","data-v-93fc7d1a"]]),u=t=>(N("data-v-a7da0bbe"),t=t(),C(),t),$={class:"service-mode-list"},M=u(()=>e("div",{class:"service-box-content"},[e("img",{src:A}),s(),e("p",{class:"service-mode-title"},`
              Demo app
            `),s(),e("p",null,"Counter application")],-1)),R=u(()=>e("div",{class:"service-box-content"},[e("img",{src:I}),s(),e("p",{class:"service-mode-title"},`
              Manually
            `),s(),e("p",null,"After this wizard")],-1)),V=_({__name:"AddNewServices",setup(t){const a=y(),r=k(()=>a.state.onboarding.mode==="manually"?"onboarding-completed":"onboarding-add-services-code");function i(n){a.dispatch("onboarding/changeMode",n)}return(n,d)=>(v(),B(x,null,{header:o(()=>[c(f,null,{title:o(()=>[s(`
          Add services
        `)]),_:1})]),content:o(()=>[e("div",$,[c(p,{active:l(a).state.onboarding.mode==="demo",onClicked:d[0]||(d[0]=b=>i("demo"))},{default:o(()=>[M]),_:1},8,["active"]),s(),c(p,{active:l(a).state.onboarding.mode==="manually",onClicked:d[1]||(d[1]=b=>i("manually"))},{default:o(()=>[R]),_:1},8,["active"])])]),navigation:o(()=>[c(g,{"next-step":l(r),"previous-step":"onboarding-create-mesh"},null,8,["next-step"])]),_:1}))}});const U=m(V,[["__scopeId","data-v-a7da0bbe"]]);export{U as default};
