"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CelebritiesAccordion_1 = require("./Components/CelebritiesAccordion");
var SearchBar_1 = require("./Components/SearchBar");
var celebrities_json_1 = require("./celebrities_data/celebrities.json");
var App = function () {
    var _a = react_1.useState(celebrities_json_1["default"]), celebrities = _a[0], setCelebrities = _a[1];
    var _b = react_1.useState(celebrities_json_1["default"]), filteredCelebrities = _b[0], setFilteredCelebrities = _b[1];
    var _c = react_1.useState(null), expandedId = _c[0], setExpandedId = _c[1];
    var handleDelete = function (id) {
        var updatedCelebrities = celebrities.filter(function (celebrity) { return celebrity.id !== id; });
        setCelebrities(updatedCelebrities);
        setFilteredCelebrities(updatedCelebrities);
    };
    var handleSearch = function (query) {
        var filteredList = celebrities.filter(function (celebrity) {
            return celebrity.first.toLowerCase().includes(query.toLowerCase());
        });
        setFilteredCelebrities(filteredList);
    };
    var handleAccordionChange = function (id) {
        setExpandedId(id);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("h1", null, "Celebrities"),
        react_1["default"].createElement(SearchBar_1["default"], { onSearch: handleSearch }),
        filteredCelebrities.map(function (celebrity, index) { return (react_1["default"].createElement(CelebritiesAccordion_1["default"], { key: index, celebrity: celebrity, onDelete: handleDelete, expanded: celebrity.id === expandedId, onChange: function () { return handleAccordionChange(celebrity.id === expandedId ? null : celebrity.id); } })); })));
};
exports["default"] = App;
