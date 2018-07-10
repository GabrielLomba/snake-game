const GAME_BLOCK_SIDE_SIZE_PX = 30
let gameMatrix

const fillInBoard = function () {

  const board = document.querySelector('.board')

  const rows = Math.floor(board.offsetHeight / GAME_BLOCK_SIDE_SIZE_PX)
  const cols = Math.floor(board.offsetWidth / GAME_BLOCK_SIDE_SIZE_PX)

  gameMatrix = []
  for (let i = 0; i < rows; ++i) {
    gameMatrix[i] = []
    for (let j = 0; j < cols; ++j) {
      gameMatrix[i][j] = '.'
    }
  }

  gameMatrix[1][1] = 'head'

  let foodY, foodX
  do {
    foodY = Math.floor(Math.random() * rows)
    foodX = Math.floor(Math.random() * cols)
  } while (foodX === 1 && foodY === 1)

  gameMatrix[foodY][foodX] = 'food'

  board.style.gridTemplateAreas = `"${gameMatrix.map(row => row.join(' ')).join('" "')}"`
}

fillInBoard();
window.onresize = fillInBoard
