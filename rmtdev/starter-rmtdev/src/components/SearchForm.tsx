import { useSearchTextContext } from "./contexts/contextHooks/useSearchTextContext";

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleUserInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleChangeSearchText(event.target.value);
  };

  return (
    <form onSubmit={handleSearchSubmit} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={handleUserInput}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
