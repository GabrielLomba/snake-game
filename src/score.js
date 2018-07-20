import { $, MAX_SCORE_ENTRIES } from './constants.js'

const scorePointsEl = $('#points')
const usernameInput = $('#username')
const highestScoresContainer = $('.score-entries')

let highestScores = []

let score = 0

const updateHighestScores = function (username) {
  let i = 0;

  while (i < MAX_SCORE_ENTRIES && highestScores[i] && highestScores[i].score >= score)++i

  if (i < MAX_SCORE_ENTRIES) {
    highestScores = highestScores.slice(0, i)
      .concat([{ username, score }])
      .concat(highestScores.slice(i, MAX_SCORE_ENTRIES - 1))
  }
}

const updateHighestScoresEl = function () {
  highestScores.forEach( (entry, idx) => {
    const scoreEntryEl = highestScoresContainer.children.item(idx)
    if (scoreEntryEl) {
      scoreEntryEl.innerText = `${entry.username} - ${entry.score}`
    } else {
      const newScoreEntryEl = document.createElement('h2')
      newScoreEntryEl.innerText = `${entry.username} - ${entry.score}`
      highestScoresContainer.appendChild(newScoreEntryEl)
    }
  })
}

const updateScoreEl = function () {
  scorePointsEl.innerText = score
}

export function incrementScore() {
  ++score
  updateScoreEl()
}

export function resetScore() {
  score = 0
  updateScoreEl()
}

export function createScoreEntry() {
  const username = usernameInput.value
  if (username) {
    updateHighestScores(username)
    updateHighestScoresEl()
  }
}

export function resetUsernameInput() {
  usernameInput.value = ''
}

export function getScoreElementHeight() {
  const scoreStyle = window.getComputedStyle(scorePointsEl.parentElement)
  return parseInt(scoreStyle.height)
}
const clickSumbit = (ev) =>{
  ev.preventDefault();
  if (ev.keyCode === 13) {
    $('#submitScoreBtn').click();
  }
}
usernameInput.addEventListener("keyup", clickSumbit)