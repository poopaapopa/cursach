import {alertCreation} from "../alert_creation.js";

export async function routeReportCreation(event) {
        event.preventDefault();

        const formData = new FormData(document.getElementById("createReportForm"));
        const response = await fetch(`/route_manager/`, {
            method: "PUT",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            if (data.report.length) {
                const reportTable = document.getElementById("reportTable");
                document.querySelectorAll(".alert").forEach(alert => alert.remove());
                reportTable.innerHTML = "";
                const months = [
                        '', 'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
                        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
                    ];
                if (data.month) {
                    const modalBody = document.querySelector("#staticBackdrop .modal-body");
                    const alert = `Отчёт за ${months[data.month]} ${data.year} года уже существует!`
                    alertCreation(alert, modalBody);
                }
                const tableHead = document.createElement("thead");
                tableHead.innerHTML = `
                    <tr>
                        <th scope="col">Маршрут</th>
                        <th scope="col">Часов поездок</th>
                        <th scope="col">Кол-во выездов</th>
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
                        <td>${rep.route_name}</td>
                        <td>${rep.hour_count}</td>
                        <td>${rep.shifts_count}</td>
                        <td>${months[rep.rep_month]}</td>
                        <td>${rep.rep_year}</td>`;

                    tableBody.appendChild(repCol);
                });
                reportTable.appendChild(tableBody);
            }
        }
}