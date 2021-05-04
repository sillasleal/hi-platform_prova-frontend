import List from "./components/List/List";
import { CheckTreeProvider } from "./context/CheckTree";
import data from "./data";

function App() {
  return (
    <div className="App">
      <CheckTreeProvider>
        <List items={data} isRoot />
      </CheckTreeProvider>
    </div>
  );
}

export default App;
