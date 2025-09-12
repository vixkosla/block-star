const clockValue = document.querySelector('.clock-value');

// let seconds = 30;

let initial = 30;

const seconds = (i) => `${i}s`;

clockValue.innerHTML = seconds(initial);

document.addEventListener("DOMContentLoaded", () => {
    const timer = setInterval(() => {

        initial -= 1;
        clockValue.innerHTML = seconds(initial);
    
        if (initial <= 0) {
            clearInterval(timer);
            clockValue.innerHTML = seconds(0);
        }
    }, 1000);
});