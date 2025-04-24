import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Step1 from "../Step1/Step1";
import Step2 from "../Step2/Step2";
import Step3 from "../Step3/Step3";
import Step4 from "../Step4/Step4";
import Step10 from "../Step10/Step10";

const Form = ({
    passo, setPasso, nome, setNome, mes, setMes,
    nomeInputRef, mesInputRef, handleEnterPress, mesesValidos, novaContaNome, setNovaContaNome,
    setHistorico, limparHistorico, novaConsulta
}) => {

    const [animando, setAnimando] = useState(false);

    const avancarPasso = () => {
        if (!animando) {
            setAnimando(true);
            setTimeout(() => {
                setPasso((prev) => prev + 1); 
                setAnimando(false);
            }, 500);
        }
    };


    const componentes = {
        1: <Step1 nome={nome} setNome={setNome} handleEnterPress={handleEnterPress} nomeInputRef={nomeInputRef} setPasso={avancarPasso} />,
        2: <Step2 mes={mes} setMes={setMes} handleEnterPress={handleEnterPress} mesInputRef={mesInputRef} mesesValidos={mesesValidos} setPasso={avancarPasso} />,
        3: <Step3 setPasso={avancarPasso} novaContaNome={novaContaNome} setNovaContaNome={setNovaContaNome} setHistorico={setHistorico} nome={nome} mes={mes} />,
        4: <Step4 setPasso={setPasso} />,
        10: <Step10 limparHistorico={limparHistorico} novaConsulta={novaConsulta} nome={nome} />
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="form-container">
            <AnimatePresence mode="wait">
                <motion.div
                    key={passo}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                >
                    {componentes[passo] || null}
                </motion.div>
            </AnimatePresence>
        </form>
    );
};

export default Form;
