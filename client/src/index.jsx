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
    console.log('componentWillMount')
    let prodId = window.location.search.split("=")[1];
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
    console.log('fetching')
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
  console.log('render')
  const Background = styled.div`
    background: rgb(245, 245, 245);
    padding: 10px;
  `

  const ButtonL = styled.button`
    content: "";
    background-image: url(https://ir.ebaystatic.com/f/8ad5a0773b1335cc3ceb5d966215af2.svg);
    display: block;
    margin-left: 6px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
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
    ${this.state.firstPage} &:hover {
      opacity: 1;
    }
    ${!this.state.firstPage}{
      cursor: not-allowed;
      pointer-events: none;
    }
  `
  const IndividualItems = styled.li`
    list-style: none;
    height: 20%;
    width: 20%;
    font-size: 15px;
  `

  const ButtonR = styled.button`
    content: "";
    background-image: url(https://ir.ebaystatic.com/f/8ad5a0773b1335cc3ceb5d966215af2.svg);
    background-position: -49px 8px;
    display: flex;
    justify-content: flex-end;
    // align-items: flex-end;
    width: 15px;
    height: 35px;
    //right: -2%;
    opacity: .4;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.3);
    border-radius: 35px;
    bottom: 20px;
    //z-index: 1;
    top: 24%;
    //padding: 4px, 0;

    ${!this.state.firstPage} &:hover {
      opacity: 1;
    }
    ${this.state.firstPage}{
      cursor: not-allowed;
      pointer-events: none;
    }

  `

  const AllItems = styled.ul`
    display: flex;
    flex-direction: row;
    //justify-content: center;
    //align-items: center;
    height: 70%;
    width: 90%;
  `

  const Photos = styled.img`
    height: 175px;
    width: 200px;
  `
  const Container = styled.div`
    border: 1px rgb(204, 204, 204) solid;
    font-family: "Helvetica neue",Helvetica,Verdana,Sans-serif;
    background: rgb(255, 255, 255);
  `
  const Feedback = styled.p`
    display: flex;
    justify-content: flex-end;
    font-size: 11px;
    font-weight: 400;
    margin: 4px 0 0 0;
  `
  const Header = styled.div`

  `
  const Description = styled.p`
    line-height: 20px;
    color: #333;
    white-space: normal;
    word-break: break-word;
    hyphens: auto;
    margin: 1px;
  `
  const Price = styled.p`
    font-size: 17px;
    font-weight: 500;
    margin: 5px 0 0 0;
  `
  const Shipping = styled.p`
    color: #767676
    font-weight: normal;
    font-size: 80%;
    margin: 1px;
  `

    return (
      <Background>
        <Container>
          <Header>
            {this.state.firstPage ?
                <p>Related Sponsored Content 1/2</p>
                :<p>Related Sponsored Content 2/2</p>
              }
            <Feedback>Feedback on our suggestions</Feedback>
          </Header>
              <ButtonL onClick={this.switchUp}/>
                <AllItems>
                  {this.state.item1.map(item => {
                    return (
                      <IndividualItems>
                        <Photos src={item.image} alt="watch"/>
                        <br></br><Description>{item.productTitle}</Description>
                        <Price>${item.price}</Price>
                        <Shipping>
                          {item.shippingCost == 0 ?
                            'Free Shipping'
                            :`+ $${item.shippingCost}`}
                        </Shipping>
                      </IndividualItems>
                      )})}
                  <ButtonR onClick={this.switchUp}/>
                </AllItems>
          </Container>
        </Background>
      )

  }
}


ReactDOM.render(<App/>, document.getElementById('root'));