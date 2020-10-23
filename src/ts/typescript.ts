// const HEROKU_URL:string = "https://restapitellierc.herokuapp.com/";
const HEROKU_URL:string = "http://localhost:3000/";

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
	var business = (document.getElementById("business") as HTMLSelectElement).options[(document.getElementById("business")as HTMLSelectElement).selectedIndex].value;
	var lastname = (document.getElementById("lastname") as HTMLInputElement).value;
	if(!business.length || !lastname.length)
	{
		return alert('Le prénom ou le nom de famille est manquant, merci de la compléter!');
	}
	business+= "/";
	var formData = new FormData(document.getElementById('form-create') as HTMLFormElement);
	fetch(HEROKU_EMPLOYEE_URL, {
		method: method.POST,
		headers: REQ_HEADERS,				
		body: formData
	})
	.then(response => console.log(response))
	.catch(error => console.log(error))
	getAllEmployees(business);
}

function deleteEmployee(row: HTMLTableRowElement)
{
	var id:string = row.dataset.id!;
	var business:string = row.dataset.business!;
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
	var id = (document.getElementById('employeeId') as HTMLInputElement).value;
	var business = (document.getElementById("businessModify") as HTMLSelectElement).options[(document.getElementById("businessModify") as HTMLSelectElement).selectedIndex].value;
	var formData:any = new FormData(document.getElementById('form-modify') as HTMLFormElement);
	business += "/";
	fetch(HEROKU_EMPLOYEE_URL.concat(id), {
		method: method.PUT,
		headers: REQ_HEADERS,				
		body: formData
	})
	.then(response => console.log(response))
	.catch(error => console.log(error));
	(document.getElementById("cancelModify") as HTMLButtonElement).click();
	getAllEmployees(business);
}

function selectElement(id : string, valueToSelect: string) {    
	(document.getElementById(id) as HTMLInputElement).value = valueToSelect;
}

function getAllEmployees(business:string = "")
{
	var url = HEROKU_EMPLOYEE_URL;
	if (business != null) {
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
	var rowCount:number = table.rows.length;
	for (var i = 1; i < rowCount; i++) {
		table.deleteRow(1);
	}				
}

function populateTableView(table:HTMLTableElement, json:any)
{
	for(var i = 0; i < json.length; i++) {
		var obj = json[i];
		var row = table.insertRow(-1);
		for (var j=0; j < 7; j++)
		{
			var cell = row.insertCell(j);
			if(j < 6)
			{					
				var value= "";
				switch(j)
				{
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
				let valueCell = document.createTextNode(value);
				cell.appendChild(valueCell);
			}	
			else 
			{
				cell.innerHTML = '<a class="btn btn-warning" onclick="launchModify(this)" data-employee=' + JSON.stringify(obj) + ' role="button" data-toggle="modal" data-target="#modifyModal">Modify</a><a class="btn btn-danger" style="margin-left:10px" onclick="deleteEmployee(this)" data-id='+ obj._id +' data-business=' + obj.business + ' role="button">Delete</a>';
			}	
		}				
	}				
}