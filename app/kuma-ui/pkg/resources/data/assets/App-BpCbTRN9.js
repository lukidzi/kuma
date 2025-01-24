import{d as w,r as p,o as c,c as S,a as _,b as a,w as n,e,t as f,n as I,_ as R,h as O,f as C,g as V,i as z,u as T,j as U,k as D,l as B,m as o,p as i,q as b,s as h,v as L,x}from"./index-U3igbuyl.js";const K=""+new URL("product-logo-CDoXkXpC.png",import.meta.url).href,G={class:"app-navigator"},P=w({__name:"AppNavigator",props:{active:{type:Boolean,default:!1},label:{default:""},to:{default:()=>({})}},setup(d){const s=d;return(u,m)=>{const l=p("XAction");return c(),S("li",G,[_(u.$slots,"default",{},()=>[a(l,{class:I({"is-active":s.active}),to:s.to},{default:n(()=>[e(f(s.label),1)]),_:1},8,["class","to"])],!0)])}}}),$=R(P,[["__scopeId","data-v-07bb7885"]]),Y=w({name:"github-button",props:{href:String,ariaLabel:String,title:String,dataIcon:String,dataColorScheme:String,dataSize:String,dataShowCount:String,dataText:String},render:function(){const d={ref:"_"};for(const s in this.$props)d[O(s)]=this.$props[s];return C("span",[V(this.$slots,"default")?C("a",d,this.$slots.default()):C("a",d)])},mounted:function(){this.paint()},beforeUpdate:function(){this.reset()},updated:function(){this.paint()},beforeUnmount:function(){this.reset()},methods:{paint:function(){if(this.$el.lastChild!==this.$refs._)return;const d=this.$el.appendChild(document.createElement("span")),s=this;z(()=>import("./buttons.esm-DK2fWHEW.js"),[],import.meta.url).then(function(u){s.$el.lastChild===d&&u.render(d.appendChild(s.$refs._),function(m){s.$el.lastChild===d&&d.parentNode.replaceChild(m,d)})})},reset:function(){this.$refs._!=null&&this.$el.replaceChild(this.$refs._,this.$el.lastChild)}}}),q={class:"application-shell"},H={role:"banner"},Z={class:"horizontal-list"},j={class:"upgrade-check-wrapper"},F={class:"alert-content"},J={class:"horizontal-list"},Q={class:"app-status app-status--mobile"},W={class:"app-status app-status--desktop"},tt={class:"app-content-container"},et={class:"app-sidebar"},nt={"aria-label":"Main"},ot={key:0},at={key:1,role:"separator",class:"navigation-separator"},st={key:2},it={class:"app-main-content"},rt={class:"app-notifications"},lt={"data-testid":"warning-GLOBAL_STORE_TYPE_MEMORY"},dt=w({__name:"ApplicationShell",setup(d){const s=T(),u=U(),m=D(),{t:l}=B();return(r,t)=>{const g=p("XTeleportSlot"),v=p("XAction"),k=p("XAlert"),A=p("DataSource"),y=p("XPop"),E=p("XIcon"),N=p("XActionGroup"),M=p("XI18n");return c(),S("div",q,[a(g,{name:"modal-layer"}),t[24]||(t[24]=e()),o("header",H,[o("div",Z,[_(r.$slots,"header",{},()=>[a(v,{to:{name:"home"}},{default:n(()=>[_(r.$slots,"home",{},void 0,!0)]),_:3}),t[3]||(t[3]=e()),a(i(Y),{class:"gh-star",href:"https://github.com/kumahq/kuma","aria-label":"Star kumahq/kuma on GitHub"},{default:n(()=>t[0]||(t[0]=[e(`
            Star
          `)])),_:1}),t[4]||(t[4]=e()),o("div",j,[a(A,{src:"/control-plane/version/latest"},{default:n(({data:X})=>[X&&i(u)("KUMA_VERSION")!==X.version?(c(),b(k,{key:0,class:"upgrade-alert","data-testid":"upgrade-check",appearance:"info"},{default:n(()=>[o("div",F,[o("p",null,f(i(l)("common.product.name"))+` update available
                  `,1),t[2]||(t[2]=e()),a(v,{appearance:"primary",href:i(l)("common.product.href.install")},{default:n(()=>t[1]||(t[1]=[e(`
                    Update
                  `)])),_:1},8,["href"])])]),_:1})):h("",!0)]),_:1})])],!0)]),t[18]||(t[18]=e()),o("div",J,[_(r.$slots,"content-info",{},()=>[o("div",Q,[a(y,{width:"280"},{content:n(()=>[o("p",null,[e(f(i(l)("common.product.name"))+" ",1),o("b",null,f(i(u)("KUMA_VERSION")),1),t[6]||(t[6]=e(" on ")),o("b",null,f(i(l)(`common.product.environment.${i(u)("KUMA_ENVIRONMENT")}`)),1),e(" ("+f(i(l)(`common.product.mode.${i(u)("KUMA_MODE")}`))+`)
                `,1)])]),default:n(()=>[a(v,{appearance:"tertiary"},{default:n(()=>t[5]||(t[5]=[e(`
                Info
              `)])),_:1}),t[7]||(t[7]=e())]),_:1})]),t[16]||(t[16]=e()),o("p",W,[e(f(i(l)("common.product.name"))+" ",1),o("b",null,f(i(u)("KUMA_VERSION")),1),t[8]||(t[8]=e(" on ")),o("b",null,f(i(l)(`common.product.environment.${i(u)("KUMA_ENVIRONMENT")}`)),1),e(" ("+f(i(l)(`common.product.mode.${i(u)("KUMA_MODE")}`))+`)
          `,1)]),t[17]||(t[17]=e()),a(N,null,{control:n(()=>[a(v,{appearance:"tertiary"},{default:n(()=>[a(E,{name:"help"},{default:n(()=>t[9]||(t[9]=[e(`
                  Help
                `)])),_:1})]),_:1})]),default:n(()=>[t[13]||(t[13]=e()),a(v,{href:i(l)("common.product.href.docs.index"),target:"_blank",rel:"noopener noreferrer"},{default:n(()=>t[10]||(t[10]=[e(`
              Documentation
            `)])),_:1},8,["href"]),t[14]||(t[14]=e()),a(v,{href:i(l)("common.product.href.feedback"),target:"_blank",rel:"noopener noreferrer"},{default:n(()=>t[11]||(t[11]=[e(`
              Feedback
            `)])),_:1},8,["href"]),t[15]||(t[15]=e()),a(v,{to:{name:"onboarding-welcome-view"},target:"_blank",rel:"noopener noreferrer"},{default:n(()=>t[12]||(t[12]=[e(`
              Onboarding
            `)])),_:1})]),_:1})],!0)])]),t[25]||(t[25]=e()),o("div",tt,[o("div",et,[o("nav",nt,[s.navigation?(c(),S("ul",ot,[_(r.$slots,"navigation",{},void 0,!0)])):h("",!0),t[19]||(t[19]=e()),s.navigation&&s.bottomNavigation?(c(),S("div",at)):h("",!0),t[20]||(t[20]=e()),s.bottomNavigation?(c(),S("ul",st,[_(r.$slots,"bottomNavigation",{},void 0,!0)])):h("",!0)])]),t[23]||(t[23]=e()),o("main",it,[o("div",rt,[_(r.$slots,"notifications",{},void 0,!0),t[21]||(t[21]=e()),i(m)("use state")?h("",!0):(c(),b(k,{key:0,class:"mb-4",appearance:"warning"},{default:n(()=>[o("ul",null,[o("li",lt,[a(M,{path:"common.warnings.GLOBAL_STORE_TYPE_MEMORY"})])])]),_:1}))]),t[22]||(t[22]=e()),_(r.$slots,"default",{},void 0,!0)])])])}}}),ut=R(dt,[["__scopeId","data-v-7a0e1b77"]]),pt=["alt"],mt=w({__name:"App",setup(d){var l;const s=L(),u=((l=s.getRoutes().find(r=>r.name==="app"))==null?void 0:l.children.map(r=>(r.name=String(r.name),r)))??[],m=x({name:""});return s.afterEach(()=>{const r=s.currentRoute.value.matched.map(g=>g.name),t=u.find(g=>r.includes(g.name));t&&t.name!==m.value.name&&(m.value=t)}),(r,t)=>{const g=p("RouterView"),v=p("AppView"),k=p("RouteView"),A=p("DataSource");return c(),b(A,{src:"/control-plane/addresses"},{default:n(({data:y})=>[typeof y<"u"?(c(),b(k,{key:0,name:"app",attrs:{class:"kuma-ready"},"data-testid-root":"mesh-app"},{default:n(({t:E,can:N})=>[a(ut,{class:"kuma-application"},{home:n(()=>[o("img",{class:"logo",src:K,alt:`${E("common.product.name")} Logo`,"data-testid":"logo"},null,8,pt)]),navigation:n(()=>[a($,{"data-testid":"control-planes-navigator",active:m.value.name==="home",label:"Home",to:{name:"home"},style:{"--icon":"var(--icon-home)"}},null,8,["active"]),t[0]||(t[0]=e()),N("use zones")?(c(),b($,{key:0,"data-testid":"zones-navigator",active:m.value.name==="zone-index-view",label:"Zones",to:{name:"zone-index-view"},style:{"--icon":"var(--icon-zones)"}},null,8,["active"])):(c(),b($,{key:1,"data-testid":"zone-egresses-navigator",active:m.value.name==="zone-egress-index-view",label:"Zone Egresses",to:{name:"zone-egress-list-view"},style:{"--icon":"var(--icon-zone-egresses)"}},null,8,["active"])),t[1]||(t[1]=e()),a($,{active:m.value.name==="mesh-index-view","data-testid":"meshes-navigator",label:"Meshes",to:{name:"mesh-index-view"},style:{"--icon":"var(--icon-meshes)"}},null,8,["active"])]),bottomNavigation:n(()=>[a($,{active:m.value.name==="configuration-view","data-testid":"configuration-navigator",label:"Configuration",to:{name:"configuration-view"},style:{"--icon":"var(--icon-configuration)"}},null,8,["active"])]),default:n(()=>[t[2]||(t[2]=e()),t[3]||(t[3]=e()),t[4]||(t[4]=e()),a(v,null,{default:n(()=>[a(g)]),_:1})]),_:2},1024)]),_:1})):h("",!0)]),_:1})}}}),ft=R(mt,[["__scopeId","data-v-995a408f"]]);export{ft as default};