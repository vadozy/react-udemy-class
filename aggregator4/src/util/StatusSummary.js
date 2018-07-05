import C from './constants';

class StatusSummary {
    constructor(len) {
        this[C.AGG_STATUS_ALL]        = new StatusSummaryRow(len);
        this[C.AGG_STATUS_AGGREGATED] = new StatusSummaryRow(len);
        this[C.AGG_STATUS_READY]      = new StatusSummaryRow(len);
        this[C.AGG_STATUS_PROGRESS]   = new StatusSummaryRow(len);
        this[C.AGG_STATUS_REJECTED]   = new StatusSummaryRow(len);
        this[C.AGG_STATUS_NOT_LOADED] = new StatusSummaryRow(len);
    }

    clearAllSelections () {
        [C.AGG_STATUS_ALL, C.AGG_STATUS_AGGREGATED, C.AGG_STATUS_READY, C.AGG_STATUS_PROGRESS, C.AGG_STATUS_REJECTED, C.AGG_STATUS_NOT_LOADED].forEach(s => {
            this[s].countsPerSleeveSelected = [...Array(this[s].countsPerSleeveSelected.length)].map(el => false);
            this[s].totalSelected = false;
        });
    }
}

class StatusSummaryRow {
    constructor(len) {
        this.countsPerSleeve = [...Array(len)].map(el => 0); // the array order must match sleeve array order
        this.countsPerSleeveSelected = [...Array(len)].map(el => false); // set to true when user selects this cell

        this.total = 0;
        this.totalSelected = false; // set to true when user selects this cell
    }
}

export default StatusSummary;
