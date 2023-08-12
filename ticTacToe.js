
let boardSize = 3;
const Gameboard = ((size) => {
    const board = [];

    const createBoard = () => {
        for(let i = 0; i < size; i++) {
            board.push([]);
            for(let j = 0; j < size; j++)
                board[i].push("");
        }
    };

    const clearBoard = () => {
        for(let i = 0; i < size; i++)
            for(let j = 0; j < size; j++)
                board[i][j] = "";
    };

    const printBoard = () => {
        console.table(board);
    };

    const setBoxValue = (val, row, col) => {
        if(row < 0 || row >= size)
            throw new Error("Could not set box value (row out of range)");
        else if(col < 0 || col >= size)
            throw new Error("Could not set box value (column out of range)");
        else
            board[row][col] = val;
    };

    const getBoxValue = (row, col) => {
        if(row < 0 || row >= size)
            throw new Error("Could not get box value (row out of range)");
        else if(col < 0 || col >= size)
            throw new Error("Could not get box value (column out of range)");
        else
            return board[row][col];
    };

    createBoard();

    return {
        clearBoard,
        printBoard,
        setBoxValue,
        getBoxValue,
    };
})(boardSize);

const DisplayController = ((Gameboard, boardSize) => {
    const boardElement = document.getElementById("gameboard");

    const renderBoard = () => {
        let gridTemplateValue = "";

        for(let i = 0; i < boardSize; i++)
            gridTemplateValue += "1fr ";

        boardElement.style.gridTemplateRows = boardElement.style.gridTemplateColumns = gridTemplateValue;
        
        for(let i = 0; i < boardSize; i++) {
            for(let j = 0; j < boardSize; j++) {
                let boxElement = document.createElement("div");
                boxElement.classList.add("box");
                boxElement.dataset.row = i;
                boxElement.dataset.col = j;
                let boxContent = document.createElement("span");
                boxContent.textContent = "";
                boxElement.appendChild(boxContent);
                boardElement.appendChild(boxElement);
            }
        }
    };

    function setBoxContent(row, col) {
        const allBoxes = Array.from(boardElement.querySelectorAll(".box"));
        const targetBox = allBoxes.find(box => box.dataset.row === row && box.dataset.col === col);
        
        try {
            targetBox.querySelector("span").textContent = Gameboard.getBoxValue(row, col)
        }
        catch (err) {
            console.error(err);
        }
    }

    function handleClick(e) {
        if(!e.target.classList.contains("box"))
            return;

        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        try {
            if(Gameboard.getBoxValue(row, col))
                return;

            Gameboard.setBoxValue("X", row ,col);
            setBoxContent(row, col);
        }
        catch (err) {
            console.error(err);
        }
    }

    boardElement.addEventListener("click", handleClick);

    return {
        renderBoard,
    }
})(Gameboard, boardSize);

const Player = () => {

};

DisplayController.renderBoard();
