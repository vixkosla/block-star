import { animate } from "motion";

const arrowLeft = new URL("./assets/ui/arrow_left.png", import.meta.url).href;
const arrowRight = new URL("./assets/ui/arrow_right.png", import.meta.url).href;
const cellBright = new URL("./assets/ui/cell_bright.png", import.meta.url).href;

const legsIcon = new URL("./assets/ui/legs.png", import.meta.url).href;
const bodyIcon = new URL("./assets/ui/body.png", import.meta.url).href;
const backgroundIcon = new URL("./assets/ui/background.png", import.meta.url).href;
const weaponIcon = new URL("./assets/ui/weapon.png", import.meta.url).href;

class rollButton extends HTMLElement {
  set rollCollection(callback) {
    this.shadowRoot.querySelector('.arrow-left').onpointerdown = () => callback('left');
    this.shadowRoot.querySelector('.arrow-right').onpointerdown = () => callback('right');
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = /* html */ `

    <style>
      div {
        display: flex;
        align-items: center;
        margin-bottom: 0.25vh;
      }

      .arrow {
        width: 5vw;
        height: 5vw;
        min-width: 46px;
        min-height: 46px;

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
        min-width: 48px;
        min-height: 48px;
        background: url('${cellBright}') no-repeat;
        background-size: contain;
        background-position: center;
        border-radius: 12px;
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



    btn.forEach(element => {
      // Анимация появления

      animate(
        element,
        { opacity: [0, 1], scale: [0.8, 1] },
        { duration: 0.5, easing: "ease-out" }
      );
      // Анимация при клике

      element.addEventListener("pointerdown", () => {
        animate(element, { scale: [1, 0.9, 1] }, { duration: 0.3 });
      });

    });
  }

  getURLIcon() {
    const type = this.getAttribute("data-part");
    const icons = {
      legs: legsIcon,
      body: bodyIcon,
      weapon: weaponIcon,
      background: backgroundIcon,
    }

    return icons[type];

  }
}

customElements.define("roll-button", rollButton);
