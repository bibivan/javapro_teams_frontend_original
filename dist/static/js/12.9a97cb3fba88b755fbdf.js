webpackJsonp([12],{MUM6:function(t,i){},TwRG:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("Dd8w"),n=e.n(a),o=e("NYxO"),r=e("+cKO"),s=e("TYx6"),l=e("/QaM"),u={name:"Login",components:{PasswordField:s.a,EmailField:l.a},data:function(){return{email:"",password:""}},computed:n()({},Object(o.c)("auth/api",["authStatus"]),{redirectUrl:function(){return this.$route.query.redirect},authErrorMessage:function(){return this.authErr}}),methods:n()({},Object(o.b)("auth/api",["login"]),Object(o.b)("profile/info",["apiInfo"]),{submitHandler:function(){var t=this;this.$v.$invalid?this.$v.$touch():this.login({email:this.email,password:this.password}).then(function(){t.apiInfo().then(function(){"error"!==t.authStatus&&t.$router.push({name:t.redirectUrl||"News"})})}).catch(function(t){})},hideModal:function(){this.$modal.show("privacy")}}),validations:{email:{required:r.required,email:r.email},password:{required:r.required,minLength:Object(r.minLength)(8)}},i18n:{messages:{en:{title:"Log in",login:"Sign in",forgot:"Forgot your password?"},ru:{title:"Войдите в аккаунт",login:"Войти",forgot:"Забыли пароль?"}}}},c={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"login"},[e("h2",{staticClass:"login__title form__title"},[t._v(t._s(t.$t("title")))]),e("form",{staticClass:"login__form",on:{submit:function(i){return i.preventDefault(),t.submitHandler(i)}}},[e("email-field",{attrs:{id:"login-email",v:t.$v.email},model:{value:t.email,callback:function(i){t.email=i},expression:"email"}}),e("password-field",{attrs:{id:"login-password",v:t.$v.password,autocomplete:"current-password"},model:{value:t.password,callback:function(i){t.password=i},expression:"password"}}),e("div",{staticClass:"login__action"},[e("button-hover",{attrs:{tag:"button",type:"submit",variant:"white"}},[t._v(t._s(t.$t("login")))]),e("router-link",{staticClass:"login__link",attrs:{to:{name:"Forgot"}}},[t._v(t._s(t.$t("forgot")))])],1)],1)])},staticRenderFns:[]};var d=e("VU/8")(u,c,!1,function(t){e("MUM6")},"data-v-f5819bb4",null);i.default=d.exports}});
//# sourceMappingURL=12.9a97cb3fba88b755fbdf.js.map