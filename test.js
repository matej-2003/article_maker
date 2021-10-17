let test = `<div class="site_preview">
<div class="preview_container">
    <div class="settings">
        <span class="advance">settings&#9881;</span>
        <br>
        <span class="edit">edit</span>
    </div>
    <div class="editor">
        <textarea></textarea>
    </div>
    <p class="preview">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur officia expedita praesentium
        modi id ipsam esse nobis autem amet quasi repudiandae possimus exercitationem voluptates laudantium
        sunt, ea aut quos ratione!em
    </p>
</div>
</div>`;


let options = `    <div class="add_element">
<select name="" id="">
    <option value="title">Page Title</option>
    <option value="header">Page Header</option>
    <option value="h">Subtitle</option>
    <option value="p">Paragraph</option>
    <option value="img">Image</option>
    <option value="left_box">Image (left) and Paragraph (right)</option>
    <option value="right_box">Paragraph (left) and Image (right)</option>
</select>
<button>Add</button>
</div>`;


let site_preview = document.querySelector('div.site_preview');

function load_preview_container(i) {
    let settings = document.querySelectorAll('.preview_container .settings')[i];
    let editor = document.querySelectorAll('.preview_container .editor')[i];
    let editor_form = document.querySelectorAll('.preview_container .editor textarea')[i];
    let preview = document.querySelectorAll('.preview_container .preview')[i];

    settings.onclick = function () {
        let data = preview.innerText;
        if (preview.style.display == "") {
            editor_form.value = data;
            editor.style.display = "block";
            preview.style.display = "none";
        } else {
            preview.innerText = editor_form.value;
            editor.style.display = "none";
            preview.style.display = "";
        }
    }
}

function load() {
    let preview_containers = document.querySelectorAll("div.preview_container");

    for (let i = 0; i < preview_containers.length; i++) {
        load_preview_container(i);
    }
}

let element_editor = document.querySelector("div.element_editor");
let element_selector = document.querySelector("div.element_editor select");
let add_button = document.querySelector("div.element_editor button");

add_button.onclick = function () {
    let e = element_selector.value;

    switch (e) {
        case 'title':
            make_title();
            break;

        case 'header':
            make_header();
            break;

        case 'h':
            make_subtitle();
            break;

        case 'p':
            make_paragraph();
            break;

        case 'img':
            make_img();
            break;

        case 'lbox':
            make_lbox();
            break;

        case 'rbox':
            make_rbox();
            break;
    }
}

function make_title() { }
function make_header() { }
function make_subtitle() { }
function make_paragraph() {
    let html = `
    <div class="preview_container">
        <span class="settings">
            <span class="edit">edit</span>
        </span>
        <div class="editor">
            <textarea></textarea>
        </div>
        <p class="preview"></p>
    </div>`;

    site_preview.innerHTML += html;
    load();
}
function make_img() { }
function make_lbox() { }
function make_rbox() { }

load();