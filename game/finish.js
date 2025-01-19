class FinishMission {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
        this.missionCard = null;
        this.initializeCard();
    }

    initializeCard() {
        this.missionCard = `
            <div class="mission-card finish-card">
                <h2>🎉 SELAMAT! 🎉</h2>
                <div class="mission-content">
                    <p class="finish-message">Kamu telah menyelesaikan semua misi Cyber Defense!</p>
                    <div class="finish-stats">
                        <h3>Statistik Permainan:</h3>
                        <ul>
                            <li>Bitcoin tersisa: ${this.gameInstance.players[0].money} BTC</li>
                            <li>Total langkah: ${this.calculateTotalSteps()}</li>
                            <li>Waktu selesai: ${new Date().toLocaleTimeString()}</li>
                        </ul>
                    </div>
                    <button id="restart-game" class="finish-button">Main Lagi</button>
                </div>
            </div>
        `;
    }

    calculateTotalSteps() {
        return this.gameInstance.gameHistory.filter(h => 
            h.activity.includes('Melempar dadu')
        ).length;
    }

    showFinish() {
        const centerBoard = document.querySelector('.center-board');
        centerBoard.innerHTML = this.missionCard;
        this.initializeEventListeners();
        
        // Disable semua tombol game
        this.gameInstance.toggleGameButtons(false);
        
        // Tambahkan ke history
        this.gameInstance.addToHistory('🏆 Menyelesaikan permainan!');
    }

    initializeEventListeners() {
        const restartButton = document.getElementById('restart-game');
        if (restartButton) {
            restartButton.addEventListener('click', () => {
                location.reload(); // Reload halaman untuk memulai permainan baru
            });
        }
    }
}