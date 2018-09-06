function getQuote(){
	var values = {};
	var form = $("#quote_form")
	form.validate();

	if (form.valid()){
	  values = getValuesFromForm();
	
	  computeDatas(values);
   	  showResults('totalquoteprice',total_price);
	}
	
}

function getValuesFromForm(){
	var returned_values = {};
	
	var e = document.getElementById("building_type");
	returned_values["building_type"] = e[e.selectedIndex].value;

	returned_values["number_appartments"] = parseInt (document.getElementById("number_appartments").value);
	returned_values["number_floors"] = parseInt (document.getElementById("number_floors").value);
	returned_values["number_sublevels"] = parseInt (document.getElementById("number_sublevels").value);
	returned_values["number_commercialspaces"] = parseInt (document.getElementById("number_commercialspaces").value);
	returned_values["number_parking"] = parseInt (document.getElementById("number_parking").value); 
	returned_values["number_shafts"] = parseInt (document.getElementById("number_shafts").value);
	returned_values["number_businessrental"] = parseInt (document.getElementById("number_businessrental").value);
	returned_values["number_occupants"] = parseInt (document.getElementById("number_occupants").value); 

	var e = document.getElementById("number_activity");
	returned_values["number_activity"] = e.selectedIndex;

	
	console.log("returned_values", returned_values);
	return returned_values;
}

function computeDatas(returned_values) {
	
	var number_appartments = returned_values["number_appartments"]; 
    var number_floors = returned_values["number_floors"]; 
    var number_sublevels = returned_values["number_sublevels"]; 
	var number_commercialspaces = returned_values["number_commercialspaces"];
	var number_parking = returned_values["number_parking"];
	var number_shafts = returned_values["number_shafts"];
	var number_occupants = returned_values["number_occupants"];
	//var number_totaloccupants = number_occupants * (number_floors + number_sublevels);
	var number_businessrental = returned_values["number_businessrental"];
	//var number_elevatorstosell_hyb_corp = number_columns * number_shaftscorporatehybrid;
	//var number_shaftscorporatehybrid = number_totaloccupants / 1000;
	//var number_columns_for_hyb_corp = (number_floors + number_sublevels) / 20;
	var number_elevatorstosell;
	//var total_price;
	var range = document.querySelector('input[name="range"]:checked').value;
	var nbr_necessary_elevators = (Math.ceil((number_occupants * (number_floors + number_sublevels)) / 1000))
	var columns = (Math.ceil((number_floors+number_sublevels) / 20))

	//calcul 

	if(returned_values["building_type"] == "residential"){
		if (number_floors <= 20) {
			number_elevatorstosell = (Math.ceil ((number_appartments / number_floors) / 6));
		} else {
			number_elevatorstosell =  (Math.ceil ((number_appartments / number_floors) / 6)) * (Math.ceil (number_floors / 20)) ;
		};
	} else if(returned_values["building_type"] == "commercial" ){
    
	   number_elevatorstosell = Math.ceil (number_shafts); 

	} else if (returned_values["building_type"] == "corporate"){
		number_elevatorstosell = columns * (Math.ceil (nbr_necessary_elevators/columns)); 
	
	} else if (returned_values["building_type"] == "hybrid"){
		number_elevatorstosell = columns * (Math.ceil (nbr_necessary_elevators/columns)); 
	} ; 
	

		
	if (range == "standard") {

		total_price = (Math.ceil (7565 * number_elevatorstosell) * 1.10);

	}else if (range == "premium") {

		total_price = (Math.ceil (12345 * number_elevatorstosell) * 1.13);

	}else if (range == "excelium") {

		total_price = (Math.ceil (15400 * number_elevatorstosell) * 1.16);
		
	};	



};


function showResults(wheretodisplay,valuetodisplay) {

	document.getElementById(wheretodisplay).innerHTML= Math.ceil (valuetodisplay);
	
	}


//function showResultstest(valuetodisplay) {

	//document.getElementById('test').innerHTML = valuetodisplay;

	//to show or hide textboxes when you change the building type:

	function display_relevant_field(a){

 var selected_building_type = (a.value || a.options[a.selectedIndex].value); 
 if (selected_building_type === "residential") {
	document.getElementById("valuetoshow").style.display = 'block';
	document.getElementById("app_section").style.display = 'block';
	document.getElementById("floors_section").style.display = 'block';
	document.getElementById("sublvls_section").style.display = 'block';
	document.getElementById("comm_section").style.display = 'none';
	document.getElementById("prk_section").style.display = 'none';
	document.getElementById("shafts_section").style.display = 'none';
	document.getElementById("business_section").style.display = 'none';
	document.getElementById("occ_section").style.display = 'none';
	document.getElementById("activity_section").style.display = 'none';

 }  else if (selected_building_type === "commercial"){
	document.getElementById("activity_section").style.display = 'none';
	document.getElementById("occ_section").style.display = 'none';
	document.getElementById("business_section").style.display = 'none';
	document.getElementById("app_section").style.display = 'none';
	document.getElementById("shafts_section").style.display = 'block';
	document.getElementById("floors_section").style.display = 'block';
	document.getElementById("sublvls_section").style.display = 'block';
	document.getElementById("prk_section").style.display = 'block';
	document.getElementById("comm_section").style.display = 'block';
 } else  if (selected_building_type === "corporate"){
	document.getElementById("activity_section").style.display = 'none';
	document.getElementById("occ_section").style.display = 'block';
	document.getElementById("business_section").style.display = 'block';
	document.getElementById("app_section").style.display = 'none';
	document.getElementById("shafts_section").style.display = 'none';
	document.getElementById("floors_section").style.display = 'block';
	document.getElementById("sublvls_section").style.display = 'block';
	document.getElementById("prk_section").style.display = 'block';
	document.getElementById("comm_section").style.display = 'none';
 } else if (selected_building_type === "hybrid"){
	document.getElementById("activity_section").style.display = 'block';
	document.getElementById("occ_section").style.display = 'block';
	document.getElementById("business_section").style.display = 'none';
	document.getElementById("app_section").style.display = 'none';
	document.getElementById("shafts_section").style.display = 'none';
	document.getElementById("floors_section").style.display = 'block';
	document.getElementById("sublvls_section").style.display = 'block';
	document.getElementById("prk_section").style.display = 'block';
	document.getElementById("comm_section").style.display = 'block';
 };
}
 
