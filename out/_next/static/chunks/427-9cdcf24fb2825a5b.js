(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[427],{58761:function(e,t,n){"use strict";n.r(t),t.default={src:"/_next/static/media/logo.2a923b68.webp",height:232,width:300,blurDataURL:"data:image/webp;base64,UklGRqAAAABXRUJQVlA4WAoAAAAQAAAABwAABQAAQUxQSDEAAAAAVWc7Oi8AAQBikrWUUxEAApfMwapCDgAAdKuMxLVCKCsLRNbBfYZwNgEHVkNNXEcdAFZQOCBIAAAA0AEAnQEqCAAGAAJAOCWwAnQBDwwEP0AA/v4xy7ll3cDDEAXrvLQNOtuY0dHaYT8Ssro8vIOotEntDD7AXs0hxfPXml+qxAAA",blurWidth:8,blurHeight:6}},46427:function(e,t,n){"use strict";n.d(t,{Z:function(){return K}});var i=n(85893),r=n(1954),s=n(9008),o=n.n(s),l=n(67294),a=n(14111),c=n(62222),d=n(22815);n(57343),n(29297);var u=n(41664),p=n.n(u),_=n(11163),m=n(52056),h=n(87462),v=n(63366),f=n(45697),g=n.n(f),x=n(3743);function j(e,t,n){var i=0;return l.Children.map(e,function(e){if(!l.isValidElement(e))return e;var r=t.call(n,e,i);return i+=1,r})}var b={mapCloneElement:function(e,t,n){return j(e,function(e,n){return l.cloneElement(e,(0,h.Z)({key:n},t(e,n)))},n)},count:function(e){return l.Children.count(Array.isArray(e)?e.filter(function(e){return e}):e)},some:function(e,t,n){var i=0,r=!1;return l.Children.forEach(e,function(e){!r&&l.isValidElement(e)&&t.call(n,e,i+=1)&&(r=!0)}),r},map:j,find:function(e,t,n){var i,r=0;return l.Children.forEach(e,function(e){!i&&(r+=1,t.call(n,e,r)&&(i=e))}),i}},k=n(56709),y=n(28301),N={finish:l.createElement(k.Z,null),wait:null,process:null,error:l.createElement(y.Z,null)},w=l.forwardRef(function(e,t){var n,i,r=e.as,s=e.className,o=e.classPrefix,a=e.style,c=e.itemWidth,d=e.status,u=e.icon,p=e.stepNumber,_=e.description,m=e.title,f=(0,v.Z)(e,["as","className","classPrefix","style","itemWidth","status","icon","stepNumber","description","title"]),g=(0,x.Z)(void 0===o?"steps-item":o),j=g.merge,b=g.withClassPrefix,k=g.prefix,y=j(s,b(((n={custom:u})["status-"+d]=d,n))),w=(0,h.Z)({width:c},a),A=l.createElement("span",{className:k("icon","icon-"+d)},d&&null!==(i=N[d])&&void 0!==i?i:p);return u&&(A=l.createElement("span",{className:k("icon")},u)),l.createElement(void 0===r?"div":r,(0,h.Z)({},f,{ref:t,className:y,style:w}),l.createElement("div",{className:k("tail")}),l.createElement("div",{className:k(["icon-wrapper",u?"custom-icon":""])},A),l.createElement("div",{className:k("content")},l.createElement("div",{className:k("title")},m),_&&l.createElement("div",{className:k("description")},_)))});w.displayName="StepItem",w.propTypes={className:g().string,classPrefix:g().string,style:g().object,itemWidth:g().oneOfType([g().number,g().string]),status:g().oneOf(["finish","wait","process","error"]),icon:g().object,stepNumber:g().number,description:g().node,title:g().node};var A=l.forwardRef(function(e,t){var n=e.as,i=e.classPrefix,r=e.className,s=e.children,o=e.vertical,a=e.small,c=e.current,d=void 0===c?0:c,u=e.currentStatus,p=void 0===u?"process":u,_=(0,v.Z)(e,["as","classPrefix","className","children","vertical","small","current","currentStatus"]),m=(0,x.Z)(void 0===i?"steps":i),f=m.merge,g=m.prefix,j=m.withClassPrefix,k=!o,y=f(r,j({small:a,vertical:o,horizontal:!o})),N=l.Children.count(s),w=b.mapCloneElement(s,function(e,t){var n=(0,h.Z)({stepNumber:t+1,status:"wait",style:k?{flexBasis:t<N-1?100/(N-1)+"%":void 0,maxWidth:t===N-1?100/N+"%":void 0}:void 0},e.props);return"error"===p&&t===d-1&&(n.className=g("next-error")),!e.props.status&&(t===d?(n.status=p,n.className=f(n.className,g("item-active"))):t<d&&(n.status="finish")),n});return l.createElement(void 0===n?"div":n,(0,h.Z)({},_,{ref:t,className:y}),w)});A.Item=w,A.displayName="Steps",A.propTypes={classPrefix:g().string,vertical:g().bool,small:g().bool,className:g().string,children:g().node,current:g().number,currentStatus:g().oneOf(["finish","wait","process","error"])};var E=n(17669);function Z(e){let{steps:t,content:n,page:r}=e,{p:s,u:o}=null!=r?r:{};return(0,i.jsx)("div",{className:"".concat(E.wrapper),children:Object.keys(t).length>1&&(0,i.jsx)("div",{className:"".concat(E.steps),id:"steps",children:(0,i.jsx)("div",{className:"".concat(E.steps_container),children:(0,i.jsx)(A,{small:!0,className:"".concat(E.steps_comp),id:"steps_container",children:null==t?void 0:t.map((e,r)=>{let l=null==n?void 0:n[e];return console.log(l),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(p(),{href:{query:{...s.Router.query.get(),step:r+1}},children:(0,i.jsx)(A.Item,{title:"".concat(null==l?void 0:l.label),stepNumber:o.toPe(r+1),status:"".concat(s.Router.query.get("step")>r+1?"wait":s.Router.query.get("step")===r+1+""||void 0===s.Router.query.get("step")&&0===r?"process":"wait"),className:"".concat(E.step," ").concat(void 0===s.Router.query.get("step")&&0===r||s.Router.query.get("step")===r+1+""?E.current:""," cursor-pointer transition-colors")},"step-".concat(r,"-").concat(e))}),r+1!==Object.keys(t).length&&(0,i.jsx)("div",{className:"".concat(E.steps_spacer)})]})})})})})})}var O=n(20199),R=n(61603),S=n(48936);function C(e){let{data:t,Solver:n,View:s}=e,o=e=>{var t,r,o,c;let[d,u]=l.useState(),[p,_]=l.useState({ep:null,s:0});return(0,i.jsx)(s,{structure:{tabs:{data:[{label:"ایجاد قسمت",disabled:p.s,disabled_message:"شما قبلا قسمت را ساخته اید",content:{form:{config:{url:"episodes",initial:{title:"",description:"",body:"",section_id:(null==e?void 0:null===(t=e.e)||void 0===t?void 0:t.id)+"",type:"open",published:1},callback(e){let{episode:t}=null!=e?e:{};setTimeout(()=>{0===p.s&&_({ep:t,s:1}),a.push({query:{...a.query,tab:1}})},1e3)}},structure:[[{input:{name:"title",placeholder:"نام قسمت"}},{input:{name:"description",placeholder:"توضیح مختصر",addon:{last:{prompt:"SP-counter-150"}}},flex:2}],[{input:{name:"body",placeholder:"توضیحات تکمیلی",type:"textarea"}}]]}}},{label:"محتوا و مدیا",content:{form:{config:{noBtn:!0},structure:[[{toggle:{prompt:"افزودن ویدیو",state:null==d?void 0:d.video,setState:e=>u({...d,video:e}),on:{form:{config:{noBtn:!0},structure:[[{toggle:{prompt:"آپلود ویدیو",state:null==d?void 0:d.video_upl,setState:e=>u({...d,video_upl:e}),on:{form:{config:{url:"upload-encrypted-video-file",initial:{videoFile:{}},content_type:"multipart/form-data",callback(e){var t;let{data:i}=null!=e?e:{},{video_id:r,videoUrl:s,lockFileUrl:o,videoTime:l}=null!=i?i:{};n.Request({config:{url:"videos",method:"post",req_data:{videoUrl:s,lockFileUrl:o,time:l,driver:"sftp",type:"open",episode_id:null==p?void 0:null===(t=p.ep)||void 0===t?void 0:t.id},push_notif:!1},dependencies:{}})}},structure:[[{upload:{name:"videoFile",prompt:"ویدیو را انتخاب کنید"}}]]}},off:{form:{config:{url:"videos",initial:{videoUrl:"",time:"00:00:00",episode_id:null==p?void 0:null===(r=p.ep)||void 0===r?void 0:r.id,driver:"sftp",type:"open"}},structure:[[{input:{placeholder:"لینک ویدیو",name:"videoUrl"}}],[{input:{name:"time",addon:{first:{prompt:"مدت زمان"},last:{prompt:"ث:د:س"}},masked:!0,showMask:!0,guide:!0,placeholderChar:"۰",mask:[/[\u06F0-\u06F90-9]/,/[\u06F0-\u06F90-9]/,":",/[\u06F0-\u06F90-9]/,/[\u06F0-\u06F90-9]/,":",/[\u06F0-\u06F90-9]/,/[\u06F0-\u06F90-9]/],keepCharPositions:!0,direction:"ltr"}}]]}}}}]]}}}}],[{toggle:{prompt:"افزودن PDF",state:null==d?void 0:d.pdf,setState:e=>u({...d,pdf:e}),on:{form:{config:{noBtn:!0},structure:[[{toggle:{prompt:"آپلود فایل PDF",state:null==d?void 0:d.pdf_upl,setState:e=>u({...d,pdf_upl:e}),on:{form:{config:{url:"upload-file",initial:{file:{}},content_type:"multipart/form-data",callback(e){var t;let{data:i}=null!=e?e:{},{fileUrl:r,fileExtension:s}=null!=i?i:{};n.Request({config:{url:"files",method:"post",req_data:{fileUrl:r,extension:s,driver:"sftp",type:"open",episode_id:null==p?void 0:null===(t=p.ep)||void 0===t?void 0:t.id},push_notif:!1},dependencies:{}})}},structure:[[{upload:{name:"file",prompt:"فایل را انتخاب کنید"}}]]}},off:{form:{config:{url:"files",initial:{fileUrl:"",extension:"pdf",episode_id:null==p?void 0:null===(o=p.ep)||void 0===o?void 0:o.id,driver:"sftp",type:"open"}},structure:[[{input:{placeholder:"لینک PDF",name:"fileUrl"}}]]}}}}]]}}}}],[{toggle:{prompt:"افزودن فایل صوتی",state:null==d?void 0:d.voice,setState:e=>u({...d,voice:e}),on:{form:{config:{noBtn:!0},structure:[[{toggle:{prompt:"آپلود فایل صوتی",state:null==d?void 0:d.voice_upl,setState:e=>u({...d,voice_upl:e}),on:{form:{config:{url:"upload-file",initial:{file:{}},content_type:"multipart/form-data",callback(e){var t;let{data:i}=null!=e?e:{},{fileUrl:r,fileExtension:s}=null!=i?i:{};n.Request({config:{url:"files",method:"post",req_data:{fileUrl:r,extension:s,driver:"sftp",type:"open",episode_id:null==p?void 0:null===(t=p.ep)||void 0===t?void 0:t.id},push_notif:!1},dependencies:{}})}},structure:[[{upload:{name:"file",prompt:"فایل را انتخاب کنید"}}]]}},off:{form:{config:{url:"files",initial:{fileUrl:"",extension:"mp3",episode_id:null==p?void 0:null===(c=p.ep)||void 0===c?void 0:c.id,driver:"sftp",type:"open"}},structure:[[{input:{placeholder:"لینک فایل صوتی",name:"fileUrl"}}]]}}}}]]}}}}]]}},disabled:!p.s,disabled_message:"برای دسترسی به این بخش اول قسمت را ایجاد کنید"}],form:!0}}})},a=(0,_.useRouter)(),{cu:d}=null!=t?t:{},u=null==d?void 0:d.sections,[p,m]=l.useState({a:u,reverse:!1}),[h,v]=l.useState();return l.useEffect(()=>{p.reverse||m({a:u.reverse(),reverse:!0})}),d?(null==d?void 0:d.sections)&&(0,i.jsxs)("div",{className:"",children:[(0,i.jsxs)("div",{className:"".concat(S.add),onClick:()=>n.Page.modal({header:"افزودن سرفصل جدید",body:(0,i.jsx)(R.Z,{config:{url:"sections",initial:{course_id:(null==d?void 0:d.id)+"",title:"",number:1},callback:e=>a.reload()},structure:[[{input:{name:"title",placeholder:"نام سرفصل"}}]]})}),children:[(0,i.jsx)(r.JO,{icon:"ic:round-plus",height:"48"}),(0,i.jsx)("strong",{children:(0,i.jsx)("small",{children:"ایجاد سرفصل جدید"})})]}),(0,i.jsx)(s,{structure:{accord:{entries:null==p?void 0:p.a,inside:{data_info:{url:"sections"},view:{config:{},structure:{table:{fillHeight:!0,columns:[{title:"#",type:"id",key:"id"},{title:"عنوان قسمت",type:"title",key:"title"},{title:"ویدیو",type:"dependencies",key:"video_url"},{title:"صوت",type:"dependencies",key:"mp3_url"},{title:"PDF",type:"dependencies",key:"pdf_url"},{title:"عملیات ها",type:"actions"}]}}}},ctas:[{prompt:"افزودن قسمت",color:"blue",onClick(e){n.Page.modal({header:"افزودن قسمت به '".concat(e.title,"'"),body:(0,i.jsx)(o,{e:e})})}},{prompt:"حذف سرفصل",color:"red"}]}},Solver:n})]}):(0,i.jsx)(c.Z,{center:!0})}var P=n(369),q=n(73265),F=n(81915),J=n(21983);function L(e){let{Solver:t,title:n,toggle:r,additional:s}=e;return(0,i.jsx)("div",{className:"".concat(J.wrapper),children:(0,i.jsxs)("div",{className:"".concat(J.content),children:[(0,i.jsx)("div",{className:"".concat(J.path),children:t.Router.path.get("all")&&t.Router.path.get("all").map((e,n)=>{var r;return(0,i.jsx)("span",{className:"".concat(t.Router.path.get("all").pop()===e?J.active:""),children:"".concat(n>0?" › ":"").concat(null===(r=(e=>{let t;switch(e){case"super-admin":case"user":t={text:"پنل",link:"./"};break;case"view":t={text:"مشاهده جزئیات",link:"./view"};break;case"failed_pay":t={text:"پرداخت ناموفق",link:"./failed_pay"};break;case"study":t={text:"کلاس درس",link:"./study"};break;case"success_pay":t={text:"پرداخت موفق",link:"./success_pay"};break;case"invoices":t={text:"پرداخت ها",link:"./invoices"};break;case"practices":t={text:"حل تمرین",link:"./practices"};break;case"courses":t={text:"دوره ها",link:"./courses"};break;case"organizations":t={text:"موسسه ها",link:"./organizations"};break;case"users":t={text:"کاربران",link:"./users"};break;case"classrooms":t={text:"کلاس ها",link:"./classrooms"};break;case"categories":t={text:"دسته بندی ها",link:"./categories"};break;case"create":t={text:"ایجاد",link:null};break;case"edit":t={text:"ویرایش",link:null};break;case"overview":t={text:"مشاهده",link:null};break;case"edit_user_profile":t={text:"ویرایش اطلاعات کاربری",link:null};break;case"change_password":t={text:"تغییر رمز عبور",link:null};break;case"discounts":t={text:"تخفیفات",links:null};break;default:t={text:"",link:null}}return t})(e))||void 0===r?void 0:r.text," ")},"path-".concat(n))})}),(0,i.jsxs)("div",{className:"".concat(J.title),children:[(0,i.jsxs)("div",{className:"".concat(J.heading),children:[(0,i.jsx)("h1",{className:"".concat(J.heading_tag),children:"string"==typeof n?t.Convert.toPe(null!=n?n:"عنوان صفحه"):null!=n?n:""}),s&&(0,i.jsxs)("div",{className:"".concat(J.badge),children:[(0,i.jsx)("small",{className:"".concat(J.header_slash),children:"/"}),(0,i.jsx)(q.Z,{color:"عضو هستید"===s?"green":"عضو نیستید"===s?"red":"violet",children:(0,i.jsx)("strong",{children:t.Convert.toPe(null!=s?s:"")})})]})]}),(0,i.jsx)("div",{className:"".concat(J.toggle),children:r&&(0,i.jsxs)("div",{style:{display:"grid",gridAutoFlow:"column",columnGap:".35rem",alignItems:"center",justifyContent:"center"},children:[(0,i.jsx)("label",{children:(0,i.jsx)("strong",{className:"".concat("1"===t.Router.query.get("toggle")?"":J.current),children:null==r?void 0:r.off})}),(0,i.jsx)(F.Z,{size:"md",checked:"1"===t.Router.query.get("toggle"),onChange:e=>t.Router.query.set("toggle",e?1:0)}),(0,i.jsx)("label",{children:(0,i.jsx)("strong",{className:"".concat("1"===t.Router.query.get("toggle")?J.current:""),children:null==r?void 0:r.on})})]})})]})]})})}n(3893);var B=n(73250),W=n(58761),Q=n(25675),D=n.n(Q),I=n(96210),U=n(92297),V=n(823);function T(e){let{links:t,prompt:n,icon:r,page:s,href:o}=e,a=(0,l.useId)(),c=()=>null==t?void 0:t.map((e,t)=>{let{prompt:n,href:r}=null!=e?e:{};return(0,i.jsx)(p(),{href:"/".concat(null!=o?o:"","/").concat(null!=r?r:""),children:(0,i.jsx)("strong",{children:null!=n?n:""})},"link-".concat(o,"-").concat(t))});return(0,i.jsx)("div",{className:"".concat(V.wrapper),children:(0,i.jsx)(U.Z,{trigger:"click",placement:"left",speaker:(0,i.jsx)(I.Z,{arrow:!1,className:V.drop_mother,children:(0,i.jsx)(c,{})}),onEntering(){let e=document.getElementById(a);return e.className="".concat(V.link," ").concat(V.action_detector)},onExiting(){let e=document.getElementById(a);return e.className="".concat(V.link)},children:(0,i.jsxs)("div",{className:"".concat(V.link),id:null!=a?a:"",children:[(0,i.jsx)("div",{className:"".concat(V.icon),children:null!=r?r:""}),(0,i.jsx)("div",{className:"".concat(V.prompt),children:(0,i.jsx)("strong",{children:null!=n?n:""})})]})})})}var z=n(11860),G=n.n(z);function H(e){var t;let{page:n,collapsed:s}=e,o=(0,_.useRouter)(),a=G(),[c,d]=l.useState("");l.useEffect(()=>{var e,t,n;!c&&(null===(e=a.get("user"))||void 0===e?void 0:e.role)&&d(null!==(n=null===(t=a.get("user"))||void 0===t?void 0:t.user_name)&&void 0!==n?n:"")},[a,c]);let u=(e,t)=>{var n;let{onClose:r,left:s,top:l,className:c,...d}=e;return(0,i.jsxs)(I.Z,{ref:t,className:c+" "+V.drop_mother,style:{left:s,top:l},full:!0,children:[(0,i.jsx)(p(),{href:"/".concat(o.pathname.split("/")[1],"/change_password"),children:(0,i.jsx)("strong",{children:"تغییر رمز عبور"})}),(null===(n=a.get("user"))||void 0===n?void 0:n.role)&&(0,i.jsx)(p(),{href:"/".concat(o.pathname.split("/")[1],"/edit_user_profile"),children:(0,i.jsx)("strong",{children:"ویرایش پروفایل"})})]})},[m,h]=l.useState();return l.useEffect(()=>{var e,t;let n=function(){let e=!(arguments.length>0)||void 0===arguments[0]||arguments[0];return e?[{prompt:"مشاهده",href:"/"},{prompt:"ایجاد",href:"/create"}]:[{prompt:"مشاهده",href:"/"}]},s=(null===(e=a.get("user"))||void 0===e?void 0:e.role)?(null===(t=a.get("user"))||void 0===t?void 0:t.role)!=="user"?[{links:n(),prompt:"دوره ها",href:"/super-admin/courses/",icon:(0,i.jsx)(r.JO,{icon:"carbon:course",color:"white",height:"22"})},{links:n(),prompt:"تخفیفات",href:"/super-admin/discounts/",icon:(0,i.jsx)(r.JO,{icon:"ic:round-discount",color:"white",height:"22"})},{links:n(),prompt:"کلاس ها",href:"/super-admin/classrooms",icon:(0,i.jsx)(r.JO,{icon:"carbon:group-presentation",color:"white",height:"22"})},{links:n(),prompt:"موسسه ها",href:"/super-admin/organizations",icon:(0,i.jsx)(r.JO,{icon:"carbon:building-insights-2",color:"white",height:"22"})},{links:n(!1),prompt:"پرداخت ها",href:"/super-admin/invoices",icon:(0,i.jsx)(r.JO,{icon:"ic:round-payments",color:"white",height:"22"})},{links:n(),prompt:"کاربران",href:"/super-admin/users",icon:(0,i.jsx)(r.JO,{icon:"ic:round-supervised-user-circle",color:"white",height:"22"})},{links:n(),prompt:"دسته بندی ها",href:"/super-admin/categories",icon:(0,i.jsx)(r.JO,{icon:"carbon:collapse-categories",color:"white",height:"22"})}]:[{links:n(),prompt:"دوره ها",href:"/user/courses/",icon:(0,i.jsx)(r.JO,{icon:"carbon:course",color:"white",height:"22"})},{links:n(),prompt:"کلاس آنلاین",href:"/user/online_class",icon:(0,i.jsx)(r.JO,{icon:"carbon:group-presentation",color:"white",height:"22"})},{links:n(),prompt:"آزمون آنلاین",href:"/user/online_exam",icon:(0,i.jsx)(r.JO,{icon:"bi:list-check",color:"white",height:"22"})}]:[];JSON.stringify(s)!==JSON.stringify(m)&&h(s)},[a,m]),(0,i.jsxs)("aside",{className:"".concat(B.wrapper," ").concat(s?B.collapsed:""),children:[(0,i.jsx)("div",{className:"".concat(B.logo_wrapper),children:(0,i.jsx)("div",{className:"".concat(B.logo_container),children:(0,i.jsx)(D(),{src:W,alt:"Afagh Logo",className:B.logo,layout:"fill"})})}),(0,i.jsx)("div",{className:"".concat(B.links_container),children:(0,i.jsx)("div",{className:"".concat(B.links),children:m&&m.map((e,t)=>(0,l.createElement)(T,{...e,page:n,key:"link-".concat(t)}))})}),(0,i.jsxs)("div",{className:"".concat(B.user),children:[(0,i.jsx)("div",{className:"".concat(B.user_profile),children:(0,i.jsx)("div",{className:"".concat(B.profile_container)})}),(0,i.jsx)("div",{className:"".concat(B.user_info),children:(0,i.jsx)("strong",{children:null!=c?c:""})}),(0,i.jsxs)("div",{className:"".concat(B.utils),children:[(0,i.jsx)("div",{className:"".concat(B.settings),children:(0,i.jsx)(U.Z,{placement:"auto",trigger:(null===(t=a.get("user"))||void 0===t?void 0:t.role)==="user"?"click":"none",speaker:u,children:(0,i.jsx)(r.JO,{icon:"carbon:settings",color:"white",width:20})})}),(0,i.jsx)("div",{className:"".concat(B.logout),onClick(){},children:(0,i.jsx)(r.JO,{icon:"carbon:power",color:"white",width:20})})]})]})]})}var K=l.memo(function(e){var t,n,s;let{content:u,solve:h,header:v,overlay:f}=null!=e?e:{},g=(0,l.useMemo)(()=>(function(e){var t,n,s,o,l,d;let u=(0,_.useRouter)(),{btn:h,title:v,view:f,form:g,search:x=!1,loader:j,sections:b,handCrafted:k}=null!==(s=null==e?void 0:e["step".concat((null===(t=u.query)||void 0===t?void 0:t.step)?+u.query.step-1:0)])&&void 0!==s?s:{},{loader:y}=null!=e?e:{},N=e.Solver,w=e=>(0,i.jsx)(R.Z,{...e,Solver:N});return(0,i.jsxs)("div",{className:"".concat(m.wrapper),children:[(0,i.jsxs)("div",{className:"".concat(m.upper),children:[(null==e?void 0:e.step1)&&(0,i.jsx)(Z,{steps:Object.keys(e).filter(e=>null!==(o=e.includes("step"))&&void 0!==o?o:[]),content:e,page:{p:N,u:N.Convert}}),f&&x&&(0,i.jsx)(O.Z,{className:m.search,type:"search",defaultValue:null!==(l=null===(n=u.query)||void 0===n?void 0:n.s)&&void 0!==l?l:"",addon:{first:{prompt:"جستجو"},last:{icon:(0,i.jsx)(r.JO,{icon:"ic:round-search",height:"24"})}}}),h&&(0,i.jsx)(a.Z,{className:"".concat(m.btn),children:(null==h?void 0:h.action)==="create"?(0,i.jsx)(p(),{href:"".concat(N.Router.path.get(),"/create"),children:(0,i.jsxs)("span",{className:"".concat(m.btn_container),children:[(0,i.jsxs)("strong",{children:["ایجاد ",null==h?void 0:h.prompt," جدید"]}),(0,i.jsx)("div",{className:"".concat(m.icon),children:(0,i.jsx)(r.JO,{icon:"ic:round-add",height:"32"})})]})}):(0,i.jsx)(p(),{href:null!==(d=null==h?void 0:h.href)&&void 0!==d?d:N.Router.path.get().replace("create","").replace("edit","").replace("view","").replace("study",""),children:(0,i.jsxs)("span",{className:"".concat(m.btn_container),children:[(0,i.jsx)("strong",{children:"بازگشت"}),(0,i.jsx)("div",{className:"".concat(m.icon),children:(0,i.jsx)(r.JO,{icon:"ic:round-arrow-back-ios-new",height:"24"})})]})})}),v&&(0,i.jsx)("h3",{children:v})]}),(0,i.jsxs)("div",{className:"".concat(m.content),children:[f&&(0,i.jsx)(P.Z,{...f,Solver:N}),g&&(0,i.jsx)(w,{...g}),(j||y)&&(0,i.jsx)(c.Z,{center:!0}),b&&(0,i.jsx)(C,{...b,Solver:N,View(e){let{structure:t}=e;return(0,i.jsx)(P.Z,{structure:t,Solver:N})}}),null!=k?k:""]})]})})({...u,Solver:h}),[u]),[x,j]=(0,l.useState)(!1),[b,k]=(0,l.useState)(!1);return(0,i.jsxs)("div",{className:"".concat(d.wrapper),suppressHydrationWarning:!0,children:[(0,i.jsx)(o(),{children:(0,i.jsxs)("title",{children:[null!==(s=null!==(n=null==v?void 0:v.metaTitle)&&void 0!==n?n:null==v?void 0:v.title)&&void 0!==s?s:""," | بنیاد آفاق"]})}),(0,i.jsxs)("div",{className:"".concat(d.container),children:[(0,i.jsx)("div",{className:d.side,children:(0,i.jsx)(a.Z,{appearance:"primary",style:{display:"flex",aspectRatio:"1/1",alignItems:"center",borderRadius:"100rem",padding:"1rem"},onClick:()=>j(!x),children:(0,i.jsx)(r.JO,{icon:x?"ic:round-close":"ic:round-menu",color:"white"})})}),(null===(t=h.Router.path.get("all"))||void 0===t?void 0:t.pop())==="study"&&(0,i.jsx)("div",{className:d.study,style:{bottom:b?"2rem":null,zIndex:b?1e5:null,width:"fit-content",top:b?"unset":null},children:(0,i.jsx)(a.Z,{appearance:"primary",style:{display:"flex",aspectRatio:"1/1",alignItems:"center",borderRadius:"100rem",padding:"1rem",width:"fit-content"},onClick:()=>k(!b),children:(0,i.jsx)(r.JO,{icon:b?"ic:round-close":"ic:round-menu",color:"white"})})}),(0,i.jsx)("div",{className:"".concat(d.sidebar," ").concat(x?d.side_open:""),children:(0,i.jsx)(H,{})}),(0,i.jsxs)("div",{className:"".concat(d.content_container),style:{"--overlay":f?"33.5%":"","--open":b?"block":"none"},children:[(0,i.jsx)(L,{...v,Solver:h}),(0,i.jsxs)("div",{className:"".concat(d.content),children:[(null==u?void 0:u.loading)?(0,i.jsx)(c.Z,{}):g,null!=f?f:""]})]})]})]})})},29297:function(e,t,n){"use strict";var i=n(85893);n(3893);let r=e=>{var t,n;let{sec:r,ep:s,data:o,drawer:l=!1}=e,a=Array.isArray(null==o?void 0:o.sections)&&(o.sections.find(e=>+(null==e?void 0:e.id)==+r)||(null==o?void 0:null===(t=o.sections)||void 0===t?void 0:t[0])),c=Array.isArray(null==a?void 0:a.episode)&&(null==a?void 0:a.episode.find(e=>+(null==e?void 0:e.id)==+s))||(null==a?void 0:null===(n=a.episode)||void 0===n?void 0:n[0]),{title:d,id:u}=null!=a?a:{},{body:p,description:_,title:m,mp3_url:h,pdf_url:v,video_url:f}=null!=c?c:{};return l?(0,i.jsx)("div",{style:{backgroundColor:"black",height:"100%"}}):void 0!==u&&{section:{title:d,id:u},episode:{epTitle:m,description:_,body:p,mp3_url:h,pdf_url:v,video_url:f}}};t.Z=r},823:function(e){e.exports={wrapper:"dropdownLink_wrapper__caNn4",link:"dropdownLink_link__42raM",icon:"dropdownLink_icon__6Lr_7",prompt:"dropdownLink_prompt__j_Trq",action_detector:"dropdownLink_action_detector__rz0Zc",drop_mother:"dropdownLink_drop_mother___4VhX",drop:"dropdownLink_drop__pFaDn",drop_item:"dropdownLink_drop_item__VIxFQ",drop_item_icon:"dropdownLink_drop_item_icon__C_qua",logo_container:"dropdownLink_logo_container__4XoOq",logo:"dropdownLink_logo__HSypo"}},17669:function(e){e.exports={wrapper:"steps_wrapper__lNn5W",overview:"steps_overview__RPgb7",content:"steps_content__VPKuP",steps:"steps_steps__CRf7f",steps_container:"steps_steps_container__Iaftw",step:"steps_step__FSu4G",steps_spacer:"steps_steps_spacer__5Svkn",container:"steps_container__7MWLW",upper_left_btn:"steps_upper_left_btn__MnvYP",btn:"steps_btn__jt7fn",scroll_box:"steps_scroll_box__uLilg",scroll_box_create:"steps_scroll_box_create__eJUeC"}},52056:function(e){e.exports={wrapper:"content_wrapper__Jvn1u",upper:"content_upper__9Nkp2",search:"content_search__Dpo_H",btn:"content_btn___mTK0",btn_container:"content_btn_container__gaxsP",icon:"content_icon__0HOtA",content:"content_content__FZ6EO"}},21983:function(e){e.exports={wrapper:"header_wrapper__K3eaQ",fade:"header_fade__7mn8u",path:"header_path__zsGfj",active:"header_active__BKKua",title:"header_title__NQ_dN",heading:"header_heading__4BoL9",heading_tag:"header_heading_tag__509L9",badge:"header_badge__wlwa3",header_slash:"header_header_slash___SNyd",toggle:"header_toggle__2KbpU",current:"header_current__TtVc5",section_selector:"header_section_selector__rnzg1",section_selector_btn:"header_section_selector_btn__VZGYe",section_selector_content:"header_section_selector_content__BYAoL",toggle_container:"header_toggle_container__nNzcU"}},22815:function(e){e.exports={wrapper:"main_wrapper__D9WTN",upper:"main_upper__ok39I",btn:"main_btn__Ku4RL",paginate_container:"main_paginate_container__pluQ4",paginate:"main_paginate__tmJH4",search:"main_search__YFGii",container:"main_container__loQUx",sidebar:"main_sidebar__Sh16t",content_container:"main_content_container__1e1Ld",content:"main_content__LEHzP",trigger:"main_trigger__b4c77",side:"main_side__BmOYW",study:"main_study__OjGAW",side_open:"main_side_open__fj0Is"}},73250:function(e){e.exports={wrapper:"sidebar_wrapper___1ojJ",collapsed:"sidebar_collapsed__VT9no",logo_wrapper:"sidebar_logo_wrapper__0rdsw",logo_container:"sidebar_logo_container__2jcGx",logo:"sidebar_logo__xN0PP",links_container:"sidebar_links_container__i5mQ_",links:"sidebar_links__JbZrD",user:"sidebar_user__K3Gca",user_profile:"sidebar_user_profile__EEW98",profile_container:"sidebar_profile_container__XpZ3n",user_info:"sidebar_user_info__b9Bk5",utils:"sidebar_utils__5luWF",settings:"sidebar_settings__V32p4",logout:"sidebar_logout__hFXbQ"}},48936:function(e){e.exports={add:"sections_add__cRThi"}},9008:function(e,t,n){e.exports=n(83121)}}]);