import App from './App.js';

import './style.css';
import './components/Roller.js'
import './components/Picker.js'

import './components/Clock.js';

const container = document.querySelector('.canvas-container');

const app = new App(container);
app.init();
app.start();


