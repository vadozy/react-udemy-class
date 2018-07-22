class Constants {

    /* 
     * The constant values are those coming from the server JSON 
     * Keep them here in one place to be able to change easily
     */

    /* Sidebar Data Grid Content */
    SIDEBAR_SLEEVE_EOD_WEIGHT = 'Sleeve_EOD_Weight';
    SIDEBAR_SLEEVE_TRADE = 'Sleeve_Trade';
    SIDEBAR_SLEEVE_EOD_WEIGHT_CONTRIB = 'Sleeve_EOD_Weight_Contrib';
    SIDEBAR_SLEEVE_TRADE_CONTRIB = 'Sleeve_Trade_Contrib';

    /* Aggregation Status */
    AGG_STATUS_ALL = 'Agg_Status_All';
    AGG_STATUS_AGGREGATED = 'Agg_Status_Aggregated';
    AGG_STATUS_READY = 'Agg_Status_Ready_For_Aggregation';
    AGG_STATUS_PROGRESS = 'Agg_Status_In_Progress';
    AGG_STATUS_REJECTED = 'Agg_Status_Rejected';
    AGG_STATUS_NOT_LOADED = 'Agg_Status_Not_Loaded';

    SIDEBAR_SLEEVE_TITLE = {}; // mapping from Sidebar Data Grid Content received from server to HTML Table Title

    AGG_STATUS_CSS_COLOR = {}; // mapping from status received from server to CSS color

    constructor() {
        this.SIDEBAR_SLEEVE_TITLE[this.SIDEBAR_SLEEVE_EOD_WEIGHT]         = "Sleeve EOD Weight";
        this.SIDEBAR_SLEEVE_TITLE[this.SIDEBAR_SLEEVE_TRADE]              = "Sleeve Trade";
        this.SIDEBAR_SLEEVE_TITLE[this.SIDEBAR_SLEEVE_EOD_WEIGHT_CONTRIB] = "Sleeve EOD Weight (Contrib)";
        this.SIDEBAR_SLEEVE_TITLE[this.SIDEBAR_SLEEVE_TRADE_CONTRIB]      = "Sleeve Trade (Contrib)";

    	this.AGG_STATUS_CSS_COLOR[this.AGG_STATUS_AGGREGATED] = "aggregated";
    	this.AGG_STATUS_CSS_COLOR[this.AGG_STATUS_READY]      = "approved";
    	this.AGG_STATUS_CSS_COLOR[this.AGG_STATUS_PROGRESS]   = "in-progress";
    	this.AGG_STATUS_CSS_COLOR[this.AGG_STATUS_REJECTED]   = "reject";
    	this.AGG_STATUS_CSS_COLOR[this.AGG_STATUS_NOT_LOADED] = "not-loaded";
    }

}

export default new Constants();
