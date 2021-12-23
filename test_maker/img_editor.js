function init_img_editor(id) {
    let img = new Image();
    let img_editor = "div.img_editor#" + id + " ";
    let img_file = document.querySelector(img_editor + "input[name=img_file]");
    let img_show_button = document.querySelector(img_editor + "button[name=img_show_button]");
    let img_ratio = document.querySelector(img_editor + "input[name=img_ratio]");
    let img_ratio_report = document.querySelector(img_editor + "span[name=img_ratio_report]");
    let w = document.querySelector(img_editor + "input[name=img_width]");
    let h = document.querySelector(img_editor + "input[name=img_height]");
    let img_resize_button = document.querySelector(img_editor + "button[name=img_resize_button]");
    let img_title = document.querySelector(img_editor + "input[name=img_title]");
    let img_alt = document.querySelector(img_editor + "input[name=img_title]");
    let img_desc = document.querySelector(img_editor + "textarea[name=img_desc]");
    // let img_update_info_button = document.querySelector(img_editor + "button[name=img_update_info_button]");
    let img_reset_button = document.querySelector(img_editor + "button[name=img_reset_button]");
    let img_finnish_button = document.querySelector(img_editor + "button[name=img_finnish_button]");

    let w_oreginal, h_oreginal;

    let img_description = document.createElement("div");
    img_description.classList.add("img_description");

    img_show_button.onclick = function () {
        var f_reader = new FileReader();
        f_reader.readAsDataURL(img_file.files[0]);
        f_reader.onloadend = function (event) {
            img.src = event.target.result;
            w_oreginal = w.value = img.width;
            h_oreginal = h.value = img.height;
            img_ratio_report.innerHTML = "w " + img.width + "px: h " + img.height + "px"
        }

        show();
    }

    img_resize_button.onclick = function () {
        img.width = w.value;
        img.height = h.value;
    }

    w.onchange = function () {
        if (img_ratio.checked) {
            h.value = Math.round(w.value * img.height / img.width);
        }
        img_ratio_report.innerHTML = "w " + img.width + "px: h " + img.height + "px";
    }

    h.onchange = function () {
        if (img_ratio.checked) {
            w.value = Math.round(h.value * img.width / img.height);
        }
        img_ratio_report.innerHTML = "w " + img.width + "px: h " + img.height + "px";
    }

    function update_info() {
        img.alt = img_alt.value;
        img_description.innerHTML = "<b>" + img_title.value + "</b> ";
        img_description.innerHTML += "(" + img_desc.value + ")";
    }

    img_title.onchange = function () {
        update_info();
    }

    img_alt.onchange = function () {
        update_info();
    }

    img_desc.onchange = function () {
        update_info();
    }

    // img_update_info_button.onclick = function() {
    //     update_info();
    // }

    img_reset_button.onclick = function () {
        w.value = img.width = w_oreginal;
        h.value = img.height = h_oreginal;
    }

    img_finnish_button.onclick = function () {
        show_(img_container);
        save_2_localstorage();
    }

    let img_editor_preview = document.querySelector("div.img_editor_preview[for=" + id + "]");
    let img_container = document.querySelector("div.img_container[for=" + id + "]");

    img.addEventListener("resize", function () {
        // w.value = img.width = img_editor_preview.width;
        // h.value = img.height = img_editor_preview.height;
    });

    function show_(e) {
        if (e != null) {
            e.innerHTML = "";
            e.appendChild(img.cloneNode(true));
            e.appendChild(img_description.cloneNode(true));
        }
    }

    function save_2_localstorage() {
        let e = document.createElement("div");
        e.appendChild(img.cloneNode(true));
        e.appendChild(img_description.cloneNode(true));
        window.localStorage.setItem(id, e.innerHTML);
    }

    function show() {
        show_(img_editor_preview);
        // show_(img_container);
    }

    // if (img_editor_preview != null) {
    //     //display the result in the preview
    //     img_editor_preview.innerHTML = "";
    //     img_editor_preview.appendChild(img);
    //     img_editor_preview.appendChild(img_description);
    // }

    // if (img_container != null) {
    //     //display the result in the preview
    //     img_container.innerHTML = "";
    //     img_container.appendChild(img);
    //     img_container.appendChild(img_description);
    // }
}

// function get_img_data() {

// }

function make_img_editor(id) {
    let tb = document.createElement("table");
    tb.innerHTML = `
            <tr>
                <td><input type="file" name="img_file" accept=".png, .jpg, .jpeg .gif"></td>
                <td><button name="img_show_button">Show</button></td>
            </tr>
            <tr>
                <td colspan="2"><span name="img_ratio_report"></span></td>
            </tr>
            <tr>
                <td>Keep ratio</td>
                <td><input type="checkbox" name="img_ratio" checked></td>
            </tr>
            <tr>
                <td>Width</td>
                <td><input type="number" name="img_width"></td>
            </tr>
            <tr>
                <td>Height</td>
                <td><input type="number" name="img_height"></td>
            </tr>
            <tr>
                <td colspan="2"><button name="img_resize_button">Resize</button></td>
            </tr>
            <tr>
                <td>Image title</td>
                <td><input type="text" name="img_title"></td>
            </tr>
            <tr>
                <td>Image alt</td>
                <td><input type="text" name="img_alt"></td>
            </tr>
            <tr>
                <td colspan="2"><textarea name="img_desc"></textarea></td>
            </tr>
            <tr>
                <td><button name="img_reset_button">Reset</button></td>
                <td><button name="img_finnish_button">Finnish</button></td>
            </tr>
            `;
    document.querySelector("div.img_editor#" + id + "").appendChild(tb);
}

let img_editors = document.querySelectorAll("div.img_editor");

for (let i = 0; i < img_editors.length; i++) {
    make_img_editor(img_editors[i].id);
    init_img_editor(img_editors[i].id);
}