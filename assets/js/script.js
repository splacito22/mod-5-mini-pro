$(function () {
  // elements
  var dateContainerEl = $("#date-container");
  //state
  var dateInterval;

  //functions
  function init() {
    startClock();
  }
  function updateDateDisplay() {
    var today = dayjs();
    dateContainerEl.text(today.format("MMM DD, YYYY[ at ]hh:mm:ss a"));
  }

  function startClock() {
    updateDateDisplay();
    dateInterval = setInterval(function () {
      updateDateDisplay();
    }, 1000);
  }
  //initialize
  init();
});
