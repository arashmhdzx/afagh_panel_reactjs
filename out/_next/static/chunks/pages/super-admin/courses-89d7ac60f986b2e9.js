(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[765],{8195:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/super-admin/courses",function(){return i(42710)}])},42710:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return a}});var n=i(85893),l=i(11163),u=i(67294),o=i(46427);function a(e){var t,i,a,r,d,c;let{solve:s,Page:p}=e,v=(0,l.useRouter)(),[g,f]=u.useState(null),[y,_]=u.useState(null!==(d=null===(t=v.query)||void 0===t?void 0:t.page)&&void 0!==d?d:null);return u.useEffect(()=>{(null===g||y)&&s.Request({config:{url:"courses?".concat("page=".concat(null!=y?y:1)),pointer:"course",method:"get",paginate:!0},dependencies:{data:[g,f]}})},[y]),console.log(y,g),u.useEffect(()=>{var e,t,i;y!==(null===(e=v.query)||void 0===e?void 0:e.page)&&(null===(t=v.query)||void 0===t?void 0:t.page)&&_(null===(i=v.query)||void 0===i?void 0:i.page)},[v.query]),(0,n.jsx)(o.Z,{solve:s,header:{title:"مشاهده دوره ها"},content:{step0:{btn:{prompt:"دوره",action:"create"},search:!0,view:{config:{paginate:{total:null==g?void 0:null===(i=g.paginate)||void 0===i?void 0:i.total,limit:null==g?void 0:null===(a=g.paginate)||void 0===a?void 0:a.per_page,activePage:null==g?void 0:null===(r=g.paginate)||void 0===r?void 0:r.current_page}},structure:{table:{data:Array.from(null!==(c=null==g?void 0:g.data)&&void 0!==c?c:{}),loading:null==g||!g.data,fillHeight:!0,columns:[{title:"#",type:"id"},{title:"عنوان دوره",type:"title",align:"right"},{title:"قیمت",type:"price"},{title:"تاریخ ایجاد",key:"created_at",type:"date"},{title:"دسته بندی ها",type:"categories"},{title:"عملیات ها",type:"actions",actions:[{key:"edit"},{key:"delete",url:"courses"}]}]}}}}}})}}},function(e){e.O(0,[675,427,774,888,179],function(){return e(e.s=8195)}),_N_E=e.O()}]);