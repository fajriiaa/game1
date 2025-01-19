export class PreviewManager {
    constructor() {
        this.activePreview = null;
    }

    showPreview(element, content, position) {
        this.hidePreview();

        const previewElement = document.createElement('div');
        previewElement.className = 'preview-container';
        previewElement.innerHTML = content;

        const rect = element.getBoundingClientRect();
        let left = position === 'right' ? rect.right + 10 : rect.left - 310;
        const top = rect.top;

        if (left + 300 > window.innerWidth) {
            left = rect.left - 310;
        }

        previewElement.style.position = 'fixed';
        previewElement.style.left = `${left}px`;
        previewElement.style.top = `${top}px`;

        document.body.appendChild(previewElement);
        this.activePreview = previewElement;
    }

    hidePreview() {
        if (this.activePreview) {
            this.activePreview.remove();
            this.activePreview = null;
        }
    }
} 