$(document).ready(function () {
  const workHours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  const calendar = $("#calendar-container");
  const currentDay = $("#currentDay");
  let today = dayjs();
  currentDay.text(today.format("dddd, D MMMM YYYY"));

  // function that creates the calendar
  function createCalendar() {
    var table = $('<table>').addClass('table-primary table-responsive').appendTo(calendar);
    // rows for each work hour
    workHours.forEach(hour => {
      var row = $('<tr>').appendTo(table);
      // cells for Time, Event, and Save
      $('<td>').text(hour).appendTo(row);
      $('<td>').append($('<textarea>').addClass('description')).appendTo(row);
      $('<td>').append($('<button>').addClass('saveBtn').text('Save')).appendTo(row);
    });
  }

  createCalendar();
});