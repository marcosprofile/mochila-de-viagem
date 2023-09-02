const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem('itens')) || []

itens.forEach((e) => {
  criarElemento(e)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const nome = e.target.elements['nome']
  const quantidade = e.target.elements['quantidade']

  const existe = itens.find(elemento => elemento.nome === nome.value)
  
  const itemAtual = {
    "nome": nome.value,
    "quantidade": quantidade.value
  }

  if (existe) {
    itemAtual.id = existe.id

    atualizaElemento(itemAtual)

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
  } else {
    itemAtual.id = itens[itens.length - 1] ? (itens[itens.length -1]).id + 1 : 0
    
    criarElemento(itemAtual)
    
    itens.push(itemAtual)
  }

  localStorage.setItem('itens', JSON.stringify(itens))

  nome.value = ""
  quantidade.value = ""
})

function criarElemento(item) {
  const novoItem = document.createElement('li')
  novoItem.classList.add('item')

  const numeroItem = document.createElement('strong')
  numeroItem.innerHTML = item.quantidade
  numeroItem.dataset.id = item.id
  novoItem.appendChild(numeroItem)

  novoItem.innerHTML += item.nome

  novoItem.appendChild(botaoRemover(item.id))

  lista.appendChild(novoItem)
}

function atualizaElemento(item) {
  document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoRemover(id) {
  const trash = "/img/trash.svg"
  const elementoBotao = document.createElement('button');
  elementoBotao.innerHTML = `<img src="${trash}">`

  elementoBotao.addEventListener('click', function() {
    deletaElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletaElemento(tag, id) {
  tag.remove()

  itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

  localStorage.setItem('itens', JSON.stringify(itens))
}

//localStorage.clear();