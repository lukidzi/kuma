import{E as p,L as m,ck as u,cn as b,i as t,o as g,c as _,w as s,a as o,l as e,b as a,t as h}from"./index.0cb244cf.js";import{O as f}from"./OnboardingNavigation.4797753a.js";import{O as v,a as y}from"./OnboardingPage.9278b395.js";const O={name:"CreateMesh",components:{OnboardingNavigation:f,OnboardingHeading:v,OnboardingPage:y,KTable:m},data(){return{productName:u,tableHeaders:[{label:"Name",key:"name"},{label:"Services",key:"servicesAmount"},{label:"DPPs",key:"dppsAmount"}],tableData:{total:1,data:[{name:"default",servicesAmount:0,dppsAmount:0}]}}},computed:{...b({multicluster:"config/getMulticlusterStatus"}),previousStep(){return this.multicluster?"onboarding-multi-zone":"onboarding-configuration-types"}}},x={class:"text-center mb-4"},N=e("i",null,"default",-1),P={class:"flex justify-center mt-10 mb-12 pb-12"},k={class:"w-full sm:w-3/5 lg:w-2/5 p-4"},A=e("p",{class:"text-center"},`
        This mesh is empty. Next, you add services and their data plane proxies.
      `,-1);function C(T,w,D,H,n,r){const i=t("OnboardingHeading"),c=t("KTable"),l=t("OnboardingNavigation"),d=t("OnboardingPage");return g(),_(d,null,{header:s(()=>[o(i,{title:"Create the mesh"})]),content:s(()=>[e("p",x,[a(`
        When you install, `+h(n.productName)+" creates a ",1),N,a(` mesh, but you can add as many meshes as you need.
      `)]),a(),e("div",P,[e("div",k,[o(c,{fetcher:()=>n.tableData,headers:n.tableHeaders,"disable-pagination":"","is-small":""},null,8,["fetcher","headers"])])]),a(),A]),navigation:s(()=>[o(l,{"next-step":"onboarding-add-services","previous-step":r.previousStep},null,8,["previous-step"])]),_:1})}const K=p(O,[["render",C]]);export{K as default};
