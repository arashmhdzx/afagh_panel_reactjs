(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[703],{74626:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/super-admin/invoices",function(){return i(21504)}])},21504:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return u}});var n=i(85893),a=i(11163),o=i(67294),l=i(46427);function u(e){var t,i,u,r,d;let{solve:c,Page:p}=e,v=(0,a.useRouter)(),[s,g]=o.useState(null),[f,y]=o.useState(null!==(d=null===(t=v.query)||void 0===t?void 0:t.page)&&void 0!==d?d:null);return o.useEffect(()=>{c.Request({config:{url:"invoices?".concat("page=".concat(null!=f?f:1)),pointer:"invoices",method:"get",paginate:!0},dependencies:{data:[s,g]}})},[f]),o.useEffect(()=>{var e,t,i;f!==(null===(e=v.query)||void 0===e?void 0:e.page)&&(null===(t=v.query)||void 0===t?void 0:t.page)&&y(null===(i=v.query)||void 0===i?void 0:i.page)},[v.query]),(0,n.jsx)(l.Z,{solve:c,header:{title:"مشاهده پرداخت ها"},content:{step0:{search:!0,view:{config:{paginate:{total:null==s?void 0:null===(i=s.paginate)||void 0===i?void 0:i.total,limit:null==s?void 0:null===(u=s.paginate)||void 0===u?void 0:u.per_page,activePage:null==s?void 0:null===(r=s.paginate)||void 0===r?void 0:r.current_page}},structure:{table:{data:null==s?void 0:s.data,loading:!s,fillHeight:!0,columns:[{title:"#",type:"id"},{title:"ایجاد شده توسط",type:"creator",key:"creator",align:"right"},{title:"قیمت",key:"price",type:"price"},{title:"تاریخ ایجاد",key:"created_at",type:"date"},{title:"وضعیت پرداخت",key:"order",target:"is_paid",type:"boolean"},{title:"عملیات ها",type:"actions",actions:[{key:"related_modal",action:"invoice",prompt:"اطلاعات تکمیلی",type:"invoice"}]}]}}}}}})}}},function(e){e.O(0,[675,427,774,888,179],function(){return e(e.s=74626)}),_N_E=e.O()}]);