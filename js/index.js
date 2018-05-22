function viajar(){
	var opcao = $("#selviajar").val();
	
	if(opcao == 1){
		//COLOCAR A MUSICA WATER FLOWING
		alert($("#selviajar option:selected").text());
		var p = $("#viajar").css("background-color", "black");
		p.show(15000);
		$("#header").hide(15000);
		$("#footer").hide(15000);
	}else if(opcao == 2){
		var test = Math.floor((Math.random() * 10) + 1);
		alert(test);
	}else if(opcao == 3){
		var test = Math.floor((Math.random() * 10) + 1);
		alert(test);
	}else if(opcao == 4){
		if(confirm("Tem certeza ? Você não poderá voltar atrás.")){
			//MUDAR DE MUSICA CONFORME O NÚMERO SORTEADO
			var test = Math.floor((Math.random() * 10) + 1);
			alert(test);
		}
	}
}