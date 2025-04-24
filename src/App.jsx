import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";


function App() {
  const [nome, setNome] = useState("");
  const [mes, setMes] = useState("");
  const [passo, setPasso] = useState(1);
  const [gastos, setGastos] = useState({ luz: "", agua: "", banco: "", pet: "", aluguel: "" });
  const [historico, setHistorico] = useState({});
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [adicionandoConta, setAdicionandoConta] = useState(false);
  const [novaContaNome, setNovaContaNome] = useState("");

  const nomeInputRef = useRef(null);
  const mesInputRef = useRef(null);

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("historicoGastos")) || {};
    if (Object.keys(dadosSalvos).length > 0) {
      setHistorico(dadosSalvos);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(historico).length > 0) {
      localStorage.setItem("historicoGastos", JSON.stringify(historico));
    }
  }, [historico]);

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      setPasso((prev) => (prev < 10 ? prev + 1 : prev));
    }
  };

  const proximoPasso = () => {
    setPasso((prev) => (prev < 10 ? prev + 1 : prev));
  };

  const atualizarURL = (name, valor) => {
    const novaURL = new URL(window.location);
    novaURL.searchParams.set(name, valor);
    window.history.replaceState({}, "", novaURL);
  };



  const handleGastoChange = (e) => {
    let valor = e.target.value;

    // Permitir apenas números e uma única vírgula
    valor = valor.replace(/[^0-9,]/g, "");

    // Se começar com ",", adicionar "0" antes
    if (valor.startsWith(",")) {
      valor = "0" + valor;
    }

    // Divide em parte inteira e decimal
    let partes = valor.split(",");
    let inteiro = partes[0].replace(/\D/g, "");
    let decimal = partes.length > 1 ? partes[1].substring(0, 2) : "";

    // ✅ Limita o número de dígitos antes da vírgula a 6
    if (inteiro.length > 6) {
      inteiro = inteiro.slice(0, 6);
    }

    // ✅ Mantém o separador de milhares (`.`)
    inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // ✅ Mantém a vírgula caso o usuário esteja digitando os centavos
    if (partes.length === 2 && partes[1] === "") {
      valor = `${inteiro},`;
    } else if (decimal !== "") {
      valor = `${inteiro},${decimal}`;
    } else {
      valor = inteiro;
    }

    setGastos((prev) => ({
      ...prev,
      [e.target.name]: valor,
    }));
  };

  const salvarGastos = () => {
    if (!nome.trim()) {
      alert("O nome do usuário não pode estar vazio!");
      return;
    }

    if (!mes.trim()) {
      alert("Selecione um mês válido!");
      return;
    }

    setHistorico((prev) => {
      const historicoAtualizado = {
        ...prev,
        [nome]: {
          ...(prev[nome] || {}),
          [mes]: {
            ...gastos
          }
        }
      };
      return historicoAtualizado;
    });
  }


  useEffect(() => {
    if (Object.keys(historico).length > 0) {
      localStorage.setItem("historicoGastos", JSON.stringify(historico));
    }
  }, [historico]);



  // ✅ Adicionar um `useEffect` para salvar automaticamente no `localStorage`
  useEffect(() => {
    if (Object.keys(historico).length > 0) {
      localStorage.setItem("historicoGastos", JSON.stringify(historico));
    }
  }, [historico]);



  // ✅ Adicionar um `useEffect` para salvar automaticamente no localStorage
  useEffect(() => {
    if (Object.keys(historico).length > 0) {
      localStorage.setItem("historicoGastos", JSON.stringify(historico));
    }
  }, [historico]);




  const limparHistorico = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o histórico? Essa ação não pode ser desfeita!")) {
      localStorage.removeItem("historicoGastos");
      setHistorico({});
      alert("Histórico apagado com sucesso! ✅");
      window.dispatchEvent(new Event("historicoApagado"));
    }
  };

  const novaConsulta = () => {
    if (window.confirm("Deseja iniciar uma nova consulta?")) {
      setMes("");
      setGastos({ luz: "", agua: "", banco: "", pet: "", aluguel: "" });
      setPasso(1);
    }
  };

  const mesesValidos = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  return (
    <div className="app">
      <div className="main-container">
        <Header />
        <div className="sistema-gastos-container">
          <Form
            passo={passo}
            setPasso={setPasso}
            nome={nome} setNome={setNome}
            mes={mes} setMes={setMes}
            gastos={gastos} handleGastoChange={handleGastoChange}
            nomeInputRef={nomeInputRef} mesInputRef={mesInputRef}
            handleEnterPress={handleEnterPress}
            mesesValidos={mesesValidos}
            adicionandoConta={adicionandoConta} setAdicionandoConta={setAdicionandoConta}
            novaContaNome={novaContaNome} setNovaContaNome={setNovaContaNome}
            salvarGastos={salvarGastos}
            setHistorico={setHistorico}
            historico={historico}
            paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual}
            limparHistorico={limparHistorico}
            novaConsulta={novaConsulta}
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;