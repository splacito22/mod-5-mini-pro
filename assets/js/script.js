$(function () {
  // elements
  var dateContainerEl = $("#date-container");
  var projectNameEl = $("#project-name");
  var projectTypeEl = $("#project-type");
  var projectDueDateEl = $("#project-due-date");
  var projectModal = bootstrap.Modal.getOrCreateInstance("#project-form-modal");

  //state
  var dateInterval;
  var projects = [];

  //functions
  function init() {
    startClock();
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    var name = projectNameEl.val();
    var type = projectTypeEl.val();
    var dueDate = projectDueDateEl.val();

    if (!name || !type || !dueDate) {
      alert("You must fill out the form!");
      return;
    }

    projects.push({
      name,
      type,
      dueDate,
    });

    saveProjects();
    clearForm();
    closeModal();
    // renderProjects();
  }

  function closeModal() {
    projectModal.hide();
  }

  function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  function loaderProjects() {
    // to do
  }

  function clearForm() {
    projectNameEl.val("");
    projectTypeEl.val("Web Application Front End");
    projectDueDateEl.val("");
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

  //event listeners
  $("#project-form-submit").on("click", handleFormSubmit);

  //initialize
  init();
});
