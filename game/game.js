class CyberDefenseTycoon {
    constructor() {
        this.board = [];
        this.players = [{
            id: 1,
            name: 'Player 1',
            position: 0, // Posisi start
            money: 10000,
            color: '#ff0000'
        }];
        this.currentPlayer = 0;
        this.currentPosition = 0;
        this.isMissionActive = false; // Tambahkan status misi
        this.gameHistory = [];
        this.passwordMission = new PasswordMission(this); // Inisialisasi di constructor
        this.sembilanMission = new SembilanMission(this); // Tambahkan ini
        this.initializeBoard();
        this.initializeEventListeners();
    }

    initializeBoard() {
        const tiles = [
            { name: 'START', type: 'special' },
            { name: 'Basic Firewall', type: 'firewall', price: 600 },
            { name: 'Cyber Event', type: 'event' },
            { name: 'Encryption Suite', type: 'encryption', price: 800 },
            { name: 'Antivirus Pro', type: 'antivirus', price: 1000 },
            { name: 'Data Center EU', type: 'datacenter', price: 2000 },
            { name: 'Security Tax', type: 'tax' },
            { name: 'Network Shield', type: 'firewall', price: 1200 },
            { name: 'Cyber Event', type: 'event' },
            { name: 'Jail', type: 'special' },
            { name: 'VPN Service', type: 'encryption', price: 1400 },
            { name: 'Cyber Event', type: 'event' },
            { name: 'Cloud Security', type: 'antivirus', price: 1600 },
            { name: 'Data Center AS', type: 'datacenter', price: 2500 },
            { name: 'Malware Scanner', type: 'antivirus', price: 1800 },
            { name: 'Cyber Event', type: 'event' },
            { name: 'Advanced IDS', type: 'firewall', price: 2000 },
            { name: 'Free Parking', type: 'special' },
            { name: 'Zero Trust', type: 'encryption', price: 2200 },
            { name: 'Cyber Event', type: 'event' },
            { name: 'DDoS Protection', type: 'firewall', price: 2400 },
            { name: 'Data Center AP', type: 'datacenter', price: 3000 },
            { name: 'Blockchain Sec', type: 'encryption', price: 2600 },
            { name: 'Cyber Event', type: 'event' },
            { name: 'AI Security', type: 'antivirus', price: 2800 },
            { name: 'Go to Jail', type: 'special' },
            { name: 'Quantum Crypto', type: 'encryption', price: 3000 },
            { name: 'Cyber Event', type: 'event' },
            { name: 'Enterprise IPS', type: 'firewall', price: 3200 },
            { name: 'Data Center AF', type: 'datacenter', price: 3500 },
            { name: 'Security Tax', type: 'tax' },
            { name: 'Zero-Day Defense', type: 'antivirus', price: 3500 },
            { name: 'Cyber Event', type: 'event' },
            { name: 'Ultimate Defense', type: 'firewall', price: 4000 },
            { name: 'Cyber Event', type: 'event' },
            { name: 'FINISH', type: 'special' }
        ];

        const boardElement = document.querySelector('.board');
        boardElement.innerHTML = ''; // Clear existing tiles

        // Create center board
        const centerBoard = document.createElement('div');
        centerBoard.className = 'center-board';
        centerBoard.innerHTML = '<h1>CYBER DEFENSE<br>TYCOON</h1>';
        boardElement.appendChild(centerBoard);

        // Calculate positions for tiles
        const positions = this.calculateTilePositions();
        
        tiles.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.className = `tile ${tile.type}`;
            tileElement.setAttribute('data-name', tile.name);
            tileElement.setAttribute('data-position', index); // Tambahkan atribut posisi
            tileElement.innerHTML = `
                <div class="tile-number">${index + 1}</div>
                <div class="tile-name">${tile.name}</div>
                ${tile.price ? `<div class="tile-price">${tile.price} BTC</div>` : ''}
            `;
            
            // Set grid position
            const pos = positions[index];
            tileElement.style.gridColumn = pos.col;
            tileElement.style.gridRow = pos.row;
            
            boardElement.appendChild(tileElement);

            // Tambahkan player token jika ini adalah posisi start
            if (index === 0) {
                const playerToken = document.createElement('div');
                playerToken.className = 'player-token';
                playerToken.style.backgroundColor = this.players[0].color;
                tileElement.appendChild(playerToken);
            }
        });

        // Setup hover preview setelah board dibuat
        this.passwordMission.setupHoverPreview();
        this.sembilanMission.setupHoverPreview(); // Tambahkan ini
    }

    calculateTilePositions() {
        const positions = [];
        const size = 10; // Ukuran grid 10x10
        
        // Bottom row (0-9) - 10 kotak
        for (let i = size; i >= 1; i--) {
            positions.push({ col: i, row: size });
        }
        
        // Left column (10-17) - 8 kotak
        for (let i = size-1; i > 1; i--) {
            positions.push({ col: 1, row: i });
        }
        
        // Top row (18-27) - 10 kotak
        for (let i = 1; i <= size; i++) {
            positions.push({ col: i, row: 1 });
        }
        
        // Right column (28-35) - 8 kotak
        for (let i = 2; i < size; i++) {
            positions.push({ col: size, row: i });
        }

        // Debug: memastikan jumlah posisi tepat 36
        console.log('Total positions:', positions.length);
        positions.forEach((pos, idx) => {
            console.log(`Tile ${idx}: col=${pos.col}, row=${pos.row}`);
        });
        
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

        // Cek jika gerakan akan melewati finish
        if (newPosition >= 35) { // Jika akan melewati atau tepat di finish
            newPosition = 35; // Tetapkan ke posisi finish (kotak 36)
            this.addToHistory(`Melempar dadu: ${dice} - Bergerak ke FINISH`);
        } else {
            this.addToHistory(`Melempar dadu: ${dice} - Bergerak ke kotak ${newPosition + 1}`);
        }
        
        this.movePlayer(player, newPosition);
        document.getElementById('dice-result').textContent = `Dadu: ${dice}`;
    }

    movePlayer(player, newPosition) {
        // Hapus player token dari posisi lama
        const oldTile = document.querySelector(`.tile[data-position="${player.position}"] .player-token`);
        if (oldTile) oldTile.remove();

        // Update posisi player
        player.position = newPosition;

        // Tambahkan player token ke posisi baru
        const newTile = document.querySelector(`.tile[data-position="${newPosition}"]`);
        const playerToken = document.createElement('div');
        playerToken.className = 'player-token';
        playerToken.style.backgroundColor = player.color;
        newTile.appendChild(playerToken);

        // Cek apakah player mendarat di kotak nomor 3
        if (newPosition === 2) {
            this.isMissionActive = true;
            const passwordMission = new PasswordMission(this);
            passwordMission.showMission();
            this.toggleGameButtons(false);
            this.addToHistory('Memulai misi Password Security di kotak 3');
        }
        
        // Tambahkan pengecekan untuk kotak 9
        if (newPosition === 8) {
            this.isMissionActive = true;
            const sembilanMission = new SembilanMission(this);
            sembilanMission.showMission();
            this.toggleGameButtons(false);
            this.addToHistory('Memulai misi Social Media Security di kotak 9');
        }
        
        // Cek apakah player mencapai finish (kotak 36)
        if (newPosition === 35) {
            const finishMission = new FinishMission(this);
            finishMission.showFinish();
            this.addToHistory('🎯 Mencapai garis FINISH!');
        }
    }

    buyAsset() {
        // Implementasi logika pembelian aset
        this.addToHistory('Mencoba membeli aset');
    }

    endTurn() {
        this.addToHistory('Mengakhiri giliran');
        this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
        // Update UI untuk pemain berikutnya
    }

    // Tambahkan method baru untuk enable/disable tombol
    toggleGameButtons(enabled) {
        document.getElementById('roll-dice').disabled = !enabled;
        document.getElementById('buy-asset').disabled = !enabled;
        document.getElementById('end-turn').disabled = !enabled;
    }

    // Method untuk menyelesaikan misi
    completeMission() {
        this.isMissionActive = false;
        this.toggleGameButtons(true);
        // Tambahkan ke history
        this.addToHistory('Menyelesaikan misi Password Security');
    }

    // Tambahkan method untuk mencatat history
    addToHistory(activity) {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const player = this.players[this.currentPlayer];
        
        const historyEntry = {
            time: timeString,
            player: player.name,
            activity: activity
        };
        
        this.gameHistory.unshift(historyEntry); // Tambahkan di awal array
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyContent = document.getElementById('history-content');
        historyContent.innerHTML = this.gameHistory
            .map(entry => `
                <tr>
                    <td>${entry.time}</td>
                    <td>${entry.player}</td>
                    <td>${entry.activity}</td>
                </tr>
            `)
            .join('');
    }
}

// Inisialisasi game ketika halaman dimuat
window.addEventListener('DOMContentLoaded', () => {
    const game = new CyberDefenseTycoon();
});