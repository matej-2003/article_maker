class HTMLEditor {
    constructor() {
        this.html = ce('div', { 'class': 'editor' });
        this.toolbar = ce('div', { 'class': 'toolbar' });
        this.toolbar2 = ce('div', { 'class': 'toolbar2' });
        this.textbox = ce('div', { 'class': 'textbox', 'contenteditable': 'true'});

        this.html.append(
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

        this.colors = ['red',
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
            opt = ce('option', { 'value': i });
            opt.innerText = i;
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
        this.clear = ce('a', {'href': '#','title': 'Clear', 'class': 'icone clear'});
        this.undo = ce('a', {'href': '#','title': 'Rndo', 'class': 'icone undo'});
        this.redo = ce('a', {'href': '#','title': 'Redo', 'class': 'icone redo'});
        this.remove_formatting = ce('a', {'href': '#','title': 'Remove formatting', 'class': 'icone remove_formatting'});
        this.group1.append(
            this.clear,
            this.undo,
            this.redo,
            this.remove_formatting,
        );

        this.group2 = ce('div', {'class': 'btn-group'});
        this.bold = ce('a', {'href': '#','title': 'Bold', 'class': 'icone bold'});
        this.italic = ce('a', {'href': '#','title': 'Italic', 'class': 'icone italic'});
        this.underline = ce('a', {'href': '#','title': 'Underline', 'class': 'icone underline'});
        this.strike_through = ce('a', {'href': '#','title': 'Strike through', 'class': 'icone strike_through'});
        this.subscript = ce('a', {'href': '#','title': 'Sub script', 'class': 'icone subscript'});
        this.superscript = ce('a', {'href': '#','title': 'Super script', 'class': 'icone superscript'});
        this.group2.append(
            this.bold,
            this.italic,
            this.underline,
            this.strike_through,
            this.subscript,
            this.superscript,
        );

        this.group3 = ce('div', {'class': 'btn-group'});
        this.left_align = ce('a', {'href': '#','title': 'Left align', 'class': 'icone left_align'});
        this.center_align = ce('a', {'href': '#','title': 'Center align', 'class': 'icone center_align'});
        this.right_align = ce('a', {'href': '#','title': 'Right align', 'class': 'icone right_align'});
        this.group3.append(
            this.left_align,
            this.center_align,
            this.right_align,
        );

        this.group4 = ce('div', {'class': 'btn-group'});
        this.numbered_list = ce('a', {'href': '#','title': 'Numbered list', 'class': 'icone numbered_list'});
        this.dotted_list = ce('a', {'href': '#','title': 'Dotted list', 'class': 'icone dotted_list'});
        this.quota = ce('a', {'href': '#','title': 'Quota', 'class': 'icone quota'});
        this.delete_indentation = ce('a', {'href': '#','title': 'Delete indentation', 'class': 'icone delete_indentation'});
        this.add_indentation = ce('a', {'href': '#','title': 'Add indentation', 'class': 'icone add_indentation'});
        this.group4.append(
            this.numbered_list,
            this.dotted_list,
            this.quota,
            this.delete_indentation,
            this.add_indentation,
        );

        this.group5 = ce('div', {'class': 'btn-group'});
        this.hyperlink = ce('a', {'href': '#','title': 'hyperlink', 'class': 'icone hyperlink'});
        this.cut = ce('a', {'href': '#','title': 'cut', 'class': 'icone cut'});
        this.copy = ce('a', {'href': '#','title': 'copy', 'class': 'icone copy'});
        this.paste = ce('a', {'href': '#','title': 'paste', 'class': 'icone paste'});
        this.group5.append(
            this.hyperlink,
            this.cut,
            this.copy,
            this.paste,
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