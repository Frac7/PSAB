(this.webpackJsonppsab=this.webpackJsonppsab||[]).push([[14],{633:function(e,a,t){"use strict";t.r(a);var r=t(2),n=t.n(r),s=t(26),c=t(118),l=t(668),o=t(640),d=t(641),i=t(642),m=t(965),u=t(967),E=t(968),p=t(969),f=t(970),g=t(971),b=t(116),h=function(e){var a=e.values,t=e.touched,r=e.errors,s=e.isSubmitting,c=e.handleSubmit,l=e.handleChange;return n.a.createElement(u.a,{onSubmit:c,noValidate:!0},n.a.createElement(E.a,null,n.a.createElement(p.a,{for:"address"},"Address"),n.a.createElement(f.a,{valid:t.address&&!r.address,type:"text",name:"address",id:"address",placeholder:"0xa1b2c3d4e5f6...",onChange:l,value:a.address}),r.address&&n.a.createElement(g.a,{color:"danger"},r.address)),n.a.createElement(E.a,null,n.a.createElement(p.a,{for:"password"},"Password"),n.a.createElement(f.a,{valid:t.password&&!r.password,type:"password",name:"password",id:"password",onChange:l,value:a.password}),r.password&&n.a.createElement(g.a,{color:"danger"},r.password)),n.a.createElement(b.b,{type:"submit",disabled:s},"Accedi"))},w=t(667),j={address:"",password:""},v=Object(w.c)().shape({address:Object(w.e)().required("Inserire l'indirizzo").length(42,"L'address \xe8 lungo esattamente 42 caratteri"),password:Object(w.e)().required("Inserire la password")}),y=t(39),O=t(27),q=t(117),x={requestLogin:O.d,requestUser:O.f},S=Object(c.b)((function(e){return{user:q.a.getUser(e)}}),x)((function(e){var a=e.requestLogin,t=e.requestUser,c=e.user,u=c.data,E=c.isLoading,p=c.isError,f=c.error,g=Object(s.h)();Object(r.useEffect)((function(){u||t()}),[u,t]);var w=Object(r.useCallback)((function(e){a({data:e})}),[a]);return u?n.a.createElement(s.a,{to:g.state&&g.state.from||y.d}):E?n.a.createElement(o.a,{fluid:!0},n.a.createElement(d.a,{className:"my-3 justify-content-center align-content-center align-items-center"},n.a.createElement(i.a,{xl:"auto",sm:"auto"},n.a.createElement("h3",null,"Accesso in corso..."))),n.a.createElement(d.a,{className:"my-3 justify-content-center align-content-center align-items-center"},n.a.createElement(i.a,{xl:"auto",sm:"auto"},n.a.createElement(b.e,{size:"large"})))):n.a.createElement(n.a.Fragment,null,p&&n.a.createElement(d.a,{className:"justify-content-center align-content-center align-items-center"},n.a.createElement(i.a,{xl:6,sm:10},n.a.createElement(m.a,{color:"danger"},f&&f.message||"Si \xe8 verificato un errore"))),n.a.createElement(d.a,{className:"justify-content-center"},n.a.createElement(i.a,{xl:6,sm:10},n.a.createElement(l.a,{initialValues:j,validationSchema:v,onSubmit:w},(function(e){return n.a.createElement(h,e)})))))}));a.default=function(){return n.a.createElement(S,null)}}}]);
//# sourceMappingURL=14.06841694.chunk.js.map