class MockDataGenerator {

  // Next are nimulti sleeves to populate state from
  SLEEVES = ["bondmo", "conc", "dislo", "eafesmmn", "eco", "emmn_ucits", "europefsa", "europemn", "fsa", "inlvol", "japanmn", "jfsa", "reits", "retail", "scahedge", "styleeur", "stylemo", "tidea", "value", "worldmn", "wskew", "www", "test1", "test2"];

  state = {

    multisleeve: {
      portfolios: ['10sleeves', 'nimulti', '30sleeves', '50sleeves', '70sleeves', '100sleeves'], // portfolios drop-down values
      portfolio: 'nimulti', // portfolios drop-down currently selected value
      countries: ['East', 'West', 'Some very long contry name'], // countries drop-down values
      country: 'West', // countries drop-down currently selected value
    },

    filters: {

      security: null,

      all: true,
      allCount: 1900,

      aggregated: false,
      aggregatedCount: 1000,

      ready: false,
      readyCount: 500,

      progress: false,
      progressCount: 250,

      rejected: false,
      rejectedCount: 150,

      selectedSleeves: [],

    },

    data: {
      sleeves: [],
      weights: [],
      rows: []
    }

  };

  init(portfolio) {
    this.state.multisleeve.portfolio = portfolio;
    this.state.data.sleeves = this.generateSleevesForPortfolio(portfolio);
    this.state.data.weights = this.generateSleevesWeights();
    this.state.data.rows = this.generateRows();

    return this;
  }

  generateSleevesWeights() {
    const ret = [];
    console.log(this.state);
    const n = this.state.data.sleeves.length;

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
      let ind = Math.floor(Math.random() * this.SLEEVES.length);
      ret.push(this.SLEEVES[ind] + i);
    }

  	return ret;
  }

  generateSleevesForPortfolio(p) {

    if (p === '10sleeves') {
      return this.generateSleeves(10);
    } else if (p === 'nimulti') {
      return [...this.SLEEVES];
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

  generateUID() {
    return Math.floor(Math.random() * 500000) + 100000;
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

  generateCellValue(status) {

    const ret = {
      status: null,
      value: null
    };

    if (Math.random() < 0.2) {
        ret.status = this.generateStatus(status);
        const max = 500;
        ret.value = Math.floor(Math.random() * max) - Math.floor(max / 3);
    }

    return ret;

  }

  generateStatus(status) {
    const statuses = ["aggregated", "approved", "in-progress", "reject"];
    const maxInd = statuses.indexOf(status) + 1;
    let ind = Math.floor(Math.random() * maxInd);

    if (status !== "aggregated" && ind === 0) ind++;

    return statuses[ind];
  }

  generateRows() {
    const ret = [];

    let row = null;
    for (let i = 0; i < 10000; i++) {
      row = {};
      row.uid = this.generateUID();
      row.currency = "USD";
      row.symbol = this.generateSymbol();
      row.bb = row.symbol.substring(0, 4) + " US";
      row.name = this.generateNameForSymbol(row.symbol);

      row.rowData = this.generateRowData();

      const totalStatus = this.computeTotalStatus(row.rowData);

      row.total = {
        value: 42,
        status: totalStatus
      };
      row.portfolio = "what?"
      row.trade = "???"

      ret.push(row);
    }

    return ret;
  }

  computeTotalStatus(c) {
    let ret = '';

    let rejectFound = false;
    let inProgressFound = false;
    let approvedFound = false;
    let aggregatedFound = false;

    c.forEach(el => {
      if (el.status === "aggregated") aggregatedFound = true;
      if (el.status === "approved") approvedFound = true;
      if (el.status === "in-progress") inProgressFound = true;
      if (el.status === "reject") rejectFound = true;
    });

    if (aggregatedFound) ret = "aggregated";
    if (approvedFound) ret = "approved";
    if (inProgressFound) ret = "n-progress";
    if (rejectFound) ret = "reject";

    return ret;
  }

  generateRowData() {
    const ret = [];

    const statuses = ["aggregated", "approved", "in-progress", "reject"];
    let randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    for (let i = 0; i < this.state.data.sleeves.length; i++) {
      let cell = this.generateCellValue(randomStatus);
      ret.push(cell);
    }

    return ret;
  }


}

export default new MockDataGenerator();