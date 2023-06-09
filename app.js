const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const board = document.querySelector('#board')
const timeEl = document.querySelector('#time')
const colors = ['#61032', '#36090d', '#736f02', '#098703', '#067275', '#040a4d', '#35014a']

let time = 0 
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains("time-btn")) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
} )

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() { 
    setInterval(timer, 1000)
    setTime(time)
    createRandomCircle()
}

function timer() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
    if (current < 10) {
        current = `0${current}`
    }
    setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomSize(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomSize(0, width - size)
    const y = getRandomSize(0, height - size)
    setColor(circle)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomSize (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    let color = getRandomColor()
    element.style.background = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
    let index = Math.floor(Math.random() * colors.length)
    return colors[index]

}