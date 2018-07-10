const UP = { x: 0, y: -1 }
const DOWN = { x: 0, y: 1 }
const LEFT = { x: -1, y: 0 }
const RIGHT = { x: 1, y: 0 }
const BOARD = { cols: 100, rows: 100 }
const state = () => !Snake.hasCollide || !Snake.hasHitItself ? 'alive' : 'dead'

let dir = { x: 1, y: 0 }
let head = {x: this.xPos, y: this.yPos}
let tail = [{ x: 1, y: 0 },{ x: 2, y: 0 }]
const tailEnd = tail[tail.length-1]

const currDir = () => dir

const nextDir = (D) => {let cD = currDir() 
    return ({x: cD.x + D.x, y: cD.y + D.y })}

const validMove = (move) => move !== 0 ? true : false
const isEqualPos = (a) => (b) => a.x == b.x && a.y == b.y? true : false
const hasCollide = () => x > Board.cols || y < Board.rows? true : false
const hasHitItself = (h) => (t) => t.filter( (point) => isEqualPos(h)(point))
const hasEaten = (f) => isEqualPos(head)(f)
const point = (pos) => {pos.x, pos.y}
const grow = (s) => s.tail.push(point(tailEnd()))