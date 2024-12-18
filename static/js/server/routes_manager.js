export function updateManagerRoutesTable(routes, year, month, day) {
    const routesTable = document.getElementById("routesTable");
    routesTable.innerHTML = "";
    if (routes.length) {
        const tableHead = document.createElement("thead");
        tableHead.innerHTML = `
            <tr>
              <th scope="col">Номер Маршрута</th>
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
                <td>
                    <button class="icon-button edit-btn" data-id="${route.sh_id}" title="Редактировать">
                        <i class="bi bi-pen"></i>
                    </button>
                    <button class="icon-button delete-btn" data-id="${route.sh_id}" title="Удалить">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(routeCard);
        });
        routesTable.appendChild(tableBody);
    }
    const addRouteButton = document.getElementById("addRouteButton");
    addRouteButton.setAttribute('data-route-year', year);
    addRouteButton.setAttribute('data-route-month', month);
    addRouteButton.setAttribute('data-route-day', day);
}

export function alertCreation() {
    const modalBody = document.querySelector("#saveRouteModal .modal-body");
    const existingAlert = modalBody.querySelector(".alert.alert-danger");

    if (!existingAlert) {
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger d-flex justify-content-between align-items-center";
        alertDiv.textContent = "На это время водитель уже занят!";

        const closeButton = document.createElement("button");
        closeButton.className = "btn-close";
        closeButton.type = "button";
        closeButton.ariaLabel = "Close";

        closeButton.addEventListener("click", () => {
            alertDiv.remove();
        });

        alertDiv.appendChild(closeButton);
        modalBody.insertBefore(alertDiv, modalBody.firstChild);
    }
}