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

export function alertCreation(alert) {
    const modalBody = document.querySelector("#saveRouteModal .modal-body");
    const existingAlert = modalBody.querySelector(".alert.alert-danger");

    if (!existingAlert) {
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger d-flex justify-content-between align-items-center";
        alertDiv.textContent = alert;

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