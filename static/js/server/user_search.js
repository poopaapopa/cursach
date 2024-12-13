export function updateUserRoutesTable(routes) {
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
            </tr>
        `;
        routesTable.appendChild(tableHead);

        const tableBody = document.createElement("tbody");
        routes.forEach(route => {
            const routeCard = document.createElement("tr");
            routeCard.innerHTML = `
                <td>${route.route_id}</td>
                <td>${route.time_out}</td>
                <td>${route.time_in}</td>
                <td>${route.route_name}</td>
            `;
            tableBody.appendChild(routeCard);
        });
        routesTable.appendChild(tableBody);
    } else {
        routesTable.innerHTML = `
            <div class="d-flex flex-column text-center">
                <h1 class="display-6">На заданную дату маршрутов не найдено</h1>
                <img src="/nema.webp" alt="netu" class="rounded mx-auto g-0"/>
                <a href="/trolleybuspark" class="display-6" style="text-decoration: none;">Назад</a>
            </div>
        `;
    }
}