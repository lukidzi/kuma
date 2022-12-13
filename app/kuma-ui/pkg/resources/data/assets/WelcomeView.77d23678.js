import{E as p,g as k,i,o as d,j as l,l as t,c as m,z as I,b as a,t as c,B as S,cK as _,C as g,D as M,ck as x,cn as V,F as $,n as C,a as u}from"./index.0cb244cf.js";import{O as N}from"./OnboardingNavigation.4797753a.js";const W={name:"ItemStatus",components:{KIcon:k},props:{name:{type:String,required:!0},status:{type:Boolean,default:!1}}},z={class:"flex items-center mb-2"},A={class:"circle"};function L(e,f,o,h,n,s){const r=i("KIcon");return d(),l("li",z,[t("span",A,[o.status?(d(),m(r,{key:0,icon:"check",size:"10",color:"var(--kuma-purple-1)"})):I("",!0)]),a(" "+c(o.name),1)])}const D=p(W,[["render",L],["__scopeId","data-v-71c50c48"]]);const B={name:"WelcomeAnimationSvg",data(){return{mounted:!1}},computed:{svgClasses(){return["svg",{active:this.mounted}]}},mounted(){setTimeout(()=>{this.mounted=!0},30)}},O=e=>(g("data-v-3dfe58ea"),e=e(),M(),e),G=O(()=>t("defs",null,null,-1)),H=_('<defs data-v-3dfe58ea><linearGradient id="a" x1="64.8%" x2="34.4%" y1="-12.6%" y2="153.1%" data-v-3dfe58ea><stop offset="0%" stop-color="#260D50" data-v-3dfe58ea></stop> <stop offset="100%" stop-color="#822DC5" data-v-3dfe58ea></stop></linearGradient> <linearGradient id="b" x1="0%" x2="107.4%" y1="41.5%" y2="41.5%" data-v-3dfe58ea><stop offset="0%" stop-color="#260D50" data-v-3dfe58ea></stop> <stop offset="100%" stop-color="#822DC5" data-v-3dfe58ea></stop></linearGradient></defs>',1),j=_('<g fill="none" fill-rule="evenodd" mask="url(#ccard)" transform="translate(-63 -285)" data-v-3dfe58ea><g stroke="#822DC5" stroke-width="6" data-v-3dfe58ea><path class="nodepath" d="M1444 893h252" data-v-3dfe58ea></path> <path class="nodepath" stroke-opacity=".4" d="M1529 705h232M1452 603h237" data-v-3dfe58ea></path> <path class="nodepath" d="M1754 563l-332 332h-76M1444 935l121 121M263 859l156 156" data-v-3dfe58ea></path> <path class="nodepath" stroke-opacity=".4" d="M742 781H556" data-v-3dfe58ea></path> <path class="nodepath" d="M697 736H513" data-v-3dfe58ea></path> <path class="nodepath" stroke-opacity=".4" d="M695 783V577" data-v-3dfe58ea></path> <path class="nodepath" d="M261 1026V751M509 573V438M1502 415l291 290" data-v-3dfe58ea></path> <path class="nodepath" stroke-opacity=".4" d="M698 912L26 240M1368 411v540l61 61 95-95M1434 3h267l193 192v354" data-v-3dfe58ea></path> <path class="nodepath" d="M517 411h342l138 138M1416 573v242l371 323" data-v-3dfe58ea></path> <path class="nodepath" d="M1486 817V612l-146-146M839 243h-97l-83 84v348M1698 1063V817l58-57h122M1069 299L558 810M696 1058H585L468 941V570L322 424" data-v-3dfe58ea></path> <path class="nodepath" d="M277 528l160 160 236-236 121 121M632 979h-45l-67-67v-86H0M106 669h275M70 707h331M207 745h210M85 784h356M1417 558h228M1609 634h203M528 946h76M619 604v131M1359 567l125 125M1332 594l156 156M1594 1070V959M381 632L260 753" data-v-3dfe58ea></path> <path class="nodepath" stroke-opacity=".4" d="M605 817V497M1851 959h-518M944 570H390" data-v-3dfe58ea></path> <path class="nodepath" d="M638 912H342M635 1139V912" data-v-3dfe58ea></path> <path stroke="url(#a)" d="M1024 573h297v532h-31" class="final" transform="translate(0 3)" data-v-3dfe58ea></path> <path fill="url(#b)" fill-rule="nonzero" d="M1024 592a18 18 0 100-36 18 18 0 000 36z" class="final circle" transform="translate(0 3)" data-v-3dfe58ea></path></g> <foreignObject x="0" y="0" width="100%" height="100%" data-v-3dfe58ea><div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div> <div data-v-3dfe58ea></div></foreignObject></g>',1);function E(e,f,o,h,n,s){return d(),l("svg",{class:S(["background",s.svgClasses]),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 1920 1080"},[G,a(),H,a(),j],2)}const F=p(B,[["render",E],["__scopeId","data-v-3dfe58ea"]]);const K={name:"WelcomeView",components:{ItemStatus:D,OnboardingNavigation:N,WelcomeAnimationSvg:F},data(){return{productName:x}},computed:{...V({environment:"config/getEnvironment",multicluster:"config/getMulticlusterStatus"}),enviromentFormatted(){return this.environment.charAt(0).toUpperCase()+this.environment.slice(1)},multizoneItems(){const e=[];return this.multicluster&&e.push({name:"Add zones",status:!1}),e},statuses(){return[{name:`Run ${this.productName} control plane`,status:!0},{name:"Learn about deployments",status:!1},{name:"Learn about configuration storage",status:!1},...this.multizoneItems,{name:"Create the mesh",status:!1},{name:"Add services",status:!1},{name:"Go to the dashboard",status:!1}]}}},y=e=>(g("data-v-c869be6b"),e=e(),M(),e),T={class:"welcome-container"},R={class:"content"},U={class:"welcome-title"},q={class:"welcome-description"},P=y(()=>t("strong",null,"few minutes",-1)),Y={class:"welcome-description"},J=y(()=>t("h2",{class:"welcome-detected"},`
          Let's get started:
        `,-1)),Q={class:"welcome-navigation"};function X(e,f,o,h,n,s){const r=i("ItemStatus"),w=i("OnboardingNavigation"),b=i("WelcomeAnimationSvg");return d(),l("div",null,[t("div",T,[t("div",R,[t("h1",U,`
          Welcome to `+c(n.productName),1),a(),t("p",q,[a(`
          Congratulations on downloading `+c(n.productName)+"! You are just a ",1),P,a(` away from getting your service mesh fully online.
        `)]),a(),t("p",Y,[a(`
          We have automatically detected that you are running on `),t("strong",null,c(s.enviromentFormatted),1),a(`.
        `)]),a(),J,a(),t("ul",null,[(d(!0),l($,null,C(s.statuses,v=>(d(),m(r,{key:v.name,name:v.name,status:v.status},null,8,["name","status"]))),128))])]),a(),t("div",Q,[u(w,{"next-step":"onboarding-deployment-types"})])]),a(),u(b,{longer:e.multicluster},null,8,["longer"])])}const ae=p(K,[["render",X],["__scopeId","data-v-c869be6b"]]);export{ae as default};
