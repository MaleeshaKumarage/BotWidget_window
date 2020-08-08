//import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import * as ServiceWorker from './registerServiceWorker';
import './index.css';


//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <App />
  // <BrowserRouter basename={baseUrl}>
  // </BrowserRouter>
  , rootElement);

ServiceWorker.unregister();
//registerServiceWorker();