const questions = [
    { 
        question: "Commonly used data types do NOT use...?",
        options: ["strings", "booleans", "numbers", "alerts"],
        answer: "booleans"
    },

    {
        question: "What type of language is JavaScript?",
        options: ["Server-side scripting", "markup", "complied", "object-oriented"],
        answer: "markup"
    },

    {
        question: "Which is not a valid HTML tag?",
        options: ["div", "section", "block", "span"],
        answer: "block"
    },

    {
        question: "Which is the name of a stylesheet used in HTML?",
        options: ["CSS", "jQuery", "Java", "SQL"],
        answer: "CSS"
    },

    {
        question: "#FFF11 is considered what?",
        options: ["RGB value", "Integer", "Hex Value", "Decimal"],
        answer: "Hex Value"
    }, 

    {
        question: "What does DOM stand for in coding?",
        options: ["Days On Market", "Dissolved Organic Matter", "Document Object Model", "Document Object Modum"],
        answer: "Document Object Model"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;

function displayQuestion() {
    const questionContainer = document.querySelector("#question-container");
    const currentQuestion = questions[currentQuestionIndex];
    const questionHTML = `
        <h2>${currentQuestion.question}</h2>

        <ul>
            ${currentQuestion.options.map(option => `
                <li><button>${option}</button></li>
            `).join('')}
        </ul>
        `;

    questionContainer.innerHTML = questionHTML;

    const answerButtons = questionContainer.querySelectorAll('button');
        answerButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedAnswer = button.textContent;

        if (selectedAnswer === currentQuestion.answer) {
            score++;
        } else {
            timeLeft -= 10;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endGame();
        }
    });
    });
}

function startQuiz() {
    const startButton = document.querySelector("#start-button");
    startButton.addEventListener("click", () => {
        startTimer();
        displayQuestion();
    });
}

function startTimer() {
    const timerElement = document.querySelector("#timer");

    timerElement.textContent = `Time left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;

        timerElement.textContent = `Time left: ${timeLeft}s`;
    
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
    }

    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);

    const initials = prompt("Enter your initials:");

    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    highScores.push({ initials, score });

    localStorage.setItem("highScores", JSON.stringify(highScores));

    displayHighScores();
}

startQuiz();