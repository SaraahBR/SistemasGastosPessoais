import { useState } from "react";

const Step3 = ({
    setPasso,
    novaContaNome,
    setNovaContaNome,
    setHistorico,
    nome,
    mes
}) => {
    const [valorNovaConta, setValorNovaConta] = useState("");
    const [erroNome, setErroNome] = useState("");
    const [erroValor, setErroValor] = useState("");

    const formatarNomeConta = (e) => {
        let valor = e.target.value;
        valor = valor.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
        if (valor.length > 15) {
            valor = valor.slice(0, 15);
        }
        setNovaContaNome(valor);
        setErroNome(valor.trim() ? "" : "❌ O nome da conta não pode estar vazio!");
    };

    const formatarValorNovaConta = (e) => {
        let valor = e.target.value;
        valor = valor.replace(/[^0-9,]/g, "");
        if (valor.startsWith(",")) {
            valor = "0" + valor;
        }

        let partes = valor.split(",");
        let inteiro = partes[0].replace(/\D/g, "");
        let decimal = partes.length > 1 ? partes[1].substring(0, 2) : "";

        if (inteiro.length > 6) {
            inteiro = inteiro.slice(0, 6);
        }

        inteiro = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

        if (partes.length === 2 && partes[1] === "") {
            valor = `${inteiro},`;
        } else if (decimal !== "") {
            valor = `${inteiro},${decimal}`;
        } else {
            valor = inteiro;
        }

        setValorNovaConta(valor);
        const valorNumerico = parseFloat(valor.replace(/\./g, "").replace(",", ".")) || 0;
        setErroValor(valorNumerico > 0 ? "" : "❌ O valor deve ser maior que 0!");
    };

    const adicionarConta = () => {
        let temErro = false;

        if (!novaContaNome.trim()) {
            setErroNome("❌ O nome da conta não pode estar vazio!");
            temErro = true;
        }

        const valorNumerico = parseFloat(valorNovaConta.replace(/\./g, "").replace(",", ".")) || 0;
        if (!valorNovaConta.trim() || valorNumerico <= 0) {
            setErroValor("❌ O valor deve ser maior que 0!");
            temErro = true;
        }

        if (temErro) return;

        const nomeNormalizado = novaContaNome.trim().toUpperCase();

        setHistorico((prevHistorico) => {
            const historicoSalvo = JSON.parse(localStorage.getItem("historicoGastos")) || {};
            const historicoUsuario = historicoSalvo[nome] || {};

            if (!historicoUsuario[mes]) {
                historicoUsuario[mes] = {};
            }

            if (!historicoUsuario[mes][nomeNormalizado]) {
                historicoUsuario[mes][nomeNormalizado] = 0;
            }

            historicoUsuario[mes][nomeNormalizado] += valorNumerico;

            const novoHistorico = {
                ...historicoSalvo,
                [nome]: historicoUsuario
            };

            localStorage.setItem("historicoGastos", JSON.stringify(novoHistorico));
            return novoHistorico;
        });

        setNovaContaNome("");
        setValorNovaConta("");
        setPasso(4);
    };

    return (
        <div className="step-container">
            <label htmlFor="novaContaNome" className="text-2xl spaced-text label-nova-conta">Nome da Nova Conta</label>
            <div className="input-group">
                <input
                    type="text"
                    id="novaContaNome"
                    name="novaContaNome"
                    placeholder="Exemplo: luz, água, faturas..."
                    value={novaContaNome}
                    onChange={formatarNomeConta}
                    onBlur={formatarNomeConta}
                    className="input-field-nomeconta"
                />
                {erroNome && <p className="erro-mensagem">{erroNome}</p>}

                <label htmlFor="valorNovaConta" className="text-2xl spaced-text label-valor-nova-conta">Valor da Nova Conta</label>
                <input
                    type="text"
                    id="valorNovaConta"
                    name="valorNovaConta"
                    placeholder="Exemplo: 100,50..."
                    value={valorNovaConta}
                    onChange={formatarValorNovaConta}
                    onBlur={formatarValorNovaConta}
                    className="input-field-valorconta"
                />
                {erroValor && <p className="erro-mensagem">{erroValor}</p>}
            </div>

            <button
                onClick={adicionarConta}
                className={`btn-primary-step3 ${!novaContaNome.trim() || !valorNovaConta.trim() || parseFloat(valorNovaConta.replace(/\./g, "").replace(",", ".")) <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                Continuar ➜
            </button>
        </div>
    );
};

export default Step3;