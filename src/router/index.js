import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/",
    redirect: "/background",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/index.vue"),
    children: [
      {
        path: "/background",
        name: "background",
        component: () => import("../views/home/background.vue"),
      },
      {
        path: "/photo",
        name: "photo",
        component: () => import("../views/home/photo.vue"),
      },
      {
        path: "/shoplist",
        name: "shoplist",
        component: () => import("../views/home/shoplist.vue"),
      },
    ]
  },
  {
    path: "/shop",
    name: "shop",
    component: () => import("../views/shop/index.vue"),
    children: [
      {
        path: "/classify",
        name: "classify",
        component: () => import("../views/shop/classify.vue"),
      },
      {
        path: "/shopsize",
        name: "shopsize",
        component: () => import("../views/shop/shopsize.vue"),
      },
      {
        path: "/shoptype",
        name: "shoptype",
        component: () => import("../views/shop/shoptype.vue"),
      },
      {
        path: "/comment",
        name: "comment",
        component: () => import("../views/shop/comment.vue"),
      },
      {
        path: "/list",
        name: "list",
        component: () => import("../views/shop/list.vue"),
      },
    ]
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../views/order/index.vue"),
    children: [
      {
        path: "/orders",
        name: "orders",
        component: () => import("../views/order/orders.vue"),
      },
      {
        path: "/invoice",
        name: "invoice",
        component: () => import("../views/order/invoice.vue"),
      },
      {
        path: "/server",
        name: "server",
        component: () => import("../views/order/server.vue"),
      },
    ]
  },
  {
    path: "/vip",
    name: "vip",
    component: () => import("../views/vip/index.vue"),
    children: [
      {
        path: "/viplist",
        name: "viplist",
        component: () => import("../views/vip/viplist.vue"),
      },
      {
        path: "/vipclass",
        name: "vipclass",
        component: () => import("../views/vip/vipclass.vue"),
      },
    ]
  },
  {
    path: "/set",
    name: "set",
    component: () => import("../views/set/index.vue"),
    children: [
      {
        path: "/basics",
        name: "basics",
        component: () => import("../views/set/basics.vue"),
      },
      {
        path: "/admin",
        name: "admin",
        component: () => import("../views/set/admin.vue"),
      },
      {
        path: "/deal",
        name: "deal",
        component: () => import("../views/set/deal.vue"),
      },
      {
        path: "/logistics",
        name: "logistics",
        component: () => import("../views/set/logistics.vue"),
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
]

const router = new VueRouter({
  routes
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path === '/login') return next()
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
  // 判断token过期时间
  const tokenTime = window.localStorage.getItem('time')
  let currenTime = new Date().getTime()
  console.log(currenTime);
  if (parseInt(currenTime) - parseInt(tokenTime) > 1800000) {
    localStorage.removeItem("token");
    localStorage.removeItem("time");
    next('/login')
    alert("登录失效，请重新登录")
  } else {
    next()
  }

})

export default router
