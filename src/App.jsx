import './App.css'
import Gallery from './components/Gallery/Gallery';
import CreatPost from './components/CreatePost/CreatePost';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TagGallery from './components/TagGallery/TagGallery';
import Tags from './components/Tags/Tags';
import LoginForm from './components/Login/Login';
import { UserContextProvider } from './context/userContext';
import CreatUser from './components/CreateUser/CreateUser';

function App() {
  
  return (
    <>
    <UserContextProvider>
      <Router>
        <Routes>
            <Route exact path="/gallery" element={<Layout><Gallery/></Layout>} />
            <Route exact path="/signup" element={<Layout><CreatUser/></Layout>} />
            <Route exact path="/" element={<Layout><Gallery/></Layout>} />
            <Route exact path="/login" element={<Layout><LoginForm/></Layout>}/>
            <Route exact path="/tag" element={<Layout><Tags/></Layout>}/>
            <Route exact path="/tag/*" element={<Layout><TagGallery/></Layout>}/>
            <Route exact path="/createpost" element={<Layout><CreatPost/></Layout>}/>
          </Routes>
      </Router>
    </UserContextProvider>

    </>
  )
}

export default App
