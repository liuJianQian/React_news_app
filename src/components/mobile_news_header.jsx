import React, {Component} from 'react'
import {
  Icon,
  Button,
  Modal,
  Tabs,
  Form,
  Input,
  message
} from 'antd'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
import {Link} from 'react-router'
import axios from 'axios'

import logo from '../images/logo.png'

class MobileNewsHeader extends Component {

  constructor (props) {
    super(props)
    this.state = {
      username: null,
      userId: null,
      modalVisible: false
    }
  }

  componentWillMount = () => {
    //读取保存的数据
    const userId = localStorage.userId
    const username = localStorage.username
    if(userId) {
      //更新状态
      this.setState({userId, username})
    }

  }


  //更新状态modalVisible
  setModalVisible = (modalVisible, event) => {
    this.setState({modalVisible})
  }

  //处理提交(注册/登陆)
  handleSubmit = (isRegist, event) => {
    //阻止表单的提交默认行为
    event.preventDefault()

    //收集输入数据, 准备url
    const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
    const action = isRegist ? 'register' : 'login'
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`

    //发送ajax请求
    axios.get(url)
      .then(response => {
        const result = response.data
        if(isRegist) {
          message.success('注册成功')
        } else {
          if(!result) { //登陆失败
            message.error('登陆失败')
          } else {
            message.success('登陆成功')
            //更新状态
            this.setState({
              userId: result.UserId,
              username: result.NickUserName
            })
            //保存到localStorage
            localStorage.userId = result.UserId
            localStorage.username = result.NickUserName
          }
        }
      })

    //更新modalVisible
    this.setState({modalVisible: false})
  }


  render() {
    const {username, modalVisible} = this.state
    const { getFieldDecorator } = this.props.form
    //确定用户menuItem
    const userItem = username   //'null'为true
        ? <Link to='/user_center'>
          <Icon type="inbox"/>
        </Link>
        : <Icon type="setting" onClick={this.setModalVisible.bind(this, true)}/>


      return (
        <div id="mobileheader">
          <header>
            <div>
              <Link to="/">
                <img src={logo} alt="logo"/>
                <span>ReactNews</span>
              </Link>
              {userItem}
            </div>
          </header>
          <Modal title="用户中心"
                 visible={modalVisible}
                 onOk={this.setModalVisible.bind(this, false)}
                 onCancel={this.setModalVisible.bind(this, false)}
                 okText='关闭'>
            <Tabs type="card" onChange={() => this.props.form.resetFields()}>
              <TabPane tab="登陆" key="1">
                <Form onSubmit={this.handleSubmit.bind(this, false)}>
                  <FormItem label='账户'>
                      {
                          getFieldDecorator('username')(
                              <Input placeholder="请输入账号"/>
                          )
                      }
                  </FormItem>
                  <FormItem label='密码'>
                      {
                          getFieldDecorator('password')(
                              <Input type='password' placeholder="请输入密码"/>
                          )
                      }
                  </FormItem>
                  <Button type='primary' htmlType="submit">登陆</Button>
                </Form>
              </TabPane>
              <TabPane tab="注册" key="2">
                <Form onSubmit={this.handleSubmit.bind(this, true)}>
                  <FormItem label='账户'>
                      {
                          getFieldDecorator('r_userName')(
                              <Input placeholder="请输入账号"/>
                          )
                      }
                  </FormItem>
                  <FormItem label='密码'>
                      {
                          getFieldDecorator('r_password')(
                              <Input type='password' placeholder="请输入密码"/>
                          )
                      }
                  </FormItem>
                  <FormItem label='确认密码'>
                      {
                          getFieldDecorator('r_confirmPassword')(
                              <Input type='password' placeholder="请输入确认密码"/>
                          )
                      }
                  </FormItem>
                  <Button type='primary' htmlType="submit">注册</Button>
                </Form>
              </TabPane>
            </Tabs>
          </Modal>
        </div>
    )
  }
}

export default Form.create()(MobileNewsHeader)  //向外暴露的是包含了NewsHeader的Form
//这样可以得到form对象: this.props.form
//getFieldDecorator(): 包含<input>
// getFieldsValue(): 得到所有输入的数据
// getFieldValue(name): 得到指定的输入数据
// resetFields(): 清除输入的数据
