import { makeCalendar, updateDayOfWeek, setTodayDate } from './calendar.js';
import { submitRoutesForm, setupSaveRouteForm, addRedactButtons, addDeleteButtons } from "./server/server.js";
import { createReportModal } from "./rep_creation/report_modal.js";

const dateInput = document.getElementById('dateInput');
const tooltip = document.getElementById('tooltip');
let monthNow;

dateInput.addEventListener('click', () => {
    tooltip.style.display = 'block';
    monthNow = makeCalendar(dateInput, tooltip, monthNow, 1);
});
document.addEventListener('click', (event) => {
    if (!dateInput.contains(event.target) && !tooltip.contains(event.target))
        tooltip.style.display = 'none';
});

document.getElementById("prevMonth").addEventListener("click", () => {
    monthNow--;
    makeCalendar(dateInput, tooltip, monthNow);
});
document.getElementById("nextMonth").addEventListener("click", () => {
    monthNow++;
    makeCalendar(dateInput, tooltip, monthNow);
});

dateInput.value = setTodayDate();
dateInput.addEventListener('input', () => {
    updateDayOfWeek(dateInput);
    if (updateDayOfWeek(dateInput))
        monthNow = makeCalendar(dateInput, tooltip, monthNow, 1);
});
document.querySelector('#prevDay').addEventListener('click', (event) => {
    event.preventDefault();
    if (dateInput.value === "")
        setTodayDate();
    if (updateDayOfWeek(dateInput, -1))
        monthNow = makeCalendar(dateInput, tooltip, monthNow, 1);
});
document.querySelector('#nextDay').addEventListener('click', (event) => {
    event.preventDefault();
    if (dateInput.value === "")
        setTodayDate();
    if (updateDayOfWeek(dateInput, 1))
        monthNow = makeCalendar(dateInput, tooltip, monthNow, 1);
});

dateInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('inputButton').click();
    }
});

document.querySelector('#inputButton').addEventListener('click', () => {
    submitRoutesForm(user_group);
});

if (user_group === "routes_manager") {
    addDeleteButtons();
    addRedactButtons(today_routes);

    document.querySelector('#saveRouteButton').addEventListener('click', () => {
        setupSaveRouteForm();
    });

    document.getElementById("closeModal").addEventListener('click', () => {
        const alert = document.querySelector("#alert");
        if (alert)
            alert.remove();
    });

    createReportModal(user_group);
}