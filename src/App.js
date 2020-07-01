import React, { Component } from 'react'; 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Rules from './Rules';
import Game from './Game';
import Words from './Words';
import './App.css'; 

class App extends Component {
  constructor () {
    super();
    this.state = {
      cards: ["hi"],
    }
  } 

  componentDidMount() { 
    this.shuffleCards()
  }
  
  shuffleCards = () => { 
    let cardsCopy = [] 
    for (let i = 0; i < Words.length; i++) {
      const index = Math.floor(Math.random() * Words.length);
      if (cardsCopy.includes(Words[index])) {
        i -= 1; 
      } else { 
        cardsCopy.push(Words[index]); 
      }
    }
    console.log(cardsCopy)
    this.setState({
      cards: cardsCopy
    })
  }

  render() {
    // Create a page for game rules using React Router!
      return (
        <Router>
          <div className="App">
            <div className="wrapper">
              <header>
                <h1>Codenames <i className="fas fa-meteor"></i></h1>
                <Link className="rulesLink" to="/rules">The Rules</Link> 
              </header>
              <main> 
                <Route exact path="/" component={Home} />
                <Route exact path="/game"
                  render={(props) => (
                    <Game {...props} cards={this.state.cards} />
                  )} />
                <Route exact path="/rules" component={Rules} />  
              </main>
              <footer>
                <p>© 2020 Robin Nong</p>
              </footer>
            </div>
          </div>
        </Router>
      );
  }
}

export default App;
