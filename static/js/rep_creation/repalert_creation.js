export function createAlert(reportTable, month, year) {
    const months = [
        '', 'январю', 'февралю', 'марту', 'апрелю', 'маю', 'июню',
        'июлю', 'августу', 'сентябрю', 'октябрю', 'ноябрю', 'декабрю'
    ];
    reportTable.insertAdjacentHTML(
        'beforebegin',
        `
             <div class="row justify-content-center my-2 alert">
                Отчёт по ${months[month]} ${year} года уже существует:
             </div>
    `);
}