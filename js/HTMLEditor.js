class HTMLEditor {
    constructor() {
        const CODE = 'code';
        const HMTL = 'html';
        this.mode = HMTL;
        this.mode_switch = ce('input', {'type': 'checkbox'});
        this.code_editor = ce('div', { 'class': 'code_editor' });
        this.html_editor = ce('div', { 'class': 'html_editor' });

        this.code_textarea = ce('textarea');
        this.code_editor.append(
            this.code_textarea,
        );
        this.code_editor.style.display = 'none';

        // THIS IS AN IMAGE EDITOR
        this.img_editor = new ImageEditor(true, () => {
            // onfinnish
            this.textbox.append(this.img_editor.get_image());
            this.img_editor.reset();
            this.img_editor_modal.stop();
        });
        this.img_editor_modal = new Modal(this.img_editor.table, 'Image editor');

        // BODY
        this.html = ce('div', { 'class': 'editor' });
        this.html.append(
            this.html_editor,
            this.code_editor,
            'HTML code:',
            this.mode_switch,
            this.img_editor_modal.modal,
        );
    
        this.toolbar = ce('div', { 'class': 'toolbar' });
        this.toolbar2 = ce('div', { 'class': 'toolbar2' });
        this.textbox = ce('div', { 'class': 'textbox', 'contenteditable': 'true'});

        this.html_editor.append(
            this.toolbar2,
            this.toolbar,
            this.textbox,
        );

        this.styles = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre'];
        this.style = ce('select');
        let opt = null;

        opt = ce('option', { 'selected': '' });
        opt.innerText = '-style-';
        this.style.append(opt);
        for (let i of this.styles) {
            opt = ce('option', { 'value': i });
            opt.innerText = `<${i}>`;
            this.style.append(opt);
        }

        this.font = ce('select');
        opt = ce('option', { 'selected': '' });
        opt.innerText = '-font-';
        this.font.append(opt);
        for (let i of fonts) {
            opt = ce('option', { 'value': i });
            opt.style['font-family'] = i,
            opt.innerText = i;
            this.font.append(opt);
        }

        this.sizes = [
            ['Very small', 0],
            ['Small', 1],
            ['Normal', 2],
            ['Medium', 3],
            ['Big', 4],
            ['Very big', 5],
            ['Maximum', 6],
        ];
        this.size = ce('select');
        opt = ce('option', { 'selected': '' });
        opt.innerText = '-size-';
        this.size.append(opt);
        for (let i of this.sizes) {
            opt = ce('option', { 'value': i[1] });
            opt.innerText = i[0];
            this.size.append(opt);
        }

        this.colors = [
            'red',
            'green',
            'blue',
            'black',
            'gray',
            'white',
            'silver',
            'maroon',
            'yellow',
            'olive',
            'lime',
            'aqua',
            'teal',
            'navy',
            'fuchsia',
            'purple'
        ];

        this.fg_color_selection = ce('select');
        opt = ce('option', { 'selected': '' });
        opt.innerText = '-color-';
        this.fg_color_selection.append(opt);
        for (let i of this.colors) {
            opt = ce('option', { 'value': i});
            opt.innerText = i;
            opt.style.color = i;
            this.fg_color_selection.append(opt);
        }
        this.fg_color = ce('input', { 'type': 'color' });

        this.bg_color_selection = ce('select');
        opt = ce('option', { 'selected': '' });
        opt.innerText = '-color-';
        this.bg_color_selection.append(opt);
        for (let i of this.colors) {
            opt = ce('option', { 'value': i });
            opt.innerText = i;
            opt.style.backgroundColor = i;
            this.bg_color_selection.append(opt);
        }
        this.bg_color = ce('input', { 'type': 'color' });

        this.toolbar2.append(
            this.style,
            this.font,
            'Size:',
            this.size,
            'Fg: ',
            this.fg_color,
            this.fg_color_selection,
            'Bg:',
            this.bg_color,
            this.bg_color_selection,
        );

        // toolbar

        this.group1 = ce('div', {'class': 'btn-group'});
        this.clear = ce('a', {'href': '#','title': 'Clear', 'class': 'icon clear'});
        this.undo = ce('a', {'href': '#','title': 'Rndo', 'class': 'icon undo'});
        this.redo = ce('a', {'href': '#','title': 'Redo', 'class': 'icon redo'});
        this.remove_formatting = ce('a', {'href': '#','title': 'Remove formatting', 'class': 'icon remove_formatting'});
        this.group1.append(
            this.clear,
            this.undo,
            this.redo,
            this.remove_formatting,
        );

        this.group2 = ce('div', {'class': 'btn-group'});
        this.bold = ce('a', {'href': '#','title': 'Bold', 'class': 'icon bold'});
        this.italic = ce('a', {'href': '#','title': 'Italic', 'class': 'icon italic'});
        this.underline = ce('a', {'href': '#','title': 'Underline', 'class': 'icon underline'});
        this.strike_through = ce('a', {'href': '#','title': 'Strike through', 'class': 'icon strike_through'});
        this.subscript = ce('a', {'href': '#','title': 'Sub script', 'class': 'icon subscript'});
        this.superscript = ce('a', {'href': '#','title': 'Super script', 'class': 'icon superscript'});
        this.group2.append(
            this.bold,
            this.italic,
            this.underline,
            this.strike_through,
            this.subscript,
            this.superscript,
        );

        this.group3 = ce('div', {'class': 'btn-group'});
        this.left_align = ce('a', {'href': '#','title': 'Left align', 'class': 'icon left_align'});
        this.center_align = ce('a', {'href': '#','title': 'Center align', 'class': 'icon center_align'});
        this.right_align = ce('a', {'href': '#','title': 'Right align', 'class': 'icon right_align'});
        this.group3.append(
            this.left_align,
            this.center_align,
            this.right_align,
        );

        this.group4 = ce('div', {'class': 'btn-group'});
        this.numbered_list = ce('a', {'href': '#','title': 'Numbered list', 'class': 'icon numbered_list'});
        this.dotted_list = ce('a', {'href': '#','title': 'Dotted list', 'class': 'icon dotted_list'});
        this.quota = ce('a', {'href': '#','title': 'Quota', 'class': 'icon quota'});
        this.delete_indentation = ce('a', {'href': '#','title': 'Delete indentation', 'class': 'icon delete_indentation'});
        this.add_indentation = ce('a', {'href': '#','title': 'Add indentation', 'class': 'icon add_indentation'});
        this.group4.append(
            this.numbered_list,
            this.dotted_list,
            this.quota,
            this.delete_indentation,
            this.add_indentation,
        );

        this.group5 = ce('div', {'class': 'btn-group'});
        this.hyperlink = ce('a', {'href': '#','title': 'Hyperlink', 'class': 'icon hyperlink'});
        this.insert_image = ce('a', {'href': '#','title': 'Insert image', 'class': 'icon image_insert'});
        this.cut = ce('a', {'href': '#','title': 'Cut', 'class': 'icon cut'});
        this.copy = ce('a', {'href': '#','title': 'Copy', 'class': 'icon copy'});
        this.paste = ce('a', {'href': '#','title': 'Paste', 'class': 'icon paste'});
        this.html_code = ce('a', {'href': '#','title': 'HTML code', 'class': 'icon html_code'});
        this.group5.append(
            this.hyperlink,
            this.insert_image,
            this.cut,
            this.copy,
            this.paste,
            this.html_code,
        );

        this.toolbar.append(
            this.group1,
            this.group2,
            this.group3,
            this.group4,
            this.group5,
        );

        // eventLsitener

        this.clear.addEventListener('click', () => {this.format('delete')});
        this.undo.addEventListener('click', () => {this.format('undo')});
        this.redo.addEventListener('click', () => {this.format('redo')});
        this.remove_formatting.addEventListener('click', () => {this.format('removeFormatting')});

        this.bold.addEventListener('click', () => {this.format('bold')});
        this.italic.addEventListener('click', () => {this.format('italic')});
        this.underline.addEventListener('click', () => {this.format('underline')});
        this.strike_through.addEventListener('click', () => {this.format('strikethrough')});
        this.subscript.addEventListener('click', () => {this.format('subscript')});
        this.superscript.addEventListener('click', () => {this.format('superscript')});

        this.left_align.addEventListener('click', () => {this.format('justifyleft')});
        this.center_align.addEventListener('click', () => {this.format('justifycenter')});
        this.right_align.addEventListener('click', () => {this.format('justifyright')});

        this.numbered_list.addEventListener('click', () => {this.format('insertorderedlist')});
        this.dotted_list.addEventListener('click', () => {this.format('insertunorderedlist')});
        this.quota.addEventListener('click', () => {this.format('formatblock', 'blockquote')});
        this.delete_indentation.addEventListener('click', () => {this.format('outdent')});
        this.add_indentation.addEventListener('click', () => {this.format('indent')});
        
        this.hyperlink.addEventListener('click', () => {
            let link = prompt('Write the URL here', 'http:\/\/');
            if (link && link != '' && link != `http://`) {
                this.format('createlink', link)
            }
        });
        this.insert_image.addEventListener('click', () => {
            this.img_editor_modal.start();
        });
        this.cut.addEventListener('click', () => {this.format('cut')});
        this.copy.addEventListener('click', () => {this.format('copy')});
        this.paste.addEventListener('click', () => {this.format('paste')});


        this.style.addEventListener('change', () => {
            this.format('formatblock', this.style[this.style.selectedIndex].value);
            this.style.selectedIndex = 0;
        });
        this.font.addEventListener('change', () => {
            this.format('fontname', this.font[this.font.selectedIndex].value);
            this.font.selectedIndex = 0;
        });
        this.size.addEventListener('change', () => {
            this.format('fontsize', this.size[this.size.selectedIndex].value);
            this.size.selectedIndex = 0;
        });
        this.fg_color_selection.addEventListener('change', () => {
            this.format('forecolor', this.fg_color_selection[this.fg_color_selection.selectedIndex].value);
            this.fg_color_selection.selectedIndex = 0;
        });
        this.fg_color.onchange = () => {this.format('forecolor', this.fg_color.value)};

        this.bg_color_selection.addEventListener('change', () => {
            this.format('backcolor', this.bg_color_selection[this.bg_color_selection.selectedIndex].value);
            this.bg_color_selection.selectedIndex = 0;
        });
        this.bg_color.onchange = () => {this.format('backcolor', this.bg_color.value)};



        this.mode_switch.onchange = () => {
            if (this.mode_switch.checked) {
                this.mode = CODE;
                this.html_editor.style.display = 'none';
                this.code_editor.style.display = 'block';
                this.code_textarea.style.height = '10em';
                this.start_code_editor();
            } else {
                this.mode = HMTL;
                this.html_editor.style.display = 'block';
                this.code_editor.style.display = 'none';
                this.start_html_editor();
            }
        }
    }

    start_code_editor() {
        let code = this.textbox.innerHTML;
        this.code_textarea.value = code;
    }

    start_html_editor() {
        let code = this.code_textarea.value;
        this.textbox.innerHTML = code;
    }

    format(sCmd, sValue) {
        document.execCommand(sCmd, false, sValue);
        this.textbox.focus();
    }

    get_content() {
        let content = pack_element(this.textbox);
        delete content['attributes'];
        delete content['class'];
        return content;
    }
}