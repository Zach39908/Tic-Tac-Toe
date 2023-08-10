
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

    const setBox = (val, row, col) => {
        if(row < 0 || row >= size)
            alert("ERROR: Cannot set box value (row out of range)");
        else if(col < 0 || col >= size)
            alert("ERROR: Cannot set box value (column out of range)");
        else
            board[row][col] = val;
    };

    createBoard();

    return {
        clearBoard,
        printBoard,
        setBox,
    };
})(boardSize);

const DisplayController = ((document, Gameboard) => {
    
})(document, Gameboard);

const Player = () => {

};

