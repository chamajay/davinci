function timer() {
    downloadTimer = setInterval(function () {
        if (timeleft > 0) {
            document.getElementById("countdown").innerHTML = timeleft + "s remaining ";
        } else {
            showResults();
            finalSlide();
        }
        timeleft -= 1;
    }, 1000);
}

function buildQuiz() {
    const output = [];    // store the HTML output
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];   // store the list of answer choices
        for (letter in currentQuestion.answers) {
            answers.push(   // add HTML radio button
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }
            output.push(    // add question and its answers to the output
                `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join("")} </div>
                </div>`
            );
        //let outof = `<p>${questionNumber+1}</p>`;
        //qOutOf.innerHTML += outof;
    });
    quizContainer.innerHTML = output.join("");  // combine output list into one string of HTML and put it on the page
}

function showResults() {
    clearInterval(downloadTimer);

    const answerContainers = quizContainer.querySelectorAll(".answers"); // gather answer containers from the quiz
    let numCorrect = 0; // keep track of user's answers
    resultSheet.innerHTML = "";
    myQuestions.forEach((currentQuestion, questionNumber) => { 
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = "input[name=question" + questionNumber + "]:checked";
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        if (userAnswer == currentQuestion.correctAnswer) {
            numCorrect = numCorrect + 2;
        } else if (userAnswer == undefined) {}  // if not answered, do nothing to the points
        else {
            numCorrect = numCorrect - 1;
        }

        let questionhtml = `<p class="qInResult">${questionNumber + 1}. ${currentQuestion.question}</p>`;
        resultSheet.innerHTML += questionhtml;
        let answerhtml = `${currentQuestion.answers[userAnswer] == undefined
            ? `<p class = "ntAns">Not answered</p>`   //https://www.codegrepper.com/code-examples/javascript/if+statement+template+literal
            : `${currentQuestion.answers[userAnswer] == currentQuestion.answers[currentQuestion.correctAnswer]
                ? `<p class="youRCrct">Your answer is correct</p>`
                : `<p class="wrongColor"> Your Answer : ${currentQuestion.answers[userAnswer]}</p>`}`
        }`;
        resultSheet.innerHTML += answerhtml;
        let correcthtml = `<p class="correctColor"> Correct Answer : ${currentQuestion.answers[currentQuestion.correctAnswer]}</p><br>`;
        resultSheet.innerHTML += correcthtml;
    });
    if (numCorrect >= 12) {
        wish.innerHTML = '<span class="congrats">Congratulations !!!</span>';
    } else if (numCorrect >= 7) {
        wish.innerHTML = '<span class="gdJob">Good Job !!!</span>';
    } else if (numCorrect >= 3) {
        wish.innerHTML = '<span class="didOk">You did Okay !!!</span>';
    } else {
        wish.innerHTML = '<span class="betterLuck">Better luck next time !!!</span>';
    }

    let scoreView = `<p>You got ${numCorrect} points</p>`;
    scoreCard.innerHTML = scoreView;

    if (timeleft > 0) {
        time.innerHTML = "Finished within " + (60 - timeleft) + " seconds";
    } else {
        time.innerHTML = "You ran out of time";
    }
}

function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if (currentSlide === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "inline-block";
    }
    if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

function start(element) {
    intro.style.display = "none";
    quiz.style.display = "block";
    showSlide(currentSlide); // Show the first slide
    timer();
}

function finalSlide(element) {
    quiz.style.display = "none";
    endPage.style.display = "block";
    showResults();
}


const quizContainer = document.getElementById("quiz");
const quiz = document.getElementsByClassName("container")[0];
const intro = document.getElementsByClassName("intro")[0];
const endPage = document.getElementsByClassName("endPage")[0];
const wish = document.getElementById("wish");
const scoreCard = document.getElementById("finalScore");
const questionAnswer = document.getElementById("questionAnswer");
const submitButton = document.getElementById("submit");
const time = document.getElementById("spentTime");
const resultSheet = document.getElementsByClassName("resultSheet")[0];
  var timeleft = 60;
  var downloadTimer;
const qOutOf = document.getElementById("qOutOf");
const myQuestions = [
    {
        question: "When was Leonardo da Vinci born?",
        answers: {
            a: "15 April 1452",
            b: "30 October 1431",
            c: "19 November 1419",
            d: "2 January 1421",
        },
        correctAnswer: "a",
    },
    {
        question: "Where was Leonardo da Vinci born?",
        answers: {
            a: "Milan",
            b: "Genoa",
            c: "Venice",
            d: "Vinci",
        },
        correctAnswer: "d",
    },
    {
        question: "Under whom was Leonardo da Vinci an apprentice?",
        answers: {
            a: "Michael Angelo",
            b: "Giovanni Boccacio",
            c: "Andrea del Verrocchio",
            d: "Petrarch",
        },
        correctAnswer: "c",
    },
    {
        question:
            "Which painting of Leonardo da Vinci is also known as La Gioconda??",
        answers: {
            a: "The Adoration of the Magi",
            b: "The Last Supper",
            c: "Mona Lisa",
            d: "Benois Madonna",
        },
        correctAnswer: "c",
    },
    {
        question:
            "1482-1499 Leonardo da Vinci worked under Ludovico Sforza. Who was Ludovico Sforza?",
        answers: {
            a: "Duke of Burgundy",
            b: "Duke of Milan",
            c: "King of France",
            d: "King of Austria",
        },
        correctAnswer: "b",
    },
    {
        question: "When did Leonardo da Vinci paint The Last Supper?",
        answers: {
            a: "1452",
            b: "1466",
            c: "1477",
            d: "1495",
        },
        correctAnswer: "d",
    },
    {
        question:
            "Who appointed Leonardo da Vinci as Military Engineer General on 18 August 1502?",
        answers: {
            a: "Cesare Borgia",
            b: "Niccolo Machiavelli",
            c: "Leo X",
            d: "Julius II",
        },
        correctAnswer: "a",
    },
    {
        question:
            "Who offered the title of Premier Painter to Leonardo da Vinci?",
        answers: {
            a: "Francis I",
            b: "Charles II",
            c: "James II",
            d: "Edward III",
        },
        correctAnswer: "a",
    },
    {
        question: "When did Leonardo da Vinci die?",
        answers: {
            a: "19 July 1521",
            b: "2 May 1519",
            c: "7 September 1523",
            d: "14 December 1517",
        },
        correctAnswer: "b",
    },
    {
        question: "Where did Leonardo da Vinci die?",
        answers: {
            a: "Cloux",
            b: "Mantua",
            c: "Florence",
            d: "Naples",
        },
        correctAnswer: "a",
    },
];

buildQuiz();

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);




window.onload = function() {
    updateNavigation();
}

function updateNavigation() {
    // Set the background color of the current page link in the navigation menu
    let naviLinkEles = document.querySelectorAll('#navi li a');
    let currentURL = window.location.href.split('#')[0];
    naviLinkEles.forEach(e => {
        if (e.href == currentURL) {
            e.classList.add('current');
        } else {
            e.classList.remove('current');
        }
    });
}


// Particle js configuration
window.addEventListener("hashchange", function() {
    scrollBy(0, -55);
});

particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 }
        }
    },
    retina_detect: true
});
