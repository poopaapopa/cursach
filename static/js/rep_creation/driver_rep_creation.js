import {createAlert} from "./repalert_creation.js";

export async function driverReportCreation() {
    const createReportForm = document.getElementById("createReportForm");
    createReportForm.onsubmit = async function(event) {
        event.preventDefault();

        const formData = new FormData(createReportForm);
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
                    createAlert(reportTable, data.month, data.year);
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
                        <td>${rep.rep_month}</td>
                        <td>${rep.rep_year}</td>`;

                    tableBody.appendChild(repCol);
                });
                reportTable.appendChild(tableBody);
            }
        }
    };
}