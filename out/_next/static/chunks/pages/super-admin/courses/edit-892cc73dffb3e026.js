(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[426],{17604:function(e,t,l){(window.__NEXT_P=window.__NEXT_P||[]).push(["/super-admin/courses/edit",function(){return l(44776)}])},44776:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return d}});var a=l(85893),o=l(11163),i=l(67294),r=l(95054),n=l(46427),c=l(61603);function d(e){var t,l,d,u,s,p,m;let{solve:v,Page:g}=e,[h,f]=i.useState(null),[y,b]=i.useState({}),[_,k]=i.useState(!1),x=(0,o.useRouter)(),[w,j]=i.useState({step0:null!==(s=null==h?void 0:null===(t=h.cu)||void 0===t?void 0:t.type)&&void 0!==s?s:"cash",step2:"free"});i.useEffect(()=>{if(v.Router.query.get("id")&&!h){let e=v.Router.query.get("id");v.Request({config:{url:"courses/".concat(e),pointer:"cu",method:"get"},dependencies:{callback(t){var l;let a={cu:null==t?void 0:null===(l=t.data)||void 0===l?void 0:l.data};v.Request({config:{url:"all-users-without-paginate",pointer:"pg",method:"get"},dependencies:{callback(t){var l;let o={pg:null==t?void 0:null===(l=t.data)||void 0===l?void 0:l.data};v.Request({config:{url:"get-course-members/".concat(e),pointer:"mems",method:"get"},dependencies:{callback(e){var t;let l={mems:null==e?void 0:null===(t=e.data)||void 0===t?void 0:t.data};v.Request({config:{url:"classrooms",pointer:"cls",method:"get"},dependencies:{callback(e){var t;let i={cls:null==e?void 0:null===(t=e.data)||void 0===t?void 0:t.data};v.Request({config:{url:"all-orgs-without-paginate",pointer:"orgs"},dependencies:{callback(e){var t;let r={orgs:null==e?void 0:null===(t=e.data)||void 0===t?void 0:t.data};v.Request({config:{url:"categories",pointer:"cat"},dependencies:{callback(e){var t;let n={cat:null==e?void 0:null===(t=e.data)||void 0===t?void 0:t.data};f({...a,...o,...l,...i,...r,...n})}}})}}})}}})}}})}}})}}})}},[h,v]);let{classrooms:q,organizations:F,sections:R,categories:C,title:P,id:E}=null!==(p=null==h?void 0:h.cu)&&void 0!==p?p:{};return(0,a.jsx)(n.Z,{solve:v,header:{title:(0,a.jsxs)("span",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:["ویرایش دوره",(0,a.jsx)("small",{style:{marginRight:".5rem"},children:"/"}),(0,a.jsx)("span",{style:{marginRight:".5rem",display:"flex"},children:v.Convert.withBadge({val:v.Convert.toPe(P),color:"violet"})})]})},content:h?{step0:{label:"مشخصات",btn:{action:"back"},form:{config:{url:"courses/".concat(null===(l=x.query)||void 0===l?void 0:l.id,"?_method=PUT"),content_type:"multipart/form-data",route:!0,push_notif:!0,initial:{title:h.cu.title,description:h.cu.description,price:h.cu.price,type:h.cu.type,time:h.cu.time,body:h.cu.body}},structure:[[{input:{name:"title",type:"text",placeholder:"نام دوره"},flex:.5},{input:{name:"description",placeholder:"توضیح مختصر",addon:{last:{prompt:"SP-counter-150"}}}}],[{select:{placeholder:"نوع",data:[{title:"نقدی",value:"cash"},{title:"رایگان",value:"free"}],args:{defaultValue:"cash"},name:"type",callback(e){w!==e.val&&j({...w,step0:e.val})}}},{input:{type:"price",name:"price",direction:"ltr",placeholder:"۰",addon:{first:{prompt:"قیمت"},last:{prompt:"تومان"}},disabled:(null==w?void 0:w.step0)!=="cash"}},{input:{name:"time",addon:{first:{prompt:"مدت زمان"},last:{prompt:"ث:د:س"}},masked:!0,showMask:!0,guide:!0,placeholderChar:"۰",mask:[/[\u06F0-\u06F90-9]/,/[\u06F0-\u06F90-9]/,":",/[\u06F0-\u06F90-9]/,/[\u06F0-\u06F90-9]/,":",/[\u06F0-\u06F90-9]/,/[\u06F0-\u06F90-9]/],keepCharPositions:!0,direction:"ltr"}}],[{upload:{prompt:"تصویر دوره را انتخاب کنید",name:"image"}}],[{input:{type:"textarea",placeholder:"توضیحات تکمیلی",name:"body"}}]]}},step1:{label:"دسته بندی",btn:{action:"back"},form:{config:{url:"add-course-to-category",initial:{course_id:+(null===(d=x.query)||void 0===d?void 0:d.id)}},structure:[[{select:{name:"category_ids",data:null==h?void 0:h.cat,multi:!0,placeholder:"انتخاب دسته بندی ها",args:{defaultValue:Array.isArray(null==h?void 0:h.cat)?null==h?void 0:null===(u=h.cat)||void 0===u?void 0:u.map(e=>null==e?void 0:e.id):null}}}]]}},step2:{label:"ارتباطات",btn:{action:"back"},view:{structure:{tabs:{data:[{label:"موسسات",cta:{prompt:"افزودن موسسه",modal:{header:"افزودن دوره به موسسه",body:(0,a.jsx)(c.Z,{config:{url:"add-course-to-organization",initial:{course_id:E+"",organization_id:""},callback:()=>x.reload()},structure:[[{select:{name:"organization_id",placeholder:"انتخاب موسسه",data:null==h?void 0:h.orgs,searchable:!0}}]]})}},content:{view:{config:{},structure:{table:{data:F,columns:[{title:"#",type:"id"},{title:"لوگو",type:"logo",key:"logo_img"},{title:"نام موسسه",type:"title",align:"right"},{title:"مدیر",type:"manager",key:"manager"},{title:"عملیات ها",type:"actions",actions:[{key:"delete",url:"detach-course-from-organization",method:"post"}]}]}}}}},{label:"کلاس ها",cta:{prompt:"افزودن کلاس",modal:{header:"افزودن کلاس به دوره",body:(0,a.jsx)(c.Z,{config:{url:"add-classroom-to-course",initial:{course_id:E+"",type:"free",price:"0"},callback:()=>x.reload()},structure:[[{select:{name:"classroom_id",placeholder:"انتخاب کلاس",data:null==h?void 0:h.cls,searchable:!0}}],[{select:{name:"type",placeholder:"نوع",value:"free",data:[{title:"نقدی",value:"cash"},{title:"رایگان",value:"free"}]}},{input:{name:"price",type:"price",placeholder:"۰",direction:"ltr",disabled:(null==w?void 0:w.step2)==="free",addon:{first:{prompt:"قیمت"},last:{prompt:"تومان"}}}}]]})}},content:{view:{config:{},structure:{accord:{entries:null!=q?q:[],ctas:[{prompt:"حذف کلاس از دوره",color:"red",onClick(e){var t;k(!1),v.Page.modal({header:"حذف",body:(0,a.jsxs)("div",{children:["آیا نسبت به حذف کلاس '".concat(null==e?void 0:e.title,"' از دوره '").concat(h.cu.title,"' مطمئن هستید؟"),(0,a.jsxs)("div",{children:[null!==_&&v.Convert.withBadge({val:(0,a.jsx)("label",{children:"حذف تمامی کاربران کلاس از دوره"}),color:"red"})," ",(0,a.jsx)(r.Z,{onChange:(e,t)=>k({..._,cls:t})})]})]}),footer:[{prompt:"حذف",color:"red",state:null!==(t=null==y?void 0:y.clsDelete)&&void 0!==t?t:"init",handleClick(){var t;b({...y,clsDelete:"loading"}),v.Request({config:{url:"detach-classroom-from-course",method:"post",req_data:{course_id:h.cu.id,classroom_id:null==e?void 0:e.id,delete_all_class_members_from_course:null!==(t=null==_?void 0:_.cls)&&void 0!==t&&t},push_notif:!0},dependencies:{callback(e){b({...y,orgDelete:"success"}),x.reload()}}})}}]})}}]}}}}},{label:"کاربران",cta:{prompt:"افزودن کاربر",modal:{header:"افزودن کاربر به دوره",body:(0,a.jsx)(c.Z,{config:{url:"add-user-to-course-member",initial:{course_id:E+""},callback:()=>x.reload()},structure:[[{select:{name:"user_id",placeholder:"انتخاب کاربر",data:null==h?void 0:h.pg,searchable:!0}}]]})}},content:{view:{config:{},structure:{table:{data:null!==(m=null==h?void 0:h.mems)&&void 0!==m?m:[],autoHeight:null,fillHeight:null,columns:[{title:"#",type:"id",key:"user_id"},{title:"نام و نام و خانوادگی",type:"title",key:"name",align:"right"},{title:"شماره تلفن",type:"phone",key:"phone"},{title:"عملیات ها",type:"actions",actions:[{key:"delete",url:"delete-course-user",method:"post"}]}]}}}}}]}}}},step3:{label:"سرفصل ها",btn:{action:"back"},sections:{data:h}}}:{loader:{}}})}}},function(e){e.O(0,[675,427,774,888,179],function(){return e(e.s=17604)}),_N_E=e.O()}]);