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

  date: new Date(),
  start() {
    this.date = new Date(refs.myCalenadr.value);
    if (this.date < new Date()) {
      refs.myCalenadr.value = '';
      clearInterval(this.intervalId);
      updateClockFace();
      alert('Установленная дата меньше текущей');
      return;
    }
    if (this.isActive) {
      return;
    }
    updateClockFace();
    this.isActive = true;
    this.intervalId = setInterval(() => {
      updateClockFace();
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActive = false;
  },
};

refs.buttonStartRef.addEventListener('click', timer.start.bind(timer));
refs.buttonStopRef.addEventListener('click', timer.stop.bind(timer));

function updateClockFace() {
  const time = timer.date - new Date();

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
