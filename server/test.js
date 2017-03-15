/*
测试restful API的CRUD请求
 */
const axios = require('axios')

/*
测试查询请求: GET请求
 */
function testQuery() {
  //查询所有
  axios.get('http://localhost:3000/posts')
    .then(function (response) {
      console.log(response.data)  //所有数据的数组
    })
  //查询一条
  axios.get('http://localhost:3000/posts/2')
    .then(function (response) {
      console.log(response.data) //指定id数据的对象
    })
}

/*
 测试添加请求: POST请求
 */
function testAdd() {
  const obj = {"title": "atguigu", "author": "JACK"}
  axios.post('http://localhost:3000/posts', obj)
    .then(function (response) {
      console.log(response.data)  //
    })
}

/*
 测试更新请求: PUT请求
 */
function testUpdate() {
  const obj = {"title": "beijin", "author": "xfzhang"}
  axios.put('http://localhost:3000/posts/4', obj)
    .then(function (response) {
      console.log(response.data)
    })
}

/*
 测试删除请求: DELETE请求
 */
function testDelete() {
  axios.delete('http://localhost:3000/posts/4')
    .then(function (response) {
      console.log(response.data)
    })
}

testDelete()
// testUpdate()
// testAdd()
// testQuery()