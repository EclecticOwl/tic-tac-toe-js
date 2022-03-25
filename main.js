let board = ['', '', '', 
            '', '', '', 
            '', '', '']

const player = (x) => {
    const marker = x
    return {marker}
}

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


    const display = () => {
        board.forEach( element => {
            const cell = document.createElement('span')
            cell.innerHTML = element
            cell.classList.add('cell')
            gameDiv.appendChild(cell)
        })
    }
    const clear = () => {
        const cell = document.querySelectorAll('.cell')
        cell.forEach( element => {
            element.remove()
        })
        
    }
    const input = (player) => {
        const monitor = document.querySelectorAll('.cell')
        const header = document.getElementById('header')
        const msg = document.createElement('span')
        msg.classList.add('msg')

        player.marker == 'X' && win == false ? msg.textContent = 'Player 1 Turn' : msg.textContent = 'Player 2 Turn'


        header.appendChild(msg)

        if (win == false) {
            monitor.forEach( (element, index) => {
                element.addEventListener('click', () => {
                    board[index] = player.marker
                    msg.textContent = ''
                    count++
                    gameLogic()
                })
            })   
        }
    }
    return {display, clear, input}
})()

const gameLogic = () => {
    const x = player('X')
    const o = player('O')

    const refresh = () => {
        ui.clear()
        ui.display()
    }
    
    winCheck()

    if (win == true) {
        const header = document.getElementById('header')
        const span = document.createElement('span')
        span.textContent = 'Winner!'
        header.append(span)
    }

    if (count > 9) {
        console.log('End of game')
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