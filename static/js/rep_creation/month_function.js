export function updateMonth(monthsToAdd) {
    const dateInput = document.querySelector('#repDateInput');
    let [month, year] = dateInput.value.split('.', 2);
    year = Number(year.substring(0, 4));

    if (month.length == 2 && year >= 1000) {
        let date = new Date(year, month - 1, 1);
        date.setMonth(date.getMonth() + monthsToAdd);
        month = String(date.getMonth() + 1).padStart(2, '0');
        year = date.getFullYear();

        dateInput.value = `${month}.${year}`;
    }
}

export function setMonth() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}.${year}`;
}