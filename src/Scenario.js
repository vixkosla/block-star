import { animate } from "motion";

export class Scenario {
    constructor() {

    }

    playNow() {
        const button = document.querySelector('.results-button');

        button?.addEventListener('pointerdown', () => {
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        })

        animate(
            button,
            { opacity: [0, 1], scale: [0.8, 1] },
            { duration: 0.5, easing: "ease-out" }
        );
    }

    initAnimations() {
        const random = document.querySelector('.random');

        const anim_1 = animate(random, { rotate: [-10, 10, 10, -5, 0] },
            { duration: 0.75, easing: "ease-in-out", repeat: Infinity, delay: 7.5 });

        random.addEventListener("pointerdown", () => {
            animate(random, { scale: [1, 0.9, 1] }, { duration: 0.3 });
            anim_1.pause();
        });
    }
    initClock() {
        const clockValue = document.querySelector('.clock-value');

        // let seconds = 30;

        let initial = 40;

        const seconds = (i) => `${i}s`;

        clockValue.innerHTML = seconds(initial);

        document.addEventListener("DOMContentLoaded", () => {
            const timer = setInterval(() => {

                initial -= 1;
                clockValue.innerHTML = seconds(initial);

                if (initial <= 0) {
                    clearInterval(timer);
                    clockValue.innerHTML = seconds(0);

                    this.submitHandler()
                }
            }, 1000);
        });
    }

    submitButtton() {
        const button = document.querySelector('.submit-icon');
        let initial = 5;

        const timer = setInterval(() => {

            initial -= 1;

            if (initial <= 0) {
                clearInterval(timer);
                // this.submitHandler()
                button.style.display = 'block';
            }

        }, 1000);

        button.addEventListener('pointerdown', () => this.submitHandler());
    }

    submitHandler() {
        const overlay = document.querySelector('.overlay-screen');
        const perfectScreen = document.querySelector('.perfect-screen');
        const audio = document.getElementById('stars');

        audio.play();

        overlay.style.display = 'block';
        perfectScreen.style.display = 'block';

        perfectScreen.addEventListener('pointerdown', () => this.perfectHandler());

        setTimeout(() => {
            this.perfectHandler();
        }, 10000);

    }

    perfectHandler() {
        const perfectScreen = document.querySelector('.perfect-screen');
        const resultScreen = document.querySelector('.results-screen');

        resultScreen.style.display = 'flex';
        perfectScreen.style.display = 'none';
    }


    animateHand() {
        const hand = document.querySelector('.hand');

        const arrows = document.querySelectorAll('.arrow-right');

        const first = document.querySelector("#first");
        const second = document.querySelector("#second");

        const target_one = first.shadowRoot.querySelector(".arrow-right");
        const target_two = second.shadowRoot.querySelector(".arrow-right");
        const target_third = document.querySelector("#third")

        console.log(target_one, target_two, target_third);

        const rect_1 = target_one.getBoundingClientRect();
        const rect_2 = target_two.getBoundingClientRect();
        const rect_3 = target_third.getBoundingClientRect();

        const hint_1 = document.querySelector(".left-description");
        const hint_2 = document.querySelector(".right-description");

        hint_1.style.display = 'inline-block';
        hint_1.style.opacity = 0;

        // First sequence: Up to fading out hint_1
        const sequence1 = [
            // 1. Move to first element
            [".hand", { x: rect_1.left, y: rect_1.bottom }, { duration: 2 }],
            [".left-description", { opacity: 1 }, { duration: 2, at: "<" }],
            [".hand", { scale: [1, 0.9, 1] }, {
                duration: 0.5, easing: "ease-in-out", onComplete: () => {
                    if (target_one) {
                        target_one.dispatchEvent(new Event('pointerdown'));
                        console.log('event one');
                    } else {
                        console.error('target_one is not defined');
                    }
                }
            }],
            // 2. Move to second
            [".hand", { x: rect_2.left, y: rect_2.bottom }, { duration: 1 }],
            [".hand", { scale: [1, 0.9, 1] }, { duration: 0.5, easing: "ease-in-out" }],
            // 3. Fade out left hint
            [".left-description", { opacity: 0 }, { duration: 1 }]
        ];

        const anim1 = animate(sequence1, { delay: 1.5 });

        // After first sequence finishes, run callback and start second sequence
        anim1.finished.then(() => {
            console.log("Отключить подсказку");
            hint_1.style.display = "none";
            hint_2.style.opacity = 0;
            hint_2.style.display = "inline-block";

            // Second sequence: Show right hint and move to third (parallel)
            const sequence2 = [
                [".right-description", { opacity: 1 }, { duration: 1.5 }],
                [".hand", { x: rect_3.left, y: rect_3.top }, { duration: 1.5, at: "<" }],  // "<" makes this start simultaneously with the previous
                [".hand", { scale: [1, 0.9, 1] }, { duration: 0.5, easing: "ease-in-out" }],
                // 6. Final offset
                [".hand", { y: 100 }, { duration: 1 }]
            ];

            const anim2 = animate(sequence2);

            anim2.finished.then(() => {
                animate('.hand', { opacity: 0 }, { duration: 0.5 })  // Final fade out)
                animate(".right-description", { opacity: 0 }, { duration: 1.5 });


                this.submitButtton()
            })
        });
    }
}