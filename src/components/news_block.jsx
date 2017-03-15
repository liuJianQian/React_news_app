import React, {Component, PropTypes} from 'react'
import axios from 'axios'
import {Card} from 'antd'

import {Link} from 'react-router'

class NewsBlock extends Component {

  constructor (props) {
    super(props)
    this.state = {
      newsArr: []
    }
  }

  componentWillMount () {
    const {type, count} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response => {
        //读取响应数据并封装成数组
        const newsArr = response.data.map(news => {
          return {
            title: news.title,
            newsId: news.uniquekey
          }
        })
        //更新状态
        this.setState({newsArr})
      })
  }

  render() {

    const {newsArr} = this.state


    const newsList = newsArr.length
      ? (
          newsArr.map((news, index) => (
            <li key={index}>
              <Link to={'/news_detail/'+news.newsId}>{news.title}</Link>
            </li>
          ))
        )
      : '没有加载到任何数据'


    return (
      <Card className="topNewsList">
        <ul>
          {newsList}
        </ul>
      </Card>
    )
  }
}
NewsBlock.propTypes = {
  count: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
}

export default NewsBlock

