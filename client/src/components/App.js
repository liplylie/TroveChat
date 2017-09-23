import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';
import Men from './Men';
import Women from './Women';
import Login from './Login'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <NavBar />
          <Route excat path='/men' component={() => (<Men />)} />
          <Route excat path='/women' component={() => (<Women />)} />
          <Route path='/login' component={() => (<Login />)} />
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            </ol>
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <img className="d-block img-fluid" src="https://www.gonfashion.com/wp-content/uploads/2017/07/vuitton-supreme1.jpg" alt="First slide"></img>
              </div>
              <div className="carousel-item">
                <img className="d-block img-fluid" src="https://www.gonfashion.com/wp-content/uploads/2017/07/vuitton-supreme2.jpg" alt="Second slide"></img>
              </div>
              <div className="carousel-item">
                <img className="d-block img-fluid" src="https://pbs.twimg.com/media/C82Q7zuXsAEn0q9.jpg:large" alt="Third slide"></img>
              </div>
              <div className="carousel-item">
                <img className="d-block img-fluid" src="https://i.ytimg.com/vi/AoZ7cIAPxyg/maxresdefault.jpg" alt="Third slide"></img>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;