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
                updateManagerRoutesTable(data.routes, data.year, data.month, data.day);
        }
    };
}

export async function setupAddRouteForm() {
    const addRouteForm = document.getElementById("addRouteForm");
    addRouteForm.onsubmit = async function(event) {
        event.preventDefault();

        const formData = new FormData(addRouteForm);
        const year = document.querySelector("#addRouteButton").getAttribute("data-route-year");
        formData.append("year", year);
        const month = document.querySelector("#addRouteButton").getAttribute("data-route-month");
        formData.append("month", month);
        const day = document.querySelector("#addRouteButton").getAttribute("data-route-day");
        formData.append("day", day);
        const response = await fetch(`/add_route/`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            if (data.routes) {
                updateManagerRoutesTable(data.routes);
                addRouteForm.reset();
                document.getElementById("closeModal").click();
            }
            else {
                const alertDiv = document.createElement("div");
                alertDiv.className = "alert alert-danger";
                alertDiv.textContent = "На это время водитель уже занят!";

                const modalBody = document.querySelector("#addRouteModal .modal-body");
                modalBody.insertBefore(alertDiv, modalBody.firstChild);

                setTimeout(() => alertDiv.remove(), 3000);
            }
        }
    };
}