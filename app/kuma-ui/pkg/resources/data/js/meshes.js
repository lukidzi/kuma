(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["meshes"],{"362e":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"all-meshes"},[a("FrameSkeleton",[a("DataOverview",{attrs:{"page-size":t.pageSize,"has-error":t.hasError,"is-loading":t.isLoading,"empty-state":t.empty_state,"display-data-table":!0,"table-data":t.tableData,"table-data-is-empty":t.tableDataIsEmpty,"table-data-function-text":"View","table-data-row":"name"},on:{tableAction:t.tableAction,reloadData:t.loadData}},[a("template",{slot:"additionalControls"},[a("KButton",{staticClass:"add-mesh-button",attrs:{appearance:"primary",size:"small",to:{path:"/wizard/mesh"}},nativeOn:{click:function(e){return t.onCreateClick(e)}}},[a("span",{staticClass:"custom-control-icon"},[t._v(" + ")]),t._v(" Create Mesh ")])],1),a("template",{slot:"pagination"},[a("Pagination",{attrs:{"has-previous":t.previous.length>0,"has-next":t.hasNext},on:{next:t.goToNextPage,previous:t.goToPreviousPage}})],1)],2),!1===t.isEmpty?a("Tabs",{attrs:{"has-error":t.hasError,"is-loading":t.isLoading,tabs:t.tabs,"initial-tab-override":"overview"}},[a("template",{slot:"tabHeader"},[a("div",[a("h3",[t._v(t._s(t.tabGroupTitle))])])]),a("template",{slot:"overview"},[a("LabelList",{attrs:{"has-error":t.entityHasError,"is-loading":t.entityIsLoading,"is-empty":t.entityIsEmpty}},[a("div",[a("ul",t._l(t.entity.basicData,(function(e,i){return a("li",{key:i},[a("h4","creationTime"===i?[t._v(" Created ")]:"modificationTime"===i?[t._v(" Last Modified ")]:[t._v(" "+t._s(i)+" ")]),a("p","creationTime"===i||"modificationTime"===i?[t._v(" "+t._s(t._f("readableDate")(e))+" "),a("em",[t._v("("+t._s(t._f("rawDate")(e))+")")])]:[t._v(" "+t._s(e)+" ")])])})),0)]),t.entity.extendedData&&t.entity.extendedData.length?a("div",[a("ul",[t._l(t.entity.extendedData,(function(e,i){return a("li",{key:i},[a("h4",[t._v(t._s(e.label))]),e.value?a("p",{staticClass:"label-cols"},[a("span",[t._v(" "+t._s(e.value.type)+" ")]),a("span",[t._v(" "+t._s(e.value.name)+" ")])]):a("KBadge",{attrs:{size:"small",appearance:"danger"}},[t._v(" Disabled ")])],1)})),a("li",[a("h4",[t._v("Locality Aware Loadbalancing")]),t.entity.localityEnabled?a("p",[a("KBadge",{attrs:{size:"small",appearance:"success"}},[t._v(" Enabled ")])],1):a("KBadge",{attrs:{size:"small",appearance:"danger"}},[t._v(" Disabled ")])],1)],2)]):t._e()])],1),a("template",{slot:"yaml"},[a("YamlView",{attrs:{title:t.entityOverviewTitle,"has-error":t.entityHasError,"is-loading":t.entityIsLoading,"is-empty":t.entityIsEmpty,content:t.rawEntity}})],1),a("template",{slot:"resources"},[a("LabelList",{attrs:{"has-error":t.entityHasError,"is-loading":t.entityIsLoading,"is-empty":t.entityIsEmpty}},t._l(t.countCols,(function(e){return a("div",{key:e},[a("ul",t._l(t.counts.slice((e-1)*t.itemsPerCol,e*t.itemsPerCol),(function(e,i){return a("li",{key:i},[a("h4",[t._v(t._s(e.title))]),a("p",[t._v(t._s(t._f("formatValue")(e.value)))])])})),0)])})),0)],1)],2):t._e()],1)],1)},n=[],s=(a("99af"),a("7db0"),a("4160"),a("b0c0"),a("4fad"),a("d3b7"),a("25f0"),a("159b"),a("d0ff")),o=a("f3f3"),r=a("2f62"),l=a("027b"),u=a("bc1e"),c=a("b912"),h=a("1d10"),m=a("1799"),f=a("2778"),d=a("251b"),p=a("ff9d"),y=a("0ada"),v=a("c6ec"),b={name:"Meshes",metaInfo:{title:"Meshes"},components:{FrameSkeleton:h["a"],Pagination:m["a"],DataOverview:f["a"],Tabs:d["a"],YamlView:p["a"],LabelList:y["a"]},filters:{formatValue:function(t){return t?t.toLocaleString("en").toString():0},readableDate:function(t){return Object(u["g"])(t)},rawDate:function(t){return Object(u["j"])(t)}},mixins:[c["a"]],data:function(){return{isLoading:!0,isEmpty:!1,hasError:!1,entityIsLoading:!0,entityIsEmpty:!1,entityHasError:!1,tableDataIsEmpty:!1,empty_state:{title:"No Data",message:"There are no Meshes present."},tableData:{headers:[{key:"actions",hideLabel:!0},{label:"Name",key:"name"},{label:"Type",key:"type"}],data:[]},tabs:[{hash:"#overview",title:"Overview"},{hash:"#resources",title:"Resources"},{hash:"#yaml",title:"YAML"}],entity:[],rawEntity:null,firstEntity:null,pageSize:v["b"],pageOffset:null,next:null,hasNext:!1,previous:[],tabGroupTitle:null,entityOverviewTitle:null,itemsPerCol:3}},computed:Object(o["a"])(Object(o["a"])({},Object(r["d"])({mesh:"selectedMesh"})),{},{counts:function(){var t=this.$store.state;return[{title:"Data plane proxies",value:t.totalDataplaneCountFromMesh},{title:"Circuit Breakers",value:t.totalCircuitBreakerCountFromMesh},{title:"Fault Injections",value:t.totalFaultInjectionCountFromMesh},{title:"Health Checks",value:t.totalHealthCheckCountFromMesh},{title:"Proxy Templates",value:t.totalProxyTemplateCountFromMesh},{title:"Traffic Logs",value:t.totalTrafficLogCountFromMesh},{title:"Traffic Permissions",value:t.totalTrafficPermissionCountFromMesh},{title:"Traffic Routes",value:t.totalTrafficRouteCountFromMesh},{title:"Traffic Traces",value:t.totalTrafficTraceCountFromMesh},{title:"Rate Limits",value:t.totalRateLimitCountFromMesh},{title:"Retries",value:t.totalRetryCountFromMesh},{title:"Timeouts",value:t.totalTimeoutCountFromMesh}]},countCols:function(){return Math.ceil(this.counts.length/this.itemsPerCol)},shareUrl:function(){var t=this,e="".concat(window.location.origin,"/#"),a=function(){return t.$route.query.ns?t.$route.fullPath:"".concat(e).concat(t.$route.fullPath)};return a()}}),watch:{$route:function(t,e){this.init()}},beforeMount:function(){this.init()},methods:{init:function(){this.loadData()},goToPreviousPage:function(){this.pageOffset=this.previous.pop(),this.next=null,this.loadData()},goToNextPage:function(){this.previous.push(this.pageOffset),this.pageOffset=this.next,this.next=null,this.loadData()},onCreateClick:function(){l["a"].logger.info("create-mesh-clicked")},tableAction:function(t){var e=t;this.getEntity(e)},loadData:function(){var t=this;this.isLoading=!0,this.isEmpty=!1;var e=this.$route.params.mesh,a={size:this.pageSize,offset:this.pageOffset},i="all"!==e&&e?this.$api.getMesh(e):this.$api.getAllMeshes(a),n=function(){return i.then((function(a){var i=function(){if("all"===e)return a.items;var t={items:[]};return t.items.push(a),t.items};a.next?(t.next=Object(u["e"])(a.next),t.hasNext=!0):t.hasNext=!1;var n=i();n.length>0?("all"===e&&t.sortEntities(n),t.firstEntity=n[0].name,t.getEntity(n[0]),t.tableData.data=Object(s["a"])(n),t.tableDataIsEmpty=!1,t.isEmpty=!1):(t.tableData.data=[],t.tableDataIsEmpty=!0,t.isEmpty=!0,t.getEntity(null))})).catch((function(e){t.hasError=!0,t.isEmpty=!0,console.error(e)})).finally((function(){setTimeout((function(){t.isLoading=!1}),"500")}))};n()},getEntity:function(t){var e=this;if(this.entityIsLoading=!0,this.entityIsEmpty=!1,this.entityHasError=!1,t&&null!==t)return this.$api.getMesh(t.name).then((function(a){if(a){var i=["fetchDataplaneTotalCountFromMesh","fetchHealthCheckTotalCountFromMesh","fetchProxyTemplateTotalCountFromMesh","fetchTrafficLogTotalCountFromMesh","fetchTrafficPermissionTotalCountFromMesh","fetchTrafficRouteTotalCountFromMesh","fetchTrafficTraceTotalCountFromMesh","fetchFaultInjectionTotalCountFromMesh","fetchCircuitBreakerTotalCountFromMesh","fetchTimeoutTotalCountFromMesh","fetchRateLimitTotalCountFromMesh","fetchRetryTotalCountFromMesh"];i.forEach((function(a){e.$store.dispatch(a,t.name)}));var n=Object(u["f"])(a,["type","name"]),s=function(){var t=Object.entries(Object(u["f"])(a,["mtls","logging","metrics","tracing"])),e=[];return t.forEach((function(t){var a=t[0],i=t[1]||null;if(i&&i.enabledBackend){var n=i.enabledBackend,s=i.backends.find((function(t){return t.name===n}));e.push({label:a,value:{type:s.type,name:s.name}})}else if(i&&i.defaultBackend){var o=i.defaultBackend,r=i.backends.find((function(t){return t.name===o}));e.push({label:a,value:{type:r.type,name:r.name}})}else if(i&&i.backends){var l=i.backends[0];e.push({label:a,value:{type:l.type,name:l.name}})}else e.push({label:a,value:null})})),e},o=function(){var t=a.routing;return t&&t.localityAwareLoadBalancing};e.tabGroupTitle="Mesh: ".concat(n.name),e.entityOverviewTitle="Entity Overview for ".concat(n.name),e.entity={basicData:n,extendedData:s(),localityEnabled:o()},e.rawEntity=Object(u["k"])(a)}else e.entity=null,e.entityIsEmpty=!0})).catch((function(t){e.entityHasError=!0,console.error(t)})).finally((function(){setTimeout((function(){e.entityIsLoading=!1}),"500")}));setTimeout((function(){e.entityIsEmpty=!0,e.entityIsLoading=!1}),"500")}}},g=b,T=(a("8c5b"),a("2877")),C=Object(T["a"])(g,i,n,!1,null,"47b74037",null);e["default"]=C.exports},"8c5b":function(t,e,a){"use strict";a("b92b")},b912:function(t,e,a){"use strict";a("b0c0");e["a"]={methods:{sortEntities:function(t){var e=t.sort((function(t,e){return t.name>e.name||t.name===e.name&&t.mesh>e.mesh?1:-1}));return e}}}},b92b:function(t,e,a){}}]);