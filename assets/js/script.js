$(document).ready(function () {
  const workHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
  const calendar = $("#calendar-container");
  const currentDay = $("#currentDay");
  const today = dayjs();
  currentDay.text(today.format("dddd, D MMMM YYYY"));
  const currentHour = today.hour();

  // function that creates the calendar
  function createCalendar() {
    const table = $('<table>').appendTo(calendar);
    const messageContainer = $('<div>').attr('id', 'message-container').insertBefore(table);
    // rows for each work hour
    workHours.forEach(hour => {
      const hour24 = Number(moment(hour, ["h A"]).format("H"));
      const row = $('<tr>').appendTo(table);
      // cells for Time, Event, and Save
      $('<td>').addClass("time-block hour").text(hour).appendTo(row);
      const description = $('<td>').addClass("row description").append($('<textarea>')).appendTo(row);
      const saveButton = $('<td>').addClass("saveBtn").appendTo(row).append($('<button>').addClass("btn").text("Save"));

      if (currentHour === hour24) {
        description.addClass("present");
      } else if (currentHour > hour24) {
        description.addClass("past");
      } else if (currentHour < hour24) {
        description.addClass("future");
      }

      // get saved events from local storage
      const savedEvent = localStorage.getItem(hour);
      if (savedEvent) {
        description.children().val(savedEvent);
      }

      // save button click event
      saveButton.on("click", function () {
        const event = description.children().val();
        localStorage.setItem(hour, event);
        // display message that event was saved
        const message = $('<p>').addClass('success').text("Appointment added to Local Storage!").appendTo(messageContainer);
        setTimeout(function () {
          message.remove();
        }, 2000);
      });
    });
  }

  createCalendar();
});
