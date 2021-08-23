// o item se refere a pizza , e index se refere a posição do array que ela se encontra metodo map
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

let identificador = pizzaJson[modalKey].id+'@'+size

let key = carrinho.findIndex((item)=>item.identificador == identificador)
if(key>-1){
    carrinho[key].qt += modalQt
}else{
carrinho.push({
        identificador,
        id:pizzaJson[modalKey].id,
        size,
        qt:modalQt
})

}
atualizarCarrinho()
fecharModal()
})



function atualizarCarrinho(){
    if(carrinho.length>0){
        qs('aside').classList.add('show')
        qs('.cart').innerHTML=''
        let subtotal=0
        let desconto=0
        let total=0
        for(let i in carrinho){
            let pizzaItem = pizzaJson.find((item)=>{
                return item.id == carrinho[i].id
            })
            let carrinhoItem = qs('.models .cart--item').cloneNode(true)
            let pizzaTamanhoC;
            switch(carrinho[i].size){
                case 0 :
                    pizzaTamanhoC = 'P'
                    break
                case 1:
                    pizzaTamanhoC = 'M'
                    break
                case 2:
                    pizzaTamanhoC = 'G'
                    break


            }
            carrinhoItem.querySelector('img').src = pizzaItem.img
            carrinhoItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (${pizzaTamanhoC})`
            carrinhoItem.querySelector('.cart--item--qt').innerHTML = carrinho[i].qt
            carrinhoItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(carrinho[i].qt>1){
                    carrinho[i].qt--
                }else{
                    carrinho.splice(i, 1)
                }
                atualizarCarrinho()
            })

            carrinhoItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                carrinho[i].qt++
                atualizarCarrinho()
            })


            qs('.cart').append(carrinhoItem)
        }
    }else{
        qs('aside').classList.remove('show')
    }
}

