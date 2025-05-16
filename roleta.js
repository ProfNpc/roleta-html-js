function borda(circuloBorda) {
	const startAngle = 0;
	const endAngle = 2 * Math.PI; //volta completa
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(circuloBorda.x, circuloBorda.y, circuloBorda.raio, 0, 2 * Math.PI);
	ctx.stroke();
}

function rotate(cx, cy, x, y, angle) {
	var radians = (Math.PI / 180) * angle,
		cos = Math.cos(radians),
		sin = Math.sin(radians),
		nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
		ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
	return [nx, ny];
}

function numeroFatia(circuloBorda, angulo, numero, numFatias) {
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");		
	ctx.beginPath();
	//ctx.font = circuloBorda.raio * 0.15 + "px arial";
	//numFatias => 50 então 15px
	
	var tamanhoFont = 750/numFatias * 0.7;
	
	if (numFatias == 2) {
		tamanhoFont = 750/numFatias * 0.5;
	}
	
	ctx.font = tamanhoFont + "px arial";
	//ctx.font = "15px arial";
	
	ctx.textBaseline="middle";
	ctx.textAlign="center";
	
	var length = circuloBorda.raio - tamanhoFont/2;
	
	var x = circuloBorda.x;
	var y = circuloBorda.y + length;
	
	var coordenadasRotacionadas = rotate(circuloBorda.x, circuloBorda.y, x, y, angulo);
	
	ctx.fillText(numero + "", coordenadasRotacionadas[0], coordenadasRotacionadas[1]);
}

function raioCirculo(circuloBorda, angulo) {
	//console.log('angulo=' + angulo);
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");		
	ctx.beginPath();
	
	var length = circuloBorda.raio;
	
	ctx.moveTo(circuloBorda.x, circuloBorda.y);
	//ctx.lineTo(circuloBorda.x + length * Math.cos(angulo), circuloBorda.y + length * Math.sin(angulo));
	
	var x = circuloBorda.x;
	var y = circuloBorda.y + length;
	
	var coordenadasRotacionadas = rotate(circuloBorda.x, circuloBorda.y, x, y, angulo);
	
	ctx.lineTo(coordenadasRotacionadas[0], coordenadasRotacionadas[1]);
	
	//ctx.lineTo(circuloBorda.x - length * Math.cos(angulo), circuloBorda.y + length * Math.sin(angulo));
	
	ctx.stroke();
}

function roleta(circuloBorda, numFatias, anguloBase) {
	borda(circuloBorda);
	
	var anguloFatiaPizza = 360.0 / numFatias;
	
	console.log('anguloFatiaPizza=' + anguloFatiaPizza);
	
	var angulo = 0;
	
	var fatiaSelecionada = parseInt(anguloBase / anguloFatiaPizza);
	
	desenharFatiaSelecionada(circuloBorda, -anguloBase, anguloFatiaPizza, numFatias - fatiaSelecionada);
	
	desenharMarcador(circuloBorda);
	
	marcarLinhaTabela(array[numFatias - (fatiaSelecionada + 1)]);	
	
	for (var fatia = 0; fatia < numFatias; fatia++) {

		raioCirculo(circuloBorda, (anguloBase + 90) + angulo);
		
		numeroFatia(circuloBorda, (anguloBase + 90) + angulo + (anguloFatiaPizza/2), array[fatia], numFatias);
		
		angulo += anguloFatiaPizza;				
		
	}

}

function marcarLinhaTabela(numero) {
	
	//pega linha da tabela
	var row = document.getElementById(`lin${numero}`);
	row.style.backgroundColor = "yellow";
	
	if (numeroSelecionado == null) {
		numeroSelecionado = numero;
	}
	if (numeroSelecionado != numero) {
		var rowAnt = document.getElementById(`lin${numeroSelecionado}`);
		rowAnt.style.backgroundColor = "white";
	}
	numeroSelecionado = numero;
}

