$(function() {
  $("#myTable").tablesorter();
  $("#myTrigger").click(function() {
		var formularz_obj = document.getElementById("opcje_sortowania").selectedIndex;
		if (formularz_obj == 0)
		{
			$("#myTable").trigger("sorton", [ [[4,"a"]] ]);
		}
		else if (formularz_obj == 1)
		{
			$("#myTable").trigger("sorton", [ [[4,"d"]]]);
		}
		else if (formularz_obj == 2)
		{
			$("#myTable").trigger("sorton", [ [[7,"a"]]]);
		}
		else if (formularz_obj == 3)
		{
			$("#myTable").trigger("sorton", [ [[7,"d"]]]);
		}
		else if (formularz_obj == 4)
		{
			$("#myTable").trigger("sorton", [ [[0,"a"]]]);
		}
		else if (formularz_obj == 5)
		{
			$("#myTable").trigger("sorton", [ [[0,"d"]]]);
		}
		return false;
	});
	$('#myTable').delegate('button.remove', 'click', function () {
		var t = $('table');
		$(this).closest('tr').remove();
		t.trigger('update');
		return false;
	});

	$('#myTable').delegate('button.edit', 'click', function () {
		document.getElementById("przyciskTest").textContent = "Edytuj";
		var tds = $(this).closest('tr').children();
		var tablica = [];
		for (var i=0; i < 9; i++)
		{
			tablica.push(tds[i].innerHTML);
		}
		document.getElementById("towar_name").value = tablica[0];
		document.getElementById("towar_code").value = tablica[1];
		document.getElementById("towar_netto").value = tablica[2];
		document.getElementById("towar_vat").value = tablica[3];
		document.getElementById("towar_brutto").value = tablica[4];
		if(tablica[5] === "Opcja 1")
		{
			document.getElementById("towar_kategoria").selectedIndex = 0;
		}
		else if(tablica[5] === "Opcja 2")
		{
			document.getElementById("towar_kategoria").selectedIndex = 1;
		}
		else
		{
			document.getElementById("towar_kategoria").selectedIndex = 2;
		}
		document.getElementById("towar_opcja1").checked = false;
		document.getElementById("towar_opcja2").checked = false;
		document.getElementById("towar_opcja3").checked = false;
		document.getElementById("towar_opcja4").checked = false;
		document.getElementById("towar_opcja5").checked = false;
		var array = tablica[6].split(", ");
		var test_text;
		var j;
		for (var i = 0; i < array.length; i++)
		{
			j = parseInt(array[i]);
			test_text = "towar_opcja"+j
			document.getElementById(test_text).checked = true;
		}
		j = parseInt(tablica[7]) - 1;
		document.getElementsByName("towar_ocena")[j].checked;
		
		$(this).closest('tr').remove();
		$('table').trigger('update');
		return false;
	});
	
	$('#myTable').delegate('button.add', 'click', function () {
       var tds = $(this).closest('tr').children();

       var koszykNazwa = tds[0].innerHTML;
       var koszykCena = tds[4].innerHTML;
       var koszyk;
	   if(localStorage.getItem("koszyk") == null)
	   {
		   koszyk = [];
	   }
	   else
	   {
		   koszyk = JSON.parse(localStorage.getItem("koszyk"));
	   }
       var produkt = {
           "koszykNazwa" : koszykNazwa,
           "koszykCena" : koszykCena
       };
       koszyk.push(produkt);
       localStorage.setItem("koszyk", JSON.stringify(koszyk));
	   if(koszyk === null)
	   {
		   alert("Pusto tutaj");
	   }
	   else
	   {
		   alert("Dodano produkt do koszyka");
	   }
    });

});

function sprawdzTowarName() {
var formularz_obj=document.getElementById("towar_name");
var t_name = formularz_obj.value;
var blad = document.getElementById("towar_name_blad");

var objRegExp  = /^[a-zA-Z]+$/;


var czy_jest = document.getElementsByName("productInTable");
var i_length = czy_jest.length;

var wartosc = 0;	

if (t_name === "" || !(t_name.match(objRegExp)) ) 
    {   
        blad.innerHTML = "Podaj nazwe towaru"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych=false; 
    }
else if (t_name.length > 10)
    {
        blad.innerHTML = "Za dluga nazwa (max 10 znakow)"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych=true; 
    }
else if (i_length > 0)
	{
		for (var i=0; i<i_length ; i++)
		{
			if(czy_jest[i].innerHTML === t_name)
			{
				wartosc = 1;
			}
		}
		if (wartosc === 1)
		{
			blad.innerHTML = "Taki produkt juz jest na liscie"; 
			blad.classList.add("invalid-feedback");
			formularz_obj.classList.add("is-invalid");
			blad.classList.remove("valid-feedback");
			formularz_obj.classList.remove("is-valid");
			blad_danych=true;
		}
		else
		{
			blad.classList.remove("invalid-feedback");
			formularz_obj.classList.remove("is-invalid");
			blad.classList.add("valid-feedback");
			formularz_obj.classList.add("is-valid");
			blad.innerHTML = ""; 
			blad_danych=false;
		}
	}
else
    {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = ""; 
        blad_danych=false;
    } 
return blad_danych;       
}

