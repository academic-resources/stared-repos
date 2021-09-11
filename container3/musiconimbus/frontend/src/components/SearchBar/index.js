import './SearchBar.css'


export default function SearchBar({search, setSearch}) {
  return (
    <>
    <input
      type="text"
      className="search-input one"
      placeholder=" &#xF002;  Search albums, composers, songs, or artist names..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      >
    </input>
    <input
      type="text"
      className="search-input two"
      placeholder=" &#xF002;  Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      >
    </input>
    </>
  )
}
