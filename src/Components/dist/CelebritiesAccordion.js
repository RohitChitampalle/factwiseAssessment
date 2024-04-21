"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var ExpandMore_1 = require("@mui/icons-material/ExpandMore");
var Delete_1 = require("@mui/icons-material/Delete");
var Edit_1 = require("@mui/icons-material/Edit");
var Remove_1 = require("@mui/icons-material/Remove");
var CelebritiesAccordion = function (_a) {
    var celebrity = _a.celebrity, onDelete = _a.onDelete, expanded = _a.expanded, onChange = _a.onChange;
    var _b = react_1.useState(false), isEditingAge = _b[0], setIsEditingAge = _b[1];
    var _c = react_1.useState(celebrity.dob), dob = _c[0], setDob = _c[1];
    var _d = react_1.useState(calculateAge(celebrity.dob)), age = _d[0], setAge = _d[1];
    function calculateAge(dateOfBirth) {
        var today = new Date();
        var birthDate = new Date(dateOfBirth);
        var age = today.getFullYear() - birthDate.getFullYear();
        var month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    var handleEdit = function () {
        // Check if age is editable (above 18)
        if (calculateAge(dob) >= 18) {
            setIsEditingAge(true);
        }
        else {
            alert("You cannot edit age if the celebrity is under 18 years old.");
        }
    };
    var handleSave = function () {
        setIsEditingAge(false);
        setAge(calculateAge(dob));
        // Update the JSON data with the new date of birth
        // For simplicity, let's assume the JSON data is updated externally
        // You can add your logic here to update the JSON data
    };
    var handleDeleteClick = function () {
        if (window.confirm("Are you sure to delete " + celebrity.first + "?")) {
            onDelete(celebrity.id);
        }
    };
    return (react_1["default"].createElement(material_1.Accordion, { expanded: expanded, onChange: onChange },
        react_1["default"].createElement(material_1.AccordionSummary, { expandIcon: react_1["default"].createElement(react_1["default"].Fragment, null, expanded ? react_1["default"].createElement(Remove_1["default"], null) : react_1["default"].createElement(ExpandMore_1["default"], null)) },
            react_1["default"].createElement(material_1.Typography, null, celebrity.first)),
        react_1["default"].createElement(material_1.AccordionDetails, null,
            react_1["default"].createElement(material_1.Card, { style: { display: 'flex' } },
                react_1["default"].createElement(material_1.CardMedia, { component: "img", sx: { width: 50, height: 50, marginRight: 2, borderRadius: 100 }, image: celebrity.picture, alt: celebrity.first + " " + celebrity.last }),
                react_1["default"].createElement(material_1.CardContent, null,
                    react_1["default"].createElement(material_1.Typography, { gutterBottom: true, variant: "h5", component: "div" },
                        celebrity.first,
                        " ",
                        celebrity.last),
                    react_1["default"].createElement(material_1.Grid, { container: true, spacing: 2 },
                        react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                            react_1["default"].createElement(material_1.Typography, { variant: "body2", color: "text.secondary" },
                                react_1["default"].createElement("strong", null, "Date of Birth:"),
                                isEditingAge ? (react_1["default"].createElement(material_1.TextField, { type: "date", value: dob, onChange: function (e) { return setDob(e.target.value); }, onBlur: handleSave })) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                                    "Age: ",
                                    age)),
                                "\u00A0\u00A0\u00A0",
                                react_1["default"].createElement("strong", null, "Gender:"),
                                " ",
                                celebrity.gender,
                                "\u00A0\u00A0\u00A0",
                                react_1["default"].createElement("strong", null, "Country:"),
                                " ",
                                celebrity.country,
                                react_1["default"].createElement("br", null))),
                        react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                            react_1["default"].createElement(material_1.Typography, { variant: "body2", color: "text.secondary" },
                                react_1["default"].createElement("strong", null, "Description:"),
                                " ",
                                celebrity.description,
                                react_1["default"].createElement("br", null))))),
                react_1["default"].createElement("div", { style: { marginLeft: 'auto', marginTop: 'auto' } },
                    react_1["default"].createElement(material_1.CardActions, null,
                        react_1["default"].createElement(material_1.IconButton, { "aria-label": "edit", onClick: handleEdit, style: { color: 'blue' } },
                            react_1["default"].createElement(Edit_1["default"], null)),
                        react_1["default"].createElement(material_1.IconButton, { "aria-label": "delete", onClick: handleDeleteClick, style: { color: 'red' } },
                            react_1["default"].createElement(Delete_1["default"], null))))))));
};
exports["default"] = CelebritiesAccordion;
