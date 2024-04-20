"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var SearchBar = function (_a) {
    var onSearch = _a.onSearch;
    var _b = react_1.useState(''), searchQuery = _b[0], setSearchQuery = _b[1];
    var handleSearchChange = function (event) {
        setSearchQuery(event.target.value);
        onSearch(event.target.value);
    };
    return (react_1["default"].createElement(material_1.TextField, { label: "Search by First Name", variant: "outlined", value: searchQuery, onChange: handleSearchChange }));
};
exports["default"] = SearchBar;
