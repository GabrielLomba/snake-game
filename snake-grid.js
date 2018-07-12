/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    SSSSSSSSSNAKEEEEEEEEEEEE
    ++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/


/* ++call Draw() in the console to see the progress, "animates" each call++ 
    changedir(snake)(direction) to change direction ex. changedir(snaek)()
    UP = U
    DOWN = D
    LEFT = L
    RIGHT = R
    snake wraps if out of boundaries
*/
//TODO: updatebody(),regeneratefruit(), selectValidLoc()



//get DOM elements (snake, fruit, playarea)
const $ = function (sel) {return document.querySelector(sel);}  //jquery-like helper function
const snake = $('.snake');
const fruit = $('.fruit');
const playArea = $('.board');

const UP = { x: 0, y: -1 }
const DOWN = { x: 0, y: 1 }
const LEFT = { x: -1, y: 0 }
const RIGHT = { x: 1, y: 0 }
let  = [];

//width of the elements
const getWidth = (el) => {
    return el.clientWidth
}
const getHeight = (el) => {
    return el.clientHeight;
}
const getXPos = (el) => {
    return el.offsetTop;
}
const getYPos = (el) => {
    return el.offsetLeft;
}
let snakeW = getWidth(snake);
let snakeH = getHeight(snake);
let PlayAreaWidth = getWidth(playArea);
let PlayAreaHeight = getHeight(playArea)
let fruitW = getWidth(fruit);
let fruitH = getHeight(fruit);


// +++grid+++
const size = {  x: Math.floor(PlayAreaWidth / fruitW), 
                y: Math.floor(PlayAreaHeight / fruitH)};
    //generates empty grid, takes an object with 'x' and 'y' propeties
const generateGrid = (s) => {
    return arr = new Array(s.y).fill().map(()=>Array(s.x).fill('*'))
}
    //generate random numbers (x) and positions {x,y}
const randomNum = (l) => Math.floor(Math.random()*l)
const randomPos = (e) => (g) => {e.pos = {x: randomNum(g.length), y: 0}}//randomNum(g.y)}}

let newGrid = generateGrid(size) // size : {x,y}


//generate elements

    // takes an object's "x" and a "y" from it's property "pos" and prints the type in the grid we pass 
    // ex: generate({pos:{5,10},type: 'fruit'}) (theGrid)
const generate = (o) => (g) => {
    g[o.pos.y][o.pos.x]=o.type
}
const regenerate = (f) => (g) =>{
    let lp = f.pos}
    // generate(f)(randomPos(g))}
    // generate(f)(g)}

// define Snake 'snaek'
let snaek= {type: 'snake',
            pos:{x:0, y: 0},
            dir: {x: 1, y: 0},
            tail:[],
            size: 0
}


// define fruit 'frut'
let frut = {
    type: 'fruit',
    pos: {x:3, y: 0},
    count: 1
}
// generate an object in the specified grid
generate(snaek)(newGrid)
generate (frut)(newGrid)

// move snake
const currDir = (s) => s.dir //get current direction
const currPos = (e) => e.pos
const nextPos = (s) => {s.pos}//-----?
    //check next direction to current direction
const nextDir = (e) => (d) => currDir(e).x!==0? {x: currDir(e).x + d.x, y:0}: {x:0 , y: currDir(e).y + d.y}
const isValidMove = (move) => move.x == 0 && move.y == 0 || move.x>1 ||move.y>1 ? false : true //check valid move (snake can't go backwards)
// change direction only if it is a valid move
const changeDir = (s) => (dir) => { isValidMove(nextDir(s)(dir))? s.dir = dir :"youLost()"}
    //+changeDir working
    // apply direction to position
const move = (s) =>s.dir.x!=0 ? s.pos.x+=s.dir.x : s.pos.y += s.dir.y //working*
const wrap = (s) => (g)=>{
    s.pos = {x: (g[1].length + s.pos.x) % g[1].length,y: (g.length + s.pos.y) % g.length}
}
// wrap (snaek)(newGrid)


const matlog = (el) =>`"${el.map(row => row.join(' ')).join('" "\n')}"` /* CSS Grid template */
playArea.style.gridTemplateAreas = matlog(newGrid) //-------doesn't work

// collision / points
const isEqualPos = (a) => (b) => a.x == b.x && a.y == b.y? true : false
const grow = (s) => (f) => (g) =>{
    s.size++
    s.tail.push({dir: s.dir,pos: f.pos})
    
    // s.tail.map((p, i, arr) =>{i-1>-1 ? generate({type: 'tail',pos: arr[i-1], dir: f.dir})(g) :})
    // regenerate(f)(size)
}
const hasEaten = (s) => (f) => (g) => isEqualPos(currPos(s))(currPos(f))? grow(s)(f)(g): false;


// tail/body
const updateBody= (s) => (g) => s.tail.map((tail, i, arr)=>{
    i<1? arr[i].pos = s.pos : arr[i] = arr[i-1]
    move(tail)
    generate({type: 'tail',pos: tail.cord, dir: tail.dir})(g)
}
)


const draw = () =>{
    
    newGrid = generateGrid(size)
    
    wrap(snaek)(newGrid);
    // console.log(snaek.pos);
    generate(frut)(newGrid)
    generate(snaek)(newGrid)
    move(snaek)
    // updateBody(snaek)(newGrid)
    // hasCollide()
    
    hasEaten(snaek)(frut)(newGrid)
    console.log(snaek.pos, frut.pos, snaek.tail, snaek.size)
    console.log(matlog(newGrid));

    // console.log(currPos(snaek),currPos(frut), hasEaten?true: false)
}

// setInterval(draw, 500) <------------------- paste in console