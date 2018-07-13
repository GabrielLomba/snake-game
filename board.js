import state from './store.js'
import { getScoreElementHeight } from './score.js'

const board = document.querySelector('.board');
const boardContainer = board.parentElement
const scoreHeight = getScoreElementHeight()

const normalizeHeight = function() {
  const boardStyle = window.getComputedStyle(board)
  const topBottomMargins = parseInt(boardStyle.marginTop) + parseInt(boardStyle.marginBottom)
  const availableHeight = boardContainer.offsetHeight - scoreHeight - topBottomMargins
  const normalizedBoardHeight = availableHeight - availableHeight % state.BLOCK_SIZE

  board.style.height = `${normalizedBoardHeight}px`;
}

const normalizeWidth = function() {
  const boardStyle = window.getComputedStyle(board)
  const leftRightMargins = parseInt(boardStyle.marginLeft) + parseInt(boardStyle.marginRight)
  const availableWidth = boardContainer.offsetWidth - leftRightMargins
  const normalizedBoardWidth = availableWidth - availableWidth % state.BLOCK_SIZE

  board.style.width = `${normalizedBoardWidth}px`;
}

const updateBoard = function () {
  const windowWidth = parseInt(window.innerWidth);
  const windowHeight = parseInt(window.innerHeight);

  state.BOARD_ROWS = Math.floor(windowHeight / state.BLOCK_SIZE) - 2
  state.BOARD_COLS = Math.floor(windowWidth / state.BLOCK_SIZE) - 2
  state.HAS_STARTED = false

  normalizeHeight()
  normalizeWidth()
}

updateBoard();
window.onresize = updateBoard
