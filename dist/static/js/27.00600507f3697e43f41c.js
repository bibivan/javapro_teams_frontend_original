webpackJsonp([27],{Nrm0:function(s,a){},"gf/L":function(s,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("Dd8w"),r=e.n(t),o=e("NYxO"),i=e("+cKO"),n=e("TYx6"),d=e("i53X"),w={name:"ShiftPassword",components:{PasswordField:n.a,PasswordRepeatField:d.a},data:function(){return{password:"",passwordTwo:""}},methods:r()({},Object(o.b)("profile/account",["passwordSet"]),{submitHandler:function(){var s=this;this.$v.$invalid?this.$v.$touch():this.passwordSet(this.password).then(function(){s.$router.push({name:"Login"})})}}),validations:{password:{required:i.required,minLength:Object(i.minLength)(8)},passwordTwo:{required:i.required,minLength:Object(i.minLength)(8),sameAsPassword:Object(i.sameAs)("password")}},i18n:{messages:{en:{password:"Change password",change:"Change"},ru:{password:"Смена пароля",change:"Сменить"}}}},c={render:function(){var s=this,a=s.$createElement,e=s._self._c||a;return e("div",{staticClass:"shift-password"},[e("form",{staticClass:"shift-password__form",on:{submit:function(a){return a.preventDefault(),s.submitHandler(a)}}},[e("div",{staticClass:"form__block"},[e("h4",{staticClass:"form__subtitle"},[s._v(s._s(s.$t("password")))]),e("password-field",{class:{checked:s.$v.password.required&&s.$v.passwordTwo.sameAsPassword},attrs:{id:"shift-password",v:s.$v.password,info:"info",registration:"registration"},model:{value:s.password,callback:function(a){s.password=a},expression:"password"}}),e("password-repeat-field",{class:{checked:s.$v.password.required&&s.$v.passwordTwo.sameAsPassword},attrs:{id:"shift-repeat-password",v:s.$v.passwordTwo},model:{value:s.passwordTwo,callback:function(a){s.passwordTwo=a},expression:"passwordTwo"}})],1),e("div",{staticClass:"shift-password__action"},[e("button-hover",{attrs:{tag:"button",type:"submit",variant:"white"}},[s._v(s._s(s.$t("change")))])],1)])])},staticRenderFns:[]};var p=e("VU/8")(w,c,!1,function(s){e("Nrm0")},null,null);a.default=p.exports}});
//# sourceMappingURL=27.00600507f3697e43f41c.js.map