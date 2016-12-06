var profes = enviar('json/profesor.json');
var carreras = enviar('json/carrera.json');
var inst = enviar('json/instituto.json');
var grupos = enviar('json/grupo.json');

function graficar(){
  var datos =[];
  datos[0] = ["Carreras","# de Profesores"];
  for(var i=0;i<carreras.length;i++){
    var carrera_id = carreras[i]['id'];
    var cantidad =0;
    for(var j=0;j<profes.length;j++){
      if(profes[j]['carrera_id']==carrera_id)
        cantidad++;
    }
    datos[i+1] = [carreras[i]['nombre'],cantidad];
  }
  dibujarGrafico("# Profesores por carrera",datos,"num_profesores");

}

function alumnos(anio){
  var datos =[];
  datos[0] = ["Carreras","# de Alumnos"];
  for(var i=0;i<carreras.length;i++){
    var carrera_id = carreras[i]['id'];
    var cantidad =0;
    for(var j=0;j<grupos.length;j++){
      if(grupos[j]['carrera_id']==carrera_id)
        if(typeof(anio)=="undefined" || anio==''|| anio.valueOf()==grupos[j]['anio'])
          cantidad=cantidad+parseInt(grupos[j]['alumnos']);
    }
    datos[i+1] = [carreras[i]['nombre'],cantidad];
  }
  dibujarGrafico("# Alumnos por carrera",datos,"num_alumnos");
}

function dibujarGrafico(titulo,arr,div) {
  // Tabla de datos: valores y etiquetas de la gráfica
  var data = google.visualization.arrayToDataTable(arr);
  var options = {
    title: titulo
  }
  // Dibujar el gráfico
  new google.visualization.ColumnChart(
  //ColumnChart sería el tipo de gráfico a dibujar
    document.getElementById(div)
  ).draw(data, options);
}

function init(){
  institutos();
  graficar();
  alumnos();
}

function institutos(){
	var select = $("institutos");
	for(var i=0;i<inst.length;i++){
		var opt = e("option");
		opt.value = inst[i]['id'];
		opt.text = inst[i]['nombre'];
		select.appendChild(opt);
    //opt.onclick = profesores(opt.value);
	}
  select.onchange=function(){
    profesores(select.options[select.selectedIndex].value);
  };
  select.selectedIndex = "-1";
}

function profesores(id){
  var select = $('profesores');
  select.innerHTML='';
  var np = 0;
  for(var i=0;i<profes.length;i++){
    if(profes[i]['instituto_id']==id){
      var opt = e('option');
      opt.value = profes[i]['id'];
      opt.text = profes[i]['nombres'];
      select.appendChild(opt);
      np++;
    }
  }
  select.size = np;
  select.onchange = function(){
    show_info(select.options[select.selectedIndex].value,profes);
  };
  select.selectedIndex = "-1";
}

function show_info(id,profes){
  for(var i=0;i<profes.length;i++){
    if(profes[i]['id']==id){
      var profe = profes[i];
      var txt = "Nombre: "+profe['nombres']+"<br>"+"Apellido: "+profe['apellidos']+"<br>"+"Correo: "+profe['correo']+"<br>Grado: ";
      switch (profe['grado']) {
        case 1:
          txt+="Licenciatura";
          break;
        case 1:
          txt+="Maestria";
          break;
        case 3:
          txt+="Doctorado";
          break;
        default:
          break;
      }
      txt+="Carrera: "+getCarrera(profe['carrera_id'])+"<br>";
      txt+="instituto: "+getCarrera(profe['instituto_id'])+"<br>";
      if(profe['activo']==1)
        txt+="Activo: Si<br>";
      else
        txt+="Activo: No<br>";
      $("info").innerHTML = txt;
      return;
    }
  }
}


function getCarrera(id){
  for(var i=0;i<carreras.length;i++){
    if(carreras[i]['id']==id)
      return carreras[i]['nombre'];
  }
}

function getCarrera(id){
  for(var i=0;i<inst.length;i++){
    if(inst[i]['id']==id)
      return inst[i]['nombre'];
  }
}

function e(){
	n = arguments.length;
	var elemento;
	if(n>0){
		elemento = document.createElement(arguments[0]);
    if(n>1)
      if (Array.isArray(arguments[1])){
        var arg = arguments[1];
        //Atributos
        elemento.innerHTML = arg.innerHTML;
        elemento.value = arg.value;
        elemento.id = arg.id;
        elemento.name = arg.name;
        elemento.class = arg.class;
      }
		for(var i=2;i<n;i++){
			var arg = arguments[i];
			if(typeof(arg)=="string")
				elemento.innerHTML = arg;
			else
				elemento.appendChild(arg);
		}
	}
	return elemento;
}

function $(id){
	var elemento = document.getElementById(id);
	return elemento;
}

function enviar(url) {
  var peticion = null; //Creamos la variable
  peticion = new XMLHttpRequest();
  if(peticion) { //Si tenemos el objeto peticion
    peticion.open('GET', url, false); //Abrimos la url, false=forma síncrona
    peticion.send(null); //No le enviamos datos al servidor.
    	return(JSON.parse(peticion.responseText));
  }
}
