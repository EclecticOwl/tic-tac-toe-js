// Array for holding player markers
let board = ['', '', '', 
            '', '', '', 
            '', '', '']

// Player function Factory
const player = (x) => {
    const marker = x
    return {marker}
}

//Flags for keeping track of win conditions
let count = 0;
let win = false

const winCheck = () => {
    if (win == false) {
        //Checking for wins horizontally
        if (board[0] == board[1] && board[0] == board[2] && board[0] != '') win = true
        if (board[3] == board[4] && board[3] == board[5] && board[3] != '') win = true
        if (board[6] == board[7] && board[6] == board[8] && board[6] != '') win = true
        //Checking for wins vertically
        if (board[0] == board[3] && board[0] == board[6] && board[0] != '') win = true
        if (board[1] == board[4] && board[1] == board[7] && board[1] != '') win = true
        if (board[2] == board[5] && board[2] == board[8] && board[2] != '') win = true
        //Checking for wins diagonally
        if (board[0] == board[4] && board[0] == board[8] && board[0] != '') win = true
        if (board[2] == board[4] && board[2] == board[6] && board[2] != '') win = true
    }
}

const ui = ( () => {
    const gameDiv = document.getElementById('game-container')
    //Displays array to UI
    const display = () => {
        board.forEach( element => {
            const cell = document.createElement('span')
            cell.innerHTML = element
            cell.classList.add('cell')
            gameDiv.appendChild(cell)
        })
    }
    // Clears node list from UI, to prevent duplication of node list
    const clear = () => {
        const cell = document.querySelectorAll('.cell')
        cell.forEach( element => {
            element.remove()
        })
        
    }
    //Allows interactivty between the array and the UI
    const input = (player) => {
        const monitor = document.querySelectorAll('.cell')
        const header = document.getElementById('header')
        const msg = document.createElement('p')
        msg.classList.add('msg')

        player.marker == 'X' && win == false ? msg.textContent = 'Player 1 Turn' : msg.textContent = 'Player 2 Turn'

        console.log(count)
        if (count == 9) {
            msg.textContent = 'Draw'
            header.append(msg)
            return
        }

        header.appendChild(msg)

        if (win == false) {
            monitor.forEach( (element, index) => {
                element.addEventListener('click', (e) => {
                    if (e.target.textContent == 'X' || e.target.textContent == 'O') {
                        msg.textContent = 'Invalid Selection! Please Try Again!'
                    }else {
                        board[index] = player.marker
                        header.removeChild(msg)
                        count++
                        gameLogic()
                    }
                })
            })   
        }
    }
    return {display, clear, input}
})()

// Controls the game flow
const gameLogic = () => {
    const x = player('X')
    const o = player('O')

    const refresh = () => {
        ui.clear()
        ui.display()
    }

    winCheck()

    const header = document.getElementById('header')
    const message = document.createElement('p')

    if (win == true) {
        refresh()
        message.textContent = 'Winner!'
        header.append(message)
    }else if (count == 0) {
        ui.display()
        ui.input(x)
    }else if (count % 2 != 0) {
        refresh()
        ui.input(o)
    }else if (count % 2 == 0) {
        refresh()
        ui.input(x)
    }
}
gameLogic()