import React, {Component} from 'react'
import MobileNewsHeader from './mobile_news_header'
import NewsFooter from './news_footer'
import '../css/mobile.css'

class MobileApp extends Component {

    render() {
    return (
      <div>
        <MobileNewsHeader />
        {this.props.children}
        <NewsFooter />
      </div>
    )
  }
}

export default MobileApp