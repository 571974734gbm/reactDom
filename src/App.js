import './App.css';
import React, { Component } from 'react';
import Header from './views/header/header';
import Menu from './views/menu/menu';
import MainPage from './views/mainPage/mainPage';


/**
 * 在主页面引用三个组件：Header(页面logo和顶部tab栏只有展示没有实际作用)|Menu(页面左侧菜单栏只有展示没有实际作用)|MainPage(右侧内容，主要页面和功能都在此组件中)
 */
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      showMainPage: false
    }
  }
  changeMenuTab = (falg) => {
    this.setState({
      showMainPage: falg
    })
  }
  render(){
    return(
      <div className="allPageBox">
        <div className="allPageBox_top">
          <Header />
        </div>
        <div className="allPageBox_bottom">
          <div className="allPageBox_bottomLeft">
            <Menu changeMenuTab={this.changeMenuTab} />
          </div>
          <div className="allPageBox_bottomRight">
            {this.state.showMainPage ? <MainPage /> : null}
          </div>
        </div>
      </div>
    )
  }
}
// function App() {
//   changeMenuTab = () => {
//     console.log('ss')
//   }
//   return (
//     <div className="allPageBox">
//       <div className="allPageBox_top">
//         <Header />
//       </div>
//       <div className="allPageBox_bottom">
//         <div className="allPageBox_bottomLeft">
//           <Menu changeMenuTab={changeMenuTab} />
//         </div>
//         <div className="allPageBox_bottomRight">
//           <MainPage />
//         </div>
//       </div>
//     </div>
//   )
// }

export default App;
