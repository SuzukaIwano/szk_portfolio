import { useLocation, Route, Link } from "react-router-dom";
import SlideRoutes from "react-slide-routes";
import { Home } from './components/Home'
import { AboutMe } from './components/AboutMe'
import { Skills } from './components/Skills'
import { Works } from './components/Works'
import { Contact } from './components/Contact'
import './App.css'
import { Eachwork } from "./components/Eachwork";

function App() {
  const location = useLocation();

  return (
    <>
      <div className="menus">
        <Link to="/" className="menu">ホーム</Link>
        <Link to="aboutme" className="menu">自己紹介</Link>
        <Link to="skills" className="menu">スキル</Link>
        <Link to="works" className="menu">制作物</Link>
        <Link to="contact" className="menu">お問い合わせ</Link>
      </div>
      <SlideRoutes location={location} duration={700}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/works" element={<Works />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/eachwork" element={<Eachwork />} />
      </SlideRoutes>
    </>
  )
}

export default App
