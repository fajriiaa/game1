export class HistoryManager {
    constructor() {
        this.history = [];
    }

    addEntry(player, activity) {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        
        const historyEntry = {
            time: timeString,
            player: player.name,
            activity: activity
        };
        
        this.history.unshift(historyEntry);
        this.updateDisplay();
    }

    updateDisplay() {
        const historyContent = document.getElementById('history-content');
        historyContent.innerHTML = this.history
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