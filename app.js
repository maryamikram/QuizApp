function Gotohome(){
    window.location.href="home.html"
}

function Gotoquestion(){
    window.location.href="Questions.html"
}

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const resultElement = document.getElementById('result-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const result = document.getElementById('result')

let shuffledQuestions, currentQuestionIndex

var resultval = 0;

nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
});

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  resultval=0;
  questionContainerElement.classList.remove('hide')
  resultElement.classList.add('hide');
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Result'
    startButton.classList.remove('hide')
  }

  if (this.getAttribute("data-correct"))
    resultval++;
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'How do you declare a JavaScript variable?',
    answers: [
      { text: 'var carName;  ', correct: true },
      { text: 'v carName;', correct: false }
    ]
  },
  {
    question: 'What is the correct JavaScript syntax for opening a new window called "w2" ?',
    answers: [
      { text: 'w2 = window.new("http://www.w3schools.com");', correct: true },
      { text: 'w2 = window.open("http://www.w3schools.com");  ', correct: false },
    ]
  },
  {
    question: 'How do you find the number with the highest value of x and y?',
    answers: [
      { text: 'ceil(x, y)', correct: false },
      { text: 'Math.max(x, y) ', correct: true },
      { text: 'top(x, y)', correct: false },
      { text: 'Math.ceil(x, y)', correct: false }
    ]
  },
  {
    question: 'How do you find the number with the highest value of x and y?',
    answers: [
      { text: 'ceil(x, y)', correct: false },
      { text: 'Math.max(x, y) ', correct: true },
      { text: 'top(x, y)', correct: false },
      { text: 'Math.ceil(x, y)', correct: false }
    ]
  },
  {
    question: 'What is the correct way to write a JavaScript array?',
    answers: [
      { text: 'var colors = "red", "green", "blue"', correct: false },
      { text: 'var colors = (1:"red", 2:"green", 3:"blue")  ', correct: false },
      { text: 'var colors = ["red", "green", "blue"]  ', correct: true },
      { text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")  ', correct: false},
    ]
  }
]

startGame();
startButton.addEventListener('click', () => {
  questionContainerElement.classList.add('hide');
  resultElement.classList.remove('hide');
  result.innerHTML = resultval;
  if (startButton.innerText == "Try Again")
    startGame();
  startButton.innerText = 'Try Again';
});

