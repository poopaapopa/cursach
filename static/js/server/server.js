import { updateUserRoutesTable } from "./user_search.js";
import { updateManagerRoutesTable } from "./routes_manager.js";

export async function submitRoutesForm(user_group) {
    const routesForm = document.getElementById("routesForm");
    routesForm.onsubmit = async function(event) {
        event.preventDefault();

        const formData = new FormData(routesForm);
        const response = await fetch(`/trolleybuspark/`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            if (user_group === "user")
                updateUserRoutesTable(data.routes);
            else
                updateManagerRoutesTable(data.routes);
        }
    };
}

export async function setupAddRouteForm(date) {
    const addRouteForm = document.getElementById("addRouteForm");
    addRouteForm.onsubmit = async function(event) {
        event.preventDefault();

        const formData = new FormData(addRouteForm);
        formData.append("date", date);
        const response = await fetch(`/add_route/`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            updateManagerRoutesTable(data.routes);
        }
    };
}