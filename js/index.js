let listaProdutos = document.querySelector(".lista-produtos")

let listaCarrinho = document.querySelector(".lista-carrinho")

let armazenaTotal = document.querySelector(".armazena-total")


let count = 0
let total = 0

function criarCardCarrinho(item) {
    let totalNoCarrinho = 1
    let totalDoItem = item.value

    let cardCarrinho = document.createElement("li")
    cardCarrinho.setAttribute("id", `carrinho_${item.id}`)

    let imagemCarrinho = document.createElement("img")
    imagemCarrinho.src = item.img
    imagemCarrinho.alt = item.nameItem

    let conteudoItemCarrinho = document.createElement("div")
    conteudoItemCarrinho.classList.add("conteudo-item-carrinho")
    conteudoItemCarrinho.innerHTML =
        `
        <h3>${item.nameItem}</h3>
        <span>R$ ${(item.value).toFixed(2)}</span>
    `

    let quantidadeItensCarrinho = document.createElement("div")
    quantidadeItensCarrinho.classList.add("quantidade-itens")

    let quantidadeTotalProduto = document.createElement("span")
    quantidadeTotalProduto.innerHTML = `${totalNoCarrinho}`

    let removeQuantidade = document.createElement("button")
    removeQuantidade.innerText = "-"
    removeQuantidade.addEventListener("click", function (event) {
        quantidadeTotalProduto.innerHTML = ""
        totalNoCarrinho--
        totalDoItem -= item.value
        quantidadeTotalProduto.innerHTML = `${totalNoCarrinho}`
        count--
        total -= item.value
        if (totalNoCarrinho < 1) {
            event.composedPath()[3].remove()
        }
        carroVazio()
        carrinhoTotal()
    })

    let addQuantidade = document.createElement("button")
    addQuantidade.innerText = "+"
    addQuantidade.addEventListener("click", function () {
        quantidadeTotalProduto.innerHTML = ""
        totalNoCarrinho++
        totalDoItem += item.value
        quantidadeTotalProduto.innerHTML = `${totalNoCarrinho}`
        count++
        total += item.value
        carrinhoTotal()
    })

    quantidadeItensCarrinho.appendChild(removeQuantidade)
    quantidadeItensCarrinho.appendChild(quantidadeTotalProduto)
    quantidadeItensCarrinho.appendChild(addQuantidade)

    let botaoRemover = document.createElement("button")
    botaoRemover.innerText = "Remover produto"
    botaoRemover.classList.add("remove-produto")
    botaoRemover.setAttribute("id", `remove_${item.id}`)

    botaoRemover.addEventListener("click", function (event) {
        count -= totalNoCarrinho
        total -= totalDoItem
        event.composedPath()[2].remove()
        carroVazio()
        carrinhoTotal()
    })

    conteudoItemCarrinho.appendChild(quantidadeItensCarrinho)
    conteudoItemCarrinho.appendChild(botaoRemover)

    cardCarrinho.appendChild(imagemCarrinho)
    cardCarrinho.appendChild(conteudoItemCarrinho)

    return cardCarrinho
}

function criarCards(item) {
    let cardProduto = document.createElement("li")
    cardProduto.classList.add("card-produto")

    let divImg = document.createElement("div")
    divImg.classList.add("div-img")    

    let imagemProduto = document.createElement("img")
    imagemProduto.src = item.img
    imagemProduto.alt = item.nameItem

    divImg.appendChild(imagemProduto)

    let conteudoCard = document.createElement("div")
    conteudoCard.classList.add("conteudo-produto")

    conteudoCard.innerHTML =
    `
        <small>${item.tag[0]}</small>
        <h3>${item.nameItem}</h3>
        <p>${item.description}</p>
        <span>R$ ${(item.value).toFixed(2)}</span>    
    `

    let botaoAdd = document.createElement("button")
    botaoAdd.setAttribute("id", `add_${item.id}`)
    botaoAdd.innerText = `${item.addCart}`

    botaoAdd.addEventListener("click", function () {
        if (count == 0) {
            listaCarrinho.innerHTML = ""
        }
        let itemDentroCarrinho = document.querySelector(`#carrinho_${item.id}`)
        if (itemDentroCarrinho) {
            return alert("O item já está no carrinho")
        }

        count++
        total += item.value

        let cardCarrinho = criarCardCarrinho(item)
        listaCarrinho.appendChild(cardCarrinho)

        carrinhoTotal()
    })

    conteudoCard.appendChild(botaoAdd)

    cardProduto.appendChild(divImg)
    cardProduto.appendChild(conteudoCard)
    return cardProduto
}

