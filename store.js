import { RIGHT, BLOCK_PX_SIZE } from './constants.js'

const state = {
  BLOCK_SIZE: BLOCK_PX_SIZE,
  GAME_HAS_STARTED: false,
  BOARD_ROWS: 0,
  BOARD_COLS: 0,
  INITIAL_HEAD_POSITION: { x: 1, y: 1 },
  SNAKE_BODY: [ { x: 1, y: 1 } ],
  CURRENT_DIRECTION: RIGHT,
  FOOD_POSITION: { },
  FOOD_UPDATES: []
}

export default state
