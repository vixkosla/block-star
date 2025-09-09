import App from './App.js';

import './style.css';
import './Interface.js'

const container = document.querySelector('.canvas-container');

const app = new App(container);
app.init();
app.start();


