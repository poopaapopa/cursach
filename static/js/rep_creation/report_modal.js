import {setMonth, updateMonth} from "./month_function.js";
import {routeReportCreation} from "./route_rep_creation.js";
import {driverReportCreation} from "./driver_rep_creation.js"
import {alertCreation} from "../alert_creation.js";

export function createReportModal(user_group) {
    const loginPlace = document.getElementById("login");
    loginPlace.insertAdjacentHTML(
        'beforebegin',
        `
        <button type="button" class="btn btn-primary my-auto" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Создать отчёт
        </button>
        `
    );
    document.querySelector("#repDateInput").value = setMonth();

    document.querySelectorAll(".close-modal").forEach(close => {
        close.addEventListener('click', () => {
        const alert = document.querySelector(".alert");
        const saveRouteForm = document.getElementById("saveRouteForm");
        if (saveRouteForm)
            saveRouteForm.reset();
        if (alert)
            alert.remove();
    })});

    document.getElementById("staticBackdrop").addEventListener("hidden.bs.modal", function () {
        const reportTable = document.getElementById("reportTable");
        reportTable.innerHTML = "";

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
        reportCreation(event, user_group);
    });
}

async function reportCreation(event, user_group) {
        event.preventDefault();

        const modalBody = document.querySelector("#staticBackdrop .modal-body");
        if (!updateMonth()) {
            const alert = "Данные введены неверно!";
            alertCreation(alert, modalBody);
            return;
        }
        const formData = new FormData(document.getElementById("createReportForm"));
        const response = await fetch(`/report_creation/`, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            if (data.report.length) {
                const reportTable = document.getElementById("reportTable");
                const alert = document.querySelector(".alert");
                if (alert)
                    alert.remove();
                reportTable.innerHTML = "";
                const months = [
                        '', 'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
                        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
                    ];
                if (data.month) {
                    const alert = `Отчёт за ${months[data.month]} ${data.year} года уже существует!`
                    alertCreation(alert, modalBody);
                }
                if (user_group === "routes_manager")
                    routeReportCreation(reportTable, data.report, months);
                else
                    driverReportCreation(reportTable, data.report, months);
            }
        }
}