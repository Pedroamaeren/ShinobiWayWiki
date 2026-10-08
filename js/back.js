document.addEventListener("DOMContentLoaded", () => {

    const backButton = document.getElementById("back-button");

    if (!backButton) return;

    const previousPage = document.referrer;

    if (
        !previousPage ||
        previousPage.endsWith("index.html") ||
        previousPage.endsWith("/")
    ) {
        backButton.style.display = "none";
    }

});