const dateInput = document.getElementById('dateInput');
const tooltip = document.getElementById('tooltip');
const daysContainer = document.getElementById("dates");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
let monthNow;

function MakeCalendar(num = 0) {
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
            updateDayOfWeek();
        });
        row.appendChild(dateCell);

        if ((firstDay + day - 1) % 7 === 0 || day === daysInMonth) {
          daysContainer.appendChild(row);
          row = document.createElement("tr");
        }
    }
}

dateInput.addEventListener('click', () => {
    tooltip.style.display = 'block';
    MakeCalendar(1);
});
document.addEventListener('click', (event) => {
    if (!dateInput.contains(event.target) && !tooltip.contains(event.target))
        tooltip.style.display = 'none';
});

prevMonth.addEventListener("click", () => {
    monthNow--;
    MakeCalendar();
});
nextMonth.addEventListener("click", () => {
    monthNow++;
    MakeCalendar();
});

function updateDayOfWeek(daysToAdd = 0) {
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
            MakeCalendar(1);
        }
        else dateInput.value = "";
    }
}

function setTodayDate() {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const dayOfWeek = days[date.getDay()];

    return `${day}.${month}.${year}, ${dayOfWeek}`;
}

dateInput.value = setTodayDate();
dateInput.addEventListener('input', () => {
    updateDayOfWeek();
});
document.querySelector('#prevDay').addEventListener('click', (event) => {
    event.preventDefault();
    if (dateInput.value === "")
        setTodayDate();
    updateDayOfWeek(-1);
});
document.querySelector('#nextDay').addEventListener('click', (event) => {
    event.preventDefault();
    if (dateInput.value === "")
        setTodayDate();
    updateDayOfWeek(1);
});

dateInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('inputButton').click();
    }
});

document.getElementById("routesForm").onsubmit = async function(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("routesForm"));
    const login = "{{ login }}";

    const response = await fetch(`/trolleybuspark/${login}`, {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        const data = await response.json();
        if (data.routes.length) {
            const routesTable = document.getElementById("routesTable");
            routesTable.innerHTML = "";

            const tableHead = document.createElement("thead");
            tableHead.innerHTML = `
                <tr>
                  <th scope="col">Номер</th>
                  <th scope="col">Отпр.</th>
                  <th scope="col">Приб.</th>
                  <th scope="col">Маршрут</th>
                </tr>
            `;
            routesTable.appendChild(tableHead);

            const tableBody = document.createElement("tbody");
            tableBody.innerHTML = "";

            data.routes.forEach(route => {
                const routeCard = document.createElement("tr");
                if (route.time_in) {
                    routeCard.classList.add("table-success");
                    routeCard.innerHTML = `
                        <td>${route.route_id}</td>
                        <td>${route.time_out}</td>
                        <td>${route.time_in}</td>
                        <td>${route.route_name}</td>
                    `;
                }
                else {
                    routeCard.innerHTML = `
                        <td>${route.route_id}</td>
                        <td>${route.time_out}</td>
                        <td>В пути</td>
                        <td>${route.route_name}</td>
                    `;
                }

                tableBody.appendChild(routeCard);
            });
            routesTable.appendChild(tableBody);
        }
        else {
            const routesTable = document.getElementById("routesTable");
            routesTable.innerHTML = `
                <div class="d-flex flex-column text-center">
                    <h1 class="display-6">На заданную дату маршрутов не найдено</h1>
                    <img src="/static/nema.webp" alt="netu" class="rounded mx-auto g-0"/>
                    <a href="/trolleybuspark/${login}" class="display-6" style="text-decoration: none;">Назад</a>
                </div>
            `;
        }
    }
};