import {alertCreation} from "../alert_creation.js";

export async function driverReportCreation(event) {
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
                const alert = document.querySelector(".alert");
                if (alert)
                    alert.remove();
                reportTable.innerHTML = "";
                const months = [
                        '', 'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
                        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
                    ];
                if (data.month) {
                    console.log(months[data.month])
                    const modalBody = document.querySelector("#staticBackdrop .modal-body");
                    const alert = `Отчёт за ${months[Number(data.month)]} ${data.year} года уже существует!`
                    alertCreation(alert, modalBody);
                }
                const tableHead = document.createElement("thead");
                tableHead.innerHTML = `
                    <tr>
                        <th scope="col">Водитель</th>
                        <th scope="col">Отработано часов</th>
                        <th scope="col">Месяц</th>
                        <th scope="col">Год</th>
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
                        <td>${months[rep.rep_month]}</td>
                        <td>${rep.rep_year}</td>`;

                    tableBody.appendChild(repCol);
                });
                reportTable.appendChild(tableBody);
            }
        }
}