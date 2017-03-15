/*
import React, {Component} from 'react'
import {Tabs, Card, Upload, Modal, Icon} from 'antd'
const TabPane = Tabs.TabPane

import axios from 'axios'
/!**
 * 个人中心组件
 *!/
class UserCenter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collections: [],
      comments: [],
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    }
  }

  componentWillMount () {
    const userId = localStorage.userId
    //获取收藏列表
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
    axios.get(url)
      .then(response => {
        const collections = response.data.map(item => {
          return {
            "uniquekey": item.uniquekey,
            "title": item.Title
          }
        })
        this.setState({collections})
      })


    //获取评论列表
    url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
    axios.get(url)
      .then(response => {
        const comments = response.data.map(item => {
          return {
            uniquekey: item.uniquekey,
            dateTime: item.datetime,
            content: item.Comments
          }
        })
        this.setState({comments})
      })

  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })
    render () {

        const {collections, comments} = this.state

        const userCollectionsList = collections.length
            ? collections.map((uc, index) => (
                <Card key={index} title={uc.uniquekey}
                      extra={<a href={`/#/detail/${uc.uniquekey}`}>查看</a>}>
                  <p>{uc.Title}</p>
                </Card>
            ))
            : '您还没有收藏任何的新闻，快去收藏一些新闻吧。'

        const userCommentsList = comments.length
            ? comments.map((comment,index)=>(
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                      extra={<a href={`/#/detail/${comment.uniquekey}`}>查看</a>}>
                  <p>{comment.Comments}</p>
                </Card>
            ))
            : '您还没有发表过任何评论。'
        return (
            <div>
              <Tabs>
                <TabPane tab="我的收藏列表" key="1" style={{padding: '10px'}}>
                    {userCollectionsList}
                </TabPane>
                <TabPane tab="我的评论列表" key="2" style={{padding: '10px'}}>
                    {userCommentsList}
                </TabPane>
                <TabPane tab="头像设置" key="3"></TabPane>
              </Tabs>
            </div>
        )
    }
}





export default UserCenter*/



import React from 'react'
import {
    Tabs,
    Card,
} from 'antd'
const TabPane = Tabs.TabPane
import axios from 'axios'

/**
 * Created by xfzhang on 2017/3/6.
 * 用户中心组件模块
 */
export default class MobileUserCenter extends React.Component {
    constructor() {
        super()
        this.state = {
            userCollections: '', //收藏列表
            userComments: '', //评论列表
        }
    }

    componentDidMount() {
        let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userId
        axios.get(url)
            .then(response=>{
                const userCollections = response.data
                this.setState({userCollections})
            })

        url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userId
        axios.get(url)
            .then(response => {
                const userComments = response.data
                this.setState({userComments})
            })
    }

    render () {

        const {userCollections, userComments} = this.state

        const userCollectionsList = userCollections.length
            ? userCollections.map((uc, index) => (
                <Card key={index} title={uc.uniquekey}
                      extra={<a href={`/#/detail/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            : '您还没有收藏任何的新闻，快去收藏一些新闻吧。'

        const userCommentsList = userComments.length
            ? userComments.map((comment,index)=>(
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                      extra={<a href={`/#/detail/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            : '您还没有发表过任何评论。'
        return (
            <div>
                <Tabs>
                    <TabPane tab="我的收藏列表" key="1" style={{padding: '10px'}}>
                        {userCollectionsList}
                    </TabPane>
                    <TabPane tab="我的评论列表" key="2" style={{padding: '10px'}}>
                        {userCommentsList}
                    </TabPane>
                    <TabPane tab="头像设置" key="3"></TabPane>
                </Tabs>
            </div>
        )
    }
}
