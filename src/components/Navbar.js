const Navbar = () => {
    return (
        <nav className="navbar border bg-light mb-3">
            <div className="container">
                <a className="navbar-brand" href="/home">
                    <img className ="me-2" src="/logo-p.png" alt="" style={{height: '30px', width: '30px'}}/>
                    PassBook
                </a>
            </div>
        </nav>
    )
}
export default Navbar;