function desenharMarcador(circuloBorda) {
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");		
	ctx.beginPath();
	
	var length = circuloBorda.raio * 0.1;
	
	ctx.moveTo(circuloBorda.x + (circuloBorda.raio - length), circuloBorda.y );
	
	ctx.lineTo(circuloBorda.x + (circuloBorda.raio + length), circuloBorda.y );

	var lineWidth = ctx.lineWidth;
	var strokeStyle = ctx.strokeStyle;

	ctx.lineWidth = 4;
	ctx.strokeStyle = "blue";
	ctx.stroke();
	
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = strokeStyle;
}

function getRadianos(graus) {
	return (graus * Math.PI) / 180;
}

function desenharFatiaSelecionada(
	circuloBorda, 
	anguloBase, 
	anguloFatiaPizza, 
	fatiaSelecionada) {//0 .. numFatias - 1
	
	
	desenharFatia(circuloBorda, anguloBase + (-fatiaSelecionada * anguloFatiaPizza), anguloFatiaPizza);
	
}

function desenharFatia(
	circuloBorda, 
	anguloBase, 
	anguloFatiaPizza) { 
	
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");

	ctx.beginPath();
	console.log('anguloBase=' + anguloBase);
	
	ctx.moveTo(circuloBorda.x, circuloBorda.y);
	
	//anguloBase += 24;
	
	var x = circuloBorda.x;
	var y = circuloBorda.y + length;
	
	var coordenadasRotacionadas = rotate(circuloBorda.x, circuloBorda.y, x, y, anguloBase);
	
	ctx.lineTo(coordenadasRotacionadas[0], coordenadasRotacionadas[1]);			

	ctx.arc(
		circuloBorda.x, 
		circuloBorda.y, 
		circuloBorda.raio, 
		getRadianos(anguloBase), 
		getRadianos(anguloBase + anguloFatiaPizza));
	
	coordenadasRotacionadas = rotate(circuloBorda.x, circuloBorda.y, x, y, anguloBase + anguloFatiaPizza);
	
	ctx.lineTo(coordenadasRotacionadas[0], coordenadasRotacionadas[1]);	
	
	ctx.fill();
	
	var fillStyle = ctx.fillStyle;
	
	ctx.fillStyle = "yellow";//"red";
	ctx.fill();
	//ctx.lineWidth = 4;
	//ctx.strokeStyle = "blue";
	ctx.stroke();
	
	ctx.fillStyle = fillStyle;
}

function shuffle(array) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {

		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
}

function disporNumerosNaRoleta(array) {
	let currentIndex = array.length;
	
	if  (currentIndex != 0) {

		// Pick a remaining element...
		let randomIndex = Math.floor(Math.random() * currentIndex);
		
		var part1 = array.slice(0, randomIndex);
		var part2 = array.slice(randomIndex);
		
		var pos = 0;
		for (var i = 0; i < part2.length; i++, pos++) {
			array[pos] = part2[i];
		}
		for (var i = 0; i < part1.length; i++, pos++) {
			array[pos] = part1[i];
		}
	}			
}

var numeroPalavras = 8;
var velocidade = 1000;
var meiaFatiaDeVelocidade = (360/numeroPalavras)/2;
var voltas = 0;

var anguloBase = 0;//(360/numeroPalavras)/2;
var anguloBaseInicial = null;		

var array = [];

function desenharRoleta() {
	var circuloBorda = {
		x: 250.0,
		y: 250.0,
		raio: 200.0
	};
	
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	roleta(circuloBorda, numeroPalavras, anguloBase);
	
	console.log('velocidade=' + velocidade);
	
	var txtAnguloBase = 0;//document.getElementById("txtAnguloBase");
	txtAnguloBase.value = anguloBase;
	
}

