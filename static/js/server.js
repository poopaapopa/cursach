export async function submitRoutesForm(login) {
    const routesForm = document.getElementById("routesForm");
    routesForm.onsubmit = async function(event) {
        event.preventDefault();

        const formData = new FormData(routesForm);
        const response = await fetch(`/trolleybuspark/${login}`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            updateRoutesTable(data.routes, login);
        }
    };
}

function updateRoutesTable(routes, login) {
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
            routeCard.innerHTML = route.time_in ? `
                <td>${route.route_id}</td>
                <td>${route.time_out}</td>
                <td>${route.time_in}</td>
                <td>${route.route_name}</td>
            ` : `
                <td>${route.route_id}</td>
                <td>${route.time_out}</td>
                <td>В пути</td>
                <td>${route.route_name}</td>
            `;
            if (route.time_in) routeCard.classList.add("table-success");
            tableBody.appendChild(routeCard);
        });
        routesTable.appendChild(tableBody);
    } else {
        routesTable.innerHTML = `
            <div class="d-flex flex-column text-center">
                <h1 class="display-6">На заданную дату маршрутов не найдено</h1>
                <img src="/static/nema.webp" alt="netu" class="rounded mx-auto g-0"/>
                <a href="/trolleybuspark/${login}" class="display-6" style="text-decoration: none;">Назад</a>
            </div>
        `;
    }
}