import C from './constants';

const MAX_ROWS_TO_GENERATE = 4000;

class MockDataGenerator {

  // Next are nimulti sleeves tas samples
  SLEEVES_POOL = ["bondmo", "conc", "dislo", "eafesmmn", "eco", "emmn_ucits", "europefsa", "europemn", "fsa", "inlvol", "japanmn", "jfsa", "reits", "retail", "scahedge", "styleeur", "stylemo", "tidea", "value", "worldmn", "wskew", "www"];

  data = {
    sleeves: [], // array of objects like {name: 'sleeve1', weight: 0.2, status: 'NOT AVAILABLE'}
    rows: []
  };

  getData(portfolio) {

    const sleeves = this.generateSleevesForPortfolio(portfolio);
    let weights = this.generateSleevesWeights(sleeves.length);
    const disabled = sleeves.map(() => Math.random() < 0.1 ? C.SLEEVE_DISABLED: null);
    weights = weights.map((el, i) => disabled[i] === C.SLEEVE_DISABLED ? null : el); // nullify disabled weights

    this.data.sleeves = sleeves.map((s, i) => ({name: s, weight: weights[i], status: disabled[i]}));

    this.data.rows = this.generateRows();

    return this.data;
  }

  generateSleevesWeights(n) {
    const ret = [];

    let max = 200;

    let runningSum = 0;
    for (let i = 0; i < n; i++) {
      let weight = Math.floor(Math.random() * max / 2);
      ret.push(weight / 10);
      runningSum += weight;
      max = (1000 - runningSum) / 1.7;
    }

    return ret;
  }

  generateSleeves(n) {
  	const ret = [];

    for (let i = 0; i < n; i++) {
      let ind = Math.floor(Math.random() * this.SLEEVES_POOL.length);
      ret.push(this.SLEEVES_POOL[ind] + i);
    }

  	return ret;
  }

  generateSleevesForPortfolio(p) {

    if (p === '10sleeves') {
      return this.generateSleeves(10);
    } else if (p === 'nimulti-east') {
      return [...this.SLEEVES_POOL];
    } else if (p === 'nimulti-west') {
      return [...this.SLEEVES_POOL];
    } else if (p === '30sleeves') {
      return this.generateSleeves(30);
    } else if (p === '50sleeves') {
      return this.generateSleeves(50);
    } else if (p === '70sleeves') {
      return this.generateSleeves(70);
    } else if (p === '100sleeves') {
      return this.generateSleeves(100);
    }

  }

  generateUID(i) {
    //return Math.floor(Math.random() * 500000) + 100000;
    return 500001 + i;
  }

  generateSymbol() {

    let ret = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < 4; i++) {
      ret += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    if (Math.random() < 0.2) {
      ret = ret + ".XY"
    }

    return ret;

  }

  generateNameForSymbol(s) {
    let ret = "Name for " + s;

    if (Math.random() < 0.2) {
      ret = ret + " long name, very long";
    }

    return ret;
  }

  generateCellValue(status, disabled) {

    const ret = {
      status: null
    };

    ret[C.SIDEBAR_SLEEVE_EOD_WEIGHT] = null;
    ret[C.SIDEBAR_SLEEVE_TRADE] = null;
    ret[C.SIDEBAR_SLEEVE_EOD_WEIGHT_CONTRIB] = null;
    ret[C.SIDEBAR_SLEEVE_TRADE_CONTRIB] = null;

    if (!disabled && Math.random() < 0.2) {
        ret.status = this.generateStatus(status);

        if (ret.status !== C.AGG_STATUS_NOT_LOADED) {        
          const max = 500;
          ret[C.SIDEBAR_SLEEVE_EOD_WEIGHT] = Math.floor(Math.random() * max) - Math.floor(max / 3);
          ret[C.SIDEBAR_SLEEVE_TRADE] = Math.floor(Math.random() * max) - Math.floor(max / 3);
          ret[C.SIDEBAR_SLEEVE_EOD_WEIGHT_CONTRIB] = Math.floor(Math.random() * max) - Math.floor(max / 3);
          ret[C.SIDEBAR_SLEEVE_TRADE_CONTRIB] = Math.floor(Math.random() * max) - Math.floor(max / 3);
        }
    }

    return ret;

  }

