import { makeCalendar, updateDayOfWeek, setTodayDate } from './calendar.js';
import { submitRoutesForm, setupAddRouteForm } from "./server/server.js";

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

if (user_group === "routes_manager")
    document.querySelector('#addRouteButton').addEventListener('click', () => {
        setupAddRouteForm();
    });