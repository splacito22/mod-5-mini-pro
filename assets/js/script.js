$(function () {
  // elements
  var dateContainerEl = $("#date-container");
  var projectNameEl = $("#project-name");
  var projectTypeEl = $("#project-type");
  var projectDueDateEl = $("#project-due-date");
  var projectTableBody = $("#project-table-body");
  var projectModal = bootstrap.Modal.getOrCreateInstance("#project-form-modal");

  //state
  var dateInterval;
  var projects = [];

  //functions
  function init() {
    startClock();
    loadProjects();
    renderProjects();
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
    renderProjects();
  }

  function closeModal() {
    projectModal.hide();
  }

  function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  function loadProjects() {
    var projectsString = localStorage.getItem("projects");

    if (projectsString) {
      try {
        projects = JSON.parse(projectsString);
      } catch (error) {
        console.log("error loading projects from local storage");
      }
    }
  }

  function renderProjects() {
    projectTableBody.html("");

    for (var i = 0; i < projects.length; i++) {
      var project = projects[i];

      var today = dayjs();
      var dueDate = dayjs(project.dueDate, "YYYY-MM-DD");

      var tr = $("<tr>");

      if (dueDate.isSame(today, "day")) {
        tr.addClass("table-warning");
      } else if (dueDate.isBefore(today, "day")) {
        tr.addClass("table-danger");
      }

      tr.append("<td>" + project.name + "</td>");
      tr.append("<td>" + project.type + "</td>");
      tr.append("<td>" + dueDate.format("MM/DD/YYYY") + "</td>");

      projectTableBody.append(tr);
    }
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
  $("#project-form").on("submit", handleFormSubmit);

  //initialize
  init();
});
