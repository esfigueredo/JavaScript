(function () {
    $(document).ready(function () {
        var imagens = ['img/facebook.png', 'img/android.png', 'img/chrome.png', 'img/firefox.png',
            'img/html5.png', 'img/googleplus.png', 'img/twitter.png', 'img/windows.png', 'img/cross.png'];
        let grid = [];
        let acertos = 0;
        let record = localStorage.getItem('record')
        for (let i = 0; i < 4; i++) {
            grid.push([]);
            for (let j = 0; j < 4; j++) {
                grid[i].push("");
            }
        }
        let divRecord = document.createElement("div");
        let labelRecord = document.createElement("div");
        labelRecord.id = "labelRecord"
        divRecord.id = "divRecord";
        $(body).append(divRecord);
        $(body).append(labelRecord);
        $(`#divRecord`).css({
            position: 'absolute',
            width: '50px',
            height: '50px',
            border: '2px solid black',
            padding: '20px',
            top: '50px',
            left: '600px',
        });
        $('#divRecord').text(localStorage.record);

        $(`#labelRecord`).css({
            position: 'absolute',
            width: '90px',
            height: '30px',
            border: '2px solid black',
            top: '20px',
            left: '600px',
        });
        $('#labelRecord').text("Recorde");

        function escolhaCarta(cards) {
            let escolheu = false;
            let card = ''
            while (!escolheu) {
                let num = Math.floor(Math.random() * 8);
                if (cards[num] < 2) {
                    cards[num] = cards[num] + 1;
                    escolheu = true;
                    card = imagens[num];
                }
            }
            return card
        }
        function embaralhar() {
            let cards = [];
            for (let i = 0; i < 8; i++) {
                cards.push(0)
            }
            let count = 0;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    grid[i][j] = escolhaCarta(cards);
                }
            }
        }
        function criarCartas() {
            let par = document.createElement("p");
            par.id = "par";
            $(`#par`).css({
                position: 'absolute',
                width: '160',
                height: '14px',
                'color': 'white',
                'margin': '0',
                'padding': '0',
                top: '0px',
                left: '20px',
            });
            par.innerHTML = "Restart";
            let Btn = document.createElement("button");
            Btn.id = "ReStart";
            $("#body").append(Btn);
            $("#ReStart").click(function () {
                restart();
            })
            $("#ReStart").append(par);
            $(`#ReStart`).css({
                position: 'absolute',
                border: '1px solid blue',
                width: '318px',
                height: '45px',
                'background-color': 'blue',
                'color': 'white',
                cursor: 'pointer',
                top: '50px',
                left: '200px',
            });
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    let p = document.createElement("img");
                    p.id = "card_" + i + "_" + j
                    p.src = "img/cross.png"
                    $("#body").append(p);
                    $(`#card_${i}_${j}`).css({
                        position: 'absolute',
                        border: '1px solid blue',
                        width: '78px',
                        heigth: '78px',
                        cursor: 'pointer',
                        top: 100 + (80 * j) + 'px',
                        left: (200 + (80 * i)) + 'px',
                    });
                }
            }
        }
        let clicado = [];
        for (let i = 0; i < 4; i++) {
            clicado.push([]);
            for (let j = 0; j < 4; j++) {
                clicado[i].push(0);
            }
        }
        function start() {
            let date = new Date();
            let tempo = date.getTime();
            tempoInicial = tempo;
            let abertas = 0;
            let viradaI;
            let viradaJ;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    $(`#card_${i}_${j}`).click(function () {
                        if (abertas < 2) {
                            abertas = abertas + 1;
                            $(`#card_${i}_${j}`).fadeOut(500)
                            $(`#card_${i}_${j}`).slideUp(500)
                            setTimeout(function() {
                                $(`#card_${i}_${j}`).attr("src", grid[i][j])
                                //$(`#card_${i}_${j}`).fadeIn(500)
                                $(`#card_${i}_${j}`).slideDown(500)
                                $(`#card_${i}_${j}`).fadeIn(500)
                            }, 500)
                            
                            
                            
                           //$(`#card_${i}_${j}`).slideDown(700)
                           //$(`#card_${i}_${j}`).fadeIn(500)
                            
                            if (abertas == 1) {
                                viradaI = i;
                                viradaJ = j;
                            } else {
                                if (grid[viradaI][viradaJ] == grid[i][j] && (viradaI != i || viradaJ != j)) {
                                    clicado[i][j] = 1;
                                    clicado[viradaI][viradaJ] = 1;
                                    abertas = 0;
                                    acertos = acertos + 1;
                                    if (acertos == 8) {
                                        let date = new Date();
                                        let tempo = date.getTime();
                                        let total = tempo - tempoInicial;
                                        total = total / 1000;
                                        if (!record) {
                                            record = total;
                                        } else if (total < record) {
                                            record = total;
                                        }
                                        localStorage.setItem("record", record);
                                        $('#divRecord').text(record);

                                        setTimeout(function () {
                                            window.alert("Parabéns!!! Você ganhou em " + total + " segundos")
                                        }, 30)
                                    }
                                } else {
                                    setTimeout(function () {
                                        $(`#card_${viradaI}_${viradaJ}`).fadeOut(500)
                                        $(`#card_${viradaI}_${viradaJ}`).slideUp(500)
                                        $(`#card_${i}_${j}`).fadeOut(500)
                                        $(`#card_${i}_${j}`).slideUp(500)
                                        setTimeout(function() {
                                           $(`#card_${viradaI}_${viradaJ}`).attr("src", 'img/cross.png')
                                           $(`#card_${i}_${j}`).attr("src", 'img/cross.png')
                                           $(`#card_${viradaI}_${viradaJ}`).slideDown(500)
                                           $(`#card_${viradaI}_${viradaJ}`).fadeIn(500)
                                           $(`#card_${i}_${j}`).slideDown(500)
                                           $(`#card_${i}_${j}`).fadeIn(500)
                                           abertas = 0;
                                        }, 500)
                                    }, 1500);
                                }
                            }
                        }
                    })
                }
            }
        }
        let tempoInicial;
        function restart() {
            let date = new Date();
            let tempo = date.getTime();
            tempoInicial = tempo;
            embaralhar();
            acertos = 0;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    $(`#card_${i}_${j}`).attr("src", 'img/cross.png')
                    clicado[i][j] = 0
                }
            }
        }
        embaralhar()
        criarCartas()
        start()
    })
})();
