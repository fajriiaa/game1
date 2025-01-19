export class PasswordMission {
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
                <h2>Password Security Mission</h2>
                <div class="mission-content">
                    <p>Buat password yang memenuhi kriteria keamanan berikut:</p>
                    <ul>
                        <li>Minimal 8 karakter</li>
                        <li>Mengandung huruf besar dan kecil</li>
                        <li>Mengandung angka</li>
                        <li>Mengandung karakter spesial (!@#$%^&*)</li>
                    </ul>
                    <div class="password-input">
                        <input type="password" id="password-attempt" placeholder="Masukkan password">
                        <button id="check-password">Periksa Password</button>
                    </div>
                    <div id="password-feedback"></div>
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
        const checkButton = document.getElementById('check-password');
        if (checkButton) {
            checkButton.addEventListener('click', () => this.checkPassword());
        }
    }

    checkPassword() {
        const password = document.getElementById('password-attempt').value;
        const feedback = document.getElementById('password-feedback');
        
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);

        let feedbackMessage = '';
        let isValid = true;

        if (!hasMinLength) {
            feedbackMessage += '❌ Password harus minimal 8 karakter<br>';
            isValid = false;
        }
        if (!hasUpperCase) {
            feedbackMessage += '❌ Harus mengandung huruf besar<br>';
            isValid = false;
        }
        if (!hasLowerCase) {
            feedbackMessage += '❌ Harus mengandung huruf kecil<br>';
            isValid = false;
        }
        if (!hasNumber) {
            feedbackMessage += '❌ Harus mengandung angka<br>';
            isValid = false;
        }
        if (!hasSpecial) {
            feedbackMessage += '❌ Harus mengandung karakter spesial<br>';
            isValid = false;
        }

        if (isValid) {
            feedbackMessage = '✅ Password valid! Misi selesai!';
            setTimeout(() => {
                this.hideMission();
                this.gameInstance.completeMission();
            }, 2000);
        }

        feedback.innerHTML = feedbackMessage;
    }

    setupHoverPreview() {
        const tile3 = document.querySelector('.tile[data-position="2"]');
        if (tile3) {
            tile3.addEventListener('mouseenter', () => 
                this.gameInstance.previewManager.showPreview(tile3, this.previewCard, 'right')
            );
            tile3.addEventListener('mouseleave', () => 
                this.gameInstance.previewManager.hidePreview()
            );
        }
    }

    initializePreviewCard() {
        this.previewCard = `
            <div class="preview-card">
                <div class="preview-content">
                    <h3>Password Security Mission</h3>
                    <p>Di kotak ini kamu akan mendapat misi:</p>
                    <div class="preview-details">
                        <p>🔐 Membuat password yang aman dengan kriteria:</p>
                        <ul>
                            <li>✓ Minimal 8 karakter</li>
                            <li>✓ Huruf besar & kecil</li>
                            <li>✓ Angka</li>
                            <li>✓ Karakter spesial</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
} 