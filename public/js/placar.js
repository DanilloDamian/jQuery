$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
    const corpoTabela = $(".placar").find("tbody");
    const usuario = $("#usuarios").val();
    const numPalavras = $("#contador-palavras").text();

    const linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
let posicaoPlacar = $(".placar").offset().top;
$("html").animate(
    {
    scrollTop: posicaoPlacar+"px"
},1000);
}

function novaLinha(usuario,numPalavras){
const linha= $("<tr>");
const colunaUsuario = $("<td>").text(usuario);
const colunaPalavras= $("<td>").text(numPalavras);
const colunaRemover = $("<td>");
const link = $("<a>").addClass("botao-remover").attr("href","#");
const icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

link.append(icone);
colunaRemover.append(link);
linha.append(colunaUsuario);
linha.append(colunaPalavras);
linha.append(colunaRemover);

return linha
}

function removeLinha(){
    event.preventDefault();
    const linha = $(this).parent().parent();
    linha.fadeOut();
    setTimeout(function(){linha.remove();},1000);
}

function mostraPlacar(){
    $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar(){
    let placar =[];
    const linhas = $("tbody>tr");
    
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text()
        var palavras = $(this).find("td:nth-child(2)").text()
        
        const jogador = {
            usuario: usuario,
            pontos: palavras
        };
        placar.push(jogador);
    })
    let dados = {
    placar:placar
    }
    $.post("http://localhost:3000/placar",dados,function(){
        $(".tooltip").tooltipster("open").tooltipster("content","Sucesso ao sincronizar");;
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content","Falha ao sincronizar");
    }).always(function(){
        setTimeout(function(){
            $(".tooltip").tooltipster("close");
        },1200);
    });
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar",function(data){

    $(data).each(function(){
        let linha = novaLinha(this.usuario,this.pontos);
        linha.find(".botao-remover").click(removeLinha);
        $("tbody").append(linha);
    })
    });
}
