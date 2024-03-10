document.addEventListener('DOMContentLoaded', function() {
    new MultiSelectTag('pedido');
})

var bnt = document.getElementById('bnt')


if (bnt) {
    bnt.addEventListener('click', function(){
        var nome_cliente = document.getElementById('cliente')
        var select = document.getElementById('pedido')
        var transportadora = document.getElementById('transp')
        var vendedor = document.getElementById('vendedor')
        var quantidade = document.getElementById('quant')
        var pedidos = []
        var lis_select = []
    
        for(let i = 0; i < select.options.length; i++){
            if (select.options[i].selected){
                pedidos.push(select.options[i].value)
                if(select.options.length != 1){
                    var prod_select = window.prompt(`Qual a quantidade de ${select.options[i].value}`)
                    lis_select.push(prod_select)
                }
            }
        }
    
        var info = {
            "nome": nome_cliente.value,
            "select": pedidos,
            "volume": quantidade.value,
            "transportadora": transportadora.value,
            "vendedor": vendedor.value,
            "select_mais": lis_select,
            "concluido": false,
            "lixeira":false
        }
    
        var itens = JSON.parse(localStorage.getItem("lista")) || []
    
        itens.push(info)
    
        localStorage.setItem("lista", JSON.stringify(itens))
    
        var itens_fora = JSON.parse(localStorage.getItem("nova_lista")) || []
    
        localStorage.setItem("nova_lista", JSON.stringify(itens_fora))
    
        nome_cliente.value = ''
        select.value = []
        quantidade.value = ''
        transportadora.value = ''
        vendedor.value = ''

        atualiza()


    })
    
    function atualiza() {
        var itens = JSON.parse(localStorage.getItem("lista")) || []
        var div = document.getElementById('conteudo')
    
        div.innerHTML = ""
        var html = ""
    
        for (var x of itens) {
            html += ``; 
            
            if("lixeira" in x && x.lixeira == true){
                html += ` <div id="clientes" style="display:none;">`
            }else{
                html += `<div id="clientes">`
            }
            html +=` <details>
                    <summary id="summary">`
    
                        if("concluido" in x && x.concluido == true) {
                            html += `<strike>${x.nome}</strike>`
                        } else {
                            html += x.nome
                        }
                        
            html +=   
                `</summary>
                    <p><span>Transportadora:   </span>${x.transportadora}</p>
                    <p><span>Vendedor:  </span>${x.vendedor}</p>
                    <p><span>Quantidade:  </span>`
                    for(var t in x.select){
                        html += `(${x.select_mais[t]} - ${x.select[t]} )`
                    }
                    html +=    `</p> 
                    <p><span>Volume:   </span>${x.volume}</p>
                </details>
                <div id="img">
                    <img id="lixeira" onclick="removerElemento(${itens.indexOf(x)})" src="./assets/img/lixeira.png" alt=""> `;
    
                    if("concluido" in x && x.concluido == true) {
                        html += `<img id="check" onclick="concluido(${itens.indexOf(x)})" src="./assets/img/check.png" alt="">`
                    } else {
                        html += `<img id="check" onclick="concluido(${itens.indexOf(x)})" src="./assets/img/checkver.png" alt="">`
                    }
    
                    html += `
                </div>
                </div> `
                
        }

        
    
        div.innerHTML += html
    }
    
    function concluido(indice) {
        var itens = JSON.parse(localStorage.getItem("lista"))
        itens[indice].concluido = true 
    
        localStorage.setItem("lista", JSON.stringify(itens))
    
        atualiza()
    }
    
    function removerElemento(indice){
        
        var itens = JSON.parse(localStorage.getItem("lista"))
        itens[indice].lixeira = true
        localStorage.setItem("lista", JSON.stringify(itens))
        atualiza()
    
        var itens_fora = JSON.parse(localStorage.getItem("nova_lista")) 
        itens_fora.push(itens[indice])
        localStorage.setItem("nova_lista", JSON.stringify(itens_fora))
        atualiza()
    
    }
    
    
    
    atualiza()
} else {
    function atualiza() {
        var itens = JSON.parse(localStorage.getItem("nova_lista")) || []
        var div = document.getElementById('lista_excluido')
        var div_dois = document.getElementById('lista_concluido')
    
        div.innerHTML = ""
        var html = ""
    
        for (var x of itens) {
            
            if (x.concluido == false){
                html += `<details> <summary><span class="span">Cliente:</span> ${x.nome} </summary> <p id="p_hist"><span class="span">Pedido:</span>${x.select} <span class="span">Volume:</span> ${x.volume}<span class="span"> Trasportadora:</span> ${x.transportadora} <span class="span">Vendedor:</span> ${x.vendedor}</p></details>`
            }else{
                div_dois.innerHTML += `<details> <summary><span class="span">Cliente:</span> ${x.nome} </summary> <p id="p_hist"><span class="span">Pedido:</span>${x.select} <span class="span">Volume:</span> ${x.volume}<span class="span"> Trasportadora:</span> ${x.transportadora}  <span class="span">Vendedor:</span> ${x.vendedor}</p></details>`
            }
        }
    
        div.innerHTML += html
}

    

    var bnt_historico = document.getElementById('bnt_historico')

    bnt_historico.addEventListener('click', function(){
        localStorage.removeItem("nova_lista")
        localStorage.removeItem("lista")
        atualiza()
    })

    atualiza()
}