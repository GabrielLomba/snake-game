import state from './store.js'
import { getScoreElementHeight } from './score.js'

const board = document.querySelector('.board');
const boardContainer = board.parentElement
const scoreHeight = getScoreElementHeight()

const getNormalizedBoardHeight = function() {
  const boardStyle = window.getComputedStyle(board)
  const topBottomMargins = parseInt(boardStyle.marginTop) + parseInt(boardStyle.marginBottom)
  const availableHeight = boardContainer.offsetHeight - scoreHeight - topBottomMargins
  const normalizedBoardHeight = availableHeight - availableHeight % state.BLOCK_SIZE

  return normalizedBoardHeight
}

const getNormalizedBoardWidth = function() {
  const boardStyle = window.getComputedStyle(board)
  const leftRightMargins = parseInt(boardStyle.marginLeft) + parseInt(boardStyle.marginRight)
  const availableWidth = boardContainer.offsetWidth - leftRightMargins
  const normalizedBoardWidth = availableWidth - availableWidth % state.BLOCK_SIZE

  return normalizedBoardWidth
}

const updateBoard = function () {
  const normalizedBoardHeight = getNormalizedBoardHeight()
  const normalizedBoardWidth = getNormalizedBoardWidth()

  state.BOARD_ROWS = normalizedBoardHeight / state.BLOCK_SIZE
  state.BOARD_COLS = normalizedBoardWidth / state.BLOCK_SIZE
  state.GAME_HAS_STARTED = false

  board.style.height = `${normalizedBoardHeight}px`;
  board.style.width = `${normalizedBoardWidth}px`;
}

updateBoard();
window.onresize = updateBoard
