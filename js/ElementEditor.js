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
        this.block.innerHTML = this.editor.textbox.innerHTML;
        this.modal = new Modal(this.editor.html, '', '', () => {
            this.block.innerHTML = this.editor.textbox.innerHTML;
        });
        this.html.append(this.modal.modal);

        this.settings_btn = ce('a', { 'href': '#' });
        this.settings_btn.innerText = 'Settings';
        this.settings_btn.addEventListener('click', () => {
            console.log("open settings");
        });

        this.edit_btn = ce('a', { 'href': '#' });
        this.edit_btn.innerText = 'Edit';
        this.edit_btn.addEventListener('click', () => {
            this.modal.start();
        });

        this.delete_btn = ce('a', { 'href': '#' });
        this.delete_btn.innerText = 'Delete';
        this.delete_btn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this element')) {
                this.html.remove();
            }
        });
        this.settings.append(
            this.settings_btn,
            ce('br'),
            this.edit_btn,
            ce('br'),
            this.delete_btn,
        );
    }

    insert_html(html) {
        this.block.innerHTML = html;
        this.editor.textbox.innerHTML = html;
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