import{d as i,c as o,o as r,j as d,i as p,t as c,b as t,Y as s}from"./index-78b8321a.js";import{_ as u}from"./_plugin-vue_export-helper-c27b6911.js";const _=i({__name:"StatusBadge",props:{status:{type:String,required:!0},shouldHideTitle:{type:Boolean,required:!1,default:!1}},setup(n){const e=n,l={not_available:{title:"not available",appearance:"warning"},partially_degraded:{title:"partially degraded",appearance:"warning"},offline:{title:"offline",appearance:"danger"},online:{title:"online",appearance:"success"}},a=o(()=>l[e.status]);return(f,g)=>(r(),d("span",{class:s(["status",{"status--with-title":!e.shouldHideTitle,[`status--${t(a).appearance}`]:!0}]),"data-testid":"status-badge"},[p("span",{class:s({"visually-hidden":e.shouldHideTitle})},c(t(a).title),3)],2))}});const S=u(_,[["__scopeId","data-v-c8381314"]]);export{S};
