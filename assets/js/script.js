$(document).ready(function () {
  const workHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM"];
  const calendar = $("#calendar-container");
  const currentDay = $("#currentDay");
  let today = dayjs();
  currentDay.text(today.format("dddd, D MMMM YYYY"));
  let currentHour = today.format("h A");
  // function that creates the calendar
  function createCalendar() {


    let table = $('<table>').appendTo(calendar);
    // rows for each work hour
    workHours.forEach(hour => {
      let hour24 = Number(moment(hour, ["h A"]).format("H"));
      let currentHour24 = Number(moment(currentHour, ["h A"]).format("H"));
      let row = $('<tr>').appendTo(table);
      // cells for Time, Event, and Save
      let timeSlot = $('<td>').addClass("time-block hour").text(hour).appendTo(row);
      let description = $('<td>').addClass("row description").append($('<textarea>')).appendTo(row);
      let saveButton = $('<td>').addClass("saveBtn").appendTo(row).append($('<button>').addClass("btn").text("Save"));

      if (currentHour24 === hour24) {
        description.addClass("present");
      } else if (currentHour24 > hour24) {
        description.addClass("past");
      } else if (currentHour24 < hour24) {
        description.addClass("future");
      }

      // get saved events from local storage
      let savedEvent = localStorage.getItem(hour);
      if (savedEvent) {
        description.children().val(savedEvent);
      }

      // save button click event
      saveButton.on("click", function () {
        let event = description.children().val();
        localStorage.setItem(hour, event);
      });
    });
  }

  createCalendar();
});
