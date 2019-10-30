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
    const IndividualItems = styled.li`
      list-style: none;
      height: 20%;
      width: 20%;
      font-size: 15px;
    `

    // const ButtonL = styled.button `
    // background-color: #fff;
    // border: 1px solid #333;
    // font-size: 18px;
    // padding: 0;
    // background-color;
    // position: absolute;
    // top: 50%;
    // -webkit-transform: translateY(-50%);
    // transform: translateY(-50%);
    // -webkit-transition: opacity 0.45s ease-in-out;
    // transition: opacity 0.45s ease-in-out;
    // z-index: 1;
    // height: 72px;
    // width: 28px;
    // `

    const ButtonR = styled.button`
      content: "";
      background-image: url(https://ir.ebaystatic.com/f/8ad5a0773b1335cc3ceb5d966215af2.svg);
      background-position: -49px 8px;
      display: flex;
      justify-content: flex-end;
      width: 15px;
      height: 35px;
      right: -2%;
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
      border: 1px black;
      font-family: "Helvetica neue",Helvetica,Verdana,Sans-serif;
    `

    return (
     <Container>
        {this.state.firstPage ?
          <p>Related Sponsored Content 1/2</p>
          :<p>Related Sponsored Content 2/2</p>
        }
        <p>Feedback on our suggestions</p>
        <ButtonL onClick={this.switchUp}/>
        <AllItems>
            {this.state.item1.map(item => {
              return (
                <IndividualItems>
                  <Photos src={item.image} alt="watch"/>
                  <br></br>{item.productTitle}
                  <br></br>${item.price}
                  <br></br>{item.shippingCost == 0 ?
                    'Free Shipping'
                    :item.shippingCost
                  }
                </IndividualItems>
                )})}
            <ButtonR onClick={this.switchUp}/>

          </AllItems>
      </Container>
    // <Container>
    //   <div className="carousel">
    //   <div className="carousel__container">
    //       {/* <button className="carousel__control carousel__control--prev" aria-label="Previous Slide - Top Products">
    //           <svg aria-hidden="true" className="icon icon--chevron-left-small" focusable="false" >
    //               <use xlink="true" href="#icon-chevron-left"></use>
    //           </svg>
    //       </button> */}
    //       <ButtonL />
    //       {this.state.item1.map(item => {
    //           return (
    //             <li className="carousel__list">
    //               <Photos src={item.image} alt="watch"/>
    //               <br></br>{item.productTitle}
    //               <br></br>${item.price}
    //               <br></br>{item.shippingCost == 0 ?
    //                 'Free Shipping'
    //                 :item.shippingCost
    //               }
    //             </li>
    //        )})}
    //       <button className="carousel__control carousel__control--next" aria-label="Next Slide - Top Products">
    //           <svg aria-hidden="true" className="icon icon--chevron-right-small" focusable="false">
    //               <use xlink="true" href="#icon-chevron-right"></use>
    //           </svg>
    //       </button>
    //   </div>
    // </div>
    // </Container>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));