export function routeReportCreation(reportTable, report, months) {
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

    report.forEach(rep => {
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