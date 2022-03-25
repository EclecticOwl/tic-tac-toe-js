let board = ['', '', '', 
            '', '', '', 
            '', '', '']

const player = (x) => {
    const marker = x
    return {marker}
}

let count = 0;


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

        player.marker == 'X' ? msg.textContent = 'Player 1 Turn' : msg.textContent = 'Player 2 Turn'


        header.appendChild(msg)
        
        console.log('Player to play is:')
        console.log(player.marker)

        monitor.forEach( (element, index) => {
            element.addEventListener('click', () => {
                board[index] = player.marker
                msg.textContent = ''
                count++
                gameLogic()

            })
        })
        
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
    console.log('Count:', count)

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