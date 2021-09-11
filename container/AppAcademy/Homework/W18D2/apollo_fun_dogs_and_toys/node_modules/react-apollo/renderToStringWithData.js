"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getDataFromTree_1 = require("./getDataFromTree");
function renderToStringWithData(component) {
    return getDataFromTree_1.getMarkupFromTree({
        tree: component,
        renderFunction: require("react-dom/server").renderToString,
    });
}
exports.renderToStringWithData = renderToStringWithData;
//# sourceMappingURL=renderToStringWithData.js.map