function desenharRoletaOld() {
	var circuloBorda = {
		x: 250.0,
		y: 250.0,
		raio: 200.0
	};
	
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	roleta(circuloBorda, numeroPalavras, anguloBase);
	
	console.log('velocidade=' + velocidade);
	
	/*
	if (anguloBaseInicial != null) {
		if (anguloBase <= anguloBaseInicial) {
			if (velocidade <= 0) {
				velocidade = 0;
			} else {
				velocidade--;
			}
		}
	}
	
	
	anguloBase = (anguloBase + velocidade) % 360;//girando
	*/
	voltas--;
	//if (anguloBase <= anguloBaseInicial) {
	if (voltas <= 0) {
		meiaFatiaDeVelocidade = 0;
		var indice = Math.floor(array.length/2);
		console.log('indice:' + indice);
		alert(array[indice]);
	}
	
	
	anguloBase = (anguloBase + meiaFatiaDeVelocidade) % 360;
	
	if (anguloBaseInicial == null) {
		anguloBaseInicial = anguloBase;
	}


}

function girarAntiHorarioHumGrau() {
	anguloBase = (anguloBase + 1) % 360;
	desenharRoleta();
}

function girarHorarioHumGrau() {
	anguloBase = anguloBase - 1;
	if (anguloBase == -1) {
		anguloBase = 359;
	}
	desenharRoleta();
}

var myInterval = null;

function botarParaGirarParar() {
	var chkGirar = document.getElementById("chkGirar");
	if (chkGirar.checked) {
		myInterval = setInterval(girarVelocidade, 1);
	} else {
		clearInterval(myInterval);
	}
}

var aguardarTicks = 0;

function girarVelocidade() {
	var txtVelocidade = document.getElementById("txtVelocidade");
	velocidade = txtVelocidade.value;
	
	var faixa = Math.floor(10000/limiteIntervalo);
	
	
	
	girar(Math.floor(velocidade/faixa));

}

/*
velocidade : intervalo de 0 a 12
*/

var metadeIntervalo = 7;
var limiteIntervalo = 15;

function girar(velocidade) {
	
	console.log("girar(" + velocidade + ")");

	if (velocidade > 0) {
	
		if (velocidade - metadeIntervalo > 0) {
			for(var i = 0; i < velocidade - (metadeIntervalo - 1);i++) {
				girarHorarioHumGrau();
			}
		} else {
			if (aguardarTicks == 0) {
				girarHorarioHumGrau();
				aguardarTicks = metadeIntervalo - velocidade;
			} else {
				aguardarTicks--;
			}
		}
	}			
}

function telaSelecionada() {
	console.log('telaSelecionada()');
	
	
	var tela = document.querySelector('input[type = radio][name = tela]:checked').value;
	
	var painelVelocidadeConstante = document.getElementById('painelVelocidadeConstante');
	
	var painelPeteleco = document.getElementById('painelPeteleco');
	
	var chkGirar = document.getElementById('chkGirar');
	chkGirar.checked = false;
	botarParaGirarParar();
	
	console.log('telaSelecionada() => tela = ' + tela);
	
	if (tela == 1) {
		painelVelocidadeConstante.hidden = false;
		painelPeteleco.hidden = true;
	} else {
		painelVelocidadeConstante.hidden = true;
		painelPeteleco.hidden = false;		
	}
}

var forcaPeteleco = 0;
var forcaPetelecoInicial = 0;
var atrito = 0;

function botarParaGirarParar() {
	var chkGirar = document.getElementById("chkGirar");
	if (chkGirar.checked) {
		myInterval = setInterval(girarVelocidade, 1);
	} else {
		clearInterval(myInterval);
		myInterval = null;
	}
}

var continarMusica = true;

function darPeteleco() {

	tocarMusica();

	var txtForcaPeteleco = document.getElementById('txtForcaPeteleco');
	
	forcaPeteleco = parseInt(txtForcaPeteleco.value);
	
	forcaPetelecoInicial = forcaPeteleco;
	
	var txtAtrito = document.getElementById('txtAtrito');
	
	atrito = parseFloat(txtAtrito.value);
	
	if (forcaPeteleco > 0 && myInterval == null) {
		myInterval = setInterval(girarPorPeteleco, 1);
	} else {
		clearInterval(myInterval);
		myInterval = null;			
	}
	
}

