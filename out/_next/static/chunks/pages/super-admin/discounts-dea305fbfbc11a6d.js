(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[325],{1789:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/super-admin/discounts",function(){return i(35074)}])},35074:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return a}});var n=i(85893),u=i(11163),l=i(67294),o=i(46427);function a(e){var t,i,a,d,r;let{solve:s,Page:c}=e,p=(0,u.useRouter)(),[v,g]=l.useState(null),[y,_]=l.useState(null!==(r=null===(t=p.query)||void 0===t?void 0:t.page)&&void 0!==r?r:null);return l.useEffect(()=>{s.Request({config:{url:"discounts",pointer:"discounts",method:"get",paginate:!0},dependencies:{data:[v,g]}})},[y]),l.useEffect(()=>{var e,t,i;y!==(null===(e=p.query)||void 0===e?void 0:e.page)&&(null===(t=p.query)||void 0===t?void 0:t.page)&&_(null===(i=p.query)||void 0===i?void 0:i.page)},[p.query]),(0,n.jsx)(o.Z,{solve:s,header:{title:"مشاهده تخفیفات"},content:{step0:{btn:{prompt:"تخفیف",action:"create"},view:{config:{paginate:{total:null==v?void 0:null===(i=v.paginate)||void 0===i?void 0:i.total,limit:null==v?void 0:null===(a=v.paginate)||void 0===a?void 0:a.per_page,activePage:null==v?void 0:null===(d=v.paginate)||void 0===d?void 0:d.current_page}},structure:{table:{data:null==v?void 0:v.data,loading:!v,fillHeight:!0,columns:[{title:"#",type:"id"},{title:"کد",type:"code",key:"code",align:"right"},{title:"درصد تخفیف",key:"percent",type:"number"},{title:"محدودیت استفاده",key:"use_limit",type:"number"},{title:"عملیات ها",type:"actions",actions:[{key:"edit"},{key:"delete",url:"classrooms"},{key:"related_modal",action:"related_users",prompt:"کاربران مورد تخفیف",type:"discounts"},{key:"related_modal",action:"related_courses",prompt:"دوره های مورد تخفیف",type:"discounts"}]}]}}}}}})}}},function(e){e.O(0,[675,427,774,888,179],function(){return e(e.s=1789)}),_N_E=e.O()}]);