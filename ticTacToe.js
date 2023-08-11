
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
    const renderBoard = () => {
        const boardElement = document.getElementById("gameboard");
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
                boardElement.appendChild(boxElement);
            }
        }
    };

    return {
        renderBoard,
    }
})(Gameboard, boardSize);

const Player = () => {

};
