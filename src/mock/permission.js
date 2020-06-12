const permissionInfo = {
  token: 'asasas@3wec',
  userId: 23,
  userName: 'Anna',
  roles: 'staff'
}
export default {
  'get|/api/getPermission': option => {
    return {
      status: 200,
      success: true,
      data: ['prm1000', 'prm2000', 'prm1100']
    }
  }
}