var tempoInicical = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//pode ser assim tbm $(document).ready(function(){
$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(botaoReinicializa);
})

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();

        var qtdPalavras = conteudo.split(/\S+/).length -1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro(){
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo(){
    campo.attr("disabled",true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function removeLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();
}

$(".botao-remover").click(function(event){
    event.preventDefault();
    $(this).parent().parent().remove();
});

function inicializaMarcadores(){
    var frase = $(".frase").text();
    campo.on("input", function(){
        var digitado = campo.val();
        var comparavel = fase.substr(0, digitado.length);
        if (digitado == comparavel){
            campo.addClass("borda-correto");
            campo.removeClass("borda-errado");
        }else{
            campo.addClass("borda-errado");
            campo.removeClass("borda-correto");
        }
    });
}

function botaoReinicializa(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caractere").text("0");
    $("#tempo-digitacao").text(tempoInicical);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-correto");
    campo.removeClass("borda-errado");
}

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario =  "wendy";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";
    
    var linha = novaLinha(usuario, numPalavas);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha); //add no final da tabela
    //corpoTabela.prepend(linha); //add no final da tabela           
}

function novaLinha(usuario){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}