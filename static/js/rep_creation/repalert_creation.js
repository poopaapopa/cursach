export function createAlert() {
    const months = [
        '', 'январю', 'февралю', 'марту', 'апрелю', 'маю', 'июню',
        'июлю', 'августу', 'сентябрю', 'октябрю', 'ноябрю', 'декабрю'
    ];
    reportTable.insertAdjacentHTML(
        'beforebegin',
        `
             <div class="row justify-content-center my-2 alert">
                Отчёт по ${months[data.month]} ${data.year} года уже существует:
             </div>
    `);
}