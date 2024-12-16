import { updateUserRoutesTable } from "./user_search.js";
import { updateManagerRoutesTable, alertCreation } from "./routes_manager.js";

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
            else {
                updateManagerRoutesTable(data.routes, data.year, data.month, data.day);
                addDeleteButtons();
            }
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
        const response = await fetch(`/route_manager/`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            if (data.routes) {
                updateManagerRoutesTable(data.routes);
                addDeleteButtons();
                addRouteForm.reset();
                document.getElementById("closeModal").click();
            }
            else
                alertCreation()
        }
    };
}

function addDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const buttonElement = event.currentTarget;
            const scheduleId = buttonElement.getAttribute("data-id");

            if (confirm("Вы уверены, что хотите удалить этот маршрут?")) {
                const response = await fetch(`/route_manager/`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ scheduleId })
                });

                if (response.status === 404) {
                    alert("Маршрут уже удалён или не существует.");
                } else if (response.ok) {
                    buttonElement.closest("tr").remove();
                    alert("Маршрут успешно удалён.");
                }
            }
        });
    });
}