import HeaderNav from "./components/header/HeaderNav";
import Footer from "./components/footer/Footer";
import Content from "./components/content/Content";
import './App.css';

function App() {
  return (
          <div className="App">
              <HeaderNav />
              <Content />
              {/*<Footer />*/}
          </div>
  )
}

export default App