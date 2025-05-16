

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

function prepararTabelaDePalabras() {
	
	var textAreaPalabras = document.getElementById('palabrasSorteadas');
	
	var listaPalabrasStr = removeBlankLines(textAreaPalabras.value.trim());
	listaPalabras = listaPalabrasStr.split('\n');
	
	const tabelaPalabrasTBody = document.getElementById('tabelaPalabrasTBody');
	
	var numLinha = 1;
	
	listaPalabras.forEach(function (palabra, index) {
		const newRowVariable = document.createElement('tr');
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
	myCanvas.style.display = 'block';
	
	numeroPalavras = listaPalabras.length;

	var array = [];
	for (var palavra = 0; palavra < numeroPalavras; palavra++) {
		array[palavra] = palavra + 1;
	}

	//shuffle(array);
	disporNumerosNaRoleta(array);

	//Se numero de palavras for par, voltas deve ser ímpar
	//Se numero de palavras for ímpar, voltas deve ser par
	voltas = (360 % numeroPalavras) + 11;

	desenharRoleta();
}