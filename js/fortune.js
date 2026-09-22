const descriptionButton = document.getElementById("description-button");
const videoButton = document.getElementById("video-button");

const descriptionSection = document.getElementById("fortune-description");
const videoSection = document.getElementById("fortune-video");

descriptionButton.addEventListener("click", function () {
descriptionSection.classList.add("active");
videoSection.classList.remove("active");

descriptionButton.classList.add("active");
videoButton.classList.remove("active");


});

videoButton.addEventListener("click", function () {
videoSection.classList.add("active");
descriptionSection.classList.remove("active");


videoButton.classList.add("active");
descriptionButton.classList.remove("active");


});

descriptionSection.classList.add("active");
