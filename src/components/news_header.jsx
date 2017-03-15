import React, {Component} from 'react'
import {
  Row,
  Col,
  Menu,
  Icon,
  Button,
  Modal,
  Tabs,
  Form,
  Input,
  message
} from 'antd'
const MenuItem = Menu.Item
const TabPane = Tabs.TabPane
const FormItem = Form.Item
import {Link} from 'react-router'
import axios from 'axios'

import logo from '../images/logo.png'

class NewsHeader extends Component {

  constructor (props) {
    super(props)
    this.state = {
      currKey: 'top',
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

  clickItem = (event) => {
    const {key} = event
    //更新状态
    this.setState({currKey: key})
    //如果是注册/登陆, 更新modalVisible
    if(key==='register') {
      this.setState({modalVisible: true})
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

  //登出
  logout = () => {
    //移除保存的数据
    localStorage.userId = ''
    localStorage.username = ''
    //更新状态
    this.setState({
      userId: null,
      username: null
    })
  }

  render() {
    const {currKey, username, modalVisible} = this.state
    const { getFieldDecorator } = this.props.form
    //确定用户menuItem
    const userItem = username   //'null'为true
      ? (
          <MenuItem key="logout" className="register">
            <Button type="primary">{username}</Button>
            &nbsp;&nbsp;
            <Link to="/user_center">
              <Button type="dashed">个人中心</Button>
            </Link>
            &nbsp;&nbsp;
            <Button type="ghost" onClick={this.logout}>退出</Button>
          </MenuItem>
        )
      : (
        <MenuItem key="register" className="register">
          <Icon type="appstore" />注册/登陆
        </MenuItem>
      )

    return (
      <header>
        <Row>
          <Col span={1}></Col>
          <Col span={3}>
            <div className="logo">
              <img src={logo} alt="logo"/>
              <span>ReactNews2</span>
            </div>
          </Col>
          <Col span={19}>

            <Menu mode='horizontal' selectedKeys={[currKey]} onClick={this.clickItem}>
              <MenuItem key="top">
                <Icon type="appstore" />头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore"/>社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore"/>国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore"/>国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore"/>娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore"/>体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore"/>科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore"/>时尚
              </MenuItem>
              {userItem}
            </Menu>
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
          </Col>
          <Col span={1}></Col>
        </Row>
      </header>
    )
  }
}

export default Form.create()(NewsHeader)  //向外暴露的是包含了NewsHeader的Form
//这样可以得到form对象: this.props.form
//getFieldDecorator(): 包含<input>
// getFieldsValue(): 得到所有输入的数据
// getFieldValue(name): 得到指定的输入数据
// resetFields(): 清除输入的数据