function girarPorPeteleco() {
	velocidade = Math.ceil(forcaPeteleco/1000);
	girar(velocidade);
	
	var reducaoAtrito = Math.ceil(forcaPeteleco * atrito);
	if (reducaoAtrito == 0) {
		forcaPeteleco = 0;
	} else {
		forcaPeteleco = forcaPeteleco - reducaoAtrito;
	}
	
	var txtForcaPeteleco = document.getElementById('txtForcaPeteleco');
	txtForcaPeteleco.value = forcaPeteleco;
	
	console.log('forcaPeteleco = ' + forcaPeteleco);
	
	if (forcaPeteleco <= 0) {
		console.log('clearInterval(myInterval), forcaPeteleco');
		clearInterval(myInterval);
		myInterval = null;
		txtForcaPeteleco.value = forcaPetelecoInicial;
		continarMusica = false;
	}
}

const audioContext = new AudioContext();
const oscList = [];
let mainGainNode = null;		
mainGainNode = audioContext.createGain();
mainGainNode.connect(audioContext.destination);
mainGainNode.gain.value = 0.7;

function tocarMusica() {

	continarMusica = true;
				
	let noteFreq = null;
	let customWaveform = null;
	let sineTerms = null;
	let cosineTerms = null;			

	//createNoteTable();


			
	sineTerms = new Float32Array([0, 0, 1, 0, 1]);
	cosineTerms = new Float32Array(sineTerms.length);
	customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);
	
	var musica = {
		pos: 0,
		notas: []
	};
	
	
	//Musica 1
	addNota(musica, "C#", 100);
	addNota(musica, "D#", 100);
	addNota(musica, "A", 100);
	addNota(musica, "D#", 100);
	addNota(musica, "C#", 100);
	addNota(musica, "D#", 100);
	
	
	/*
	//Musica Alice
	addNota(musica, "G#", 100);
	addNota(musica, "A#", 100);
	addNota(musica, "G", 100);
	addNota(musica, "F", 100);
	addNota(musica, "E", 100);
	addNota(musica, "B", 100);
	*/
	/*
	//Musica Alice - Variação 1
	addNota(musica, "G#", 500);
	addNota(musica, "A#", 100);
	addNota(musica, "G", 100);
	addNota(musica, "F", 500);
	addNota(musica, "E", 100);
	addNota(musica, "B", 100);
	*/
	
	
	tocarNotas(musica);
}

async function tocarNotas(musica) {

	while (continarMusica) {
		
		for(var i = 0; i < musica.notas.length; i++) {
			console.log("nota i = " + i);
			var osc = tocarNota(musica.notas[i]);
			await new Promise(r => setTimeout(r, musica.notas[i].duracaoMili));
			osc.stop();
		}
	}

}

function tocarNota(nota) {
	const osc = playTone(nota.freq);
	
	//var continuar = true;
	/*
	setInterval(function() {
		//const osc = audioContext.createOscillator
		continuar = false;
		osc.stop();
	}, nota.duracaoMili);
	*/
	
	//while(continuar) {
	//	await new Promise(r => setTimeout(r, nota.duracaoMili));
	//}
	return osc;
	
}

function addNota(musica, nota, duracaoMili) {

	var freq = noteFreq[3][nota];

	musica.notas.push({
		freq: freq,
		duracaoMili: duracaoMili
	});
}

function playTone(freq) {
	const osc = audioContext.createOscillator();
	osc.connect(mainGainNode);

	const type = "triangle";//wavePicker.options[wavePicker.selectedIndex].value;

	if (type === "custom") {
		osc.setPeriodicWave(customWaveform);
	} else {
		osc.type = type;
	}

	osc.frequency.value = freq;
	osc.start();

	return osc;
}		

const noteFreq = [];

