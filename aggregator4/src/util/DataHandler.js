/* Sorts, Filters and otherwise processes the aggregator rows */
import C from './constants';
import StatusSummary from './StatusSummary';

class DataHandler {

    computeStatusSummary(rows) {

        if (rows.length === 0) return {};

        const len = rows[0].rowData.length; // must match the number of sleeves
        const ret = new StatusSummary(len);

        rows.forEach( r => { // r - row
            ret[C.AGG_STATUS_ALL].total += 1;

            switch(r.total.status) {
                case C.AGG_STATUS_AGGREGATED:
                    ret[C.AGG_STATUS_AGGREGATED].total += 1;
                    break;
                case C.AGG_STATUS_READY:
                    ret[C.AGG_STATUS_READY].total += 1;
                    break;
                case C.AGG_STATUS_PROGRESS:
                    ret[C.AGG_STATUS_PROGRESS].total += 1;
                    break;
                case C.AGG_STATUS_REJECTED:
                    ret[C.AGG_STATUS_REJECTED].total += 1;
                    break;
                case C.AGG_STATUS_NOT_LOADED:
                    ret[C.AGG_STATUS_NOT_LOADED].total += 1;
                    break;
                default:
                    break;
            }

            r.rowData.forEach((c, i) => { // c - cell, i - index
                switch(c.status) {
                    case C.AGG_STATUS_AGGREGATED:
                        ret[C.AGG_STATUS_ALL].countsPerSleeve[i] += 1;
                        ret[C.AGG_STATUS_AGGREGATED].countsPerSleeve[i] += 1;
                        break;
                    case C.AGG_STATUS_READY:
                        ret[C.AGG_STATUS_ALL].countsPerSleeve[i] += 1;
                        ret[C.AGG_STATUS_READY].countsPerSleeve[i] += 1;
                        break;
                    case C.AGG_STATUS_PROGRESS:
                        ret[C.AGG_STATUS_ALL].countsPerSleeve[i] += 1;
                        ret[C.AGG_STATUS_PROGRESS].countsPerSleeve[i] += 1;
                        break;
                    case C.AGG_STATUS_REJECTED:
                        ret[C.AGG_STATUS_ALL].countsPerSleeve[i] += 1;
                        ret[C.AGG_STATUS_REJECTED].countsPerSleeve[i] += 1;
                        break;
                    case C.AGG_STATUS_NOT_LOADED:
                        ret[C.AGG_STATUS_ALL].countsPerSleeve[i] += 1;
                        ret[C.AGG_STATUS_NOT_LOADED].countsPerSleeve[i] += 1;
                        break;
                    default:
                        break;
                }
            });
        });

        return ret;
    }

    reconcileStatusSummarySelections(statusSummary, statusJustClicked, iJustClicked, isTotalJustClicked) {
        const cnt = statusSummary[C.AGG_STATUS_ALL].countsPerSleeve.length;

        if (isTotalJustClicked) {
            if (statusJustClicked === C.AGG_STATUS_ALL 
                    && statusSummary[C.AGG_STATUS_ALL].totalSelected) {
                statusSummary.clearAllSelections();
                statusSummary[C.AGG_STATUS_ALL].totalSelected = true;
            } else if (statusJustClicked !== C.AGG_STATUS_ALL) {
                statusSummary[C.AGG_STATUS_ALL].totalSelected = false;
            }

            return;
        }

        statusSummary[C.AGG_STATUS_ALL].totalSelected = false;

        for (let i = 0; i < cnt; i++) {
            if (statusJustClicked === C.AGG_STATUS_ALL 
                    && iJustClicked === i 
                    && statusSummary[C.AGG_STATUS_ALL].countsPerSleeveSelected[i]) {
                statusSummary[C.AGG_STATUS_AGGREGATED].countsPerSleeveSelected[i] = false;
                statusSummary[C.AGG_STATUS_READY].countsPerSleeveSelected[i] = false;
                statusSummary[C.AGG_STATUS_PROGRESS].countsPerSleeveSelected[i] = false;
                statusSummary[C.AGG_STATUS_REJECTED].countsPerSleeveSelected[i] = false;
                statusSummary[C.AGG_STATUS_NOT_LOADED].countsPerSleeveSelected[i] = false;
            } else if (statusJustClicked !== C.AGG_STATUS_ALL
                    && iJustClicked === i) {
                statusSummary[C.AGG_STATUS_ALL].countsPerSleeveSelected[i] = false;
            }
        }

    }

    sortAndFilter(rows, statusSummary, sortedBy, sidebarState) {
        // PROFILING -> const t0 = performance.now();

        let ret = [...rows]; // copy array

        // filter the rows
        ret = ret.filter(row => this._showRow(row, statusSummary, sidebarState.security));

        // sort the rows in-place
        if (sortedBy.index > -1) {
            this._sortBySleeve(ret, sortedBy, sidebarState); 
        }
        
        //console.log(ret);

        // PROFILING -> const t1 = performance.now();
        // PROFILING -> console.log("sortAndFilter took " + (t1 - t0) + " milliseconds.")

        return ret;
    }

    _showRow(row, statusSummary, security) {

        const s = security.trim();
        if (s.length > 0 && String(row.uid).indexOf(s) < 0 && row.symbol.toUpperCase().indexOf(s.toUpperCase()) < 0) {
            return false;
        }

        const otherStatuses = [C.AGG_STATUS_AGGREGATED, C.AGG_STATUS_READY, C.AGG_STATUS_PROGRESS, C.AGG_STATUS_REJECTED, C.AGG_STATUS_NOT_LOADED];

        if (statusSummary[C.AGG_STATUS_ALL].totalSelected) return true;

        for (let i in otherStatuses) {
            const s = otherStatuses[i];
            if (statusSummary[s].totalSelected && row.total.status === s) return true;
        }

        for (let j in row.rowData) {
            if (statusSummary[C.AGG_STATUS_ALL].countsPerSleeveSelected[j] && row.rowData[j].status !== null) return true;

            for (let i in otherStatuses) {
                const s = otherStatuses[i];
                if (statusSummary[s].countsPerSleeveSelected[j] && row.rowData[j].status === s) return true;
            }
        }

        return false;
    }

    /*
     * In place sorting of rows
     */
    _sortBySleeve(rows, sortedBy, sidebarState) {

        const i = sortedBy.index;
        const s = sidebarState.dataGridContent;

        rows.sort((a, b) => {
            let v1 = a.rowData[i][s];
            let v2 = b.rowData[i][s];

            const huge = 9999999; // just a big number

            // push nulls to the bottom
            if (sortedBy.ascending) {
                v1 = v1 === null ? huge : v1;
                v2 = v2 === null ? huge : v2;
            } else {
                v1 = v1 === null ? -huge : v1;
                v2 = v2 === null ? -huge : v2;
            }
            
            if (sortedBy.ascending) {
                return v1 - v2;
            } else {
                return v2 - v1;
            }  
        });
    }

}

export default new DataHandler();
