export function makeCalendar(dateInput, tooltip, monthNow, num = 0) {
    const monthYear = tooltip.querySelector("#monthYear");
    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ]
    let curDate;
    let inputDay, inputMonth, inputYear
    try {
        [inputDay, inputMonth, inputYear] = dateInput.value.split('.', 3);
        if (num)
            monthNow = Number(inputMonth);
        inputYear = Number(inputYear.substring(0, 4));
        inputMonth = Number(inputMonth);
        inputDay = Number(inputDay);

        curDate = new Date(inputYear, monthNow - 1, inputDay);
    }
    catch {
        curDate = new Date();
        inputYear = curDate.getFullYear();
        inputMonth = curDate.getMonth() + 1;
        monthNow = inputMonth;
        inputDay = curDate.getDay();
    }
    const year = curDate.getFullYear();
    let month = curDate.getMonth() + 1;
    const monthName = monthNames[month - 1];

    monthYear.textContent = `${monthName} ${year}`;

    const daysContainer = document.getElementById("dates");
    daysContainer.innerHTML = "";
    const firstDay = new Date(inputYear, monthNow - 1, 1).getDay();
    const daysInMonth = new Date(inputYear, monthNow, 0).getDate();

    let row = document.createElement("tr");

    for (let i = 1; i < (firstDay === 0 ? 7 : firstDay); i++) {
        const emptyCell = document.createElement("td");
        emptyCell.className = "empty-cell";
        row.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement("td");
        const dateButton = document.createElement("a");
        dateButton.textContent = day;

        if (
          day === inputDay &&
          month === inputMonth &&
          year === inputYear
        )
            dateCell.classList.add("today");
        else if ((firstDay + day - 1) % 7 === 6 || (firstDay + day - 1) % 7 === 0) {
            dateButton.classList.add("weekend");
            dateButton.classList.add("day");
        }
        else dateButton.classList.add("day");

        dateCell.appendChild(dateButton);
        dateCell.addEventListener("mouseover", () => {
            dateCell.classList.add("day-hover");
        });
        dateCell.addEventListener("mouseout", () => {
            dateCell.classList.remove("day-hover");
        });
        dateCell.addEventListener("click", () => {
            day = String(day).padStart(2, '0');
            month = String(month).padStart(2, '0');
            dateInput.value = `${day}.${month}.${year}`;
            updateDayOfWeek(dateInput);
            makeCalendar(dateInput, tooltip, monthNow, 1);
        });
        row.appendChild(dateCell);

        if ((firstDay + day - 1) % 7 === 0 || day === daysInMonth) {
          daysContainer.appendChild(row);
          row = document.createElement("tr");
        }
    }
    return monthNow;
}

export function updateDayOfWeek(dateInput, daysToAdd = 0) {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    let [day, month, year] = dateInput.value.split('.', 3);
    year = Number(year.substring(0, 4));

    if (day.length == 2 && month.length == 2 && year >= 1000) {
        let check_day = new Date(year, month - 1, 0).getDate();
        if (month > 0 && month < 13 && day > 0 && day <= check_day) {
            let date = new Date(year, month - 1, Number(day));
            if (daysToAdd) {
                date = new Date(date.getTime() + 1000 * 60 * 60 * 24 * daysToAdd);
                day = String(date.getDate()).padStart(2, '0');
                month = String(date.getMonth() + 1).padStart(2, '0');
                year = date.getFullYear();
            }
            const dayOfWeek = days[date.getDay()];

            dateInput.value = `${day}.${month}.${year}, ${dayOfWeek}`;
            return true;
        }
        else dateInput.value = "";
    }
    return false;
}

export function setTodayDate() {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const dayOfWeek = days[date.getDay()];

    return `${day}.${month}.${year}, ${dayOfWeek}`;
}