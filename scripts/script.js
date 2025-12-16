// 1. Seleção de elementos (Entrada de Dados)
const inputPalpite = document.getElementById("palpite");
const btnChute = document.getElementById("btn-chute");
const pDicas = document.getElementById("dicas");
const pResultado = document.getElementById("resultado");
const pTentativas = document.getElementById("tentativas");

// 2. Varíaveis de controle do jogo
let numeroSecreto;
let tentativasRestantes;
const maxTentativas = 10;

// 3. Função pra iniciar/reiniciar o jogo
function iniciarJogo() {
    // Gera número entre 1 e 100
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tentativasRestantes = maxTentativas;

    // Reseta textos
    pTentativas.textContent = `Tentativas restantes: ${tentativasRestantes}`;
    pDicas.textContent = "";
    pResultado.textContent = "";
    inputPalpite.disabled = false;
    btnChute.disabled = false;
}

// 4. Função principal de verificar o chute
function verificarChute() {
    // Pegar o valor e converte para número inteiro
    const palpite = parseInt(inputPalpite.value);

    // Validação: Se não for número ou estiver fora do limite
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        pResultado.textContent = "Digite um número entre 1 e 100.";
        pResultado.style.color = "orange";
        return; // Para a função aqui
    }

    pResultado.textContent = "";

    // Lógica do jogo
    if (palpite === numeroSecreto) {
        // VITORIA
        pResultado.textContent = `Parabéns! Você acertou o número ${numeroSecreto}`;
        pResultado.style.color = "green"
        pDicas.textContent = "";
        encerrarJogo();
    } else {
        // ERRO
        tentativasRestantes--; // Decrementa 1 tentativa
        pTentativas.textContent = `Tentativas restantes: ${tentativasRestantes}`;

        if (tentativasRestantes === 0) {
            // DERROTA (Acabaram as tentativas)
            pResultado.textContent = `Você perdeu! O número secreto era ${numeroSecreto}.`;
            pResultado.style.color = "red";
            pDicas.textContent = "";
            encerrarJogo();
        } else {
            // DICA (Maior ou Menor)
            if (palpite < numeroSecreto) {
                pDicas.textContent = `O número secreto é MAIOR que ${palpite}.`
            } else {
                pDicas.textContent = `O número secreto é MENOR que ${palpite}.`
            }
            // Limpa o input e foca nele novamente
            inputPalpite.value = "";
            inputPalpite.focus();
        }
    }
}

function encerrarJogo() {
    inputPalpite.disabled = true;
    btnChute.disabled = true;
}

// Adiciona o evento de clique ao botão
btnChute.addEventListener('click', verificarChute);

// Inicia o jogo ao carregar a página
iniciarJogo();