//to validate inputs

 function validateinput() {
	 var error = false;

	 var e = document.getElementById("building_type");
	 building_type = e[e.selectedIndex].value;

	var rangetype = document.querySelector('input[name="range"]:checked').value;
	
	 var enteredvalues = getValuesFromForm(); 
	
	
	if (building_type === "residential") {
		var error = false; 
		if (!enteredvalues["number_appartments"] || enteredvalues["number_appartments"]===0 ) {
			(error = true); 
		};
		if  (error === true) {
			alert ("please fill all the required fields"); 
		}; 
		if (!enteredvalues["number_floors"] || enteredvalues["number_floors"]===0 ) {
				error = true;
		}; if  (error === true) {
			alert ("please fill all the required fields"); 
		};
		if (!enteredvalues["number_sublevels"] || enteredvalues["number_sublevels"]===0 ) {
				error = true; 
		}
		  if  (error === true) {
							alert ("please fill all the required fields"); 	
	} else {
			getQuote(); 
	 
        }
	} 

	if (building_type === "commercial") {
		
		if (!enteredvalues["number_shafts"] || enteredvalues["number_shafts"]===0 ) {
				error = true;
		}	
		if  (error === true) {
			alert ("please fill all the required fields"); 
		} else {
			getQuote(); 
		}
	
	} 
 	

    if (building_type === "corporate") {
   
		if (!enteredvalues["number_businessrental"] || enteredvalues["number_businessrental"]===0 ) {
			error = true;
		}
		if  (error === true) {
			alert ("please fill all the required fields");
		}
		if (!enteredvalues["number_floors"] || enteredvalues["number_floors"]===0) {
			error = true;
		}
		if (error === true) {
			alert ("please fill all the required fields");
		}
		if (!enteredvalues["number_sublevels"] || enteredvalues["number_sublevels"]===0 ) {
			error = true;
		}
		if (error === true) {
			alert ("please fill all the required fields");
		}
		if (!enteredvalues["number_parking"] || enteredvalues["number_parking"]===0 ) {
			error = true;
		}
		if (error === true) {
			alert ("please fill all the required fields"); 
		}
		
		if (!enteredvalues["number_occupants"] || enteredvalues["number_occupants"]===0 ) {
				error = true;
		}
		if (error === true) {
			alert ("please fill all the required fields"); 
		} else {
			getQuote();
		}

	}
    
	if (building_type === "hybrid") {
   
		if (!enteredvalues["number_commercialspaces"] || enteredvalues["number_commercialspaces"]===0 ) {
			error = true;
		}
		if  (error === true) {
			alert ("please fill all the required fields");
		}
		if (!enteredvalues["number_floors"] || enteredvalues["number_floors"]===0) {
			error = true;
		}
		if (error === true) {
			alert ("please fill all the required fields");
		}
		if (!enteredvalues["number_sublevels"] || enteredvalues["number_sublevels"]===0 ) {
			error = true;
		}
		if (error === true) {
			alert ("please fill all the required fields");
		}
		if (!enteredvalues["number_parking"] || enteredvalues["number_parking"]===0 ) {
			error = true;
		}
		if (error === true) {
			alert ("please fill all the required fields"); 
		}
		
		if (!enteredvalues["number_occupants"] || enteredvalues["number_occupants"]===0 ) {
				error = true;
		}
		if (error === true) {
			alert ("please fill all the required fields"); 
		} 
		if (!enteredvalues["number_activity"] || enteredvalues["number_activity"]===0 ) {
			error = true;
	    }
	   if (error === true) {
		alert ("please fill all the required fields"); 
	   }
		else {
			getQuote();
		}

	}

 }

	//if (!enteredvalues["number_appartments"] || enteredvalues["number_appartments"]===0 ) {
		// error = true; 
//	};
  //  if (!enteredvalues["number_floors"] || enteredvalues["number_floors"]===0 ) {
	//	error = true;
//	}; 
	//if (!enteredvalues["number_sublevels"] || enteredvalues["number_sublevels"]===0 ) {
//		error = true;
//	}; 
//	if (!enteredvalues["number_shafts"] || enteredvalues["number_shafts"]===0 ) {
//		error = true;
//	}; 
//	if (!enteredvalues["number_occupants"] || enteredvalues["number_occupants"]===0 ) {
//		error = true;
//	}
//	return error; 

