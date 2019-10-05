import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: []
    };
    this.veryFetching = this.veryFetching.bind(this);
  }

  componentDidMount(){
    this.veryFetching();
  }

  veryFetching(){
    fetch('/data')
    .then(r => r.json())
    .then(d => {
      this.setState({
        items: d
      })
    })
  }




  render(){
    const ButtonR = styled.button`
      background-image: url(https://ir.ebaystatic.com/f/8ad5a0773b1335cc3ceb5d966215af2.svg);
      background-position: -49px 6px
      height: 70px;
      width: 70px;
      opacity: .4
      // content: "";
      // display: block
      // margin-left: 6px;
      // background-position: -55px 10px;
      // transform: rotate(180deg)
    `
    return (
      <div class="container">
        Related Sponsored Content X/2
        <ButtonR>X</ButtonR>
        <ul class="allItems">
            {this.state.items.map(item => {
              return (
                <li class="individualItems">
                  <img src={item.image} alt="watch"/>
                  {item.price}
                  {item.productTitle}
                  {item.shippingCost}
                </li>
              )
            })}
          </ul>
        <button class="buttonR"></button>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));