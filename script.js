
const gameboard = (() => {
    const board = [];
    for (var i = 1 ; i < 10 ; i++) {
        const elem = document.getElementById(`space${i}`);
        board.push(elem);
    }
    const winningCombos = [[1,2,3], [1,4,7], [1,5,9], [2,5,8], [3,6,9], [4,5,6], [7,8,9], [3,5,7]];
    return {board, winningCombos};
})();

const Player = (name, symbol) => {
    const markedSpaces = [];
    const addMarkedSpace = (index) => {
        markedSpaces.push(index);
    }
    return {name, symbol, addMarkedSpace, markedSpaces};
}

const game = () => {
    document.getElementsByTagName('button')[0].setAttribute('onclick', 'game().reset()');
    document.getElementsByTagName('button')[0].innerHTML = "Reset!";
    const playerX = Player(document.getElementById('playerx-name').value, "X");
    const playerO = Player(document.getElementById('playero-name').value, "O");
    if (playerX.name == "") {
        playerX.name = "Player X";
    }
    if (playerO.name == "") {
        playerO.name = "Player O";
    }
    const winningCombos = gameboard.winningCombos;

    const gameWinner = (markedSpaces) => {
       for (var i=0; i<winningCombos.length; i++) {
            var won = true; 
            for (var j=0; j<winningCombos[i].length; j++) {
                if (!markedSpaces.includes(winningCombos[i][j])) {
                    won = false;
                    break;
                }
            }
            if (won) {
                return true;
            }
       }
       return false;
    }

    const reset = () => {
        gameboard.board.forEach(elem => elem.innerHTML = "");
        game();
    }

    const openSpaces = gameboard.board;
    
    var turn = 0;
    var gameOver = false;
    document.getElementsByTagName('h2')[0].innerHTML = `${playerX.name}, your turn.`; 

    openSpaces.forEach(elem => elem.addEventListener('click', function markSpace() {
            if (gameOver) {
                elem.removeEventListener('click', markSpace);//figured I might as well remove
                return;
            }
            if (++turn % 2 == 1) {
                var player = playerX;
                var msg = `${playerO.name}, your turn.`;
            } else {
                var player = playerO;
                var msg = `${playerX.name}, your turn.`;
            }
            elem.innerHTML = `<h1>${player.symbol}</h1>`;
            player.addMarkedSpace(parseInt(elem.id[elem.id.length-1]));
           //check if gameover
            if (gameWinner(player.markedSpaces)) {
                msg = `${player.name} wins!`;
                gameOver = true;
            } else if (turn==9) {
                msg = "It's a draw!";
                gameOver = true;
            }
            document.getElementsByTagName('h2')[0].innerHTML = msg; 
            elem.removeEventListener('click', markSpace);
        }
    ));
    return {playerX, playerO, reset};
}

