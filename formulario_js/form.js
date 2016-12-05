
function crear(){
	label("usuario:");
	text();
	label("pass:");
	text("password");
	label("recibir notificaciones:");
	checkbox("y",true);
	radio("genero",["M","F"]);
	label("Descripcion:<br>");
	textArea();
	button("aceptar","alert('wakoo')");
}

function agregar(elemento){
	var div = document.getElementById("formulario");
	div.appendChild(elemento);
}

function label(txt){
	var l = document.createElement("label");
	l.innerHTML="<br>"+txt;
	agregar(l);
}

function text(pass){
	var t = document.createElement("input");
	if(pass == "password")
		t.type = "password";
	agregar(t);
}

function checkbox(txt, checked){
	var cb = document.createElement("input");
	cb.type="checkbox";
	cb.value = txt;
	cb.checked = checked;
	agregar(cb);
}

function radio(name,r){
	for(var i=0;i<r.length;i++){
		var radio = document.createElement("input");
		radio.type="radio";
		radio.name=name;
		radio.value=r[i];
		label(r[i]+":");
		agregar(radio);
	}
}

function textArea(){
	var ta = document.createElement("textarea");
	agregar(ta);
}

function button(name,action){
	var b = document.createElement("input");
	b.type = "button";
	b.value = name;
	b.id = name;
	b.onclick= function(){alert("wakoo");}
	agregar(b);
}

function nuevo(objeto,nombre){
	switch (objeto) {
		case "l":
				label(nombre);
				break;
		case "t":
				text();
				break;
		case "tp":
				text("password");
				break;
		case "cb":
				checkbox(nombre,false);
				break;
		case "ta":
				textArea();
				break;
		case "b":
				button(nombre);
				break;
		default:

	}
}

	/*var lusuario = document.createElement("label");
	lusuario.innerHTML="usuario:";
	var tusuario = document.createElement("input");
	tusuario.type = "text";
	var lpass = document.createElement("label");
	lpass.innerHTML="pass:";
	var tusuario = document.createElement("input");
	tusuario.type = "text";*/
