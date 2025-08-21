import Logo from "./logo";
import ThemeSwitcher from "./Themeswitcher";

const Header = () => {
  return (
    <header className="mb-6 justify-between bg-white shadow dark:bg-gray-800 md:mb-12">
      <div className="container mx-auto px-5 md:px-0">
        <div className="flex h-20 items-center justify-between">
          <Logo />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};
export default Header;