function sprawdzTowarCode() {
var formularz_obj=document.getElementById("towar_code");
var t_code = formularz_obj.value;
var blad = document.getElementById("towar_code_blad");

 

 var objRegExp  = /^[a-zA-Z0-9]+$/;
  
if (t_code === "" || !(t_code.match(objRegExp)) ) 
    {   
        blad.innerHTML = "Podaj kod towaru"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych=false; 
    }
else if (t_code.length > 10)
    {
        blad.innerHTML = "Zbyt dlugi kod (max 10 znakow)"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych=true; 
    }
else
    {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = ""; 
        blad_danych=false;
    } 
return blad_danych;       
}


function sprawdzTowarNetto() {
var formularz_obj=document.getElementById("towar_netto");
var t_netto = formularz_obj.value;
var blad = document.getElementById("towar_netto_blad");

 

if (t_netto === "" || t_netto != (parseFloat(formularz_obj.value).toFixed(2)))
    {   
        blad.innerHTML = "Podaj cene netto"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych=false; 
    }
else if (t_netto > 1000 || t_netto <= 0)
    {
        blad.innerHTML = "Zbyt mala lub duza cena"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych=true; 
    }
else
    {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = ""; 
        blad_danych=false;
    } 

return blad_danych;       
}

function sprawdzTowarVAT() {
var formularz_obj=document.getElementById("towar_vat");
var t_vat = formularz_obj.value;
var blad = document.getElementById("towar_vat_blad");

if (t_vat === "") 
    {   
        blad.innerHTML = "Podaj VAT"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych=false; 
    }
else if (t_vat <= 0 || t_vat >= 100)
    {
        blad.innerHTML = "Zbyt maly lub duzy procent VAT"; 
        blad.classList.add("invalid-feedback");
        formularz_obj.classList.add("is-invalid");
        blad.classList.remove("valid-feedback");
        formularz_obj.classList.remove("is-valid");
        blad_danych=true; 
    }
else
    {
        blad.classList.remove("invalid-feedback");
        formularz_obj.classList.remove("is-invalid");
        blad.classList.add("valid-feedback");
        formularz_obj.classList.add("is-valid");
        blad.innerHTML = ""; 
        blad_danych=false;
    } 

return blad_danych;       
}

function sprawdzTowarBrutto(){
var formularz_obj_netto=document.getElementById("towar_netto");
var t_netto = formularz_obj_netto.value;
var blad_netto = document.getElementById("towar_netto_blad");
var formularz_obj_vat=document.getElementById("towar_vat");
var t_vat = formularz_obj_vat.value;
var blad_vat=document.getElementById("towar_vat_blad");
var formularz_obj_brutto=document.getElementById("towar_brutto");

if (blad_vat.innerHTML === "" && blad_netto.innerHTML === "")
{
	var test = (parseFloat(t_netto) + parseFloat(t_netto) * parseFloat(t_vat) / 100.0);
	var test = (parseFloat(test)).toFixed(2);
	formularz_obj_brutto.value = test;
}
else
{
	formularz_obj_brutto.value = "";
}
}

function sprawdzTowarKategoria(){
var formularz_obj = document.getElementById("towar_kategoria").selectedIndex;
var blad = document.getElementById("towar_kategoria_blad");
if(formularz_obj.selectedIndex < 0)
{
	blad.innerHTML = ""; 
    blad.classList.add("invalid-feedback");
    formularz_obj.classList.add("is-invalid");
    blad.classList.remove("valid-feedback");
    formularz_obj.classList.remove("is-valid");
    blad_danych=true; 
}
else
{
	blad.classList.remove("invalid-feedback");
    formularz_obj.classList.remove("is-invalid");
    blad.classList.add("valid-feedback");
    formularz_obj.classList.add("is-valid");
    blad.innerHTML = ""; 
    blad_danych=false;
}
return blad_danych;  
}

function sprawdzTowarOpcje(){
var zaznaczone =  0;
var formularz_obj = document.getElementById("t_opcje");
var blad = document.getElementById("towar_opcje_blad");

if( document.getElementById("towar_opcja1").checked === true)
	zaznaczone++;

if( document.getElementById("towar_opcja2").checked === true)
	zaznaczone++;

if( document.getElementById("towar_opcja3").checked === true)
	zaznaczone++;

if( document.getElementById("towar_opcja4").checked === true)
	zaznaczone++;

if( document.getElementById("towar_opcja5").checked == true)
	zaznaczone++;

if (zaznaczone < 2)
{
	blad.innerHTML = "Wybierz przynajmniej 2 opcje"; 
    blad_danych=true;
}
else
{
    blad.innerHTML = ""; 
    blad_danych=false;
}
	return blad_danych;
}

