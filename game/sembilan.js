class SembilanMission {
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
        centerBoard.innerHTML = '<h1>SOCISAFE<br>Social Media Safe</h1>';
    }

    initializeEventListeners() {
        const checkButton = document.getElementById('check-mission');
        if (checkButton) {
            checkButton.addEventListener('click', () => this.checkMission());
        }
    }

    checkMission() {
        // Logika pengecekan misi akan diimplementasikan nanti
        const feedback = document.getElementById('mission-feedback');
        feedback.innerHTML = 'Misi dalam pengembangan';
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

    setupHoverPreview() {
        const tile9 = document.querySelector('.tile[data-position="8"]');
        if (tile9) {
            tile9.addEventListener('mouseenter', () => this.showPreview(tile9));
            tile9.addEventListener('mouseleave', () => this.hidePreview());
        }
    }

    showPreview(tileElement) {
        this.hidePreview();

        const previewElement = document.createElement('div');
        previewElement.className = 'preview-container';
        previewElement.innerHTML = this.previewCard;

        const tileRect = tileElement.getBoundingClientRect();
        
        let left = tileRect.right + 10;
        let top = tileRect.top;

        if (left + 300 > window.innerWidth) {
            left = tileRect.left - 310;
        }

        previewElement.style.position = 'fixed';
        previewElement.style.left = `${left}px`;
        previewElement.style.top = `${top}px`;

        document.body.appendChild(previewElement);
    }

    hidePreview() {
        const existingPreview = document.querySelector('.preview-container');
        if (existingPreview) {
            existingPreview.remove();
        }
    }
}