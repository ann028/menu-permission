import Vue from 'vue'
import Vuex from 'vuex'
import { contantRouteMap, asyncRouteMap } from '../router/index';
import * as UserApi from '../api/user'
import {Message} from 'element-ui'

import  * as userApi from '../api/user'

Vue.use(Vuex)
// function hasPermission(permission: any, route: any) {
//   if (route.meta && route.meta.permission) {
//     const arr = route.meta.permission.filter((v: any) => {
//       let permissionString: any = permission
//       let permissionArr: any = permissionString.split(',')
//       permissionArr.forEach((item: any) => {
//         return permissionArr.includes(v)
//       })
//     })
//     console.log('arr', arr)
//     return arr;
//   }
// }

function hasPermission(permission: any, route: any){
  let arr: any = []
  let perArr: any = []
  if(route.meta && route.meta.permission) {
    let permissionString: any = permission
    let permissionArr: any = permissionString.split(',')
    console.log('permissionArr', permissionArr)
    // for (var i = 0; i < permissionArr.length; i++) {
    console.log('route.meta.permission', route.meta.permission)
      for(let j = 0; j < route.meta.permission.length; j++) {
        if(permissionArr.includes(route.meta.permission[j])) {
          arr.push(route)
        }
      }
    // }
  console.log(Array.from(new Set(arr)))
  perArr.push(arr)
  console.log('preArr', perArr)
    return Array.from(new Set(arr)).length
  }
}
  


export default new Vuex.Store({
  state: {
    user: {},
    userId: '',
    token: null,
    permission: '',
    routers: contantRouteMap,
    addRoutes: [],
  },
  mutations: {
    SET_ROUTERS: (state: any, routers: any) => {
      state.addRoutes = routers;
      state.routers = contantRouteMap.concat(routers);
    },
    SET_USER: (state: any, data: any) => {
      state.user = data
      state.userId = data.userId
      state.token = data.token
    },
    SET_PERMISSION: (state: any, data: any) => {
      state.permission = data

      window.sessionStorage.setItem('permission', data)
    }
  },
  actions: {
    getUserLogin: ({commit}, data) => {
      commit('SET_USER', data)
      // this.dispatch('getPermission')
      // userApi.getPermission().then((res: any) => {
      //   if(res.data.success) {
      //     commit('SET_PERMISSION', res.data.data.toString())
      //   }
      // })
      window.sessionStorage.setItem('userId', data.userId)
      window.sessionStorage.setItem('token', data.token)
    },
    getUserInfo({commit}: any) {
      UserApi.getUserInfo().then((res: any) => {
        if (!res.data.success) {
          Message.error('登录过期，请重新登录!');
          window.sessionStorage.setItem('token', ' ');
          window.sessionStorage.setItem('userId', ' ');
          setTimeout(() => {
            window.location.href = '/login';
          }, 800);
        } else {
          commit('SET_USER', res.data.data)
          this.dispatch('getUserLogin', res.data.data)
        }
      })
    },
    GenerateRoutes({commit}, data) {
      return new Promise((resolve) => {
        const permission = data;
        const asyncChildRouterMap: any = asyncRouteMap[0].children;
        // console.log('asyncChildRouterMap',asyncChildRouterMap)
        const accessedRouters = asyncChildRouterMap.filter((v: any) => {
          // console.log('=======', permission, v)
          if (hasPermission(permission, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter((child: any) => {
                if (hasPermission(permission, child)) {
                  return child
                }
                return false;
              });
            }
            return v;
          }
          return false;
        })
        // 两层过滤就得到一个只能role有权限能访问的路由map
        console.log('accessedRouters', accessedRouters)
        asyncRouteMap[0].children = accessedRouters;
        commit('SET_ROUTERS', asyncRouteMap);
        // 把这个动态路由图，放到state的addRoutes里，也追加到固态路由图里
        resolve();
      })
    },
    async getPermission({commit}: any) {
      userApi.getPermission().then((res: any) => {
        if(res.data.success) {
          commit('SET_PERMISSION', res.data.data.toString())
        }
      })
    },
  },
  modules: {
  }
})
