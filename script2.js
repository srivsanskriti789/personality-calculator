const questions = [

    {
        question: "When you have free time, what do you prefer?",
        options: [
            { text: "Going out and meeting people 🥳", type: "social" },
            { text: "Trying something adventurous 🌍", type: "explorer" },
            { text: "Creating something new 🎨", type: "creative" },
            { text: "Reading or learning something 📚", type: "thinker" }
        ]
    },

    {
        question: "How do you handle a difficult situation?",
        options: [
            { text: "Take charge and find a solution 👑", type: "leader" },
            { text: "Think carefully before acting 🧠", type: "thinker" },
            { text: "Ask friends for advice 🤝", type: "social" },
            { text: "Try a completely different approach 💡", type: "creative" }
        ]
    },

    {
        question: "Which sounds most exciting to you?",
        options: [
            { text: "Traveling to a new place ✈️", type: "explorer" },
            { text: "Leading a team 🏆", type: "leader" },
            { text: "Attending a huge party 🎉", type: "social" },
            { text: "Building a creative project 🎨", type: "creative" }
        ]
    },

    {
        question: "What do people usually appreciate about you?",
        options: [
            { text: "My confidence 💪", type: "leader" },
            { text: "My creativity 🎨", type: "creative" },
            { text: "My friendly nature ❤️", type: "social" },
            { text: "My intelligence 🧠", type: "thinker" }
        ]
    },

    {
        question: "If you suddenly got a free flight ticket, you would...",
        options: [
            { text: "Pack immediately and leave! ✈️", type: "explorer" },
            { text: "Plan everything first 📋", type: "thinker" },
            { text: "Call my friends and invite them 📞", type: "social" },
            { text: "Choose a unique hidden destination 🗺️", type: "creative" }
        ]
    },

    {
        question: "Which role do you naturally take in a group?",
        options: [
            { text: "The leader 👑", type: "leader" },
            { text: "The entertainer 🎤", type: "social" },
            { text: "The idea generator 💡", type: "creative" },
            { text: "The problem solver 🔍", type: "thinker" }
        ]
    },

    {
        question: "What motivates you the most?",
        options: [
            { text: "Success and achievement 🏆", type: "leader" },
            { text: "New experiences 🌍", type: "explorer" },
            { text: "Knowledge and growth 📚", type: "thinker" },
            { text: "Freedom and creativity 🎨", type: "creative" }
        ]
    },

    {
        question: "Choose the sentence that describes you best.",
        options: [
            { text: "I love being around people 🥳", type: "social" },
            { text: "I always want to discover something new 🌎", type: "explorer" },
            { text: "I love turning ideas into reality 💡", type: "creative" },
            { text: "I like understanding how things work 🧠", type: "thinker" }
        ]
    }

];


let currentQuestion = 0;

let scores = {

    leader: 0,

    explorer: 0,

    creative: 0,

    thinker: 0,

    social: 0

};


let selectedType = null;


/* Elements */

const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const questionNumber =
    document.getElementById("questionNumber");

const progressBar =
    document.getElementById("progressBar");

const nextBtn =
    document.getElementById("nextBtn");

const quizCard =
    document.getElementById("quizCard");

const resultCard =
    document.getElementById("resultCard");

const resultTitle =
    document.getElementById("resultTitle");

const resultDescription =
    document.getElementById("resultDescription");

const resultIcon =
    document.getElementById("resultIcon");

const scoreElement =
    document.getElementById("score");

const traitsElement =
    document.getElementById("traits");

const restartBtn =
    document.getElementById("restartBtn");


/* Personality Data */

const personalities = {

    leader: {

        title: "The Leader 👑",

        icon: "👑",

        description:
            "You are confident, ambitious and naturally take charge. People often look to you when decisions need to be made.",

        traits: [
            "Confident",
            "Ambitious",
            "Decisive",
            "Motivated"
        ]

    },


    explorer: {

        title: "The Explorer 🌍",

        icon: "🌍",

        description:
            "You love adventure, freedom and new experiences. Routine can never keep your curiosity down.",

        traits: [
            "Adventurous",
            "Curious",
            "Independent",
            "Fearless"
        ]

    },


    creative: {

        title: "The Creative 🎨",

        icon: "🎨",

        description:
            "Your imagination is your superpower. You enjoy expressing ideas and seeing the world differently.",

        traits: [
            "Creative",
            "Imaginative",
            "Original",
            "Passionate"
        ]

    },


    thinker: {

        title: "The Thinker 🧠",

        icon: "🧠",

        description:
            "You love knowledge, logic and understanding things deeply. You usually think before you act.",

        traits: [
            "Logical",
            "Analytical",
            "Curious",
            "Thoughtful"
        ]

    },


    social: {

        title: "The Social Butterfly 🦋",

        icon: "🦋",

        description:
            "You bring energy wherever you go. Connecting with people and sharing experiences makes you happy.",

        traits: [
            "Friendly",
            "Energetic",
            "Outgoing",
            "Positive"
        ]

    }

};


/* Load Question */

function loadQuestion() {

    const current = questions[currentQuestion];

    questionElement.textContent =
        current.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    optionsElement.innerHTML = "";

    selectedType = null;


    current.options.forEach((option) => {

        const button =
            document.createElement("button");

        button.classList.add("option");

        button.textContent =
            option.text;


        button.addEventListener("click", () => {

            document
                .querySelectorAll(".option")
                .forEach((item) => {

                    item.classList.remove("selected");

                });


            button.classList.add("selected");

            selectedType = option.type;

        });


        optionsElement.appendChild(button);

    });


    nextBtn.textContent =
        currentQuestion === questions.length - 1
        ? "Calculate My Personality ✨"
        : "Next →";

}


/* Next Button */

nextBtn.addEventListener("click", () => {

    if (!selectedType) {

        alert("Please select an option first! 😊");

        return;

    }


    scores[selectedType]++;


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        showResult();

    }

});


/* Show Result */

function showResult() {

    let personality =
        Object.keys(scores).reduce((a, b) =>

            scores[a] > scores[b] ? a : b

        );


    let total =
        questions.length;

    let personalityScore =
        Math.round(
            (scores[personality] / total) * 100
        );


    const result =
        personalities[personality];


    quizCard.style.display = "none";

    resultCard.style.display = "block";


    resultIcon.textContent =
        result.icon;

    resultTitle.textContent =
        result.title;

    resultDescription.textContent =
        result.description;

    scoreElement.textContent =
        personalityScore;


    traitsElement.innerHTML = "";


    result.traits.forEach((trait) => {

        const span =
            document.createElement("span");

        span.classList.add("trait");

        span.textContent =
            trait;

        traitsElement.appendChild(span);

    });

}


/* Restart */

restartBtn.addEventListener("click", () => {

    currentQuestion = 0;

    scores = {

        leader: 0,

        explorer: 0,

        creative: 0,

        thinker: 0,

        social: 0

    };


    quizCard.style.display = "block";

    resultCard.style.display = "none";


    loadQuestion();

});


/* Start */

loadQuestion();