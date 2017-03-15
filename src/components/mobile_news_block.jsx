import React, {Component, PropTypes} from 'react'
import axios from 'axios'
import {Card} from 'antd'

import {Link} from 'react-router'

class MobileNewsBlock extends Component {

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
            newsId: news.uniquekey,
            imageurl: news.thumbnail_pic_s
          }
        })
        //更新状态
        this.setState({newsArr})

      })
  }

  render() {

    const {newsArr} = this.state


    const newsList = newsArr.length
      /*?(
          newsArr.map((news, index) => (
            <li key={index}>
              <Link to={'/news_detail/' + news.newsId}>{news.title}</Link>
            </li>
          ))
        )*/

        ? newsArr.map((newsItem, index) => (
            <Card key={index} className="m_article list-item special_section clearfix">
                <Link to={`news_detail/${newsItem.newsId}`}>
                    <div className="m_article_img">
                        <img src={newsItem.imageurl} alt={newsItem.title} />
                    </div>
                    <div className="m_article_info">
                        <div className="m_article_title">
                            <span>{newsItem.title}</span>
                        </div>
                        <div className="m_article_desc clearfix">
                            <div className="m_article_desc_l">
                                <span className="m_article_channel">{newsItem.realtype}</span>
                                <span className="m_article_time">{newsItem.date}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        ))


      : '没有加载到任何数据'


    return (
      <div>
          {newsList}
      </div>
    )
  }






}
MobileNewsBlock.propTypes = {
  count: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
}

export default MobileNewsBlock

