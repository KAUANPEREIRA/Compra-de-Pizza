// o item se refere a pizza , e index se refere a posição do array que ela se encontra
//cloneNode(true) clona um item e sua estrutura
// const qs utilizada para pegar algo com document.querySelector

//preventDefault = evita que um evento padrão aconteça exemplo submitar a pagina e.preventDefault()==previna a ação padrão
//closest('procura algo mais proximo do atributo que foi passado')

//listagem das pizzas e layout
let carrinho= []
let modalQt = 1
let modalKey = 0
const qs = (elemento)=>{
    return document.querySelector(elemento)
}

const qsAll =(elemento)=>{
    return document.querySelectorAll(elemento)
    // querySelectorAll retorna um array com oque achou
}

pizzaJson.map((item,index)=>{
 let pizzaItem = qs('.models .pizza-item').cloneNode(true)

 pizzaItem.setAttribute('data-key', index)
 pizzaItem.querySelector('.pizza-item--img img').src = item.img
 pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
 pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
 pizzaItem.querySelector('.pizza-item--price').innerHTML = ` R$ ${item.price.toFixed(2)}`

 pizzaItem.querySelector('a').addEventListener('click', (e)=>{
     e.preventDefault()
     let key = e.target.closest('.pizza-item').getAttribute('data-key')
     modalKey = key
     modalQt = 1
     console.log(pizzaJson[key])
    qs('.pizzaBig img').src =pizzaJson[key].img
    qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name
    qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
    qs('.pizzaInfo--actualPrice').innerHTML = ` R$ ${pizzaJson[key].price.toFixed(2)}`
    qs('.pizzaInfo--size.selected').classList.remove('.selected')
    qsAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{//selector Trata oque foi pego nele como um array
        if(sizeIndex==2){
            size.classList.add('selected')
        }
        size.querySelector('span').innerHTML=pizzaJson[key].sizes[sizeIndex]
    })

    qs('.pizzaInfo--qt').innerHTML= modalQt

     qs('.pizzaWindowArea').style.opacity=0
     qs('.pizzaWindowArea').style.display='flex'
    setTimeout(()=>{
        qs('.pizzaWindowArea').style.opacity=1
    },300)
     
 })
 
qs('.pizza-area').append(pizzaItem) 

})
//Eventos
let fecharModal = ()=>{
    qs('.pizzaWindowArea').style.opacity=0
    setTimeout(()=>{
        qs('.pizzaWindowArea').style.display='none'
    },500)
}

qsAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton ').forEach((item)=>{
    item.addEventListener('click',fecharModal)
})

//evento para diminuir quantidade
qs('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    modalQt--
    qs('.pizzaInfo--qt').innerHTML= modalQt
    if(modalQt<=1){
        modalQt=1
        qs('.pizzaInfo--qt').innerHTML= modalQt
    }

})


//evento para aumentar quantidade
qs('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQt++
    qs('.pizzaInfo--qt').innerHTML= modalQt

})

//logica para seleção de marcação de algo e desmarcação de outro
qsAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{//selector Trata oque foi pego nele como um array
   size.addEventListener('click',(e)=>{
    qs('.pizzaInfo--size.selected').classList.remove('selected')
    size.classList.add('selected')
   })
})

//adicionar ao carrinho
qs('.pizzaInfo--addButton').addEventListener('click', ()=>{
let size = parseInt(qs('.pizzaInfo--size.selected').getAttribute('data-key'))
carrinho.push({
        id:pizzaJson[modalKey].id,
        size,
        qt:modalQt




})
console.log(carrinho)
fecharModal()
}



)
