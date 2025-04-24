import { useEffect, useState } from "react";


const Step2 = ({ mes = "", setMes, setPasso, mesesValidos, mesInputRef }) => {

  const [botaoDesativado, setBotaoDesativado] = useState(true);

  useEffect(() => {
    if (mesInputRef?.current) {
      mesInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const mesNormalizado = mes.trim().toLowerCase();
    const valido = mesesValidos.some((m) => m.toLowerCase() === mesNormalizado);
    setBotaoDesativado(!valido);
  }, [mes, mesesValidos]);

  const avancarPasso = () => {
    if (!botaoDesativado) {
      setPasso((prev) => prev + 1);
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && !botaoDesativado) {
      avancarPasso();
    }
  };

  const validarMes = (e) => {
    let valor = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    setMes(valor);
  };

  return (
    <>
      <label htmlFor="mes" className="text-2xl spaced-text label-pergunta-mes">📅 Qual o mês que deseja registrar?</label>
      <input
        type="text"
        id="mes"
        name="mes"
        ref={mesInputRef}
        value={mes}
        onChange={validarMes}
        onKeyDown={handleEnterPress}
        placeholder="Exemplo: Janeiro..."
        className="input-field-2 large-input"
      />
      {mes && !mesesValidos.some((m) => m.toLowerCase() === mes.trim().toLowerCase()) && (
        <p className="text-red-500 text-sm mt-2 text-aviso-2">
          ❌ Mês inválido! Digite um mês correto.
        </p>
      )}
      <div className="btn-container-2">
        <button
          onClick={avancarPasso}
          className={`btn-primary-step2 ${botaoDesativado ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={botaoDesativado}
        >
          Continuar ➜
        </button>
      </div>
    </>
  );
};

export default Step2;
