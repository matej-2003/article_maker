class TableEditor {
    constructor(cols, rows) {
        this.table = ce('table');
        // this.inputs = [];

        for (let i = 0; i < rows; i++) {
            let row = this.table.insertRow(-1);
            // this.inputs[i] = [];
            for (let j = 0; j < cols; j++) {
                let cell = row.insertCell(-1);
                cell.append(ce('input'));
            }
        }
    }
}