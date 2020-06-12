let data = {
  token: 'asasas@3wec',
  userId: 23,
  userName: 'Anna',
  roles: 'staff'
} // 用于接受生成数据的数组


const menuInfo = [
  {
    id: 1,
    keyword: 'prm1000',
    name: 'user',
    title: '账户管理',
    parentCode: '0',
    children: [
      {
        id: 4,
        keyword: 'prm1100',
        name: 'userManage',
        title: '用户管理',
        parentCode: 'prm1000',
      },
      {
        id: 5,
        keyword: 'prm1200',
        name: 'roleManage',
        title: '角色管理',
        parentCode: 'prm1000',
      },
    ]
  },
  {
    id: 2,
    keyword: 'prm2000',
    name: 'projectManage',
    title: '项目管理',
    parentCode: '0',
  },
  {
    id: 3,
    keyword: 'prm3000',
    name: 'publisherManage',
    title: '发行人管理',
    parentCode: '0',
  },
]
export default {
  'get|/api/data/MenuData': option => {
    return {
      status: 200,
      success: true,
      data: menuInfo
    }
  }
}