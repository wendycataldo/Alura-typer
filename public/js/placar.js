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

function removeLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();
}