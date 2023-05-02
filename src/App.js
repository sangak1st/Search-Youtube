import logo from './logo.svg';
import './App.scss';
import YoutubeSearch from './seach-ytb/YoutubeSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <YoutubeSearch />
      </header>
    </div>
  );
}

export default App;
