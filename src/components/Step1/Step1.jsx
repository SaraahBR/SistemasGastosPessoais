import { useEffect } from "react";


const Step1 = ({ nome ="", setNome, setPasso, nomeInputRef }) => { 

  useEffect(() => {
    if (nomeInputRef?.current) {
      nomeInputRef.current.focus();
    }
  }, []);


  const validarNome = (e) => {
    let valor = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    setNome(valor);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && nome.trim().length >= 3) {
      setPasso((prev) => prev + 1);
    }
  };


  return (
    <>
      
      <label htmlFor="nome" className="text-2xl spaced-text label-pergunta-1">Digite seu Nome:</label>
      <input
        type="text"
        id="nome"
        name="nome"
        ref={nomeInputRef}
        value={nome}
        onChange={validarNome}
        onKeyDown={handleEnterPress}
        placeholder="Seu nome..."
        className="input-field-1 large-input"
      />
      {nome.trim().length > 0 && nome.trim().length < 3 && (
        <p className="text-red-500 text-sm mt-2 text-aviso-1 ">❌ O nome deve ter no mínimo 3 letras.</p>
      )}
      <div className="btn-container-1">
        <button
          onClick={nome.trim().length >= 3 ? () => setPasso((prev) => prev + 1) : null}
          className={`btn-primary-step1 ${nome.trim().length >= 3 ? "" : "opacity-50 cursor-not-allowed"}`}
          disabled={nome.trim().length < 3}
        >
          Continuar ➜
        </button>
      </div>
    </>
  );
};

export default Step1;