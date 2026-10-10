document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("theme-toggle");
    const themeSound = new Audio("assets/theme.mp3");
    themeSound.volume = 0.3;

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    if (button) {

        button.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }

            themeSound.currentTime = 0;
            themeSound.play().catch(() => {});

        });

    }

});