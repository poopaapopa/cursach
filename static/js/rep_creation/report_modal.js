import {setMonth, updateMonth} from "./month_function.js";
import {routeReportCreation} from "./route_rep_creation.js";
import {driverReportCreation} from "./driver_rep_creation.js"

export function createReportModal(user_group) {
    const loginPlace = document.getElementById("login");
    loginPlace.insertAdjacentHTML(
        'beforebegin',
        `
        <button type="button" class="btn btn-outline-primary my-auto" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Создать отчёт
        </button>
        `
    );
    document.querySelector("#repDateInput").value = setMonth();

    document.getElementById("staticBackdrop").addEventListener("hidden.bs.modal", function () {
        const reportTable = document.getElementById("reportTable");
        reportTable.innerHTML = "";
        document.querySelectorAll(".alert").forEach(alert => alert.remove());

        document.querySelector("#repDateInput").value = setMonth();
    });

    document.querySelector('#repLeftButton').addEventListener('click', (event) => {
        event.preventDefault();
        updateMonth(-1);
    });
    document.querySelector('#repRightButton').addEventListener('click', (event) => {
        event.preventDefault();
        updateMonth(1);
    });

    document.getElementById("createReportButton").addEventListener("click", (event) => {
        if (user_group === "routes_manager")
            routeReportCreation(event);
        else
            driverReportCreation(event);
    });
}