import state from './store.js'

export function placeBlockInBoard(blockElement, block) {
  blockElement.style.top = `${block.y * state.BLOCK_SIZE}px`
  blockElement.style.left = `${block.x * state.BLOCK_SIZE}px`
}