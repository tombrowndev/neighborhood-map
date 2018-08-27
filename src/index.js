import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

let registerServiceWorker = function() {
if (!navigator.serviceWorker) return;

navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(reg => {
    return;
});
}

registerServiceWorker()