function listarCards(lista) {
    listaProdutos.innerHTML = ""
    for (let i = 0; i < lista.length; i++) {
        let card = criarCards(lista[i])
        listaProdutos.appendChild(card)
    }
    carroVazio()
}
listarCards(data)

let campoPesquisa = document.querySelector(".campo-pesquisa")
let botaoPesquisa = document.querySelector(".botao-pesquisa")

botaoPesquisa.addEventListener("click", function (event) {
    event.preventDefault()

    let inputPesquisa = campoPesquisa.value
    let arrayPesquisa = []

    for (let i = 0; i < data.length; i++) {
        let item = data[i]
        if ((item.nameItem.toLowerCase()).includes(inputPesquisa.toLowerCase())) {
            arrayPesquisa.push(item)
            campoPesquisa.value = ""
        }
    }

    if (arrayPesquisa.length == 0) {
        return alert("Item não encontrado")
    }

    listarCards(arrayPesquisa)
})

function carroVazio() {
    if (count == 0) {
        listaCarrinho.innerHTML = ""
        let carrinhoVazio = document.createElement("div")
        carrinhoVazio.setAttribute("id", "carrinho-vazio")
        carrinhoVazio.innerHTML =
        `
        <h3>Carrinho vazio</h3>
        <small>Adicione itens</small>
        `

        listaCarrinho.appendChild(carrinhoVazio)
    }
}

function carrinhoTotal() {
    if (count > 0) {

        armazenaTotal.innerHTML = ""

        let fechamentoCarrinho = document.createElement("div")
        fechamentoCarrinho.classList.add("fechamento-carrinho")

        fechamentoCarrinho.innerHTML =
            `
        <div class="quantidade">
            <span>Quantidade:</span>
            <small id="quantidade-itens">${count}</small>
        </div>
        <div class="total">
            <span>Total:</span>
            <small id="valor-total">R$ ${total.toFixed(2)}</small>
        </div>
        `
        armazenaTotal.appendChild(fechamentoCarrinho)
    } else {
        armazenaTotal.innerHTML = ""
    }
}

let logo = document.querySelector(".logo")
logo.addEventListener("click", function () {
    listarCards(data)
})

let listarTodos = document.querySelector("#listar-todos")
listarTodos.addEventListener("click", function (event) {
    event.preventDefault()
    listarCards(data)
})

function buscarPalavraChave(palavraChave) {
    let arrayChave = []
    for (let i = 0; i < data.length; i++) {
        let categorias = data[i].tag
        for (let j = 0; j < categorias.length; j++) {
            if (categorias[j].toLowerCase() == palavraChave.toLowerCase()) {
                arrayChave.push(data[i])
            }
        }
    }
    listarCards(arrayChave)
}

let listarAcessorios = document.querySelector("#listar-acessorios")
listarAcessorios.addEventListener("click", function (event) {
    event.preventDefault()
    buscarPalavraChave("acessórios")
})

let listarCalcados = document.querySelector("#listar-calcados")
listarCalcados.addEventListener("click", function (event) {
    event.preventDefault()
    buscarPalavraChave("calçados")
})

let listarCamisetas = document.querySelector("#listar-camisetas")
listarCamisetas.addEventListener("click", function (event) {
    event.preventDefault()
    buscarPalavraChave("camisetas")
})