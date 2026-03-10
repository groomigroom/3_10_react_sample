import './App.css';
import Hello from './component/hello';


function App() {
  const name = "tom";
  const naver = {
    name: "네이버",
    url: "https://naver.com",
  };
  return (
    <div className="App">
      <h1 style={{
        color: "#f3bdbd",
        backgroundColor: "#bffad3"
      }}>hello {name} </h1>
      <a href={naver.url}>{naver.name}</a>
      <Hello />
    </div>
  );
}

export default App;
