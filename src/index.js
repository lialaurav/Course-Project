import React from 'react';
import ReactDOM from 'react-dom';
import Posts from './posts';
import Form from './form';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Form />, document.getElementById('form'));
ReactDOM.render(<Posts />, document.getElementById('posts'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
