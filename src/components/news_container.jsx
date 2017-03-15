import React, {Component} from 'react'
import {
  Row,
  Col,
  Carousel,
  Tabs
} from 'antd'
const TabPane = Tabs.TabPane;

import NewsImageBlock from './news_image_block'
import NewsBlock from './news_block'
import Products from './products'


import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'

class NewsContainer extends Component {

  render() {

    return (
      <div className="container">
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <div className="leftContainer">
              <Carousel autoplay infinite>
                <div><img src={carousel_1}/></div>
                <div><img src={carousel_2}/></div>
                <div><img src={carousel_3}/></div>
                <div><img src={carousel_4}/></div>
              </Carousel>

              <NewsImageBlock title='国际头条' count={6} type='top' width='100%' imageWidth='110px'/>
            </div>


            <Tabs className="tabs_news">
              <TabPane tab="体育新闻" key="1">
                <NewsBlock type="tiyu" count={25} />
              </TabPane>
              <TabPane tab="科技新闻" key="2">
                <NewsBlock type="keji" count={25} />
              </TabPane>
            </Tabs>

            <Tabs className="tabs_news">
              <TabPane tab="ReactNews产品" key="1">
                <Products />
              </TabPane>
            </Tabs>

            <div>
              <NewsImageBlock title='国内新闻' count={8} type='guonei' width='100%' imageWidth='120px'/>
              <NewsImageBlock title='娱乐新闻' count={16} type='yule' width='100%' imageWidth='120px'/>
            </div>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    )
  }
}

export default NewsContainer