function init_element_maker(id) {
    $(`.element_maker${id}`).innerHTML = `
    <table>
        <tr>
            <td>Tag</td>
            <td><input name="tag" type="text" pattern="[A-Za-z_]+"></td>
        </tr>
        <tr>
            <td>Attribute</td>
            <td>
                <div class="attr_list">
                </div>
                <div>
                    name: <input name="attr_name" type="text" class="attr_input">
                    <br>
                    value: <input name="attr_value" type="text" class="attr_input">
                    <div class="r"><button name="attr_add">Add</button></div>
                </div>
            </td>
        </tr>
        <tr>
            <td>Classes</td>
            <td><textarea name="classes"></textarea></td>
        </tr>
        <tr>
            <td>Style</td>
            <td><textarea name="style"></textarea></td>
        </tr>
        <tr>
            <td>Inner HTML</td>
            <td><textarea name="inner_html"></textarea></td>
        </tr>
        <tr>
            <td colspan="2" style="text-align:end">
                <button name="cancel">Cancel</button>&nbsp;<button name="finnish">Finnish</button>
            </td>
        </tr>
    </table>`;

    let tag = $(`.element_maker${id} input[name=tag]`);
    let attr_list = $(`.element_maker${id} .attr_list`);
    let attr_name = $(`.element_maker${id} input[name=attr_name]`);
    let attr_value = $(`.element_maker${id} input[name=attr_value]`);
    let attr_add = $(`.element_maker${id} button[name=attr_add]`);
    let classes = $(`.element_maker${id} textarea[name=classes]`);
    let style = $(`.element_maker${id} textarea[name=style]`);
    let inner_html = $(`.element_maker${id} textarea[name=inner_html]`);
    let cancel = $(`.element_maker${id} button[name=cancel]`);
    let finnish = $(`.element_maker${id} button[name=finnish]`);
    let target_element = $(`${id}`).getAttribute('target_element');
    target_element = $(`#${target_element}`);
    element = pack_element(target_element);
    refresh_attributes();
    load_element_data();

    tag.onchange = function () {
        element['tag'] = tag.value;
    }

    classes.onchange = function () {
        element['attributes']['class'] = classes.value;
    }
    
    style.onchange = function () {
        let e_style = (style.value).trim().replace('\n', '').split(';');
        for (let s of e_style) {
            let property = s.split(":");
            if (property.length == 2) {
                element['style'][property[0].trim()] = property[1].trim();
            }
        }
        // console.log(element);
    }

    inner_html.onchange = function() {
        element['inner_html'] = inner_html.value;
    }

    cancel.onclick = function () { }
    finnish.onclick = function () {
        element['tag'] = tag.value;
        element['attributes']['class'] = classes.value;
    }

    attr_add.onclick = function () {
        if (!['', 'id', 'class', 'style'].includes(attr_name.value.toLowerCase())) {
            element['attributes'][attr_name.value] = attr_value.value;
            attr_value.value = '';
            attr_name.value = '';
            refresh_attributes();
        }
    }

    function refresh_attributes() {
        attr_list.innerHTML = '';
        for (let i in element['attributes']) {
            attr_list.appendChild(make_attr(i, element['attributes'][i]));
        }
        // console.log(element);
        if (target_element != null) {
            target_element = unpack_element(element);
        }
    }

    function load_element_data() {
        tag.value = element['tag'];
        classes.value = element['class'].join(' ');
        style.value = element['style'].toString();
        inner_html.value = target_element.innerHTML;
    }

    function make_attr(name = '', value = '') {
        let attr = ce('div');
        attr.classList.add('attr');
        let span_name = ce('span');
        let span_value = ce('span');
        let span_delete = ce('span');
        span_value.innerHTML = `<b>value:</b> '${value}'`;
        span_name.innerHTML = `<b>name:</b> '${name}'`;
        span_delete.innerHTML = '&times;';
        span_delete.style.color = "#ff0000";
        span_delete.style.fontWeight = "bold";
        span_delete.style.cursor = "pointer";
        attr.appendChild(span_name);
        attr.appendChild(span_value);
        attr.appendChild(span_delete);

        span_delete.onclick = function () {
            delete element['attributes'][name];
            refresh_attributes();
        }

        return attr;
    }
}

function load_maker() {
    let element_maker_ = $$('.element_maker');
    for (let i of element_maker_) {
        init_element_maker('#' + i.id);
    }
}

window.onload = function() {
    load_maker();
}