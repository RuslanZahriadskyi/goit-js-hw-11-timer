import flatpickr from 'flatpickr';
require('flatpickr/dist/themes/dark.css');

const refs = {
  daysRef: document.querySelector('[data-value = days]'),
  hoursRef: document.querySelector('[data-value = hours]'),
  minsRef: document.querySelector('[data-value = mins]'),
  secsRef: document.querySelector('[data-value = secs]'),
  myCalenadr: document.querySelector('[data-calendar]'),
  buttonStartRef: document.querySelector('[data-purpose="start"]'),
  buttonStopRef: document.querySelector('[data-purpose="stop"]'),
};

const fp = flatpickr(refs.myCalenadr, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
}); // flatpickr

const timer = {
  isActive: false,
  intervalId: null,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const endTime = Date.parse(refs.myCalenadr.value);
      const deltaTime = endTime - currentTime;
      if (deltaTime < 0) {
        refs.myCalenadr.value = '';
        clearInterval(this.intervalId);
        updateClockFace(0);
        alert('Установленная дата меньше текущей');
        return;
      }
      updateClockFace(deltaTime);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActive = false;
    console.dir(this.intervalId);
    console.log(clearInterval(this.intervalId));
  },
};

refs.buttonStartRef.addEventListener('click', timer.start.bind(timer));
refs.buttonStopRef.addEventListener('click', timer.stop.bind(timer));

function updateClockFace(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  refs.daysRef.textContent = `${days}`;
  refs.hoursRef.textContent = `${hours}`;
  refs.minsRef.textContent = `${mins}`;
  refs.secsRef.textContent = `${secs}`;
}

function pad(value) {
  return String(value).padStart(2, '0');
}
