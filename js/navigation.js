document.addEventListener("DOMContentLoaded", () => {

    const homeButton = document.getElementById("home-button");
    const backButton = document.getElementById("back-button");

    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    if (backButton) {
        backButton.addEventListener("click", () => {
            history.back();
        });
    }

});