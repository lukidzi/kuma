import{d as p,U as v,o as s,c as r,p as o,r as i,f as t,q as d,v as l,_ as u,b,w as c,x as _,e as h,t as f,n as m,A as S,B as y}from"./index-203d56a2.js";const x={class:"onboarding-heading"},k={class:"onboarding-title","data-testid":"onboarding-header"},$={key:0,class:"onboarding-description"},w=p({__name:"OnboardingHeading",setup(a){const e=v();return(n,g)=>(s(),r("div",x,[o("h1",k,[i(n.$slots,"title",{},void 0,!0)]),t(),d(e).description?(s(),r("div",$,[i(n.$slots,"description",{},void 0,!0)])):l("",!0)]))}});const z=u(w,[["__scopeId","data-v-cd4747d1"]]),B={class:"onboarding-actions"},N={class:"button-list"},O=p({__name:"OnboardingNavigation",props:{shouldAllowNext:{type:Boolean,required:!1,default:!0},showSkip:{type:Boolean,required:!1,default:!0},nextStep:{type:String,required:!0},previousStep:{type:String,required:!1,default:""},nextStepTitle:{type:String,required:!1,default:"Next"},lastStep:{type:Boolean,required:!1,default:!1}},setup(a){const e=a;return(n,g)=>(s(),r("div",B,[e.previousStep?(s(),b(d(_),{key:0,appearance:"secondary",to:{name:e.previousStep},"data-testid":"onboarding-previous-button"},{default:c(()=>[t(`
      Back
    `)]),_:1},8,["to"])):l("",!0),t(),o("div",N,[e.showSkip?(s(),b(d(_),{key:0,appearance:"outline","data-testid":"onboarding-skip-button",to:{name:"home"}},{default:c(()=>[t(`
        Skip setup
      `)]),_:1})):l("",!0),t(),h(d(_),{disabled:!e.shouldAllowNext,appearance:e.lastStep?"creation":"primary",to:{name:e.lastStep?"home":e.nextStep},"data-testid":"onboarding-next-button"},{default:c(()=>[t(f(e.nextStepTitle),1)]),_:1},8,["disabled","appearance","to"])])]))}});const D=u(O,[["__scopeId","data-v-f3214bb6"]]),q=a=>(S("data-v-be6e4144"),a=a(),y(),a),I={class:"onboarding-container"},C={class:"onboarding-container__header"},V={class:"onboarding-container__inner-content"},A={class:"mt-4"},H=q(()=>o("div",{class:"background-image"},null,-1)),P=p({__name:"OnboardingPage",props:{withImage:{type:Boolean,required:!1,default:!1}},setup(a){const e=a;return(n,g)=>(s(),r("div",null,[o("div",I,[o("div",C,[i(n.$slots,"header",{},void 0,!0)]),t(),o("div",{class:m(["onboarding-container__content",{"onboarding-container__content--with-image":e.withImage}])},[o("div",V,[i(n.$slots,"content",{},void 0,!0)])],2),t(),o("div",A,[i(n.$slots,"navigation",{},void 0,!0)])]),t(),H]))}});const E=u(P,[["__scopeId","data-v-be6e4144"]]);export{E as O,z as a,D as b};