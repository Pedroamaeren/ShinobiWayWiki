document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("theme-toggle");

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

        });

    }

});