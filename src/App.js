import React, { Component } from 'react';
import { WebChat } from './components/WebChat';


// import './custom.css'

export class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = { isMobile: false };
  }

  render() {
    const mobileChanged = this.state.isMobile ? 'col-12' : 'col-8';
    return (
      // <Layout>
      //   <Route exact path='/' component={Home} />
      //   <Route path='/counter' component={Counter} />
      //   <Route path='/fetch-data' component={FetchData} />
      // </Layout>

      <div className="row" style={{ height: "90%" }}>
        <div style={{ width: "100%" }}>
          
        </div>
        <div className="col-4 portraitHide " style={{ maxHeight: "100%" }}  >
       
          <div className="row " style={{ maxHeight: "100%" }}>
         
            <div id="slider">
                <figure>
                  <img src="https://res.cloudinary.com/vevro/image/upload/v1594867405/RestOBot/ps0fxy14tdioqp6svk28.png" alt="1"/>
                  <img src="https://res.cloudinary.com/vevro/image/upload/v1594867405/RestOBot/ugzk2zojwt8ia05xywyw.png" alt="2"/>
                  <img src="https://res.cloudinary.com/vevro/image/upload/v1594867404/RestOBot/vnyusgbxru12gnjikugw.png" alt="3" />
                  <img src="https://res.cloudinary.com/vevro/image/upload/v1594867404/RestOBot/l6ptpx6xvmscfwsaz3qb.png" alt="4"/>
                  <img src="https://res.cloudinary.com/vevro/image/upload/v1594867403/RestOBot/ztasczqnucncmg8zg4ib.png" alt="5"/>
                  
                </figure>
            </div>
            <div className="col-12" style={{ position: "relative",  width: "100%", textAlign: "center", float: "center" }}>
              <span className="lovespan ">Made with <i className="fa fa-heart pulse"></i> by <span onClick={this.onClickVevro} id="lvevro"
                style={{ cursor: "pointer" }}>Maleesha Kumarage<sup>&copy;</sup></span></span>
              <br />
             
            </div>
            </div>
          </div>
        <div className={mobileChanged} style={{ maxHeight: "100%"}} >
          <WebChat />
          <input id="userOutput" style={{ maxHeight: "100%",width:"100%",border:"none" }}readonly></input>
        </div>
       
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
        this.setState({
            isMobile: window.innerWidth < 760
        });
    }, false);
    window.addEventListener('load', () => {
      this.setState({
          isMobile: window.innerWidth < 760
      });
  }, false);
}
}
