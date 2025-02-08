import "./Header.css";

const Header = () => (
  <div className="header-container">
    <header className="header">
      <div className="header-left">
        <a
          href="/"
          className="header-home-link"
          aria-label="Go to homepage"
          title="Go to Will Ku's homepage"
        >
          <img
            className="header-icon"
            src="/w-icon-filled.png"
            alt="Will Ku logo"
          />
        </a>
      </div>
      <div className="header-right">
        <span>
          <p>William Ku</p>
        </span>
        <span className="header-right-separator">|</span>
        <a
          href="https://www.linkedin.com/in/willku/"
          target="_blank"
          title="Will Ku's LinkedIn"
        >
          linkedin
        </a>
        <a
          href="https://github.com/will-ku"
          target="_blank"
          title="Will Ku's Github"
        >
          github
        </a>
      </div>
    </header>
  </div>
);

export default Header;
