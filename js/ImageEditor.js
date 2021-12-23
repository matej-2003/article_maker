class ImageEditor {
    constructor(show_preview, onfinnish) {
        this.element = {};
        this.show_preview = show_preview;
        this.ratio = 1;
        this.w_oreginal = this.h_oreginal = 1;
        this.image = new Image();
        this.html = ce('div');
        this.table = ce('table');
        this.html.append(this.table);
        this.file_input = ce('input', {
            'type': 'file',
            'accept': '.png, .jpg, .jpeg .gif',
        });
        this.show_btn = ce('button');
        this.show_btn.innerText = 'show';
        this.ratio_show = ce('span');
        this.keep_ration_input = ce('input', {
            'type': 'checkbox',
        });
        this.keep_ration_input.checked = true;
        this.h_input = ce('input', { 'type': 'number' });
        this.w_input = ce('input', { 'type': 'number' });
        this.resize_btn = ce('button');
        this.resize_btn.innerText = 'Resize';
        this.title_input = ce('input');
        this.alt_input = ce('input');
        this.desc_input = ce('textarea');
        this.reset_btn = ce('button');
        this.reset_btn.innerText = 'Reset';
        this.finnish_btn = ce('button');
        this.finnish_btn.innerText = 'Finnish';
        this.img_container = ce('div', { 'class': 'img_container' });
        this.image_desc = ce('div', { 'class': 'img_desc' });
        this.title = '';
        this.desc = '';

        this.disable();

        if (this.show_preview) {
            let row = this.table.insertRow(-1);
            let cell = row.insertCell(-1);
            cell.setAttribute('colspan', 2);
            this.img_container.append(
                this.image,
                this.image_desc,
            );
            cell.append(this.img_container);
        }

        let row1 = this.table.insertRow(-1);
        row1.insertCell(-1).append(this.file_input);
        row1.insertCell(-1).append(this.show_btn);

        let row2 = this.table.insertRow(-1);
        row2.insertCell(-1).append("Ratio: ");
        row2.insertCell(-1).append(this.ratio_show);

        let row3 = this.table.insertRow(-1);
        row3.insertCell(-1).append("Keep ratio");
        row3.insertCell(-1).append(this.keep_ration_input);

        let row4 = this.table.insertRow(-1);
        row4.insertCell(-1).append("Width");
        row4.insertCell(-1).append(this.w_input);

        let row5 = this.table.insertRow(-1);
        row5.insertCell(-1).append("Height");
        row5.insertCell(-1).append(this.h_input);

        let row6 = this.table.insertRow(-1);
        row6.insertCell(-1).append(this.resize_btn);

        let row7 = this.table.insertRow(-1);
        row7.insertCell(-1).append("Image title");
        row7.insertCell(-1).append(this.title_input);

        let row8 = this.table.insertRow(-1);
        row8.insertCell(-1).append("Image alt");
        row8.insertCell(-1).append(this.alt_input);

        let row9 = this.table.insertRow(-1);
        let cell = row9.insertCell(-1);
        cell.setAttribute('colspan', 2);
        cell.append('Description:', this.desc_input);

        let row10 = this.table.insertRow(-1);
        let cell1 = row10.insertCell(-1);
        cell1.setAttribute('colspan', 2);
        cell1.style['text-align'] = 'right';
        cell1.append(
            this.reset_btn,
            this.finnish_btn,
        );
        
        this.finnish_btn.addEventListener('click', () => {            
            if (onfinnish) {
                this.finnish_btn.onclick = onfinnish;
                this.reset();
            }
        });

        this.show_btn.addEventListener('click', () => {
            this.load_img();
        });

        this.file_input.addEventListener('change', () => {
            this.load_img();
        });

        this.w_input.addEventListener('change', () => {
            if (this.keep_ration_input.checked) {
                let w = parseInt(this.w_input.value);
                let h = Math.floor(w * this.ratio);
                this.h_input.value = h;

                this.image.height = h;
                this.image.width = w;
                this.show_ratio(w, h);
            }
        });
        this.h_input.addEventListener('change', () => {
            if (this.keep_ration_input.checked) {
                let h = parseInt(this.h_input.value);
                let w = Math.floor(1 / (this.ratio / h));
                this.w_input.value = h;

                this.image.height = h;
                this.image.width = w;
                this.show_ratio(w, h);
            }
        });
        this.resize_btn.addEventListener('click', () => {
            this.w_input.value = this.image.width = this.w_oreginal;
            this.h_input.value = this.image.height = this.h_oreginal;
            this.show_ratio(this.w_oreginal, this.h_oreginal);
        });

        this.title_input.addEventListener('change', () => {
            this.title = this.title_input.value.trim(' \n');
            this.image.setAttribute('title', this.title);
            this.format_desc();
        });

        this.alt_input.addEventListener('change', () => {
            let alt = this.alt_input.value.trim(' \n');
            this.image.setAttribute('alt', alt);
        });

        this.desc_input.addEventListener('change', () => {
            this.desc = this.desc_input.value.trim(' \n');
            this.format_desc();
        });
    }

    load_img() {
        var f_reader = new FileReader();
        f_reader.readAsDataURL(this.file_input.files[0]);
        f_reader.addEventListener('load', (event) => {
            this.image.src = event.target.result;
            
            this.image.addEventListener('load', () => {
                this.enable();
                this.w_oreginal = this.image.width;
                this.h_oreginal = this.image.height;
                this.w_input.value = this.image.width;
                this.h_input.value = this.image.height;
                this.show_ratio(this.image.width, this.image.height);
            });
        });
    }

    reset() {
        this.w_input.value = '';
        this.keep_ration_input.value = '';
        this.ratio_show.innerText = '';
        this.show_btn.value = '';
        this.h_input.value = '';
        this.resize_btn.value = '';
        this.title_input.value = '';
        this.alt_input.value = '';
        this.desc_input.value = '';
        this.reset_btn.value = '';
        this.finnish_btn.value = '';       
        this.file_input.value = '';

        this.image = new Image();
        this.img_container.innerHTML = '';
        this.title = '';
        this.desc = '';
        this.image_desc.innerText = '';
        this.img_container.append(
            this.image,
            this.image_desc,
        );
        this.disable();
    }

    get_image() {
        return this.image.cloneNode(true);
    }

    disable() {
        this.w_input.disabled = true;
        this.keep_ration_input.disabled = true;
        this.show_btn.disabled = true;
        this.h_input.disabled = true;
        this.resize_btn.disabled = true;
        this.title_input.disabled = true;
        this.alt_input.disabled = true;
        this.desc_input.disabled = true;
        this.reset_btn.disabled = true;
        this.finnish_btn.disabled = true;
    }

    enable() {
        this.w_input.disabled = false;
        this.keep_ration_input.disabled = false;
        this.show_btn.disabled = false;
        this.h_input.disabled = false;
        this.resize_btn.disabled = false;
        this.title_input.disabled = false;
        this.alt_input.disabled = false;
        this.desc_input.disabled = false;
        this.reset_btn.disabled = false;
        this.finnish_btn.disabled = false;
    }

    show_ratio(w, h) {
        this.ratio_show.innerText = "w " + w + "px: h " + h + "px";
        this.ratio = w / h;
    }

    format_desc() {
        this.image_desc.innerText = '';
        this.image_desc.innerText = `${this.title}`
        if (this.desc) {
            this.image_desc.innerText += ` (${this.desc})`;
        }
    }
}