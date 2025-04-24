import { useEffect, useRef, useState } from "react";


const Step10 = ({ limparHistorico, novaConsulta, nome }) => {
  const firstButtonRef = useRef(null);
  const [mesesDisponiveis, setMesesDisponiveis] = useState([]);
  const [historicoAgrupado, setHistoricoAgrupado] = useState({});
  const [indiceMes, setIndiceMes] = useState(0);
  const [fontSizeClass, setFontSizeClass] = useState("large");

  useEffect(() => {
    firstButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const atualizarHistorico = () => {
      const historicoSalvo = JSON.parse(localStorage.getItem("historicoGastos")) || {};
      const historicoUsuario = historicoSalvo[nome] || {};

      setHistoricoAgrupado(historicoUsuario);
      setMesesDisponiveis(Object.keys(historicoUsuario));
      setIndiceMes(0);
    };

    atualizarHistorico();

    window.addEventListener("historicoApagado", atualizarHistorico);

    return () => {
      window.removeEventListener("historicoApagado", atualizarHistorico);
    };
  }, [nome]);

  const mesAtual = mesesDisponiveis[indiceMes] || "Mês não identificado";
  const registrosMesAtual = historicoAgrupado?.[mesAtual] || {};


  const contasListadas = Object.entries(registrosMesAtual).map(([nomeConta, valor]) => ({
    nomeConta,
    valor: typeof valor === "number" ? valor : parseFloat(valor) || 0,
  })).filter(item => item.valor > 0);

  const [fontSizeContasClass, setFontSizeContasClass] = useState("font-normal");

  useEffect(() => {
    const quantidade = contasListadas.length;

    let novaClasse;
    if (quantidade <= 1) {
      novaClasse = "font-xxl";
    } else if (quantidade === 2) {
      novaClasse = "font-xl";
    } else if (quantidade === 3) {
      novaClasse = "font-lg";
    } else if (quantidade === 4) {
      novaClasse = "font-md";
    } else if (quantidade >= 5) {
      novaClasse = "font-sm";
    }

    setFontSizeContasClass(novaClasse);
  }, [contasListadas]);

  const totalValor = contasListadas
    .reduce((acc, item) => acc + item.valor, 0)
    .toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleLimparHistorico = () => {
    limparHistorico(); // 
    setHistoricoAgrupado({}); // 
    setMesesDisponiveis([]);
    setIndiceMes(0);
  };

  useEffect(() => {
    const container = document.querySelector(".detalhes-container");
    if (container) container.scrollTop = 0;
  }, [mesAtual]);

  useEffect(() => {
    const charCount = totalValor.replace(/[^0-9]/g, "").length;

    let newFontSizeClass;
    if (charCount <= 6) {
      newFontSizeClass = "large";
    } else if (charCount <= 8) {
      newFontSizeClass = "large-medium";
    } else if (charCount <= 10) {
      newFontSizeClass = "medium";
    } else if (charCount <= 12) {
      newFontSizeClass = "medium-small";
    } else if (charCount <= 14) {
      newFontSizeClass = "small";
    } else if (charCount <= 16) {
      newFontSizeClass = "ultra-small";
    } else {
      newFontSizeClass = "super-small";
    }

    setTimeout(() => setFontSizeClass(newFontSizeClass), 10);
  }, [totalValor]);



  return (
    <>
      <h2 className="titulo-historico text-2xl spaced-text">Histórico de Consultas</h2>

      <div className="acoes-superiores">
        <div className="acao esquerda">
          <button onClick={novaConsulta} className="botao">
            <img src="/RETORNAR.png" alt="Registrar Nova Consulta" title="Registrar Nova Consulta" className="icone" />
          </button>
          <p className="registrar-nova-consulta">Registrar Consulta</p>
        </div>
        <div className="acao direita">
          <button ref={firstButtonRef} onClick={limparHistorico} className="botao">
            <img src="/LIXEIRA.png" alt="Lixeira" title="Apagar Histórico" className="lixeira" />
          </button>
          <p className="apagar-historico">Apagar Histórico</p>
        </div>
      </div>

      <div className="historico-container">
        <div className="visualizar-gastos-container">
          {mesesDisponiveis.length > 0 ? (
            <div className="grid-container">
              <div className="historico-mes">
                <div className="conteudo-mes">
                  <div className="registro-mes">
                    <h3 className="titulo-mes" style={{ fontSize: "23px", fontWeight: "bold" }}>
                      <span className="emoji">📅 </span>
                      <span className="texto-mes">
                        {mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1).toLowerCase()}
                      </span>
                    </h3>

                    <div className={`detalhes-container detalhes-gasto ${fontSizeContasClass}`}>
                      {contasListadas.length > 0 ? (
                        contasListadas.map((item, index) => (
                          <p key={index}>
                            {item.nomeConta}: R$ {item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </p>
                        ))
                      ) : (
                        <p>Nenhum gasto registrado para este mês.</p>
                      )}
                    </div>

                    <div className="navigation-container">
                      <button
                        onClick={() => setIndiceMes((prev) => Math.max(prev - 1, 0))}
                        disabled={indiceMes === 0}
                        className={`btn-nav ${indiceMes === 0 ? "disabled" : ""}`}
                        title="Consulta do Mês Anterior"
                      >
                        ⬅️
                      </button>

                      <button
                        onClick={() => setIndiceMes((prev) => Math.min(prev + 1, mesesDisponiveis.length - 1))}
                        disabled={indiceMes >= mesesDisponiveis.length - 1}
                        className={`btn-nav ${indiceMes >= mesesDisponiveis.length - 1 ? "disabled" : ""}`}
                        title="Consulta do Mês Posterior"
                      >
                        ➡️
                      </button>
                    </div>
                  </div>

                  <h3 className={`total-valor ${fontSizeClass}`}>
                    Total: R$ {totalValor || "0,00"}
                  </h3>
                </div>
              </div>
            </div>
          ) : (
            <p className="historico-apagado">Nenhum histórico disponível.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Step10;
