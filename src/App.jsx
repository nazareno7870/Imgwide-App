import './App.css'
import Gallery from './components/Gallery/Gallery';
import CreatPost from './components/CreatePost/CreatePost';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';

function App() {
  
  return (
    <>
      <Router>
        <Routes>
            <Route exact path="/gallery" element={<Layout><Gallery/></Layout>} />
            <Route exact path="/createpost" element={<Layout><CreatPost/></Layout>}/>
          </Routes>
      </Router>


    </>
  )
}

export default App
