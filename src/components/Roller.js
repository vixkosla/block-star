import { animate } from "motion";

const arrowLeft = new URL("../assets/ui/arrow_left.png", import.meta.url).href;
const arrowRight = new URL("../assets/ui/arrow_right.png", import.meta.url).href;
const cellBright = new URL("../assets/ui/cell_bright.png", import.meta.url).href;
const cellDark = new URL("../assets/ui/cell_dark.png", import.meta.url).href;

const legsIcon = new URL("../assets/ui/legs.png", import.meta.url).href;
const bodyIcon = new URL("../assets/ui/body.png", import.meta.url).href;
const backgroundIcon = new URL("../assets/ui/background.png", import.meta.url).href;
const weaponIcon = new URL("../assets/ui/weapon.png", import.meta.url).href;

class rollButton extends HTMLElement {
  set rollCollection(callback) {
    this.shadowRoot.querySelector('.arrow-left').onpointerdown = () => {
      callback('left', this.type)
      invoke()
    };

    this.shadowRoot.querySelector('.arrow-right').onpointerdown = () => {
      callback('right', this.type);
      invoke()
    }

    const invoke = () => {
      this.changeMutableIcon();
      this.defaultIconStatus();
      this.audio.play();
      // this.clearActiveColor();
      // this.muteIcon();
    }

  }

  set clearActiveColor(callback) {
    this._clearActiveColor = callback();
  }

  constructor() {
    super();
    this.type = this.getAttribute("data-part");
    this.audio = document.getElementById('swipe');

    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = /* html */ `

    <style>
      div {
        display: flex;
        align-items: center;
        margin-bottom: 0.25vh;
      }

      .arrow {
        width: 4.5vw;
        height: 4.5vw;
        min-width: 40px;
        min-height: 40px;

      }

      .arrow-left {
        background: url('${arrowLeft}') no-repeat center / contain;
      }

      .arrow-right {
        background: url('${arrowRight}') no-repeat center / contain;
        /* Отражаем контейнер */
      }

      .icon-container {
        width: 7vw;
        height: 7vw;
        min-width: 40px;
        min-height: 40px;
        background: url('${cellBright}') no-repeat;
        background-size: contain;
        background-position: center;
        color: white;
        border: none;
        font-size: 18px;
        cursor: pointer;
        transform-origin: center;
      }

      .icon {
        width: 100%;
        height: 100%;
        background: url('${this.getURLIcon()}') no-repeat center / contain;
        transform: scale(0.8);
        transform-origin: center;
      }
    </style>
    <div>
      <div class="arrow arrow-left "></div>
      <div class="icon-container">
        <div class="icon"></div>
      </div>
      <div class="arrow arrow-right "></div>
    </div>

    `;
  }

  connectedCallback() {
    const btn = this.shadowRoot.querySelectorAll(".arrow");
    const iconContainer = this.shadowRoot.querySelector('.icon-container');

    btn.forEach(element => {
      // Анимация появления

      animate(
        element,
        { opacity: [0, 1], scale: [0.8, 1] },
        { duration: 0.5, easing: "ease-out" }
      );
      // Анимация при клике

      element.addEventListener("pointerdown", () => {
        animate(element, { scale: [1, 0.9, 1] }, { duration: 0.15 });
      });

    });

    iconContainer.addEventListener('pointerdown', () => {
      this.changeMutableIcon();
      console.log('hey click on icon container')
      this.defaultIconStatus();

      // this.clearActiveColor();
      // this.muteIcon();
    })
  }

  changeMutableIcon() {
    if (this.type === 'background') return;

    const container = document.querySelector('.mutable-icon');
    container.setAttribute('data-type', this.type);

    const url = `url('${this.getURLIcon()}')`;
    const currentURL = container.style.backgroundImage;

    // if (url != currentURL) {
    container.style.backgroundImage = url;
    // }
  }

  muteIcon() {
    const iconContainer = this.shadowRoot.querySelector('.icon-container');

    iconContainer.style.backgroundImage = `url('${cellDark}')`;
  }

  defaultIconStatus() {


    const containers = document.querySelectorAll('roll-button');
    const activeType = this.type;



    containers.forEach(component => {
    const container = component.shadowRoot.querySelector(".icon-container");


    if (component.getAttribute("data-part") === activeType) {
      container.style.backgroundImage = `url('${cellDark}')`;
    } else {
      container.style.backgroundImage = `url('${cellBright}')`;
    }


    });

  }

  getURLIcon() {
    const icons = {
      legs: legsIcon,
      body: bodyIcon,
      weapon: weaponIcon,
      background: backgroundIcon,
    }

    return icons[this.type];

  }
}

customElements.define("roll-button", rollButton);
