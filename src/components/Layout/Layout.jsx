import NavBar from './../NavBar/NavBar';
const Layout = ({children}) => {
    return (
    <>
    <NavBar/>
    <div className="container">
        {children}
    </div>
    
    </>
        
    );
}

export default Layout;