$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

    function mostraPlacar(){
        $(".placar").slideToggle(600);
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

    corpoTabela.append(linha);
    $(".placar").slideDown(500);
    scrolPlacar();
}

function scrolPlacar(){
    var possicaoPlacar = $(".placar").offset().top;
    $("body").animate({scrollTop: possicaoPlacar + "px"}, 1000);
    
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
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setInterval(function(){
        linha.remove();
    }, 1000); 
}

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        
        var score = { usuario: usuario, pontos: palavras };
        placar.push(score);
    });

    var dados = { placar: placar};

    $post("http://localhost:3000/placar", dados, function(){

    })
}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("#tbody").append(linha);
        });
    });
}