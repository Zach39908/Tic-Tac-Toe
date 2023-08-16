
const BOARD_SIZE = 3;


const Player = (name, gamepiece) => {
    if(gamepiece.length !== 1)
        throw new Error("Invalid gamepiece. Must be a single character");

    let active = false;

    const getGamePiece = () => {
        return gamepiece;
    };

    const getName = () => {
        return name;
    }

    return {
        active,
        getGamePiece,
        getName,
    };
};


let playerOne = null;
let playerTwo = null;

try {
    playerOne = Player("Player 1", "X");
    playerTwo = Player("Player 2", "O");
}
catch(err) {
    console.error(err);
}


const Gameboard = ((size) => {
    const board = [];

    function _createBoard() {
        for(let i = 0; i < size; i++) {
            board.push([]);
            for(let j = 0; j < size; j++)
                board[i].push("");
        }
    }

    function _boardIsFull() {
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                if(!board[i][j])
                    return false;
            }
        }

        return true;
    }

    const clearBoard = () => {
        for(let i = 0; i < size; i++)
            for(let j = 0; j < size; j++)
                board[i][j] = "";
    };

    const printBoard = () => {
        console.table(board);
    };

    const setBoxValue = (player, row, col) => {
        if(row < 0 || row >= size)
            throw new Error("Could not set box value (row out of range)");
        else if(col < 0 || col >= size)
            throw new Error("Could not set box value (column out of range)");
        else
            return board[row][col] = player.getGamePiece();
    };

    const getBoxValue = (row, col) => {
        if(row < 0 || row >= size)
            throw new Error("Could not get box value (row out of range)");
        else if(col < 0 || col >= size)
            throw new Error("Could not get box value (column out of range)");
        else
            return board[row][col];
    };

    const checkWinner = (playerOne, playerTwo) => {
        let cols = [];
        let rows = [];
        let diags = [[], []];
        let plOnePieces = [];
        let plTwoPieces = [];

        for(let i = 0; i < size; i++) {
            plOnePieces.push(playerOne.getGamePiece());
            plTwoPieces.push(playerTwo.getGamePiece());
            cols.push(board.map(row => row[i]));
            diags[0].push(board[i][i]);
            diags[1].push(board[i][board.length - 1 - i]);
        }

        plOnePieces = plOnePieces.toString();
        plTwoPieces = plTwoPieces.toString();
        cols = cols.map(col => col.toString());
        rows = board.map(row => row.toString());
        diags = diags.map(diag => diag.toString());

        if(cols.includes(plOnePieces) || rows.includes(plOnePieces) || diags.includes(plOnePieces))
            return playerOne;
        if(cols.includes(plTwoPieces) || rows.includes(plTwoPieces) || diags.includes(plTwoPieces))
            return playerTwo;
        if(_boardIsFull())
            return "Tie";

        return "";
    };

    _createBoard();

    return {
        clearBoard,
        printBoard,
        setBoxValue,
        getBoxValue,
        checkWinner,
    };
})(BOARD_SIZE);


const GameController = ((Gameboard, boardSize, playerOne, playerTwo) => {
    const _boardElement = document.getElementById("gameboard");
    const _startBtn = document.getElementById("start-game");
    const _themeBtn = document.getElementById("theme");
    let gameOver = true;

    function _changeTheme(e) {
        if(e.target.textContent === "Dark Theme") {
            document.body.style.setProperty("--bg-main", "#232627");
            document.body.style.setProperty("--bg-accent", "rgba(11, 14, 38, 0.56)");
            document.body.style.setProperty("--bg-change", "rgba(0, 60, 189, 0.62)");
            document.body.style.setProperty("--text-main", "rgba(232, 230, 227, 0.88)");
            document.body.style.setProperty("--border-main", "#8c8273");
            e.target.textContent = "Light Theme";
        }
        else {
            document.body.style.setProperty("--bg-main", "rgb(216, 223, 255)");
            document.body.style.setProperty("--bg-accent", "rgba(14, 17, 48, 0.555)");
            document.body.style.setProperty("--bg-change", "rgba(25, 98, 255, 0.616))");
            document.body.style.setProperty("--text-main", "rgba(0, 0, 0, 0.884)");
            document.body.style.setProperty("--border-main", "black");
            e.target.textContent = "Dark Theme";
        }
        
    }

    function _renderBoard() {
        let gridTemplateValue = "";

        for(let i = 0; i < boardSize; i++)
            gridTemplateValue += "1fr ";

        _boardElement.style.gridTemplateRows = _boardElement.style.gridTemplateColumns = gridTemplateValue;
        
        for(let i = 0; i < boardSize; i++) {
            for(let j = 0; j < boardSize; j++) {
                let boxElement = document.createElement("div");
                boxElement.classList.add("box");
                boxElement.dataset.row = i;
                boxElement.dataset.col = j;
                let boxContent = document.createElement("div");
                boxElement.appendChild(boxContent);
                _boardElement.appendChild(boxElement);
            }
        }
    };

    function _startGame() {
        gameOver = false;
        Gameboard.clearBoard();

        for(let i = 0; i < boardSize; i++) {
            for(let j = 0; j < boardSize; j++)
                _setBoxContent("", i, j);
        }

        playerOne.active = true;
        playerTwo.active = false;
    }

    function _setBoxContent(value, row, col) {
        const allBoxes = Array.from(_boardElement.querySelectorAll(".box"));
        const targetBox = allBoxes.find(box => box.dataset.row === `${row}` && box.dataset.col === `${col}`);
        targetBox.querySelector("div").textContent = value;
    }

    function _handleClick(e) {
        if(!e.target.classList.contains("box") || gameOver)
            return;

        const activePlayer = playerOne.active ? playerOne : playerTwo;
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        try {
            if(Gameboard.getBoxValue(row, col))
                return;

            _setBoxContent(Gameboard.setBoxValue(activePlayer, row, col), row, col);
            const winner = Gameboard.checkWinner(playerOne, playerTwo);
            
            if(winner) {
                if(winner === "Tie")
                    console.log("Tie Game!");
                else
                    console.log(`${winner.getName()} is the Winner!`);

                gameOver = true;
            }

            playerOne.active = !playerOne.active;
            playerTwo.active = !playerTwo.active;
        }
        catch (err) {
            console.error(err);
        }
    }

    _renderBoard();
    _startBtn.addEventListener("click", _startGame);
    _themeBtn.addEventListener("click", _changeTheme);
    _boardElement.addEventListener("click", _handleClick);
})(Gameboard, BOARD_SIZE, playerOne, playerTwo);
