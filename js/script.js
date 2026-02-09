// ---------------------------
// Elements du projet
// ---------------------------
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// ---------------------------
// Elements popup quiz
// ---------------------------
const quizPopup = document.getElementById("quiz-popup");
const quizQuestion = document.getElementById("quiz-question");
const quizInput = document.getElementById("quiz-input");
const quizNext = document.getElementById("quiz-next");
const quizFeedback = document.getElementById("quiz-feedback");

// ---------------------------
// Questions du quiz
// ---------------------------
const quizQuestions = [
  { q: "Favorite sport?", answer: "football" },
  { q: "Favorite Italian sweet?", answer: "tiramisu" },
  { q: "Favorite dog?", answer: "pomeranian" }
];

let currentQuestionIndex = 0;

// ---------------------------
// Click sur l’enveloppe → ouvrir la lettre
// ---------------------------
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letter.style.display = "flex";

  setTimeout(() => {
    document.querySelector(".letter-window").classList.add("open");
  }, 50);
});

// ---------------------------
// Bouton NO qui esquive
// ---------------------------
noBtn.addEventListener("mouseover", () => {
  const min = 200;
  const max = 200;
  const distance = Math.random() * (max - min) + min;
  const angle = Math.random() * Math.PI * 2;
  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// ---------------------------
// Bouton YES → afficher popup quiz
// ---------------------------
yesBtn.addEventListener("click", () => {
  // Animation du chat et titre
  title.textContent = "Yippeeee!";
  catImg.src = "assets/dance.gif";
  document.querySelector(".letter-window").classList.add("final");
  buttons.style.display = "none";

  // Reset quiz
  currentQuestionIndex = 0;
  quizInput.value = "";
  quizFeedback.style.display = "none";

  // Afficher la première question
  quizQuestion.textContent = quizQuestions[currentQuestionIndex].q;
  quizPopup.style.display = "flex";
  quizInput.focus();
});

// ---------------------------
// Bouton Next dans le popup
// ---------------------------
quizNext.addEventListener("click", () => {
  const userAnswer = quizInput.value.trim().toLowerCase();
  const correctAnswer = quizQuestions[currentQuestionIndex].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    // Réponse correcte
    quizFeedback.style.display = "none";
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      // Passer à la question suivante
      quizInput.value = "";
      quizQuestion.textContent = quizQuestions[currentQuestionIndex].q;
      quizInput.focus();
    } else {
      // Toutes les réponses correctes → fermer popup et afficher texte final
      quizPopup.style.display = "none";
      finalText.style.display = "block";
    }
  } else {
    // Réponse incorrecte → rediriger vers une page "miss your valentine"
    window.location.href = "miss.html";  // <-- Redirection ici
  }
});

// ---------------------------
// Bonus : Appuyer sur Enter pour valider
// ---------------------------
quizInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    quizNext.click();
  }
});
