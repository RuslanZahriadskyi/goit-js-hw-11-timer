import flatpickr from 'flatpickr';
require('flatpickr/dist/themes/material_green.css');

const refs = {
  daysRef: document.querySelector('[data-value = days__through-сlass]'),
  hoursRef: document.querySelector('[data-value = hours__through-сlass]'),
  minsRef: document.querySelector('[data-value = mins__through-сlass]'),
  secsRef: document.querySelector('[data-value = secs__through-сlass]'),
  myCalenadr: document.querySelector('[data-calendar__through-сlass]'),
  buttonStartRef: document.querySelector(
    '[data-purpose="start__through-сlass"]',
  ),
  buttonStopRef: document.querySelector('[data-purpose="stop__through-сlass"]'),
};

const fp = flatpickr(refs.myCalenadr, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
}); // flatpickr

let intervalId = null;

class CountdownTimer {
  constructor(expiredDate) {
    this.expiredDate = expiredDate.targetDate;
    this.isActive = false;
    // this.intervalId = intervalId;
  }

  register() {
    const that = this;
    refs.buttonStartRef.addEventListener('click', that.start);
  }

  registered() {
    refs.buttonStopRef.addEventListener('click', this.stop);
  }

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    intervalId = setInterval(() => {
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
  }

  stop() {
    // console.log('click');
    clearInterval(intervalId);
    this.intervalId = null;
    this.isActive = false;
  }
}

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

const newCountdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: Date.parse(refs.myCalenadr.value),
});

newCountdownTimer.register();
newCountdownTimer.registered();
