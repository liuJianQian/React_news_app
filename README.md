## react app 笔记

## REST API
* restful api(rest风格API)
  * http://localhost:3000/posts/1
  * url中不包含行为数据
  * 通过请求方式来确定来行为
    * GET
    * POST
    * PUT
    * DELETE
* restless api(非rest风格API)
  * http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=514
  * url参数包含行为数据
  * 请求方式不决定行为
    * GET
    * POST

* 使用json-server
  * npm install json-server -g
  * 创建服务器端数据库文件 server/db.json
    ```
    {
      "posts": [
        { "id": 1, "title": "json-server", "author": "typicode" }
      ],
      "comments": [
        { "id": 1, "body": "some comment", "postId": 1 }
      ],
      "profile": { "name": "typicode" }
    }
    ```
  * 编码测试
    ```
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
    ```