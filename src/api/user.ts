import apiService from './api-service'

export function getMenu() {
  return apiService.get(`/data/MenuData`)
}

export function getUserInfo() {
  return apiService.get(`/getInfo`)
}

export function getPermission() {
  return apiService.get(`/getPermission`)
}