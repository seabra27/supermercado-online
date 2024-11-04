import React, { useState } from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

// Função Produto, responsável por exibir cada item disponível para compra
function Produto({ produto, adicionarAoCarrinho }) {
  return (
    <div className="produto">
      <img src={produto.imagem} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <p>Preço: R${produto.preco.toFixed(2)}</p>
      <p>Validade: {produto.validade}</p>
      <p>Corredor: {produto.corredor} | Gôndola: {produto.gondola}</p>
      {/* Exibe a mensagem "Promoção" somente para itens de limpeza */}
      {produto.limpeza && <span className="promocao">Promoção!</span>}
      <button onClick={() => adicionarAoCarrinho(produto)}>Comprar</button>
    </div>
  );
}

// Função Carrinho, responsável pela exibição e manipulação dos itens no carrinho de compras
function Carrinho({ carrinho, removerDoCarrinho, editarQuantidade }) {
  // Calcula o valor total do carrinho com base nas quantidades e promoções
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      // Aplica a promoção "Leve 3, pague 2" somente para produtos de limpeza
      const quantidadeComDesconto = item.limpeza
        ? Math.floor(item.quantidade / 3) * 2 + (item.quantidade % 3)
        : item.quantidade;
      const precoComDesconto = quantidadeComDesconto * item.preco;
      return total + precoComDesconto;
    }, 0).toFixed(2);
  };

  return (
    <div className="carrinho">
      <img src="https://cdn.pixabay.com/photo/2015/10/22/16/42/icon-1001596_1280.png" width="50px" height="50px"/>
      <h2>Compras</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          {carrinho.map((item, index) => (
            <div key={index} className="item-carrinho">
              <p>
                {item.nome} - R${item.preco.toFixed(2)}
              </p>
              <input
                type="number"
                value={item.quantidade}
                min="1"
                onChange={(e) => editarQuantidade(index, parseInt(e.target.value))}
              />
              <button onClick={() => removerDoCarrinho(index)}>Remover</button>
            </div>
          ))}
          <h3>Total: R${calcularTotal()}</h3>
        </>
      )}
    </div>
  );
}

function App() {
  const [produtos, setProdutos] = useState([
    {
      nome: "Maçã",
      preco: 2.99,
      validade: "15/10/2024",
      corredor: 4,
      gondola: 2,
      imagem: "https://hortifruti.com.br/media/catalog/product/cache/90a67334732b2408839e146d4f241496/1/0/100171-maca-red-unidade.jpg",
      limpeza: false,
      quantidade: 0,
    },
    {
      nome: "Leite",
      preco: 4.59,
      validade: "10/11/2024",
      corredor: 7,
      gondola: 3,
      imagem: "https://ibassets.com.br/ib.item.image.large/l-c54acdc6d1da4f50a37252efe847bbd7.jpeg",
      limpeza: false,
      quantidade: 0,
    },
    {
      nome: "Arroz",
      preco: 18.99,
      validade: "20/12/2024",
      corredor: 5,
      gondola: 1,
      imagem: "https://mercantilnovaera.vtexassets.com/arquivos/ids/195127-800-auto?v=637789075399570000&width=800&height=auto&aspect=true",
      limpeza: false,
      quantidade: 0,
    },
    {
      nome: "Banana",
      preco: 3.49,
      validade: "12/10/2024",
      corredor: 4,
      gondola: 2,
      imagem: "https://thumbs.dreamstime.com/b/grupo-das-bananas-6175887.jpg",
      limpeza: false,
      quantidade: 0,
    },
    {
      nome: "Sabão em Pó",
      preco: 25.99,
      validade: "09/07/2025",
      corredor: 8,
      gondola: 3,
      imagem: "https://hortifruti.com.br/media/catalog/product/cache/34f061b781a2f336a82d9948d9106723/1/4/143588---7891150064317---det-po-omo-lavagem-perfeita-800gr.jpg",
      limpeza: true,
      quantidade: 0,
    },
    {
      nome: "Detergente",
      preco: 3.99,
      validade: "12/08/2025",
      corredor: 8,
      gondola: 4,
      imagem: "https://hortifruti.com.br/media/catalog/product/cache/34f061b781a2f336a82d9948d9106723/1/2/126078---7891022640007---detergente-liq-limpol-coco-500ml.jpg",
      limpeza: true,
      quantidade: 0,
    },
    {
      nome: "Cloro Ativo",
      preco: 18.99,
      validade: "31/10/2025",
      corredor: 8,
      gondola: 4,
      imagem: "https://hortifruti.com.br/media/catalog/product/cache/34f061b781a2f336a82d9948d9106723/1/4/143812---7891035285219---veja-limp-cloro-ativo-1l-20desconto.jpg",
      limpeza: true,
      quantidade: 0,
    },
  ]);

  const [carrinho, setCarrinho] = useState([]);

  // Adiciona produtos ao carrinho ou incrementa a quantidade se já estiver no carrinho
  const adicionarAoCarrinho = (produto) => {
    const itemNoCarrinho = carrinho.find(item => item.nome === produto.nome);
    if (itemNoCarrinho) {
      setCarrinho(carrinho.map(item => 
        item.nome === produto.nome ? { ...item, quantidade: item.quantidade + 1 } : item
      ));
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  // Remove um item específico do carrinho
  const removerDoCarrinho = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  // Edita a quantidade de um item específico no carrinho
  const editarQuantidade = (index, novaQuantidade) => {
    setCarrinho(carrinho.map((item, i) => 
      i === index ? { ...item, quantidade: novaQuantidade } : item
    ));
  };

  return (
    <div className="app">
      <h1 className="titulo">SUPERMERCADO ONLINE</h1>
      <div className="produtos">
        {produtos.map((produto, index) => (
          <Produto key={index} produto={produto} adicionarAoCarrinho={adicionarAoCarrinho} />
        ))}
      </div>
      <Carrinho carrinho={carrinho} removerDoCarrinho={removerDoCarrinho} editarQuantidade={editarQuantidade} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
