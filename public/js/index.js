$(function () {
    texto = $('#texto');
    tempo = $('#tempo');
    h1 = $('h1');
    reiniciar = $('#reiniciar');
    objetivo = $('#objetivo');
    numPlayer = 1;
    pontuacao = 0;
    calcula_caracteres_palavras();
    inicia_tempo();
    reiniciar_jogo();
});

function calcula_caracteres_palavras() {
    texto.on('input', function () {
        quantidade_caracteres = texto.val().length;
        quantidade_palavras = texto.val().split(' ').length;
        $('#texto_quantidade_caracteres').text(quantidade_caracteres);
        $('#texto_quantidade_palavras').text(quantidade_palavras);
        frase = objetivo.text().substr(0, quantidade_caracteres);
        if (frase == texto.val()) {
            texto.css('border-color', 'green');
            pontuacao++;
            $(`.pontuacao${numPlayer}`).text(pontuacao);
        }
        else
            texto.css('border-color', 'red');
    });
}

function inicia_tempo() {
    texto.one('focus', function () {
        reiniciar.attr('hidden', false);
        intervalo = setInterval(function () {
            tempo.text(parseInt(tempo.text()) - 1);
            if (tempo.text() == 0) {
                clearInterval(intervalo);
                texto.attr('disabled', true);
            }
        }, 1000);
        criaTrPlayer();
    });
}

function criaTrPlayer() {
    tr = $('<tr>');
    jogador = $('<td>').text('Jogador ' + numPlayer);
    placar = $('<td>').text(pontuacao).addClass('pontuacao' + numPlayer);
    remover_td = $('<td>');
    link = $('<a>').attr('href', '#').addClass('remover');
    icone = $('<i>').addClass('fa-solid fa-trash');
    link.append(icone);
    remover_td.append(link);
    tr.append(jogador);
    tr.append(placar);
    tr.append(remover_td);
    $('#ranking').append(tr);
    tr.find('.remover').click(function (event) {
        event.preventDefault();
        $(this).parent().parent().remove();
    });
}

function reiniciar_jogo() {
    reiniciar.click(function (event) {
        event.preventDefault();
        texto.val('');
        texto.attr('disabled', false);
        texto.css('border-color', 'black');
        tempo.text(120);
        $('#ranking').empty();
        pontuacao = 0;
        numPlayer = 1;
        calcula_caracteres_palavras();
        inicia_tempo();
        remover_jogador();
        reiniciar_jogo();
    });
}

function reiniciar_jogo() {
    reiniciar.click(function () {
        texto.attr('disabled', false);
        texto.val('');
        tempo.text(10);
        numPlayer++;
        $('#texto_quantidade_caracteres').text(0);
        $('#texto_quantidade_palavras').text(0);
        clearInterval(intervalo);
        reiniciar.attr('hidden', true);
        pontuacao = 0;
        inicia_tempo();
    });
}


