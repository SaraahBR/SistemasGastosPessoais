import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="text-center">
        Projeto e Sistema criado por <span className="font-bold">Sarah Hernandes</span>. Espero que tenha gostado e te auxiliado! ❤️👩‍💻
      </p>

      <div className="footer-icons flex justify-center gap-4 mt-4">
        <a href="https://www.linkedin.com/in/sarahhernandes" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-6 h-6" title="Meu LinkedIn" />
        </a>
        <a href="https://github.com/SaraahBR" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="w-6 h-6 bg-white rounded-full p-1" title="Meu GitHub" />
        </a>
      </div>

      <p className="mt-2 font-semibold">⚙️ Utilizados no sistema:</p>
      <div className="footer-icons flex gap-2 mt-1">
        <img src="https://cdn-icons-png.flaticon.com/512/1126/1126012.png" alt="React" className="w-4 h-4" title="React" />
        <img src="https://cdn-icons-png.flaticon.com/512/732/732212.png" alt="HTML" className="w-4 h-4" title="HTML" />
        <img src="https://cdn-icons-png.flaticon.com/512/732/732190.png" alt="CSS" className="w-4 h-4" title="CSS" />
        <img src="https://vitejs.dev/logo-with-shadow.png" alt="Vite" className="w-4 h-4" title="Vite" />
        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png" alt="JavaScript" className="w-4 h-4" title="JavaScript" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" className="w-4 h-4" title="Tailwind CSS" />
      </div>
    </footer>
  );
};

export default Footer;