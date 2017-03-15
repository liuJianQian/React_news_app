import React, {Component} from 'react'
import NewsHeader from './news_header'
import NewsFooter from './news_footer'
import '../css/pc.css';


class App extends Component {
  render() {
    return (
      <div>
        <NewsHeader />
        {this.props.children}
        <NewsFooter />
      </div>
    )
  }
}

export default App