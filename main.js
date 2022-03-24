let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

const player = (x) => {
    const marker = x
    return {marker}
}

const x = player('X')
const y = player('O')



const ui = ( () => {
    const gameDiv = document.getElementById('game-container')
    const display = () => {
        board.forEach( element => {
            const cell = document.createElement('span')
            cell.innerHTML = element
            cell.classList.add('cell')
            gameDiv.appendChild(cell)
        })
    }

    return {display}
})()


ui.display()

