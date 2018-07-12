import state from './store.js'

const board = document.querySelector('.board');

const updateBoard = function () {
  const windowWidth = parseInt(window.innerWidth);
  const windowHeight = parseInt(window.innerHeight);

  state.BOARD_ROWS = Math.floor(windowHeight / state.BLOCK_SIZE) - 2
  state.BOARD_COLS = Math.floor(windowWidth / state.BLOCK_SIZE) - 2
  state.HAS_STARTED = false

  debugger
  const normalizedBoardHeight = board.offsetHeight - board.offsetHeight % state.BLOCK_SIZE
  const normalizedBoardWidth = board.offsetWidth - board.offsetWidth % state.BLOCK_SIZE

  board.style.height = `${normalizedBoardHeight}px`;
  board.style.width = `${normalizedBoardWidth}px`;
}

updateBoard();
window.onresize = updateBoard
