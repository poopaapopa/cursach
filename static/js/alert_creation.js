export function alertCreation(alert, modalBody) {
    const existingAlert = modalBody.querySelector(".alert.alert-danger");

    if (!existingAlert) {
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-danger d-flex justify-content-between align-items-center";
        alertDiv.textContent = alert;

        const closeButton = document.createElement("button");
        closeButton.className = "btn-close";
        closeButton.type = "button";
        closeButton.ariaLabel = "Close";

        closeButton.addEventListener("click", () => {
            alertDiv.remove();
        });

        alertDiv.appendChild(closeButton);
        modalBody.insertBefore(alertDiv, modalBody.firstChild);
    }
}