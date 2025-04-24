const Step4 = ({ setPasso }) => {
    return (
        <div className="step-container">
            <p className="text-lg spaced-text label-outra-conta">Deseja adicionar outra conta?</p>
            <div className="btn-container">
                <button onClick={() => setPasso(3)} className="btn-primary-SIM">✅ SIM</button>
                <button onClick={() => setPasso(10)} className="btn-secondary-NAO">❌ NÃO</button>
            </div>
        </div>
    );
};

export default Step4;