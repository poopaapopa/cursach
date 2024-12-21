export function updateManagerRoutesTable(routes, year, month, day) {
    const tableBody = document.querySelector("#routesTable tbody");
    tableBody.innerHTML = "";

    if (routes.length) {
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
    }
    const addRouteButton = document.getElementById("addRouteButton");
    addRouteButton.setAttribute('data-route-year', year);
    addRouteButton.setAttribute('data-route-month', month);
    addRouteButton.setAttribute('data-route-day', day);
}