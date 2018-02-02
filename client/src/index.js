/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./components/App', () => {
      ReactDOM.render(<App />, document.querySelector('#root'));
    });
  }
}