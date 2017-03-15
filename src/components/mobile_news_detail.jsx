import React, {Component} from 'react'
import {BackTop} from 'antd'
import axios from 'axios'

import NewsComments from './news_comments'


class MobileNewsDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      news: ''
    }
  }

  componentWillMount () {
    this.showDetail(this.props)
  }

  //当接收到父传过来新的prop时调用
  componentWillReceiveProps(nextProps) {
    this.showDetail(nextProps)
  }

  /*
  显示新闻详情
   */
  showDetail = (props) => {
    const uniquekey = props.params.news_id
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response => {
        const news = response.data
        this.setState({news})
      })
  }


  render() {

    const {news} = this.state



    return (
      <div>
        <div>
          <div  className="mobileDetailsContainer" dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
          <hr/>
          <NewsComments newsId={this.props.params.news_id}/>
        </div>

        <BackTop />
      </div>
    )
  }
}

export default MobileNewsDetail