function dodajProdukt(){

var name_blad = sprawdzTowarName();
var code_blad = sprawdzTowarCode();
var cenan_blad = sprawdzTowarNetto();
var cenav_blad = sprawdzTowarVAT();
var opcje_blad = sprawdzTowarOpcje();
var cenab_blad = sprawdzTowarBrutto();

var pierwszy = 1;

var formularz_obj=document.getElementById("towar_name");
var t_name = formularz_obj.value;
formularz_obj=document.getElementById("towar_code");
var t_code = formularz_obj.value;
formularz_obj=document.getElementById("towar_netto");
var t_netto = formularz_obj.value;
formularz_obj=document.getElementById("towar_vat");
var t_vat = formularz_obj.value;
formularz_obj=document.getElementById("towar_brutto");
var t_brutto = formularz_obj.value;
formularz_obj = document.getElementById("towar_kategoria");
var t_kategoria= formularz_obj.value;
var t_opcja = "";

if( document.getElementById("towar_opcja1").checked === true)
{
	if (pierwszy === 1)
	{
		t_opcja = "1"
		pierwszy = 0;
	}
}
if( document.getElementById("towar_opcja2").checked === true)
{
	if (pierwszy === 1)
	{
		t_opcja = "2"
		pierwszy = 0;
	}
	else
	{
		t_opcja = t_opcja + ", 2"
	}
}

if( document.getElementById("towar_opcja3").checked === true)
{
	if (pierwszy === 1)
	{
		t_opcja = "3"
		pierwszy = 0;
	}
	else
	{
		t_opcja = t_opcja + ", 3"
	}
}

if( document.getElementById("towar_opcja4").checked === true)
{
	if (pierwszy === 1)
	{
		t_opcja = "4"
		pierwszy = 0;
	}
	else
	{
		t_opcja = t_opcja + ", 4"
	}
}

if( document.getElementById("towar_opcja5").checked === true)
{
	t_opcja = t_opcja + ", 5"
}
var t_ocena = 0;
var t_ocena_t = document.getElementsByName("towar_ocena");
for (var i=0; i<t_ocena_t.length; i++)
{
	if(t_ocena_t[i].checked)
	{
		t_ocena = t_ocena_t[i].value;
	}
}
formularz_obj = document.getElementById("towar_zdjecie");
var t_zdjecie = formularz_obj.value;
t_zdjecie = t_zdjecie.split("\\").pop();
if(name_blad == true || code_blad == true || cenan_blad == true || cenav_blad == true || opcje_blad == true || cenab_blad == true)
{
	return false;
}
else if(t_name === "" || t_code === "" || t_netto === "" || t_vat === "" || t_opcja === "" || t_brutto === "")
{
	return false;
}


var row2 = '<tr><td name="productInTable">'+t_name+'</td><td>'+t_code+'</td><td>'+t_netto+'</td><td>'+t_vat+'</td><td>'+t_brutto+'</td><td>'+t_kategoria+'</td><td>'+t_opcja+'</td><td>'+t_ocena+'</td><td>'+t_zdjecie+
					'</td><td><button type="button" class="remove">Usuń</button></td><td>' +
					'<button type="button" class="edit">Edytuj</button></td>' +
					'<td><button type = "button" class="add">Dodaj do koszyka</button></td></tr></tr>', $row2 = $(row2), resort = true;

$("#myTable").find('tbody').append($row2).trigger('addRows', [$row2, resort]);
document.getElementById("przyciskTest").textContent = "Wyślij";
return false;

}

function koszyk() {
    var koszyk =  JSON.parse(localStorage.getItem("koszyk"));
    if (koszyk == null)
    {
        return false;
    }
    for (var i = 0; i < koszyk.length; i++)
    {
        var row = '<tr><td>'+koszyk[i].koszykNazwa+'</td><td>'+koszyk[i].koszykCena+'</td><td name="productQuantity"> <input onchange="koszt()" type="number" min="1" value="1"</td></tr>' ;
	}
    var $row = $(row);
    var resort = true;
    $("#koszykTablica").find('tbody').append($row).trigger('addRows', [$row, resort]);
	koszt();
}

function koszt() {
    var koszt = parseFloat(document.getElementById("dostawca").value);
    var rows = $("#koszykTablica").find("tr:gt(0)");
    for (var i = 0; i < rows.length; i++)
    {
        koszt= koszt+(rows[i].children[1].innerHTML*rows[i].children[2].children[0].value);
    }
    document.getElementById("cenaOgolem").innerHTML = koszt;
}

function zamow() {
    $('#koszykTablica').find('tbody').empty();
    localStorage.clear();
    document.getElementById("cenaOgolem").innerHTML = 0;
	alert("Zakupy udane!");
}

function anuluj() {
	$('#koszykTablica').find('tbody').empty();
    localStorage.clear();
    document.getElementById("cenaOgolem").innerHTML = 0;
}
