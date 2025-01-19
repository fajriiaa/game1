class PasswordMission {
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
        centerBoard.innerHTML = '<h1>CYBER DEFENSE<br>TYCOON</h1>';
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
        
        // Kriteria password
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
            // Tambahkan reward dan aktifkan kembali permainan
            setTimeout(() => {
                this.hideMission();
                this.gameInstance.completeMission();
            }, 2000);
        }

        feedback.innerHTML = feedbackMessage;
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

    setupHoverPreview() {
        const tile3 = document.querySelector('.tile[data-position="2"]');
        if (tile3) {
            tile3.addEventListener('mouseenter', () => this.showPreview(tile3));
            tile3.addEventListener('mouseleave', () => this.hidePreview());
        }
    }

    showPreview(tileElement) {
        // Hapus preview yang mungkin sudah ada
        this.hidePreview();

        // Buat dan tambahkan preview card
        const previewElement = document.createElement('div');
        previewElement.className = 'preview-container';
        previewElement.innerHTML = this.previewCard;

        // Posisikan preview di samping tile
        const tileRect = tileElement.getBoundingClientRect();
        
        // Penyesuaian posisi agar tidak keluar layar
        let left = tileRect.right + 10;
        let top = tileRect.top;

        // Cek apakah preview akan keluar dari sisi kanan layar
        if (left + 300 > window.innerWidth) { // 300 adalah lebar preview card
            left = tileRect.left - 310; // Tampilkan di sebelah kiri tile
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