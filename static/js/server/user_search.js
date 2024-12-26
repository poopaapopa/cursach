export function updateUserRoutesTable(routes) {
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
                        <div style="width: 15%;"></div>
                    </div>
                </td>
            `;
            tableBody.appendChild(routeRow);
        });
    }
}