export function updateManagerRoutesTable(routes) {
    const routesTable = document.getElementById("routesTable");
    if (routes.length) {
        routesTable.innerHTML = "";

        const tableHead = document.createElement("thead");
        tableHead.innerHTML = `
            <tr>
              <th scope="col">Номер</th>
              <th scope="col">Отпр.</th>
              <th scope="col">Приб.</th>
              <th scope="col">Маршрут</th>
              <th scope="col">Номер водителя</th>
              <th scope="col">Номер троллейбуса</th>
              <th scope="col">Действия</th>
            </tr>
        `;
        routesTable.appendChild(tableHead);

        const tableBody = document.createElement("tbody");
        tableBody.id = "routesTable";
        routes.forEach(route => {
            const routeCard = document.createElement("tr");
            routeCard.innerHTML = `
                <td>${route.route_id}</td>
                <td>${route.time_out}</td>
                <td>${route.time_in}</td>
                <td>${route.route_name}</td>
                <td>${route.driver_id}</td>
                <td>${route.trolleybus_id}</td>
                <td><button class="btn btn-outline-primary btn-sm" data-id="${route.route_id}">Редактировать</button></td>
            `;
            tableBody.appendChild(routeCard);
        });
        routesTable.appendChild(tableBody);
    }
    const tableFooter = document.createElement("div");
    tableFooter.classList.add("d-flex", "align-items-center", "mt-2");
    tableFooter.innerHTML = `
        <button id="addRouteButton" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#addRouteModal">Добавить маршрут</button>
    `;
    routesTable.appendChild(tableFooter);
}