function createNoteTable() {
	
	for (let i=0; i< 9; i++) {
		noteFreq[i] = [];
	}

	noteFreq[0]["A"] = 27.500000000000000;
	noteFreq[0]["A#"] = 29.135235094880619;
	noteFreq[0]["B"] = 30.867706328507756;

	noteFreq[1]["C"] = 32.703195662574829;
	noteFreq[1]["C#"] = 34.647828872109012;
	noteFreq[1]["D"] = 36.708095989675945;
	noteFreq[1]["D#"] = 38.890872965260113;
	noteFreq[1]["E"] = 41.203444614108741;
	noteFreq[1]["F"] = 43.653528929125485;
	noteFreq[1]["F#"] = 46.249302838954299;
	noteFreq[1]["G"] = 48.999429497718661;
	noteFreq[1]["G#"] = 51.913087197493142;
	noteFreq[1]["A"] = 55.000000000000000;
	noteFreq[1]["A#"] = 58.270470189761239;
	noteFreq[1]["B"] = 61.735412657015513;
	// …

	noteFreq[2]["C"] = 65.406391325149658;
	noteFreq[2]["C#"] = 69.295657744218024;
	noteFreq[2]["D"] = 73.41619197935189;
	noteFreq[2]["D#"] = 77.781745930520227;
	noteFreq[2]["E"] = 82.406889228217482;
	noteFreq[2]["F"] = 87.307057858250971;
	noteFreq[2]["F#"] = 92.498605677908599;
	noteFreq[2]["G"] = 97.998858995437323;
	noteFreq[2]["G#"] = 103.826174394986284;
	noteFreq[2]["A"] = 110.0;
	noteFreq[2]["A#"] = 116.540940379522479;
	noteFreq[2]["B"] = 123.470825314031027;

	noteFreq[3]["C"] = 130.812782650299317;
	noteFreq[3]["C#"] = 138.591315488436048;
	noteFreq[3]["D"] = 146.83238395870378;
	noteFreq[3]["D#"] = 155.563491861040455;
	noteFreq[3]["E"] = 164.813778456434964;
	noteFreq[3]["F"] = 174.614115716501942;
	noteFreq[3]["F#"] = 184.997211355817199;
	noteFreq[3]["G"] = 195.997717990874647;
	noteFreq[3]["G#"] = 207.652348789972569;
	noteFreq[3]["A"] = 220.0;
	noteFreq[3]["A#"] = 233.081880759044958;
	noteFreq[3]["B"] = 246.941650628062055;

	noteFreq[4]["C"] = 261.625565300598634;
	noteFreq[4]["C#"] = 277.182630976872096;
	noteFreq[4]["D"] = 293.66476791740756;
	noteFreq[4]["D#"] = 311.12698372208091;
	noteFreq[4]["E"] = 329.627556912869929; //Mi
	noteFreq[4]["F"] = 349.228231433003884;
	noteFreq[4]["F#"] = 369.994422711634398;
	noteFreq[4]["G"] = 391.995435981749294; //Sol
	noteFreq[4]["G#"] = 415.304697579945138;
	noteFreq[4]["A"] = 440.0; //Lá
	noteFreq[4]["A#"] = 466.163761518089916;
	noteFreq[4]["B"] = 493.883301256124111; //Si

	noteFreq[5]["C"] = 523.251130601197269;
	noteFreq[5]["C#"] = 554.365261953744192;
	noteFreq[5]["D"] = 587.32953583481512;
	noteFreq[5]["D#"] = 622.253967444161821;
	noteFreq[5]["E"] = 659.255113825739859;
	noteFreq[5]["F"] = 698.456462866007768;
	noteFreq[5]["F#"] = 739.988845423268797;
	noteFreq[5]["G"] = 783.990871963498588;
	noteFreq[5]["G#"] = 830.609395159890277;
	noteFreq[5]["A"] = 880.0;
	noteFreq[5]["A#"] = 932.327523036179832;
	noteFreq[5]["B"] = 987.766602512248223;

	noteFreq[6]["C"] = 1046.502261202394538;
	noteFreq[6]["C#"] = 1108.730523907488384;
	noteFreq[6]["D"] = 1174.659071669630241;
	noteFreq[6]["D#"] = 1244.507934888323642;
	noteFreq[6]["E"] = 1318.510227651479718;
	noteFreq[6]["F"] = 1396.912925732015537;
	noteFreq[6]["F#"] = 1479.977690846537595;
	noteFreq[6]["G"] = 1567.981743926997176;
	noteFreq[6]["G#"] = 1661.218790319780554;
	noteFreq[6]["A"] = 1760.0;
	noteFreq[6]["A#"] = 1864.655046072359665;
	noteFreq[6]["B"] = 1975.533205024496447;

	noteFreq[7]["C"] = 2093.004522404789077;
	noteFreq[7]["C#"] = 2217.461047814976769;
	noteFreq[7]["D"] = 2349.318143339260482;
	noteFreq[7]["D#"] = 2489.015869776647285;
	noteFreq[7]["E"] = 2637.020455302959437;
	noteFreq[7]["F"] = 2793.825851464031075;
	noteFreq[7]["F#"] = 2959.955381693075191;
	noteFreq[7]["G"] = 3135.963487853994352;
	noteFreq[7]["G#"] = 3322.437580639561108;
	noteFreq[7]["A"] = 3520.000000000000000;
	noteFreq[7]["A#"] = 3729.310092144719331;
	noteFreq[7]["B"] = 3951.066410048992894;

	noteFreq[8]["C"] = 4186.009044809578154;
	//return noteFreq;
}

