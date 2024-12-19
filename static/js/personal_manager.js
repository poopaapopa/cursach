function updateMonth(monthsToAdd) {
    const dateInput = document.querySelector('#repDateInput');
    let [month, year] = dateInput.value.split('.', 2);
    year = Number(year.substring(0, 4));

    if (month.length == 2 && year >= 1000) {
        let date = new Date(year, month - 1, 1);
        date.setMonth(date.getMonth() + monthsToAdd);
        month = String(date.getMonth() + 1).padStart(2, '0');
        year = date.getFullYear();

        dateInput.value = `${month}.${year}`;
    }
}

function setMonth() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}.${year}`;
}

document.querySelector('#repDateInput').value = setMonth();
document.querySelector('#repLeftButton').addEventListener('click', (event) => {
    event.preventDefault();
    updateMonth(-1);
});
document.querySelector('#repRightButton').addEventListener('click', (event) => {
    event.preventDefault();
    updateMonth(1);
});
document.getElementById("createReportButton").addEventListener("click", async function(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("createReportForm"));
    const response = await fetch(`/personal_manager/`, {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        const data = await response.json();
        if (data.report.length) {
            const reportTable = document.getElementById("reportTable");
            document.querySelectorAll("#alert").forEach(alert => alert.remove());
            reportTable.innerHTML = "";
            if (data.month) {
                const months = [
                    '', 'январю', 'февралю', 'марту', 'апрелю', 'маю', 'июню',
                    'июлю', 'августу', 'сентябрю', 'октябрю', 'ноябрю', 'декабрю'
                ];
                reportTable.insertAdjacentHTML(
                    'beforebegin',
                    `
                    <div class="row justify-content-center my-2 alert">
                        Отчёт по ${months[data.month]} ${data.year} года уже существует:
                    </div>
                `);
            }
            const tableHead = document.createElement("thead");
            tableHead.innerHTML = `
                <tr>
                    <th scope="col">Водитель</th>
                    <th scope="col">Отработано часов</th>
                    <th scope="col">Год</th>
                    <th scope="col">Месяц</th>
                </tr>`;
            reportTable.appendChild(tableHead);

            const tableBody = document.createElement("tbody");
            tableBody.innerHTML = "";

            data.report.forEach(rep => {
                const repCol = document.createElement("tr");
                repCol.classList.add("table");
                repCol.innerHTML = `
                    <td>${rep.FIO}</td>
                    <td>${rep.hour_count}</td>
                    <td>${rep.rep_year}</td>
                    <td>${rep.rep_month}</td>`;

                tableBody.appendChild(repCol);
            });
            reportTable.appendChild(tableBody);
        }
    }
});
document.getElementById("staticBackdrop").addEventListener("hidden.bs.modal", function () {
    const reportTable = document.getElementById("reportTable");
    reportTable.innerHTML = "";

    document.querySelector("#repDateInput").value = setMonth();
});