import Vue from "vue";
import Router from "vue-router";
import Hello from '@/components/Hello'
import PostsManager from '@/components/PostsManager'
// Here do NOT use double quotes " !!!
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: "https://dev-688627.okta.com/oauth2/default",
  client_id: "0oaucuay9wpfpK5Zt4x6",
  redirect_uri: "http://localhost:8080/implicit/callback",
  scopes: ['openid', 'profile', 'email'],
  pkce: true
});

Vue.use(Router);

let router=new Router({
  mode: "history",
  routes: [
    { path: "/", name: "Hello", component: Hello},
    { path: "/implicit/callback", component: Auth.handleCallback() },
    { path: "/posts-manager", name: 'PostsManager', component: PostsManager, meta: { requiresAuth: true } }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
