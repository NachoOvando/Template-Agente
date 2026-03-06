const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="py-10 px-6 md:px-12">
        <div className="max-w-[110rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-muted-foreground text-[1.3rem]">
            © {new Date().getFullYear()} Studio. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            {["Twitter", "Instagram", "LinkedIn"].map((name) => (
              <a
                key={name}
                href="#"
                className="text-muted-foreground text-[1.3rem] hover:text-foreground transition-colors duration-300"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
