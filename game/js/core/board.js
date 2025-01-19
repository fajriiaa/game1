export class BoardManager {
    constructor(game) {
        this.game = game;
    }

    initializeBoard(tiles, positions) {
        const boardElement = document.querySelector('.board');
        boardElement.innerHTML = '';

        // Create center board
        const centerBoard = document.createElement('div');
        centerBoard.className = 'center-board';
        centerBoard.innerHTML = '<h1>SOCISAFE<br>Social Media Security Game</h1>';
        boardElement.appendChild(centerBoard);

        tiles.forEach((tile, index) => {
            this.createTile(tile, index, positions[index], boardElement);
        });
    }

    createTile(tile, index, position, boardElement) {
        const tileElement = document.createElement('div');
        tileElement.className = `tile ${tile.type}`;
        tileElement.setAttribute('data-name', tile.name);
        tileElement.setAttribute('data-position', index);
        tileElement.innerHTML = `
            <div class="tile-number">${index + 1}</div>
            <div class="tile-name">${tile.name}</div>
            ${tile.price ? `<div class="tile-price">${tile.price} BTC</div>` : ''}
        `;
        
        tileElement.style.gridColumn = position.col;
        tileElement.style.gridRow = position.row;
        
        boardElement.appendChild(tileElement);
    }
} 