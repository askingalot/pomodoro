window.clock = (() => {

  class Clock {
    constructor(onTick) {
      this.timeInSeconds = 0;
      this._onTick = onTick;
    }
    start() {
      this.timeInSeconds = 25 * 60;
      this._intervalToken = setInterval(() => {
        this.timeInSeconds--;

        this._onTick(this.timeInSeconds);

        if (this.timeInSeconds <= 0) {
          this.stop();
        }
      }, 1000);
    }
    stop() {
      this.timeInSeconds = 0;
      clearInterval(this._intervalToken);
    }
  }

  function formatTime(timeInSeconds) {
    const min = Math.floor(timeInSeconds / 60);
    const seconds = (`0${Math.floor(timeInSeconds % 60)}`).slice(1);
    return `${min}:${seconds}`;
  }

  let clock;
  return {
    startTimer: () => {
      const clockElement = document.getElementById('clock');

      clock = new Clock(
        timeInSeconds => clockElement.textContent = formatTime(timeInSeconds));
      clock.start()
    },
    stoptimer: () => clock.stop(),
  };
})();
