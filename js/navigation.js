document.addEventListener("DOMContentLoaded", () => {
    const homeButton = document.getElementById("home-button");
    const backButton = document.getElementById("back-button");

    function playClickSound() {
        const sound = new Audio("/assets/theme.mp3");
        sound.volume = 0.3;
        sound.play().catch(() => {});
    }

    if (homeButton) {
        homeButton.addEventListener("click", (event) => {
            event.preventDefault();
            playClickSound();

            setTimeout(() => {
                window.location.href = "/index.html";
            }, 150);
        });
    }

    if (backButton) {
        backButton.addEventListener("click", (event) => {
            event.preventDefault();
            playClickSound();

            setTimeout(() => {
                if (history.length > 1 && document.referrer) {
                    history.back();
                } else {
                    window.location.href = "/index.html";
                }
            }, 150);
        });
    }
});