import { TILES_CONFIG } from '../config/tiles.js';
import { MISSIONS_CONFIG } from '../config/missions.js';
import { BoardManager } from './board.js';
import { HistoryManager } from '../utils/history.js';
import { PreviewManager } from '../utils/preview.js';
import { PasswordMission } from '../missions/mission3/password.js';
import { SocialMission } from '../missions/mission9/social.js';
import { FinishMission } from '../missions/finish/finish.js';

class CyberDefenseTycoon {
    constructor() {
        this.board = [];
        this.players = [{
            id: 1,
            name: 'Player 1',
            position: 0,
            money: 10000,
            color: '#ff0000'
        }];
        this.currentPlayer = 0;
        this.currentPosition = 0;
        this.isMissionActive = false;

        // Initialize managers
        this.historyManager = new HistoryManager();
        this.previewManager = new PreviewManager();
        this.boardManager = new BoardManager(this);

        // Initialize missions berdasarkan konfigurasi
        this.missions = {};
        Object.entries(MISSIONS_CONFIG).forEach(([position, config]) => {
            switch(config.type) {
                case 'password':
                    this.missions[position] = new PasswordMission(this);
                    break;
                case 'social':
                    this.missions[position] = new SocialMission(this);
                    break;
                case 'finish':
                    this.missions[position] = new FinishMission(this);
                    break;
            }
        });

        this.initializeBoard();
        this.initializeEventListeners();
    }

    initializeBoard() {
        const positions = this.calculateTilePositions();
        this.boardManager.initializeBoard(TILES_CONFIG, positions);
        
        // Setup hover previews untuk semua misi
        Object.entries(this.missions).forEach(([position, mission]) => {
            if (mission.setupHoverPreview) {
                mission.setupHoverPreview();
            }
        });
    }

    calculateTilePositions() {
        const positions = [];
        const size = 10;
        
        // Bottom row (0-9)
        for (let i = size; i >= 1; i--) {
            positions.push({ col: i, row: size });
        }
        
        // Left column (10-17)
        for (let i = size-1; i > 1; i--) {
            positions.push({ col: 1, row: i });
        }
        
        // Top row (18-27)
        for (let i = 1; i <= size; i++) {
            positions.push({ col: i, row: 1 });
        }
        
        // Right column (28-35)
        for (let i = 2; i < size; i++) {
            positions.push({ col: size, row: i });
        }
        
        return positions;
    }

    initializeEventListeners() {
        document.getElementById('roll-dice').addEventListener('click', () => this.rollDice());
        document.getElementById('buy-asset').addEventListener('click', () => this.buyAsset());
        document.getElementById('end-turn').addEventListener('click', () => this.endTurn());
    }

    rollDice() {
        if (this.isMissionActive) {
            alert('Selesaikan misi terlebih dahulu!');
            return;
        }

        const dice = Math.floor(Math.random() * 3) + 1;
        const player = this.players[this.currentPlayer];
        let newPosition = player.position + dice;

        if (newPosition >= 35) {
            newPosition = 35;
            this.historyManager.addEntry(player, `Melempar dadu: ${dice} - Bergerak ke FINISH`);
        } else {
            this.historyManager.addEntry(player, `Melempar dadu: ${dice} - Bergerak ke kotak ${newPosition + 1}`);
        }
        
        this.movePlayer(player, newPosition);
        document.getElementById('dice-result').textContent = `Dadu: ${dice}`;
    }

    movePlayer(player, newPosition) {
        const oldTile = document.querySelector(`.tile[data-position="${player.position}"] .player-token`);
        if (oldTile) oldTile.remove();

        player.position = newPosition;

        const newTile = document.querySelector(`.tile[data-position="${newPosition}"]`);
        const playerToken = document.createElement('div');
        playerToken.className = 'player-token';
        playerToken.style.backgroundColor = player.color;
        newTile.appendChild(playerToken);

        // Check missions berdasarkan konfigurasi
        const missionConfig = MISSIONS_CONFIG[newPosition + 1]; // +1 karena posisi di config mulai dari 1
        if (missionConfig) {
            this.isMissionActive = true;
            const mission = this.missions[newPosition + 1];
            if (mission) {
                if (mission instanceof FinishMission) {
                    mission.showFinish();
                } else {
                    mission.showMission();
                }
                this.toggleGameButtons(false);
                this.historyManager.addEntry(player, `Memulai misi ${missionConfig.name}`);
            }
        }
    }

    buyAsset() {
        this.historyManager.addEntry(this.players[this.currentPlayer], 'Mencoba membeli aset');
    }

    endTurn() {
        this.historyManager.addEntry(this.players[this.currentPlayer], 'Mengakhiri giliran');
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
    }

    toggleGameButtons(enabled) {
        document.getElementById('roll-dice').disabled = !enabled;
        document.getElementById('buy-asset').disabled = !enabled;
        document.getElementById('end-turn').disabled = !enabled;
    }

    completeMission() {
        this.isMissionActive = false;
        this.toggleGameButtons(true);
        const player = this.players[this.currentPlayer];
        const currentPosition = player.position + 1; // +1 karena posisi di config mulai dari 1
        const missionConfig = MISSIONS_CONFIG[currentPosition];
        
        if (missionConfig && missionConfig.reward) {
            player.money += missionConfig.reward;
            this.historyManager.addEntry(player, 
                `Menyelesaikan misi ${missionConfig.name} dan mendapat ${missionConfig.reward} BTC`
            );
        } else {
            this.historyManager.addEntry(player, 'Menyelesaikan misi');
        }
    }
}

// Initialize game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    new CyberDefenseTycoon();
});

export default CyberDefenseTycoon; 

