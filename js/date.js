const y_monthYear = document.getElementById('y_month_year');
const y_calendarDates = document.getElementById('y_calendar_dates');
const y_prevBtn = document.getElementById('y_prev_month');
const y_nextBtn = document.getElementById('y_next_month');

let y_date = new Date();

function renderCalendar() {
  const year = y_date.getFullYear();
  const month = y_date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0).getDate();

  const startDayIndex = firstDayOfMonth.getDay(); // Sunday=0 to Saturday=6
  const correctedStartIndex = (startDayIndex + 6) % 7; // Convert to Mon=0 to Sun=6

  y_monthYear.textContent = y_date.toLocaleString('default', {
    month: 'long',
    year: 'numeric'
  });

  let days = '';

  // Previous month
  for (let x = correctedStartIndex; x > 0; x--) {
    days += `<span class="y_prev_date">${prevLastDay - x + 1}</span>`;
  }

  // Current month
  const today = new Date();
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const isToday =
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    days += `<span class="${isToday ? 'y_active_date' : ''}">${i}</span>`;
  }

  // Next month
  const remaining =
    42 - (correctedStartIndex + lastDayOfMonth.getDate()); // Fill full grid
  for (let i = 1; i <= remaining; i++) {
    days += `<span class="y_next_date">${i}</span>`;
  }

  y_calendarDates.innerHTML = days;
}

y_prevBtn.addEventListener('click', () => {
  y_date.setMonth(y_date.getMonth() - 1);
  renderCalendar();
});

y_nextBtn.addEventListener('click', () => {
  y_date.setMonth(y_date.getMonth() + 1);
  renderCalendar();
});

renderCalendar(); // Initial render