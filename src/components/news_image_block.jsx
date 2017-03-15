import React, {Component, PropTypes} from 'react'
import axios from 'axios'
import {Card} from 'antd'

import {Link} from 'react-router'

class NewsImageBlock extends Component {

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
            author_name: news.author_name,
            image_url: news.thumbnail_pic_s,
            newsId: news.uniquekey
          }
        })
        //更新状态
        this.setState({newsArr})
      })
  }

  render() {

    const {title, imageWidth, width} = this.props
    const {newsArr} = this.state

    const imageStyle = {
      width: imageWidth,
      heigth: '90px'
    }
    const titleStyle = {
      width: imageWidth,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
    const newsList = newsArr.length
      ? (
          newsArr.map((news, index) => (
            <div key={index} className="imageblock">
              <Link to={`/news_detail/${news.newsId}`}>
                <div className="custom-image">
                  <img src={news.image_url} alt="" style={imageStyle}/>
                </div>
                <div className="custom-card">
                  <h3 style={titleStyle}>{news.title}</h3>
                  <p>{news.author_name}</p>
                </div>
              </Link>
            </div>
          ))
        )
      : '没有加载到任何数据'

    return (
      <Card title={title} className="topNewsList" style={{width}}>
        {newsList}
      </Card>
    )
  }
}
NewsImageBlock.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  imageWidth: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default NewsImageBlock

