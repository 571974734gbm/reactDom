import React, { Component } from 'react';
import './selectCard.css';
import bottomArrow from '../../../../image/bottomArrow.png'
import axios from 'axios';

class SelectCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectValue: '', // 用户选择的信用卡卡号
      selectShow: false, // 是否显示下拉选择
      selectList: [] // 选择框内的数据
    };
  }

  /**
   * 生命周期初始化后调用
   */
  componentDidMount() {
    if (this.props.cardNum) {
      this.setState({
        selectValue: this.props.cardNum
      })
    }
    axios.post('/api/selectCardList', {'customerId': '00001'}).then(res => { // axios请求信用卡数据
      let arr = []
      res.data.cardList.forEach(item => {
        if (item.holderAttributeString) {
          arr.push(item)
        }
      });
      this.setState({
        selectList: arr
      })
    })
    document.onclick = () => { // document点击监听隐藏下拉框
      this.setState({
        selectShow: false
      })
    }
  }

  /**
   * 点击下拉框触发
   */
  selectShow() {
    this.setState({
      selectShow: true
    })
  }

  /**
   * 选择下拉框的值时触发 item为选择的值
   */
  handleChange(item) {
    this.setState({
      selectShow: false,
      selectValue: item
    })
  }

  /**
   * 页面点击next
   */
  next = () => {
    if (!this.state.selectValue) {
      alert('请选择一张信用卡')
      return
    }
    // 调用父级方法，方法详情在mainPage.js中有注释
    this.props.getSelectCardNum(this.state.selectValue)
    this.props.pageChange(2)
  }
  render(){
    return(
      <div>
        <div className="card_box_top">Change card limits</div>
        <div className="card_box_bototm">
          <div className="cardSelectionText">Card Selection</div>
          <div className="selectBox">
            <div className="selectCard">Select Card</div>
            <div className={`select ${this.state.selectShow ? "selectBorder" : null}`} onClick={(e) => {e.stopPropagation(); this.selectShow()}}>
              {this.state.selectValue ? this.state.selectValue : 'Please Select'}
              <img src={bottomArrow} className="bottomArrow" alt="prop"></img>
              <div className="optionBox">
                {this.state.selectShow ? <ul>
                  {this.state.selectList.map((item, index) => {
                    return <li className={this.state.selectValue === item.cardNo ? "selectColor" : null} onClick={(e) => {e.stopPropagation(); this.handleChange(item.cardNo)}} key={index}>{item.cardNo}</li>
                  })}
                </ul> : null}
              </div>
            </div>
          </div>
        </div>
        <div className="bottomButton">
          <div></div>
          <button onClick={this.next}>next</button>
        </div>
      </div>
    )
  }
}

export default SelectCard