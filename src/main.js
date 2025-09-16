import App from './App.js';
import { Scenario } from './Scenario.js';

import './style.css';
import './components/Roller.js'
import './components/Picker.js'

const container = document.querySelector('.canvas-container');

const app = new App(container);
const scenario = new Scenario();

app.init();
app.start();

scenario.initClock();
scenario.initAnimations()
scenario.animateHand();
// scenario.playNow();




