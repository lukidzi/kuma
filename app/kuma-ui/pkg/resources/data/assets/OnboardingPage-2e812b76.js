import{d as p,P as b,o as s,c as r,m as o,r as i,f as t,l as d,p as l,_ as u,b as v,w as _,Q as c,e as f,t as h,n as m,v as S,x as y}from"./index-a963f507.js";const x={class:"onboarding-heading"},k={class:"onboarding-title","data-testid":"onboarding-header"},$={key:0,class:"onboarding-description"},w=p({__name:"OnboardingHeading",setup(a){const e=b();return(n,g)=>(s(),r("div",x,[o("h1",k,[i(n.$slots,"title",{},void 0,!0)]),t(),d(e).description?(s(),r("div",$,[i(n.$slots,"description",{},void 0,!0)])):l("",!0)]))}});const z=u(w,[["__scopeId","data-v-505a1a6e"]]),N={class:"onboarding-actions"},O={class:"button-list"},B=p({__name:"OnboardingNavigation",props:{shouldAllowNext:{type:Boolean,required:!1,default:!0},showSkip:{type:Boolean,required:!1,default:!0},nextStep:{type:String,required:!0},previousStep:{type:String,required:!1,default:""},nextStepTitle:{type:String,required:!1,default:"Next"},lastStep:{type:Boolean,required:!1,default:!1}},setup(a){const e=a;return(n,g)=>(s(),r("div",N,[e.previousStep?(s(),v(d(c),{key:0,appearance:"secondary",to:{name:e.previousStep},"data-testid":"onboarding-previous-button"},{default:_(()=>[t(`
      Back
    `)]),_:1},8,["to"])):l("",!0),t(),o("div",O,[e.showSkip?(s(),v(d(c),{key:0,appearance:"tertiary","data-testid":"onboarding-skip-button",to:{name:"home"}},{default:_(()=>[t(`
        Skip setup
      `)]),_:1})):l("",!0),t(),f(d(c),{disabled:!e.shouldAllowNext,appearance:"primary",to:{name:e.lastStep?"home":e.nextStep},"data-testid":"onboarding-next-button"},{default:_(()=>[t(h(e.nextStepTitle),1)]),_:1},8,["disabled","to"])])]))}});const D=u(B,[["__scopeId","data-v-4695c7f4"]]),I=a=>(S("data-v-41beef0f"),a=a(),y(),a),q={class:"onboarding-container"},P={class:"onboarding-container__header"},C={class:"onboarding-container__inner-content"},V={class:"mt-4"},H=I(()=>o("div",{class:"background-image"},null,-1)),T=p({__name:"OnboardingPage",props:{withImage:{type:Boolean,required:!1,default:!1}},setup(a){const e=a;return(n,g)=>(s(),r("div",null,[o("div",q,[o("div",P,[i(n.$slots,"header",{},void 0,!0)]),t(),o("div",{class:m(["onboarding-container__content",{"onboarding-container__content--with-image":e.withImage}])},[o("div",C,[i(n.$slots,"content",{},void 0,!0)])],2),t(),o("div",V,[i(n.$slots,"navigation",{},void 0,!0)])]),t(),H]))}});const E=u(T,[["__scopeId","data-v-41beef0f"]]);export{E as O,z as a,D as b};
