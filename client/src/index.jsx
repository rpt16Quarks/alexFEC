/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-deprecated */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPage: true,
      item1: [],
      item2: [],
    };
    this.veryFetching = this.veryFetching.bind(this);
    this.switchUp = this.switchUp.bind(this);
  }

  componentWillMount() {
    const prodId = window.location.search.split('=')[1];
    if (prodId === 1) {
      fetch(`/suggested?prod_id=${prodId}`)
        .then((r) => r.json())
        .then((d) => {
          this.setState({
            item1: [d[0]],
            item2: [d[1]],
          });
        });
    } else {
      this.veryFetching();
    }
  }

  veryFetching() {
    fetch('/suggested')
      .then((r) => r.json())
      .then((d) => {
        const x = d.slice(0, 5);
        const y = d.slice(5, 10);
        this.setState({
          item1: x,
          item2: y,
        });
      });
  }

  switchUp() {
    // Essentially we want to go and click the button and it'll switch
    // this.state.item1's value to this.state.item2's value
    // Could do this by doing (prevState) or could just do
    // {firstPage ? <allBS with item1> :<allBS with item2>}
    this.setState((updater) => {
      return {
        firstPage: !updater.firstPage,
        item1: updater.item2,
        item2: updater.item1,
      };
    });
  }


  render() {
    const Background = styled.div`
      background: rgb(245, 245, 245);
      padding: 10px;
    `;
    const ButtonL = styled.button`
      content: "";
      background-image: url(https://ir.ebaystatic.com/f/8ad5a0773b1335cc3ceb5d966215af2.svg);
      display: block;
      margin-left: -2%;
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
      ${this.state.firstPage} &:hover {
        opacity: 1;
      }
      ${!this.state.firstPage}{
        cursor: not-allowed;
        pointer-events: none;
      }
    `;
    const Description = styled.p`
      line-height: 20px;
      color: #333;
      white-space: normal;
      word-break: break-word;
      hyphens: auto;
      margin: 3px;
      font-weight: normal;
      font-size: 100%;
    `;
    const IndividualItems = styled.li`
      list-style: none;
      height: 20%;
      width: 20%;
      font-size: 15px;
      &:hover {
        border: 1px solid rgb(153, 153, 153);
      }
      ${Description}&:hover {
        text-decoration: underline;
      }
    `;
    const ButtonR = styled.button`
      content: "";
      background-image: url(https://ir.ebaystatic.com/f/8ad5a0773b1335cc3ceb5d966215af2.svg);
      background-position: -49px 8px;
      display: flex;
      justify-content: flex-end;
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
    `;
    const AllItems = styled.ul`
      display: flex;
      flex-direction: row;
      height: 70%;
      width: 90%;
    `;
    const Photos = styled.img`
      height: 175px;
      width: 200px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    `;
    const Container = styled.div`
      border: 1px rgb(204, 204, 204) solid;
      font-family: Skin-market-sans !important;
      background: rgb(255, 255, 255);
    `;
    const Feedback = styled.p`
      display: flex;
      justify-content: flex-end;
      font-size: 11px;
      font-weight: 400;
      margin: 4px 0 0 0;
    `;
    const Price = styled.p`
      font-size: 17px;
      font-weight: 500;
      margin: 5px 0 0 0;
    `;
    const Shipping = styled.p`
      color: #767676
      font-weight: normal;
      font-size: 80%;
      margin: 1px;
    `;
    const RSC = styled.p`
      padding-left: 1%;
    `;

    return (
      <Background>
        <Container>
          <div>
            {this.state.firstPage
              ? <RSC>Related Sponsored Content 1/2</RSC>
              : <RSC>Related Sponsored Content 2/2</RSC> }
            <Feedback>Feedback on our suggestions</Feedback>
          </div>
          <AllItems>
            <ButtonL onClick={this.switchUp} />
            {this.state.item1.map((item) => {
              return (
                <IndividualItems>
                  <Photos src={item.image} alt="watch" />
                  <Description>{item.productTitle}</Description>
                  <Price>
                    ${item.price}
                  </Price>
                  <Shipping>
                    {item.shippingCost === 0
                      ? 'Free Shipping'
                      : `+ $${item.shippingCost}`}
                  </Shipping>
                </IndividualItems>
              );
            })}
            <ButtonR onClick={this.switchUp} />
          </AllItems>
        </Container>
      </Background>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('suggested'));
