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
import Search from './components/Search/Search';
import MiddlewareSearch from './components/Search/MiddlewareSearch';
import Profile from './components/Profile/Profile';
import Post from './components/Post/Post';
import Confirm from './components/CreateUser/Confirm';
import ResetPassWord from './components/CreateUser/Reset';
import FormforReset from './components/CreateUser/FormforReset';

function App() {
  
  return (
    <>
    <UserContextProvider>
        <Router>
          <Routes>
              <Route exact path="/gallery" element={<Layout><Gallery/></Layout>} />
              <Route exact path="/signup" element={<Layout><CreatUser/></Layout>} />
              <Route exact path="/login" element={<Layout><LoginForm/></Layout>}/>
              <Route exact path="/confirm/*" element={<Layout><Confirm/></Layout>}/>
              <Route exact path="/reset/*" element={<Layout><ResetPassWord/></Layout>}/>
              <Route exact path="/resetform" element={<Layout><FormforReset/></Layout>}/>
              <Route exact path="/tag" element={<Layout><Tags/></Layout>}/>
              <Route exact path="/tag/*" element={<Layout><TagGallery/></Layout>}/>
              <Route exact path="/post/*" element={<Layout><Post/></Layout>}/>
              <Route exact path="/search/*" element={<Layout><Search/></Layout>}/>
              <Route exact path="/middle/*" element={<Layout><MiddlewareSearch/></Layout>}/>
              <Route exact path="/profile/*" element={<Layout><Profile/></Layout>}/>
              <Route exact path="/createpost" element={<Layout><CreatPost/></Layout>}/>
              <Route exact path="/" element={<Layout><Gallery/></Layout>} />
            </Routes>
        </Router>
    </UserContextProvider>

    </>
  )
}

export default App
