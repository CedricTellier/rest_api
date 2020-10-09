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
    var formData = new FormData(document.getElementById('login-form'));
    fetch(HEROKU_EMPLOYEE_URL, {
        method: "POST" /* POST */,
        headers: REQ_HEADERS,
        body: formData,
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
            console.log(json);
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
        for (var j = 0; j < 7; j++) {
            var cell = row.insertCell(j);
            if (j < 6) {
                var value = "";
                switch (j) {
                    case 0:
                        value = obj.id;
                        break;
                    case 1:
                        value = obj.firstname;
                        break;
                    case 2:
                        value = obj.lastname;
                        break;
                    case 3:
                        value = obj.business;
                        break;
                    case 4:
                        value = obj.birth_date;
                        break;
                    case 5:
                        value = obj.created_date;
                        break;
                }
                var valueCell = document.createTextNode(value);
                cell.appendChild(valueCell);
            }
            else {
                cell.innerHTML = '<a class="btn btn-warning" onclick="launchModify(this)" data-employee=' + obj + ' role="button" data-toggle="modal" data-target="#modifyModal">Modify</a><a class="btn btn-danger" style="margin-left:10px" onclick="deleteEmployee(this)" data-id=' + obj._id + ' role="button">Delete</a>';
            }
        }
    }
}
function createBodyRequest(config) {
    var tmp = "";
    for (var property in config) {
        console.log(property + " + " + config[property]);
        tmp += (property + "=" + config[property] + "&");
    }
    ;
    var body = tmp.slice(0, -1);
    return body;
}
;
