const Header = ({ theme, handleLightMode, handleDarkMode }) => {
  return (
    <header className='main-header '>
      <div className='title container-fluid-1440 flex jc-space-between ai-center padding-top-md padding-bottom-md'>
        <h1 className='fs-large ff-sans-x-bold '>Where in the world?</h1>
        <div className='theme-control'>
          {theme === "light" ? (
            <button
              className='theme-button fs-small'
              onClick={() => handleDarkMode()}>
              <i className='far fa-moon'></i> Dark Mode
            </button>
          ) : (
            <button
              className='theme-button fs-small'
              onClick={() => handleLightMode()}>
              <i className='far fa-sun'></i> Light Mode
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
