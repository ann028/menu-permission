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
      // {
      //   path: '/project',
      //   name: 'projectManage',
      //   component: Index,
      //   meta: {
      //     title: '首页',
      //     permission: ['prm1000', 'prm1100'],
      //   },
      //   children: [
      //     {
      //       path: '/project',
      //       name: 'projectManage',
      //       component: () => import('../views/projects.vue'),
      //       meta: {
      //         permission: ['prm1000', 'prm1100'],
      //         title: '项目管理',
      //       },
      //     },
      //     {
      //       path: '/addProject',
      //       name: 'addProject',
      //       component: () => import('../views/AddProjects.vue'),
      //       meta: {
      //         permission: ['prm1000'],
      //         title: '添加项目',
      //       }
      //     },
      //   ],
      // },
      {
        path: '/project',
        name: 'projectManage',
        redirect: '/project',
        component: Index,
        meta: {
          permission: ['prm7000', 'prm1100'],
          title: '项目管理',
          hideInMenu: false,
        },
        children: [
          {
            path: '/project',
            name: 'projectManage',
            component: () => import('../views/projects.vue'),
            meta: {
              permission: ['prm1000', 'prm1100'],
              title: '项目管理',
            },
          },
          {
            path: '/addProject',
            name: 'addProject',
            component: () => import('../views/AddProjects.vue'),
            meta: {
              permission: ['prm1000'],
              title: '添加项目',
            }
          },
        ],
      },
      {
        path: '/publisher',
        name: 'publisherManage',
        component: () => import('../views/Publisher.vue'),
        meta: {
          permission: ['prm2000', 'prm1100'],
          title: '发行人管理',
        }
      },
      {
        path: '/roleManage',
        name: 'roleManage',
        component: Index,
        meta: {
          title: '账号管理',
          permission: ['prm1000', 'prm7100'],
          hideInMenu: true,
        },
        children: [
          {
            path: '/roleManage1',
            name: 'roleManage1',
            component: () => import('../views/user/RoleManage.vue'),
            meta: {
              title: '角色管理',
              permission: ['prm1000', 'prm8000', 'prm7100'],
              hideInMenu: true,
            },
            // children:[
            //   {
            //     path: '/roleManage1',
            //     name: 'roleManage1',
            //     component: () => import('../views/user/RoleManage.vue'),
            //     meta: {
            //       title: '角色管理',
            //       permission: ['prm8000', 'prm7100'],
            //     },
            //   },
            //   {
            //     path: 'addRole',
            //     name: 'addRole',
            //     component: () => import('../views/user/AddRole.vue'),
            //     meta: {
            //       title: '添加角色',
            //       permission: ['prm8000', 'prm7100'],
            //     }
            //   },
            // ]
          },
          {
            path: '/addRole',
            name: 'addRole',
            component: () => import('../views/user/AddRole.vue'),
            meta: {
              title: '添加角色',
              permission: ['prm8000', 'prm7100'],
              hideInMenu: true,
            }
          },
          {
            path: '/userManage',
            name: 'userManage',
            component: () => import('../views/user/userManage.vue'),
            meta: {
              title: '用户管理',
              permission: ['prm8000', 'prm7100', 'prm1100'],
              hideInMenu: true,
            }
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
            next({
              ...to as any,
              replace: true,
            })
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

// router.beforeEach((to, from, next) => {
//   console.log('tototototo')
//   if (to.matched.length ===0) {                                        //如果未匹配到路由
//     from.name ? next({ name:from.name }) : next('/');   //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
//   } else {
//     next();                                                                            //如果匹配到正确跳转
//   }
// });
export default router
