class ElementEditor {
    constructor(editor) {
        this.html = ce('div', { 'class': 'element_container' });
        this.settings = ce('div', { 'class': 'element_settings' });
        this.block = ce('div', { 'class': 'element_block' });
        this.html.append(
            this.settings,
            this.block,
        );
        this.editor = editor;
        this.modal = new Modal(this.editor.html, '', '', () => {
            this.block.innerHTML = this.editor.textbox.innerHTML;
        });
        this.html.append(this.modal.modal);

        this.settings_btn = ce('a', { 'href': '#' });
        this.settings_btn.innerText = 'Settings';
        this.settings_btn.addEventListener('click', () => {
            this.modal.start();
        });
        this.settings.append(this.settings_btn);
    }

    hide() {
        this.html.classList.remove('show');
        this.html.classList.add('hide');
    }
    show() {
        this.html.classList.remove('hide');
        this.html.classList.add('show');
    }
}