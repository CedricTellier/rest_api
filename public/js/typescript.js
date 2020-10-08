"use strict";
var HEROKU_URL = "https://restapitellierc.herokuapp.com/";
var HEROKU_EMPLOYEE_URL = HEROKU_URL.concat("employees/");
var REQ_HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Access-Control-Allow-Origin': '*'
};
;
function createNewEmployee() {
    var config = {
        'lastname': document.getElementById("lastname").value,
        'firstname': document.getElementById("firstname").value,
        'business': document.getElementById("business").options[document.getElementById("business").selectedIndex].value
    };
    if (!config.business.length || !config.lastname.length) {
        return alert('Le prénom ou le nom de famille est manquant, merci de la compléter!');
    }
    var formBody = createBodyRequest(config);
    fetch(HEROKU_EMPLOYEE_URL, {
        method: "POST" /* POST */,
        headers: REQ_HEADERS,
        body: formBody,
    })
        .then(function (response) { return console.log(response); })
        .catch(function (error) { return console.log(error); });
    getAllEmployees(config.business.concat("/"));
}
function deleteEmployee(row) {
    var id = row.dataset.id;
    var business = JSON.parse(row.dataset.employee).business;
    if (id !== null || id !== 'undefined') {
        fetch(HEROKU_EMPLOYEE_URL + id, {
            method: "DELETE" /* DELETE */,
        })
            .then(function (response) { return console.log(response); })
            .catch(function (error) { return console.log(error); });
    }
    getAllEmployees(business.concat("/"));
}
function launchModify(row) {
    var json = JSON.parse(row.dataset.employee);
    document.getElementById("employeeId").value = json._id;
    document.getElementById("firstnameModify").value = json.firstname;
    document.getElementById("lastnameModify").value = json.lastname;
    selectElement("businessModify", json.business);
}
function modifyEmployee() {
    var id = document.getElementById("employeeId").value;
    var config = {
        'firstname': document.getElementById("firstnameModify").value,
        'lastname': document.getElementById("lastnameModify").value,
        'business': document.getElementById("businessModify").options[document.getElementById("businessModify").selectedIndex].value
    };
    var bodyRequest = createBodyRequest(config);
    fetch(HEROKU_EMPLOYEE_URL, {
        method: "POST" /* POST */,
        headers: REQ_HEADERS,
        body: bodyRequest,
    })
        .then(function (response) { return console.log(response); })
        .catch(function (error) { return console.log(error); });
    document.getElementById("cancelModify").click();
    getAllEmployees(config.business.concat("/"));
}
function selectElement(id, valueToSelect) {
    document.getElementById(id).value = valueToSelect;
}
function getAllEmployees(business) {
    if (business === void 0) { business = ""; }
    var url = "";
    if (business == null) {
        url = HEROKU_EMPLOYEE_URL;
    }
    else {
        url = HEROKU_URL + business + "employees";
    }
    fetch(url).then(function (response) {
        response.json().then(function (json) {
            var table = (document.getElementById("mytTable"));
            clearTableVIew(table);
            populateTableView(table, json);
        });
    });
}
function clearTableVIew(table) {
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
}
function populateTableView(table, json) {
    for (var i = 0; i < json.length; i++) {
        var obj = json[i];
        var row = table.insertRow(-1);
        for (var j = 0; j < 6; j++) {
            var cell = row.insertCell(j);
            if (i > 6) {
                var valueCell = document.createTextNode(obj.selectedIndex(j));
                cell.appendChild(valueCell);
            }
            else {
                cell.innerHTML = '<a class="btn btn-warning" onclick="launchModify(this)" data-employee=' + JSON.stringify(obj) + ' role="button" data-toggle="modal" data-target="#modifyModal">Modify</a><a class="btn btn-danger" style="margin-left:10px" onclick="deleteEmployee(this)" data-id=' + obj._id + ' role="button">Delete</a>';
            }
        }
    }
}
function createBodyRequest(config) {
    var body;
    for (var property in config) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(config[property]);
        body.push(encodedKey + "=" + encodedValue);
    }
    body = body.join("&");
    return body;
}
;
