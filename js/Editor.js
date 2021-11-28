class ElementEditor {
    constructor() {
        this.element = {
            'tag': null,
            'data': [],
            'class': [],
            'style': {},
            'attributes': {},
        }
        this.table = ce('table', {
            'class': '.element_settings',
        });
        this.tag_input = ce('input', {
            'name': 'tag',
            'type': 'text',
            'pattern': '[A-Za-z_]+',
        });
        this.attr_name_input = ce('input', {
            'name': 'attr_name',
            'type': 'text',
            'class': 'attr_input',
        });
        this.attr_name_input.classList.add('attr_input');
        this.attr_value_input = ce('input', {
            'name': 'attr_value',
            'type': 'text',
            'class': 'attr_input',
        });
        this.button_attr_add = ce('button');
        this.button_attr_add.innerText = 'Add';
        this.class_input = ce('textarea', {
            'name': 'classes',
        });
        this.style_input = ce('textarea', {
            'name': 'classes',
        });
        this.inner_html_input = ce('textarea', {
            'name': 'classes',
        });
        this.button_cancel = ce('button', {
            'name': 'cancel',
        });
        this.button_cancel.innerText = 'Cancel';
        this.button_finnish = ce('button', {
            'name': 'finnish',
        });
        this.button_finnish.innerText = 'Finnish';
        this.attr_list = ce('div', {
            'class': 'attr_list',
        });

        this.tag_row = this.table.insertRow(-1);
        this.tag_row.insertCell(-1).innerHTML = 'Tag';
        this.tag_row.insertCell(-1).appendChild(this.tag_input);

        this.attribute_row = this.table.insertRow(-1);
        this.attribute_row.insertCell(-1).innerHTML = 'Attribute';

        let div = ce('div');
        let tmp_div = ce('div');
        tmp_div.style['text-align'] = 'right';
        tmp_div.append(this.button_attr_add);
        div.append(
            'Name: ',
            this.attr_name_input,
            ce('br'),
            'Value: ',
            this.attr_value_input,
            tmp_div,
        );
        this.attribute_row.insertCell(-1).append(
            this.attr_list,
            div,
        );

        // class row
        this.class_row = this.table.insertRow(-1);
        this.class_row.insertCell(-1).innerHTML = 'Classes';
        let tmp_class = this.class_row.insertCell(-1);
        tmp_class.appendChild(this.class_input);

        // style row
        this.style_row = this.table.insertRow(-1);
        this.style_row.insertCell(-1).innerHTML = 'Style';
        let tmp_style = this.style_row.insertCell(-1);
        tmp_style.appendChild(this.style_input);

        this.inner_html_row = this.table.insertRow(-1);
        this.inner_html_row.insertCell(-1).innerHTML = 'Inner HTML';
        let tmp_inner_html = this.inner_html_row.insertCell(-1);
        tmp_inner_html.appendChild(this.inner_html_input);

        this.finnish_row = this.table.insertRow(-1);
        let tmp_finnish = this.finnish_row.insertCell(-1);
        tmp_finnish.setAttribute('colspan', '2');
        tmp_finnish.style['text-align'] = 'right';

        tmp_finnish.append(
            this.button_cancel,
            this.button_finnish,
        );

        this.init();
    }

    init() {
        this.button_finnish.addEventListener('click', () => {
            this.element['tag'] = this.tag_input.value;
            if (this.class_input.value.trim(' ')) {
                this.element['class'] = [];
                this.element['style'] = {};

                let cls = this.class_input.value.split(' ');
                for (let i of cls) {
                    this.element['class'].push(i.trim(' '));
                }
            }

            // if (this.style_input.value.trim(' ')) {
            //     let style = this.style_input.value.trim(' ;').split(';');
            //     for (let i of style) {
            //         let p = i.split(':');
            //         this.element['style'][p[0].trim(' ')] = p[1].trim(' ');
            //     }
            // }
        });

        this.button_attr_add.addEventListener('click', () => {
            this.element['attributes'][this.attr_name_input.value] = this.attr_value_input.value;
            this.refresh_attributes();
            this.attr_name_input.value = this.attr_value_input.value = '';
        });
    }

    refresh_attributes() {
        this.attr_list.innerHTML = '';
        for (let i in this.element['attributes']) {
            let tmp = this.make_attr(i, this.element['attributes'][i]);
            this.attr_list.append(tmp);
        }
    }

    make_attr(name = '', value = '') {
        let attr = ce('div');
        attr.classList.add('attr');
        let span_name = ce('span');
        let span_value = ce('span');
        let span_delete = ce('span');
        span_value.innerHTML = `<b>value:</b> '${value}'&nbsp;`;
        span_name.innerHTML = `<b>name:</b> '${name}'`;
        span_delete.innerHTML = '&times;';
        span_delete.style['color'] = "#ff0000";
        span_delete.style['fontWeight'] = "bold";
        span_delete.style['cursor'] = "pointer";
        attr.append(span_name, span_value, span_delete);

        span_delete.addEventListener('click', () => {
            delete this.element['attributes'][name];
            this.refresh_attributes();
        });

        return attr;
    }
}