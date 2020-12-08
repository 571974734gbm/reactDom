import React, { Component } from 'react';
import './adjustQuota.css';
import axios from 'axios';

class AdjustQuota extends Component{
  constructor(props) {
    super(props);
    this.state = {
      checkBoxStatic: false,
      newAmount: '',
      newAmount1: '',
      moneyText: '',
      inputHide: true,
    };
  }

  /**
   * 生命周期初始化后调用
   */
  componentDidMount() {
    axios.post('/api/selectCardAmount', { 'cardNo': this.props.cardNum}).then(res => { // axios请求信用卡信息(修改最大金额等)
      this.setState({
        moneyText: this.toMoney(res.data.amount)
      })
    })
  }

  /**
   * 复选框点击
   */
  checkBoxClick = () => {
    this.setState({
      checkBoxStatic: !this.state.checkBoxStatic
    })
  }

  /**
   * 金额转换 50000 => 50,000.00 num为需要转换的金额
   */
  toMoney(num) {
    if (num) {
      if (isNaN(num)) {
        // alert('金额中含有不能识别的字符')
        return
      }
      num = typeof num === 'string' ? parseFloat(num).toFixed(2) : num
      num = parseFloat(num)
      num = num.toLocaleString()
      if (num.indexOf('.') === -1) {
        num = num + '.00'
      } else {
        console.log(num.split('.')[1].length)
      }
      return num
    } else {
      return num = null
    }
  }

  /**
   * 监听input改变 e为改变的input的dom
   */
  inputChange = (e) => {
    this.setState({
      newAmount: e.target.value
    })
  }

  inputChange1 = (e) => {
    this.setState({
      newAmount1: e.target.value
    })
  }

  /**
   * input失去焦点处理内容数据
   */
  inputOnBlur = (e) => {
    this.setState({
      inputHide: true,
      newAmount1: e.target.value ? this.toMoney(e.target.value) : ''
    })
  }

  /**
   * input获取焦点
   */
  inputOnFocus = () => {
    this.setState({
      inputHide: false
    })
  }

  /**
   * next点击
   */
  next = () => {
    if (this.state.checkBoxStatic) { // 判断复选框是否被选中
      axios.post('/api/selectCardMaxAmount', { 'cardNo': this.props.cardNum }).then(res => {
        if (Number(this.state.newAmount) > res.data.cardMaxAmount) {
          alert('用户额度超出最大值')
          return
        }
        if (Number(this.state.newAmount) % res.data.amountInterval !== 0) {
          alert('用户调整额度范围不符合规范')
          return
        }
        axios.post('/api/submitButton', { 'customerId' : "00001", 'cardNo': this.props.cardNum, 'newAmount': this.state.newAmount}).then(res => { // 切换页面前cheack修改金额是否遵循我们的规则
          if (res.data.code === '200') { // 遵循规则调用父级方法，方法详情在mainPage.js中有注释
            this.props.changeAmount(this.state.newAmount)
            this.props.pageChange(3)
          } else { // 不遵循规则弹出message
            alert(res.data.msg)
          }
        })
      })
    } else {
      alert('请勾选同意')
    }
  }

  /**
   * back点击
   */
  back = () => {
    this.props.pageChange(1) // 调用父级方法，方法详情在mainPage.js中有注释
  }
  render(){
    return(
      <div>
        <div className="adjustQuota_box_top">Change Credit Limit</div>
        <div className="changeBox">
          <div>{this.props.cardNum}</div>
          <div>Current Line Amount:MYR {this.state.moneyText}</div>
          <div>
            <span>New Credit Limit</span>:MYR
            <div className="inputBox">
              <input maxLength="11" className={this.state.inputHide === true ? 'optionClass' : null} onBlur={this.inputOnBlur} onFocus={this.inputOnFocus} value={this.state.newAmount} onChange={this.inputChange} type="number"></input>
              <input className value={this.state.newAmount1} onChange={this.inputChange1}></input>
            </div>
          </div>
          <div>Note:Amount increased is combined limit</div>
        </div>
        <div className="tipsBox">
          <div className="tipsBoxTitle">Principal Cardmember declaration</div>
          <div className="tipsBoxBototm">
            <div className="checkBox" onClick={this.checkBoxClick}>
              {this.state.checkBoxStatic ? <div></div> : null}
            </div>
            I/We agree to be bound by the terms and conditions 
            contained in the OCBC Cardmember Agreement(and to such amendments which the Bank may at its absoulute discretion make 
            at any time form time to time and agree ti be bound by them upon issuance or use of the card).a 
            copy of which will be sent to me/us.I/We understand that the OCBC Card(s) shall remain(s) the property if OCBC Bank(Maiaysia) 
            Berhad and must be returned to the Bank upon request</div>
        </div>
        <div className="bottomButton">
          <button onClick={this.back}>back</button>
          <button onClick={this.next}>next</button>
        </div>
      </div>
    )
  }
}

export default AdjustQuota