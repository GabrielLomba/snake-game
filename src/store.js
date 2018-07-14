import { BLOCK_PX_SIZE } from './constants.js'

const state = {
  BLOCK_SIZE: BLOCK_PX_SIZE,
  GAME_HAS_STARTED: false,
  WAITING_USER_INPUT: true,
  SPACE_PRESSED: false,
  BOARD_ROWS: 0,
  BOARD_COLS: 0,
  INITIAL_HEAD_POSITION: { x: 1, y: 1 },
  SNAKE_BODY: [ { x: 1, y: 1 } ],
  CURRENT_DIRECTION: null,
  FOOD_POSITION: { },
  FOOD_UPDATES: []
}

export default state
