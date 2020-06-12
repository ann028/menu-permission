import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Index from '@/components/DefaultIndex.vue'
import store from '../store/index'

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import('../views/login.vue')
//   },
//   {
//     path: '/',
//     name: 'Home',
//     component: Home,
//     children: [
//       {
//         path: '/project',
//         name: 'projectManage',
//         component: Index,
//         children: [
//           {
//             path: '/project',
//             name: 'projectManage',
//             component: () => import('../views/projects.vue'),
//           },
//           {
//             path: '/addProject',
//             name: 'addProject',
//             component: () => import('../views/AddProjects.vue'),
//           },
//         ],
//       },
//       {
//         path: '/publisher',
//         name: 'publisherManage',
//         component: () => import('../views/Publisher.vue')
//       },
//       {
//         path: '/roleManage',
//         name: 'roleManage',
//         component: Index,
//         children: [
//           {
//             path: '/roleManage',
//             name: 'roleManage',
//             component: () => import('../views/user/RoleManage.vue'),
//           },
//           {
//             path: '/userManage',
//             name: 'userManage',
//             component: () => import('../views/user/userManage.vue'),
//           },
//         ]
//       },
    
//     ],
//   },
//   {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   },
// ]

export const contantRouteMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
]

export const asyncRouteMap = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/project',
        name: 'projectManage',
        component: Index,
        meta: {
          permission: ['prm1000', 'prm1100'],
        },
        children: [
          {
            path: '/project',
            name: 'projectManage',
            component: () => import('../views/projects.vue'),
            permission: ['prm1000', 'prm1100'],
          },
          {
            path: '/addProject',
            name: 'addProject',
            component: () => import('../views/AddProjects.vue'),
            permission: ['prm1000'],
          },
        ],
      },
      {
        path: '/publisher',
        name: 'publisherManage',
        component: () => import('../views/Publisher.vue'),
        permission: ['prm2000', 'prm1100'],
      },
      {
        path: '/roleManage',
        name: 'roleManage',
        component: Index,
        permission: ['prm8000', 'prm7100'],
        children: [
          {
            path: '/roleManage',
            name: 'roleManage',
            component: () => import('../views/user/RoleManage.vue'),
            permission: ['prm1000', 'prm1100'],
          },
          {
            path: '/userManage',
            name: 'userManage',
            component: () => import('../views/user/userManage.vue'),
            permission: ['prm1000', 'prm1100'],
          },
        ]
      },
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: contantRouteMap
})

router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem('token')
  console.log(store.state.permission)
  const permission = store.state.permission || window.sessionStorage.getItem('permission')
  console.log('=====', permission)
  if(token) {
    if (to.path === '/login') { // 如果是登录页面的话，直接next()
      next();
    } else { 
      // next()
      if(store.state.addRoutes.length === 0) {
        store.dispatch('getUserInfo').then((res: any) => {
          store.dispatch('GenerateRoutes', permission).then(() => {
            const addRoutes = store.state.addRoutes;
            router.addRoutes(addRoutes);
            console.log(addRoutes)
            // next({
            //   ...to as any,
            //   replace: true,
            // })
          })
        }).catch(err => {
          console.log(err)
        })
      } else {
        next()
      }
    }
  } else {
    if (to.path === '/login') { // 如果是登录页面的话，直接next()
      next();
    } else { // 否则 跳转到登录页面
      next({
        path: '/login',
      });
    }
  }
})
export default router
