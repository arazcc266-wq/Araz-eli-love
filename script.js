
const pages = ["welcome", "quiz", "letter", "future"];

let currentPage = 0;
let currentQuestion = 0;
let answered = false;

const questions = [
  {
    q: "Eli، دەزانیت بۆچی Araz تۆی هەڵبژارد؟",
    a: [
      "چونکە تۆ جیاوازیت ❤️",
      "چونکە تۆ جوانیت 💗",
      "چونکە تۆ هەموو دنیای منیت ♾️"
    ],
    messages: [
      "بەڵێ، تۆ جیاوازترین کەسی ژیانی Araz ـیت. ❤️",
      "جوانیی تۆ تەنها بەشێکە لە جوانیی دڵت. 💗",
      "ڕاستە Eli، تۆ هەموو دنیای Araz ـیت. ♾️"
    ]
  },
  {
    q: "Eli، ئەگەر Araz جارێکی تر ژیانی دەست پێ بکات، کێ هەڵدەبژێرێت؟",
    a: [
      "کەسێکی تر",
      "هەر جار تۆ ❤️",
      "تەنها خۆی"
    ],
    messages: [
      "نەخێر، دڵی Araz تەنها تۆ دەناسێت. ❤️",
      "هەموو جارێک، لە هەموو ژیانێکدا، تەنها تۆ. ♾️",
      "بەبێ تۆ ژیانی Araz ئەو جوانییەی نابێت. 💗"
    ]
  },
  {
    q: "Eli، پێت وایە Araz تا کەی خۆشی دەوێیت؟",
    a: [
      "تا کاتییەک",
      "تا کۆتا هەناسەی ❤️",
      "تا سبەی"
    ],
    messages: [
      "خۆشەویستیی Araz شتێکی کاتی نییە، Eli. 💗",
      "بەڵێ، تا کۆتا هەناسە و زیاتر لە وشەکان. ♾️",
      "نەخێر، ئەمە خۆشەویستییەکی هەمیشەییە. ❤️"
    ]
  }
];

const secrets = {
  1: "💗 نهێنیی یەکەم: لە هەموو ڕۆژەکاندا، ئەوەی دڵخۆشی پێ دەبەخشێت بیرکردنەوە لە تۆیە.",
  2: "💌 نهێنیی دووەم: بەڵێن دەدەم هەوڵ بدەم لە هەموو دۆخێکدا پاڵپشتت بم و پێکەوە گەشە بکەین.",
  3: "♾️ نهێنیی سێیەم: خەونی گەورەی Araz ئەوەیە داهاتوویەک دروست بکات کە تۆ تێیدا بیت."
};

function showPage(index) {
  if (index < 0 || index >= pages.length) return;

  currentPage = index;

  pages.forEach((page, i) => {
    document.getElementById(page).classList.toggle(
      "active",
      i === index
    );
  });

  const navigation = document.getElementById("navigation");

  navigation.classList.toggle("hidden", index === 0);

  document.getElementById("pageNumber").textContent =
    index + " / 3";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function startLove() {
  showPage(1);
  showQuestion();
}

function nextPage() {
  if (currentPage < 3) {
    showPage(currentPage + 1);
  }
}

function previousPage() {
  if (currentPage > 1) {
    showPage(currentPage - 1);
  }
}

function showQuestion() {
  const question = questions[currentQuestion];

  answered = false;

  document.getElementById("question").textContent = question.q;

  document.getElementById("questionCount").textContent =
    (currentQuestion + 1) + " / 3";

  document.getElementById("progressBar").style.width =
    ((currentQuestion) / questions.length * 100) + "%";

  document.getElementById("feedback").textContent = "";

  const answersContainer = document.getElementById("answers");

  answersContainer.innerHTML = "";

  question.a.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer-button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      chooseAnswer(index);
    });

    answersContainer.appendChild(button);
  });
}

function chooseAnswer(index) {
  if (answered) return;

  answered = true;

  const question = questions[currentQuestion];

  document.getElementById("feedback").textContent =
    question.messages[index];

  document.getElementById("progressBar").style.width =
    ((currentQuestion + 1) / questions.length * 100) + "%";

  const answersContainer = document.getElementById("answers");

  answersContainer.innerHTML = "";

  const nextButton = document.createElement("button");

  nextButton.textContent =
    currentQuestion === questions.length - 1
      ? "تەواوکردن ❤️"
      : "پرسیاری دواتر ←";

  nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      finishQuiz();
    }
  });

  answersContainer.appendChild(nextButton);
}

function finishQuiz() {
  document.getElementById("question").textContent =
    "ئافرین Eli ـی من! ❤️";

  document.getElementById("feedback").textContent =
    "ئێستا دەتوانیت بڕۆیتە بەشی نامەی خۆشەویستی. هەموو ئەم شتانە بۆ تۆیە. 💗";

  document.getElementById("answers").innerHTML = "";

  document.getElementById("progressBar").style.width = "100%";

  const button = document.createElement("button");

  button.textContent = "نامەکەم بخوێنەوە 💌";

  button.addEventListener("click", () => {
    showPage(2);
  });

  document.getElementById("answers").appendChild(button);
}

function openSecret(number) {
  const messageBox = document.getElementById("secretMessage");

  messageBox.textContent = secrets[number];

  messageBox.classList.remove("hidden");

  if (number === 3) {
    document.getElementById("finalQuestion").classList.remove("hidden");
  }
}

function finalYes() {
  const finalQuestion = document.getElementById("finalQuestion");

  finalQuestion.innerHTML = `
    <h3>ئەمە جوانترین وەڵامە! ❤️</h3>
    <p>
      ساڵیادی خۆشەویستیمان پیرۆز بێت Eli ـی من.
      سوپاس بۆ ئەوەی لە ژیانی Araz دایت. ♾️
    </p>
    <div class="characters">🧸 💗 🐻‍❄️</div>
    <p>هەمیشە تۆ و من... ARAZ ♡ ELI</p>
  `;
}

showPage(0);

