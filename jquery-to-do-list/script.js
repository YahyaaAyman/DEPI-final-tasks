$(document).ready(function () {

  // Add new task
  $("#add-task").click(function () {
    addTask();
  });

  // Add task when pressing Enter key
  $("#new-task").keypress(function (e) {
    if (e.which == 13) {
      addTask();
    }
  });

  // Function to add a new task
  function addTask() {
    const taskText = $("#new-task").val().trim();

    if (taskText === "") {
      $("#new-task").addClass("is-invalid");
      $("#error-message").show();
      setTimeout(function () {
        $("#new-task").removeClass("is-invalid");
        $("#error-message").hide();
      }, 2000);
      return;
    }

    // Create new task item
    const taskItem = $(
      '<li class="list-group-item d-flex align-items-center py-3"></li>'
    );
    const checkbox = $(
      '<div class="form-check me-3"><input class="form-check-input" type="checkbox"></div>'
    );
    const taskSpan = $('<span class="task-text flex-grow-1"></span>').text(
      taskText
    );
    const deleteButton = $(
      '<button class="delete-task" aria-label="Delete task">×</button>'
    );

    taskItem.append(checkbox, taskSpan, deleteButton);
    $("#task-list").append(taskItem);

    // Clear input
    $("#new-task").val("");


    // Setup event handlers for the new task
    setupTaskEvents(taskItem);
  }

  // Function to setup event handlers for tasks
  function setupTaskEvents(taskItem) {
    // Mark task as completed
    taskItem.find("input[type='checkbox']").click(function () {
      if ($(this).is(":checked")) {
        taskItem.addClass("completed");
      } else {
        taskItem.removeClass("completed");
      }
      saveTasks();
    });

    // Delete task
    taskItem.find(".delete-task").click(function () {
      taskItem.fadeOut(300, function () {
        $(this).remove();
        saveTasks();
      });
    });
  }


});
