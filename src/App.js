import './App.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './components/reducer/root-reducer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Main from './components/content/main';
import NewBrandModel from './components/main/brand/newbrandform';

const store = createStore(rootReducer)


function App() {
  return (
    <Provider store = {store}>
        <Router>
          <Header/>
          <Main/>
          <Footer/>
        </Router>
        
    </Provider>   
  );
}

export default App;
