const scoreEl = document.querySelector('#score')

let score = 0

const updateEl = function () {
  scoreEl.textContent = `Score: ${score}`
}

const increment = function () {
  ++score
  updateEl()
}

const reset = function () {
  score = 0
  updateEl()
}

export default {
  increment,
  reset
}