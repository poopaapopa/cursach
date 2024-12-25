export function updateManagerRoutesTable(routes, year, month, day) {
    const tableBody = document.querySelector("#routesTable tbody");
    tableBody.innerHTML = "";

    if (routes.length) {
        routes.forEach(route => {
            const routeRow = document.createElement("tr");
            routeRow.innerHTML = `
                <td>
                    <div class="d-flex justify-content-between align-items-center py-3 routes-row">
                        <span style="width: 8%;">${route.route_id}</span>
                        <span style="width: 13%; color: #3E99E3; font-weight: bold;">${route.time_out}</span>
                        <span style="width: 13%; color: #3E99E3; font-weight: bold;">${route.time_in}</span>
                        <span style="width: 22%;">${route.route_name}</span>
                        <span style="width: 20%;">${route.driver_name}</span>
                        <span style="width: 10%;">${route.serie}</span>
                        <div style="width: 15%;">
                            <button class="icon-button edit-btn" data-id="${route.sh_id}" title="Редактировать">
                                <i class="bi bi-pen"></i>
                            </button>
                            <button class="icon-button delete-btn" data-id="${route.sh_id}" title="Удалить">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </td>
            `;
            tableBody.appendChild(routeRow);
        });
    }

    const addRouteRow = document.createElement("tr");
    addRouteRow.innerHTML = `
        <td class="p-3">
            <button id="addRouteButton" class="btn add-route-btn" data-bs-toggle="modal" data-bs-target="#saveRouteModal"
                title="Добавить маршрут" data-route-year="${year}" data-route-month="${month}" data-route-day="${day}">
                +
            </button>
        </td>
    `;
    tableBody.appendChild(addRouteRow);
}