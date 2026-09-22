const descriptionButton = document.getElementById("description-button");
const locationButton = document.getElementById("location-button");

const descriptionSection = document.getElementById("guest-description");
const locationSection = document.getElementById("guest-location");

descriptionButton.addEventListener("click", function () {
    descriptionSection.classList.add("active");
    locationSection.classList.remove("active");

    descriptionButton.classList.add("active");
    locationButton.classList.remove("active");
});

locationButton.addEventListener("click", function () {
    locationSection.classList.add("active");
    descriptionSection.classList.remove("active");

    locationButton.classList.add("active");
    descriptionButton.classList.remove("active");
});

const guestText = document.getElementById("guest-text");
const guestOptions = document.getElementById("guest-options");
const guestSpeaker = document.querySelector(".guest-speaker");

function updateGuestTextColor() {
    if (document.body.classList.contains("dark")) {
        guestText.style.setProperty("color", "white", "important");
        guestSpeaker.style.setProperty("color", "white", "important");
    } else {
        guestText.style.setProperty("color", "#222", "important");
        guestSpeaker.style.setProperty("color", "#222", "important");
    }
}

const dialogues = {
    start: {
        text: "... ?",
        options: [
            { text: "Who are you?", next: "whoAreYou" },
            { text: "Are you okay?", next: "areYouOkay" },
            { text: "Remain silent", next: "remainSilent" }
        ]
    },

    whoAreYou: {
        text: "I... I'm not sure anymore. I used to be many. A face in the crowd, a first experience. Now... I'm just a memory.",
        options: [
            { text: "A memory of what?", next: "memoryOfWhat" },
            { text: "What happened?", next: "whatHappened" },
            { text: "Nevermind", next: "start", spaced: true }
        ]
    },

    memoryOfWhat: {
        text: "Of a simpler time. When you didn't need a name to explore. Just the will to play. We were the 'guests'... the Guests.",
        options: [
            { text: "That's sad", next: "thatsSad" },
            { text: "So you're like a ghost?", next: "likeAGhost" },
            { text: "Nevermind", next: "start", spaced: true }
        ]
    },

    thatsSad: {
        text: "Sadness is the price of memory, I suppose. I'm glad someone still remembers.",
        clickable: true,
        next: "thankYou"
    },

    likeAGhost: {
        text: "An echo, perhaps. Of laughter and explorations from players who have long since found their own voices. And I... I lost mine.",
        clickable: true,
        next: "thankYou"
    },

    thankYou: {
        text: "Thank you for talking with me. It was nice... to be seen again.",
        clickable: true,
        next: "start"
    },

    whatHappened: {
        text: "The world changed. It became more... complex. There was a need for names, for identities. We, the anonymous, no longer had a place. We just... faded away.",
        options: [
            { text: "That's sad", next: "thatsSad" },
            { text: "So you're like a ghost?", next: "likeAGhost" },
            { text: "Nevermind", next: "start", spaced: true }
        ]
    },

    areYouOkay: {
        text: "...I exist. That's the most I can say. Time passes differently for me now. The days are long, and the memories are short.",
        options: [
            { text: "What do you mean?", next: "whatDoYouMean" },
            { text: "Can I help in any way?", next: "canIHelp" },
            { text: "Nevermind", next: "start", spaced: true }
        ]
    },

    whatDoYouMean: {
        text: "I see new players, with their unique avatars, their names... their stories. And I remember when I was the start of so many stories. Now, I'm just a forgotten chapter.",
        clickable: true,
        next: "continueJourney"
    },

    canIHelp: {
        text: "Your presence here is already a comfort. To know I haven't been completely forgotten. Thank you. Just... don't forget the days that have passed.",
        clickable: true,
        next: "continueJourney"
    },

    continueJourney: {
        text: "Continue your journey. Create your own story. And, from time to time, remember those who came before.",
        clickable: true,
        next: "start"
    },

    remainSilent: {
        text: "...You see me, don't you? Even without a name, without an identity. You remember.",
        options: [
            { text: "I remember the Guests.", next: "rememberGuests" },
            { text: "(Stay silent)", next: "staySilent" },
            { text: "Nevermind", next: "start", spaced: true }
        ]
    },

    rememberGuests: {
        text: "I'm... glad. It means a part of us still lives on. In the hearts and minds of those who took their first steps in this universe as one of us.",
        clickable: true,
        next: "goodbye"
    },

    staySilent: {
        text: "...Silence is also an answer. Perhaps you understand. The loneliness of being a relic in a world that never stops moving forward.",
        clickable: true,
        next: "goodbye"
    },

    goodbye: {
        text: "Goodbye, (Username). Have a journey I never could.",
        clickable: true,
        next: "start"
    }
};

let typingTimer = null;
let currentDialogue = 0;

function typeText(text) {
    clearInterval(typingTimer);

    guestText.textContent = "";

    updateGuestTextColor();

    let index = 0;

    typingTimer = setInterval(function () {
        guestText.textContent += text[index];
        index++;

        if (index >= text.length) {
            clearInterval(typingTimer);
        }
    }, 25);
}

function hideOptions(callback) {
    const buttons = Array.from(guestOptions.children);

    if (buttons.length === 0) {
        callback();
        return;
    }

    buttons.forEach(function (button, index) {
        button.classList.remove("guest-option-enter");
        button.classList.remove("guest-option-visible");
        button.classList.add("guest-option-exit");

        button.style.transitionDelay = `${index * 60}ms`;
    });

    setTimeout(function () {
        guestOptions.innerHTML = "";
        callback();
    }, 350 + buttons.length * 60);
}

function showOptions(options) {
    guestOptions.innerHTML = "";

    options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.className = "guest-option guest-option-enter";

        if (option.spaced) {
            button.classList.add("spaced-option");
        }

        button.textContent = option.text;

        button.style.transitionDelay = `${index * 80}ms`;

        button.addEventListener("click", function () {
            renderDialogue(option.next);
        });

        guestOptions.appendChild(button);

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                button.classList.add("guest-option-visible");
            });
        });
    });
}

function renderDialogue(dialogueId) {
    const dialogue = dialogues[dialogueId];

    currentDialogue++;

    const thisDialogue = currentDialogue;

    clearInterval(typingTimer);

    hideOptions(function () {

        if (thisDialogue !== currentDialogue) {
            return;
        }

        guestText.classList.remove("clickable-text");
        guestText.onclick = null;

        updateGuestTextColor();

        typeText(dialogue.text);

        if (dialogue.clickable) {
            guestText.classList.add("clickable-text");

            guestText.onclick = function () {
                guestText.onclick = null;
                renderDialogue(dialogue.next);
            };

        } else if (dialogue.options) {
            showOptions(dialogue.options);
        }
    });
}

const themeObserver = new MutationObserver(function () {
    updateGuestTextColor();
});

themeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
});

updateGuestTextColor();

renderDialogue("start");