import { updateUserRoutesTable } from "./user_search.js";
import { updateManagerRoutesTable } from "./routes_manager.js";
import {alertCreation} from "../alert_creation.js";

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
            const today = new Date();
            const searchDay = new Date(data.year, data.month - 1, data.day);
            const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
            if (today.getDay() == searchDay.getDay() && today.getDay() == searchDay.getDay() && today.getFullYear() == searchDay.getFullYear())
                document.getElementById("tableHeader").innerHTML = `
                    <div style="display: flex; align-items: baseline; gap: 8px;">
                        <h2 style="margin: 0;">Расписание троллейбусов на сегодня</h2>
                    </div>
                `;
            else if (tomorrow.getDay() == searchDay.getDay() && tomorrow.getDay() == searchDay.getDay() && tomorrow.getFullYear() == searchDay.getFullYear())
                document.getElementById("tableHeader").innerHTML = `
                    <div style="display: flex; align-items: baseline; gap: 8px;">
                        <h2 style="margin: 0;">Расписание троллейбусов на завтра</h2>
                    </div>
                `;
            else
                document.getElementById("tableHeader").innerHTML = `
                    <div style="display: flex; align-items: baseline; gap: 8px;">
                        <h2 style="margin: 0;">Расписание троллейбусов на</h2>
                        <h3 style="margin: 0;">${data.day}.${data.month}.${data.year}</h3>
                    </div>
                `;
            if (user_group === "user")
                updateUserRoutesTable(data.routes);
            else {
                updateManagerRoutesTable(data.routes, data.year, data.month, data.day);
                addDeleteButtons();
                addRedactButtons(data.routes);
            }
        }
    };
}

export async function setupSaveRouteForm() {
    const saveRouteForm = document.getElementById("saveRouteForm");
    saveRouteForm.onsubmit = async function(event) {
        event.preventDefault();

        const formData = new FormData(saveRouteForm);
        if (formData.get("time_out") > formData.get("time_in")) {
            const modalBody = document.querySelector("#saveRouteModal .modal-body");
            alertCreation("Время введено неверно!", modalBody);
            return;
        }

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
            if (data.status === "ok") {
                updateManagerRoutesTable(data.routes, year, month, day);
                addDeleteButtons();
                addRedactButtons(data.routes);
                saveRouteForm.reset();
                document.getElementById("sh_id").value = "";
                document.getElementById("closeAddModal").click();
            }
            else {
                const modalBody = document.querySelector("#saveRouteModal .modal-body");
                alertCreation("На это время водитель уже занят!", modalBody);
            }
        }
    };
}

export function addDeleteButtons() {
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

export function addRedactButtons(routes) {
    const redactButtons = document.querySelectorAll(".edit-btn");
    redactButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const buttonElement = event.currentTarget;
            const scheduleId = buttonElement.getAttribute("data-id");
            console.log(routes);
            console.log(scheduleId);
            const route = routes.find(route => route.sh_id == scheduleId);

            document.getElementById("saveRouteModalLabel").innerText = "Редактировать маршрут";
            document.getElementById("route_id").value = route.route_id;
            document.getElementById("time_out").value = route.time_out;
            document.getElementById("time_in").value = route.time_in;
            document.getElementById("driver_id").value = route.driver_id;
            document.getElementById("trolleybus_id").value = route.trolleybus_id;
            document.getElementById("sh_id").value = route.sh_id;

            const modal = new bootstrap.Modal(document.getElementById("saveRouteModal"));
            modal.show();
        });
    });
}