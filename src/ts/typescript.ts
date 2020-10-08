const HEROKU_URL:string = "https://restapitellierc.herokuapp.com/";
const HEROKU_EMPLOYEE_URL:string = HEROKU_URL.concat("employees/");

const REQ_HEADERS = { 
	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
	'Access-Control-Allow-Origin': '*'
};

const enum method {
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE'
};

function createNewEmployee()
{
	let config = {
		'lastname': (document.getElementById("lastname") as HTMLInputElement).value,
		'firstname': (document.getElementById("firstname") as HTMLInputElement).value,
		'business': (document.getElementById("business") as HTMLSelectElement).options[(document.getElementById("business")as HTMLSelectElement).selectedIndex].value 
	};
	if(!config.business.length || !config.lastname.length)
	{
		return alert('Le prénom ou le nom de famille est manquant, merci de la compléter!');
	}
	var formBody = createBodyRequest(config);
	
	fetch(HEROKU_EMPLOYEE_URL, {
		method: method.POST,
		headers: REQ_HEADERS,				
		body: formBody,
	})
	.then(response => console.log(response))
	.catch(error => console.log(error))
	getAllEmployees(config.business.concat("/"));
}

function deleteEmployee(row:HTMLTableRowElement)
{
	var id:string = row.dataset.id!;
	var business:any = JSON.parse(row.dataset.employee!).business;
	if(id !== null || id !== 'undefined')
	{
		fetch(HEROKU_EMPLOYEE_URL + id, {
			method: method.DELETE,
		})
		.then(response => console.log(response))
		.catch(error => console.log(error))
	}
	getAllEmployees(business.concat("/"));
}

function launchModify(row: HTMLTableRowElement)
{
	var json:any = JSON.parse(row.dataset.employee!);
	(document.getElementById("employeeId") as HTMLInputElement).value = json._id;
	(document.getElementById("firstnameModify") as HTMLInputElement).value = json.firstname;
	(document.getElementById("lastnameModify") as HTMLInputElement).value = json.lastname;
	selectElement("businessModify", json.business);
}

function modifyEmployee()
{
	var id = (document.getElementById("employeeId") as HTMLInputElement).value;
	var config = { 
		'firstname' : (document.getElementById("firstnameModify") as HTMLInputElement).value, 
		'lastname': (document.getElementById("lastnameModify") as HTMLInputElement).value, 
		'business':(document.getElementById("businessModify") as HTMLSelectElement).options[(document.getElementById("businessModify") as HTMLSelectElement).selectedIndex].value 
	};
	var bodyRequest = createBodyRequest(config);
	fetch(HEROKU_EMPLOYEE_URL, {
		method: method.POST,
		headers: REQ_HEADERS,				
		body: bodyRequest,
	})
	.then(response => console.log(response))
	.catch(error => console.log(error));
	(document.getElementById("cancelModify") as HTMLButtonElement).click();
	getAllEmployees(config.business.concat("/"));
}

function selectElement(id : string, valueToSelect: string) {    
	(document.getElementById(id) as HTMLInputElement).value = valueToSelect;
}

function getAllEmployees(business:string = "")
{
	var url:string = "";
	if(business == null)
	{
		url = HEROKU_EMPLOYEE_URL;
	}
	else
	{
		url = HEROKU_URL + business + "employees";
	}
	fetch(url).then(function(response) {
		response.json().then(function(json) {
			var table = (document.getElementById("mytTable")) as HTMLTableElement;
			clearTableVIew(table);
			populateTableView(table, json);
		});
	});
}

function clearTableVIew(table:HTMLTableElement)
{
	var tableHeaderRowCount:number = 1;
	var rowCount:number = table.rows.length;
	for (var i = tableHeaderRowCount; i < rowCount; i++) {
		table.deleteRow(tableHeaderRowCount);
	}				
}

function populateTableView(table:HTMLTableElement, json:any)
{
	for(var i = 0; i < json.length; i++) {
		var obj = json[i];
		var row = table.insertRow(-1);
		var json = JSON.parse(obj)
		for (var j=0; j < 7; j++)
		{
			var cell = row.insertCell(j);
			if(j < 6)
			{
				console.log(obj);
				let valueCell = document.createTextNode(json[j]);
				cell.appendChild(valueCell);
			}	
			else 
			{
				cell.innerHTML = '<a class="btn btn-warning" onclick="launchModify(this)" data-employee='+ JSON.stringify(obj) + ' role="button" data-toggle="modal" data-target="#modifyModal">Modify</a><a class="btn btn-danger" style="margin-left:10px" onclick="deleteEmployee(this)" data-id='+ obj._id +' role="button">Delete</a>';
			}	
		}				
	}				
}

function createBodyRequest(config:any)
{
	var body:any;
	for (var property in config) {
		var encodedKey = encodeURIComponent(property);
		var encodedValue = encodeURIComponent(config[property]);
		body.push(encodedKey + "=" + encodedValue);
	}
	body = body.join("&");
	return body
};