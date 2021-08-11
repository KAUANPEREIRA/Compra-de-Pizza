// o item se refere a pizza , e index se refere a posição do array que ela se encontra
//cloneNode(true) clona um item e sua estrutura
// const qs utilizada para pegar algo com document.querySelector

//preventDefault = evita que um evento padrão aconteça exemplo submitar a pagina e.preventDefault()==previna a ação padrão
//closest('procura algo mais proximo do atributo que foi passado')
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
     console.log(pizzaJson[key])
    qs('.pizzaBig img').src =pizzaJson[key].img
    qs('.pizzaInfo h1').innerHTML = pizzaJson[key].name
    qs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
    qs('.pizzaInfo--actualPrice').innerHTML = ` R$ ${pizzaJson[key].price}`

     qs('.pizzaWindowArea').style.opacity=0
     qs('.pizzaWindowArea').style.display='flex'
    setTimeout(()=>{
        qs('.pizzaWindowArea').style.opacity=1
    },300)
     
 })
 
qs('.pizza-area').append(pizzaItem) 

})