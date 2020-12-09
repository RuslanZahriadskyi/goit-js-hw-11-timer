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

class CountdownTimer {
  constructor(calendarValue, daysCount, hoursCount, minsCount, secsCount) {
    this.calendarValue = calendarValue;
    this.isActive = false;
    this.intervalId = null;
    this.date = new Date();
    this.days = daysCount;
    this.hours = hoursCount;
    this.mins = minsCount;
    this.secs = secsCount;
  }

  register(start, stop) {
    start.addEventListener('click', this.start.bind(this));
    stop.addEventListener('click', this.stop.bind(this));
  }

  start() {
    this.date = new Date(this.calendarValue.value);

    if (this.isActive) {
      return;
    }

    if (this.date < new Date()) {
      refs.myCalenadr.value = '';
      clearInterval(this.intervalId);
      alert('Установленная дата меньше текущей');
      return;
    }
    this.updateClockFace();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      this.updateClockFace();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActive = false;
  }

  updateClockFace() {
    const time = this.date - new Date();

    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    this.render(days, hours, mins, secs);
  }

  render(renderDays, renderHours, renderMins, renderSecs) {
    this.days.textContent = `${renderDays}`;
    this.hours.textContent = `${renderHours}`;
    this.mins.textContent = `${renderMins}`;
    this.secs.textContent = `${renderSecs}`;
  }
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const newCountdownTimer = new CountdownTimer(
  refs.myCalenadr,
  refs.daysRef,
  refs.hoursRef,
  refs.minsRef,
  refs.secsRef,
);

newCountdownTimer.register(refs.buttonStartRef, refs.buttonStopRef);