createNoteTable();

function irParaPagina(numPagina) {

	var paginas = document.querySelectorAll('[id^="pag"]');
	
	if (numPagina == 2) {
		prepararTabelaDePalabras();
	}
	
	paginas.forEach(function (pagina, index) {
	
		//alert(pagina.id);
	
		if (pagina.id == 'pag' + numPagina) {
			pagina.style.display = 'block';
		} else {
			pagina.style.display = 'none';
		}
		

	});

}

var listaPalabras = [];

var numeroSelecionado = null;

function prepararTabelaDePalabras() {
	
	var textAreaPalabras = document.getElementById('palabrasSorteadas');
	
	var listaPalabrasStr = removeBlankLines(textAreaPalabras.value.trim());
	listaPalabras = listaPalabrasStr.split('\n');
	
	const tabelaPalabrasTBody = document.getElementById('tabelaPalabrasTBody');
	
	var numLinha = 1;
	
	listaPalabras.forEach(function (palabra, index) {
		const newRowVariable = document.createElement('tr');
		newRowVariable.id = `lin${numLinha}`;
		listaPalabras[index] = palabra.trim();
		newRowVariable.innerHTML = `<td>${numLinha++}</td><td>${listaPalabras[index]}</td>`;
		tabelaPalabrasTBody.append(newRowVariable);		
	});
}


//Explanation of the regular expression:
// ^: Matches the beginning of a line.
// \s*: Matches any whitespace character (spaces, tabs, etc.) zero or more times.
// [\r\n]+: Matches one or more carriage return or newline characters (which indicate a line break).
// g: Global flag, meaning it will replace all occurrences.
// m: Multiline flag, allowing ^ and $ to match the start and end of each line (not just the start and end of the entire string).
//This regular expression effectively finds any line that is either empty or contains only whitespace and then replaces it with an empty string, thus removing it.

function removeBlankLines(text) {
  return text.replace(/^\s*[\r\n]+/gm, "");
}

function mostrarRoleta() {
	var myCanvas = document.getElementById('myCanvas');
	myCanvas.style.display = 'inline';
	
	numeroPalavras = listaPalabras.length;

	for (var palavra = 0; palavra < numeroPalavras; palavra++) {
		array[palavra] = palavra + 1;
	}

	shuffle(array);
	disporNumerosNaRoleta(array);

	//Se numero de palavras for par, voltas deve ser ímpar
	//Se numero de palavras for ímpar, voltas deve ser par
	voltas = (360 % numeroPalavras) + 11;

	desenharRoleta();
	
	darPeteleco();
}