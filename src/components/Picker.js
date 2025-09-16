
const mark = new URL("../assets/ui/color/green_check_mark.png", import.meta.url).href;
const border = new URL("../assets/ui/color/color_cell_border.png", import.meta.url).href;

const colors = [
    'black', 'red', 'yellow', 'green', 'blue', 'purple'
]



class colorPicker extends HTMLElement {
    set changeColor(callback) {
        const cells = this.shadowRoot.querySelectorAll('.cell');
        const circles = this.shadowRoot.querySelectorAll('.circle');

        this.callback = callback;

        [...cells, ...circles].forEach(cell => {
            cell.addEventListener('pointerdown', (e) => {
                const color = getComputedStyle(cell).backgroundColor;
                this.cleanSelected();
                cell.classList.add('selected');

                callback(getComputedStyle(cell).backgroundColor);

                if (this.colors.length > 5) {
                    this.colors.pop();
                }

                this.colors.unshift(color);

                // console.log('recently used colors:', this.colors);
                this.updateRecentlyUsed();
            });
        })
    }

    constructor() {
        super();
        // активный цвет палитры сейчас
        this.color = 'green';
        // массив для хранения недавно использованных цветов
        this.colors = [];

        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = /* html */ `
        <style>
            .container {
                width: 100%;
                height: 100%;
                <!-- position: relative; -->
                margin: 0;
            }

            .submit-button {
                position: absolute;
                display: flex;
                justify-content: flex-start;
                align-items: flex-end;
                z-index: 4;
            }

            .icon-button {
                width: 5vw;
                height: 5vw;
                background: url('${mark}') no-repeat center / cover;
                pointer-events: auto;
            }

            .colors-container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 1.5vw;
                box-sizing: border-box;
            }

            .palette {
                width: 70% !important;
                padding-left: 2.0vw;
            }

            .row {
                width: 91%;
                display: flex;
                justify-content: space-between;
                gap: 0;

                align-items: center;
                margin: 0;

                pointer-events: auto;
            }

            .cell {
                flex-grow: 1;
                box-sizing: border-box;
            }

            .cell.selected, .circle.selected {
                border: 3px solid white;

            }

            .color-cell {
                flex-grow: 1;
                border-radius: 1vw 1vw 0 0;
            }

            .circle {
                border-radius: 50%;
                <!-- width: 20.0vw; -->
                <!-- height: 20.0vw; -->
                box-sizing: border-box;
                border: 2px solid white;
            }

            .recently-used {
                gap: 0.55vw;
                margin-top: 0.25vw;
                justify-content: flex-start;
                margin-left: 1.2vw;
                <!-- align-items: ; -->
            }


        </style>
        <div class="container">
            <div class="submit-button .ui-button">
                <div class="icon-button "></div>
            </div>
            <div class="colors-container">
                <div class="palette row"></div>
                <div class="first-row row"></div>
                <div class="second-row row"></div>
                <div class="recently-used row"></div>
            </div>              
        </div>
        `;
    }

    connectedCallback() {
        this.createPallete();

        this.fillFirstRow();
        this.fillSecondRow();

        this.changePalleteEvents();
        this.initButtonEvents()
        this.initPickerEvents();

    }

    initButtonEvents() {
        const button = this.shadowRoot.querySelector('.submit-button');
        const palette = document.querySelector('.palette-container');

        button.addEventListener('pointerdown', () => {
            palette.style.display = 'none';
        });
    }

    initPickerEvents() {
        const picker = document.querySelector('.picker-container');
        const palette = document.querySelector('.palette-container');


        picker.addEventListener('pointerdown', () => {
            palette.style.display = 'block';
        })
    }

    changePalleteEvents() {
        const cells = this.shadowRoot.querySelectorAll('.color-cell');
        cells.forEach(cell => {
            cell.addEventListener('pointerdown', (e) => {
                this.color = getComputedStyle(cell).backgroundColor;
                this.updateRows();
            });
        });
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

    updateRecentlyUsed() {
        const container = this.shadowRoot.querySelector('.recently-used');
        container.innerHTML = ""; // очищаем перед заполнением

        this.colors.forEach(color => {
            const element = document.createElement('div');
            element.classList.add('circle');
            element.style.backgroundColor = color;
            element.style.width = '1.5vw';
            element.style.height = '1.5vw';

            element.addEventListener('pointerdown', () => {
                this.callback(color);
                this.cleanSelected();
                element.classList.add('selected');
            })

            container.appendChild(element);
        });

    }

    fillFirstRow() {
        const container = this.shadowRoot.querySelector('.first-row');
        container.innerHTML = ""; // очищаем перед заполнением

        for (let index = 0; index < 6; index++) {

            const element = document.createElement('div');
            // element.classList.add('first-row-cell');
            element.classList.add('cell');
            element.style.backgroundColor = `color-mix(in srgb, ${this.color} 80%, black  ${index * 0.1 * 100}%)`;
            // element.style.width = '1vw';
            element.style.height = '3vw';

            container.appendChild(element);
        }
    }

    fillSecondRow() {
        const container = this.shadowRoot.querySelector('.second-row');
        container.innerHTML = ""; // очищаем перед заполнением

        for (let index = 0; index < 6; index++) {

            const element = document.createElement('div');
            // element.classList.add('first-row-cell');
            element.classList.add('cell');
            element.style.backgroundColor = `color-mix(in srgb, ${this.color} 100%, white  ${index * 0.15 * 100}%)`;
            // element.style.width = '3vw';
            element.style.height = '3vw';

            container.appendChild(element);
        }
    }

    updateRows() {
        const rowFirst = this.shadowRoot.querySelector('.first-row');
        const rowSecond = this.shadowRoot.querySelector('.second-row');

        const i = this.colors.find(c => c === this.color);
        const prev = this.colors[i - 1] || 'purple';
        const next = this.colors[i + 1] || 'black';

        this.cleanSelected(); for (let i = 0; i < 6; i++) { 
            const p = i / 5; 
            rowFirst.children[i].style.backgroundColor = `color-mix(in srgb, white ${(1 - p) * 100}%, ${this.color} ${p * 100}%)`; 
            rowSecond.children[i].style.backgroundColor = `color-mix(in srgb, ${this.color} ${(1 - p) * 100}%, black ${p * 100}%)`; 
        }
    }

    cleanSelected() {
        const cells = this.shadowRoot.querySelectorAll('.cell');
        const circles = this.shadowRoot.querySelectorAll('.circle');

        cells.forEach(cell => cell.classList.remove('selected'));
        circles.forEach(circle => circle.classList.remove('selected'));
    }
}

customElements.define("color-picker", colorPicker);