function make_modal(id) {
    let modal = $(`div.modal#${id}`);
    let modal_content = $(`div.modal#${id} div.modal_content`);
    let open_btn = $(`[for=${id}]`);
    let close_btn = ce('span');
    close_btn.classList.add('modal_close');
    close_btn.innerHTML = '&times;';
    modal_content.insertBefore(close_btn, modal_content.childNodes[0]);

    if (open_btn != null) {
        open_btn.onclick = function() {
            modal.style.display = 'block';
        }
    }

    close_btn.onclick = function() {
        modal.style.display = 'none';
    }

    modal.onclick = function(event) {
        if (event.target == modal && event.target != modal_content) {
            modal.style.display = 'none';
        }
    }
}

function start_modal(id) {
    document.getElementById(id).style.display = 'block';
}

function stop_modal(id) {
    document.getElementById(id).style.display = 'none';
}

// let modals = $$('div.modal:not([modal_type=DYNAMIC_MODAL])');
let modals = $$('div.modal');


for (let i = 0; i < modals.length; i++) {
    make_modal(modals[i].id);
}