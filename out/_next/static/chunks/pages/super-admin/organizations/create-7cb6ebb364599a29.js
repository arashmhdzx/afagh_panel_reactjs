(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[858],{98:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/super-admin/organizations/create",function(){return n(94675)}])},94675:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return i}});var a=n(85893),o=n(67294),r=n(46427);function i(e){let{solve:t,Page:n}=e,[i,l]=o.useState(null);return o.useEffect(()=>{null===i&&t.Request({config:{url:"all-users-without-paginate?role=organization-manager",pointer:"managers",method:"get"},dependencies:{callback(e){var n;let a=null==e?void 0:null===(n=e.data)||void 0===n?void 0:n.data;t.Request({config:{url:"categories?keywords=server",pointer:"cat_server",method:"get"},dependencies:{callback(e){var t;l(a={managers:a,categories:null==e?void 0:null===(t=e.data)||void 0===t?void 0:t.data})}}})}}})},[]),(0,a.jsx)(r.Z,{solve:t,header:{title:"ایجاد موسسه"},content:i?{step0:{btn:{action:"back"},form:{config:{url:"organizations",content_type:"multipart/form-data",route:!0,push_notif:!0},structure:[[{input:{name:"title",type:"text",placeholder:"نام موسسه"}},{input:{name:"brand",placeholder:"برند"}}],[{upload:{prompt:"لوگوی سازمان را انتخاب کنید",name:"logo_img"}}],[{select:{name:"manager_id",placeholder:"انتخاب مدیر سازمان",data:null==i?void 0:i.managers}},{select:{name:"server_category_id",placeholder:"دسته بندی سرور",data:null==i?void 0:i.categories}}]]}}}:{loading:!0}})}}},function(e){e.O(0,[675,427,774,888,179],function(){return e(e.s=98)}),_N_E=e.O()}]);