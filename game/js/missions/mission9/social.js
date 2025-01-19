export class SocialMission {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
        this.missionCard = null;
        this.previewCard = null;
        this.initializeCard();
        this.initializePreviewCard();
    }

    initializeCard() {
        this.missionCard = `
            <div class="mission-card">
                <h2>Social Media Security Mission</h2>
                <div class="mission-content">
                    <p>Misi ini akan diisi dengan konten keamanan media sosial</p>
                    <div class="mission-input">
                        <!-- Area untuk konten misi -->
                        <div id="mission-content-area"></div>
                        <button id="check-mission">Periksa Jawaban</button>
                    </div>
                    <div id="mission-feedback"></div>
                </div>
            </div>
        `;
    }

    showMission() {
        const centerBoard = document.querySelector('.center-board');
        centerBoard.innerHTML = this.missionCard;
        this.initializeEventListeners();
    }

    hideMission() {
        const centerBoard = document.querySelector('.center-board');
        centerBoard.innerHTML = '<h1>SOCISAFE<br>Social Media Security Game</h1>';
    }

    initializeEventListeners() {
        const checkButton = document.getElementById('check-mission');
        if (checkButton) {
            checkButton.addEventListener('click', () => this.checkMission());
        }
    }

    checkMission() {
        const feedback = document.getElementById('mission-feedback');
        feedback.innerHTML = 'Misi dalam pengembangan';
        
        // Untuk testing, bisa langsung selesaikan misi
        setTimeout(() => {
            this.hideMission();
            this.gameInstance.completeMission();
        }, 2000);
    }

    setupHoverPreview() {
        const tile9 = document.querySelector('.tile[data-position="8"]');
        if (tile9) {
            tile9.addEventListener('mouseenter', () => 
                this.gameInstance.previewManager.showPreview(tile9, this.previewCard, 'right')
            );
            tile9.addEventListener('mouseleave', () => 
                this.gameInstance.previewManager.hidePreview()
            );
        }
    }

    initializePreviewCard() {
        this.previewCard = `
            <div class="preview-card">
                <div class="preview-content">
                    <h3>Social Media Security Mission</h3>
                    <p>Di kotak ini kamu akan mendapat misi:</p>
                    <div class="preview-details">
                        <p>🔐 Misi Keamanan Media Sosial</p>
                        <ul>
                            <li>✓ Tantangan menarik</li>
                            <li>✓ Belajar keamanan</li>
                            <li>✓ Hadiah spesial</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
} 