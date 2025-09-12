
const mark = new URL("../assets/ui/color/green_check_mark.png", import.meta.url).href;
const border = new URL("../assets/ui/color/color_cell_border.png", import.meta.url).href;

const colors = [
    'black', 'red', 'yellow', 'green', 'blue', 'purple' 
]


class colorPicker extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = /* html */ `
        <style>
            .picker-container {
                margin: 0;
            }

            .submit-button {
                position: absolute;
                display: flex;
                justify-content: flex-start;
                align-items: flex-end;
            }

            .icon-button {
                width: 40px;
                height: 40px;
                background: url('${mark}') no-repeat center / contain;
            }

            .colors-container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .row {
                width: 100%;
                display: flex;
                justify-content: space-between;
                gap: 0;

                align-items: center;
                margin: 0.1vw 0;
            }

            .cell {
                flex-grow: 1;
            }

            .color-cell {
                flex-grow: 1;
            }


        </style>
        <div>
            <div class="submit-button">
                <div class="icon-button"></div>
            </div>
            <div class="colors-container">
                <div class="palette row"></div>
                <div class="first-row row"></div>
                <div class="second-row row"></div>
                <div class="third-row row"></div>
                <div class="fourth-row row"></div>
            </div>              
        </div>
        `;
    }

    connectedCallback() {
        this.createPallete();
        
        console.log('color picker connected');

        for (let i = 0; i < 4; i++) {
            this.createFirstRow(i);
        }
    }

    createPallete() {
        const container = this.shadowRoot.querySelector('.palette');
        
        for (let i = 0; i < colors.length; i++) {

            const element = document.createElement('div');
            element.classList.add('color-cell');
            element.style.backgroundColor = colors[i];
            element.style.height = '2vw';

            container.appendChild(element);
        }
    }

    createFirstRow(index) {
        const element = document.createElement('div');
        element.classList.add('first-row-cell');
        element.classList.add('cell');
        element.style.backgroundColor = `color-mix(in srgb, red ${index * 0.1 * 100}%, blue 80%)`;
        element.style.width = '1vw';
        element.style.height = '2vw';

        const container = this.shadowRoot.querySelector('.first-row');
        container.appendChild(element);
    }
}

customElements.define("color-picker", colorPicker);