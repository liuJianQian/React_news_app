import React, {Component} from 'react'
import {Card, Form, Input, Button, message, notification} from 'antd'
const FormItem = Form.Item
import axios from 'axios'


/**
 * 评论组件
 */
class NewsComments extends Component {

  constructor (props) {
    super(props)
    this.state = {
      comments: []
    }
  }

  componentWillMount () {
    const {newsId} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${newsId}`
    axios.get(url)
      .then(response => {
        const comments = response.data.map(item => {
          return {
            username: item.UserName,
            dateTime: item.datetime,
            content: item.Comments
          }
        })
        this.setState({comments})
      })

  }

  //提交评论
  submitComment = (event) => {
    event.preventDefault()

    //判断是否已经登陆, 如果没有提示先登陆
    const userId = localStorage.userId
    if(!userId) {
      message.warn('请先登陆!')
      return
    }
    const {newsId} = this.props
    const content = this.props.form.getFieldValue('content')

    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${newsId}&commnet=${content}`
    axios.get(url)
      .then(response => {
        message.success('评论成功!')
        this.componentWillMount()
        this.props.form.resetFields()
      })
  }

  //添加收藏
  addCollection = () => {
    const userId = localStorage.userId
    if(!userId) {
      message.warn('请先登陆!')
      return
    }
    const {newsId} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${newsId}`
    axios.get(url)
      .then(response => {
        notification.success({
          message: 'ReactNews收藏',
          description: '添加收藏成功啦!'
        })
      })
  }


  render() {
    const {comments} = this.state
    const commentList = comments.map((comment, index) =>(
      <Card key={index} title={comment.username} extra={`发布于 ${comment.dateTime}`}>
        <p>{comment.content}</p>
      </Card>
    ))

    const {getFieldDecorator} = this.props.form

    return (
      <div>
        {commentList}
        <Form onSubmit={this.submitComment}>
          <FormItem label="您的评论">
            {
              getFieldDecorator('content')(<Input type="textarea"/>)
            }
          </FormItem>

          <Button type='primary' htmlType="submit">提交评论</Button>
          <Button type='primary' onClick={this.addCollection}>收藏文章</Button>
        </Form>
      </div>
    )
  }
}

export default Form.create({})(NewsComments)