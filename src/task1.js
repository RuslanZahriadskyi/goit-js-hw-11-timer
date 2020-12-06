const refs = {
  daysRef: document.querySelector('[data-value = days]'),
  hoursRef: document.querySelector('[data-value = hours]'),
  minsRef: document.querySelector('[data-value = mins]'),
  secsRef: document.querySelector('[data-value = secs]'),
  myCalenadr: document.querySelector('[data-calendar]'),
  buttonStartRef: document.querySelector('[data-purpose="start"]'),
  buttonStopRef: document.querySelector('[data-purpose="stop"]'),
};

class CountdownTimer {
  constructor(expiredDate) {
    this.expiredDate = Date.parse(expiredDate.targetDate);
    console.log(this.expiredDate);
    this.isActive = false;
    this.intervalId = null;
  }

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
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActive = false;
    updateClockFace(0);
    refs.myCalenadr.value = '';
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
// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 17, 2019'),
// });

refs.buttonStartRef.addEventListener('click', test);
refs.buttonStartRef.addEventListener(
  'click',
  CountdownTimer.start.bind(CountdownTimer),
);
// refs.buttonStartRef.addEventListener(
//   'click',
//   CountdownTimer.start.bind(CountdownTimer),
// );

function test() {
  new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021'),
  });
}
