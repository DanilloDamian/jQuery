let tempoInicial = $("#tempo-digitacao").text();
const campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reininciar").click(reininciaJogo);
    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField:'text'
    });
    $(".tooltip").tooltipster({
        trigger: "custom",
        
    });
});

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase(){
    const frase = $(".frase").text();
    const numPalavras= frase.split(" ").length;
    const tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
        campo.on("input",function(){
       const conteudo = campo.val();
    
       const qtdPalavras = conteudo.split(/\S+/).length -1;
       $("#contador-palavras").text(qtdPalavras);
    
       const qtdCaracteres = conteudo.length;
       $("#contador-caracteres").text(qtdCaracteres)
    });
}

function inicializaCronometro(){
        campo.one("focus", function(){
            let tempoRestante = $("#tempo-digitacao").text();
            let cronometroID = setInterval(function(){
            tempoRestante --;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
            clearInterval(cronometroID);
            finalizaJogo();
           
            }
        },1000)
    });
}
function finalizaJogo(){
    campo.attr("disabled",true);
    campo.addClass("campo-desativado");
    inserePlacar();

}
function inicializaMarcadores() {
    campo.on("input", function () {
        const frase = $(".frase").text();
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {

            campo.addClass("borda-verde")
            campo.removeClass("borda-vermelha")
        } else {

            campo.addClass("borda-vermelha")
            campo.removeClass("borda-verde")
        }
    });
}

function reininciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}


