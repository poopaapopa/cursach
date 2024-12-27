export function driverReportCreation(reportTable, report, months) {
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

    report.forEach(rep => {
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