  generateStatus(status) {
    const statuses = [C.AGG_STATUS_AGGREGATED, C.AGG_STATUS_READY, C.AGG_STATUS_PROGRESS, C.AGG_STATUS_REJECTED, C.AGG_STATUS_NOT_LOADED];
    const maxInd = statuses.indexOf(status) + 1;
    let ind = Math.floor(Math.random() * maxInd);

    if (status !== C.AGG_STATUS_AGGREGATED && ind === 0) ind += (1 + Math.floor(Math.random() * 4));

    return statuses[ind];
  }

  generateRows() {
    const ret = [];

    let row = null;
    for (let i = 0; i < MAX_ROWS_TO_GENERATE; i++) {
      row = {};
      row.uid = this.generateUID(i);
      row.currency = "USD";
      row.symbol = this.generateSymbol();
      row.bb = row.symbol.substring(0, 4) + " US";
      row.name = this.generateNameForSymbol(row.symbol);

      row.rowData = this.generateRowData();

      const totalStatus = this.computeTotalStatus(row.rowData);

      if (totalStatus === "") continue;

      row.total = {
        value: Math.floor(row.rowData.map(el => Number(el[C.SIDEBAR_SLEEVE_EOD_WEIGHT])).reduce((total, el, idx) => total + el * this.data.sleeves[idx].weight / 100)),
        status: totalStatus
      };
      row.trade = Math.floor(row.rowData.map(el => Number(el[C.SIDEBAR_SLEEVE_TRADE])).reduce((total, el, idx) => total + el * this.data.sleeves[idx].weight  / 100));
      row.portfolio = row.total.value - row.trade;

      row.selected = false; // not a server data, used in browser only
      row.reactComponent = null; // when the Tr react component is rendered it attaches itself here

      ret.push(row);
    }

    return ret;
  }

  computeTotalStatus(c) {
    let ret = '';

    let notLoadedFound = false;
    let rejectFound = false;
    let inProgressFound = false;
    let approvedFound = false;
    let aggregatedFound = false;

    c.forEach(el => {
      if (el.status === C.AGG_STATUS_AGGREGATED) aggregatedFound = true;
      if (el.status === C.AGG_STATUS_READY) approvedFound = true;
      if (el.status === C.AGG_STATUS_PROGRESS) inProgressFound = true;
      if (el.status === C.AGG_STATUS_REJECTED) rejectFound = true;
      if (el.status === C.AGG_STATUS_NOT_LOADED) notLoadedFound = true;
    });

    if (aggregatedFound) ret = C.AGG_STATUS_AGGREGATED;
    if (approvedFound) ret = C.AGG_STATUS_READY;
    if (inProgressFound) ret = C.AGG_STATUS_PROGRESS;
    if (rejectFound) ret = C.AGG_STATUS_REJECTED;
    if (notLoadedFound) ret = C.AGG_STATUS_NOT_LOADED;

    return ret;
  }

  generateRowData() {
    const ret = [];

    const statuses = [C.AGG_STATUS_AGGREGATED, C.AGG_STATUS_READY, C.AGG_STATUS_PROGRESS, C.AGG_STATUS_REJECTED, C.AGG_STATUS_NOT_LOADED];
    let randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    for (let i = 0; i < this.data.sleeves.length; i++) {
      let cell = this.generateCellValue(randomStatus, this.data.sleeves[i].status === C.SLEEVE_DISABLED);
      ret.push(cell);
    }

    return ret;
  }


}

export default new MockDataGenerator();
