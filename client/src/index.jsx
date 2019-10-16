import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstPage: true,
      item1: [],
      item2: []
    };
    this.veryFetching = this.veryFetching.bind(this);
    this.switchUp = this.switchUp.bind(this);
  }

  componentWillMount(){
    let prodId = window.location.search.split("=")[1];
    // if (prodId == 1){
    //   console.log("prodId: ",prodId);
    //   fetch(`/suggested?prod_id=${prodId}`)
    //   .then(r => r.json())
    //   .then(d => {
    //     let x = d.slice(0,5);
    //     let y = d.slice(5,10);
    //     this.setState({
    //       item1: [x],
    //       item2: [y]
    //     })
    //   })
    if (prodId == 1){
      console.log("prodId: ",prodId);
      fetch(`/suggested?prod_id=${prodId}`)
      .then(r => r.json())
      .then(d => {
        this.setState({
          item1: [d[0]],
          item2: [d[1]]
        });
      })
    } else {
      this.veryFetching();
    }
  }

  veryFetching(){
    fetch('/suggested')
    .then(r => r.json())
    .then(d => {
      console.log(d);
      let x = d.slice(0,5);
      let y = d.slice(5,10);
      this.setState({
        item1: x,
        item2: y
      })
    })
    // fetch('/data')
    // .then(r => r.json())
    // .then(d => {
    //   let x = d.slice(0,5);
    //   let y = d.slice(5,10);
    //   this.setState({
    //     item1: x,
    //     item2: y
    //   })
    // })
  }

  switchUp(e){
    //Essentially we want to go and click the button and it'll switch
    //this.state.item1's value to this.state.item2's value
    //Could do this by doing (prevState) or could just do {firstPage ? <allBS with item1> :<allBS with item2>}
    this.setState((updater) => {
      return {
        firstPage: !updater.firstPage,
        item1: updater.item2,
        item2: updater.item1
      }
    })
  }



  render(){
    const ButtonL = styled.button`
      content: "";
      background-image: url(https://ir.ebaystatic.com/f/8ad5a0773b1335cc3ceb5d966215af2.svg);
      display: block;
      margin-left: 6px;
      transform: rotate(180deg);
      width: 15px;
      height: 35px;
      background-position: -49px 8px;
      opacity: .4;
      background-color: #fff;
      border: 1px solid rgba(0,0,0,0.3);
      border-radius: 35px;
      position: absolute;
      z-index: 1;
      top: 24%;
    `
    const ButtonR = styled.button`
      content: "";
      background-image: url(https://ir.ebaystatic.com/f/8ad5a0773b1335cc3ceb5d966215af2.svg);
      display: flex;
      //justify-content: flex-end;
      //margin-left: 9px;
      width: 15px;
      height: 35px;
      right: -2%;
      background-position: -49px 8px;
      opacity: .4;
      background-color: #fff;
      border: 1px solid rgba(0,0,0,0.3);
      border-radius: 35px;
      position: absolute;
      z-index: 1;
      top: 24%;
      padding: 4px, 0;
    `

    const AllItems = styled.ul`
      display: flex;
      flex-direction: row;
    `

    const Photos = styled.img`
      height: 175px;
      width: 200px;
    `
    const Container = styled.div`

    `

    return (
     <Container>
        {this.state.firstPage ?
          <p>Related Sponsored Content 1/2</p>
          :<p>Related Sponsored Content 2/2</p>
        }
        <ButtonL onClick={this.switchUp}/>
        <AllItems>
            {this.state.item1.map(item => {
              return (
                <li class="individualItems">
                  <Photos src={item.image} alt="watch"/>
                  <br></br>{item.productTitle}
                  <br></br>${item.price}
                  <br></br>{item.shippingCost == 0 ?
                    'Free Shipping'
                    :item.shippingCost
                  }
                </li>
                )})}
          </AllItems>
          <ButtonR onClick={this.switchUp}/>
      </Container>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));