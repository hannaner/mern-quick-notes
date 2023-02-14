import { Link } from 'react-router-dom'
import * as userService from "../utilities/users-service"

export default function NavBar({user, setUser}) {
    function handleLogout(){
        // we want to delegate the logout to users-service
        userService.logOut()
        setUser(null)
    }
    return (
        
        <nav>
            <p>Welcome, {user.name}!</p>
            <></>
            <Link to="/orders">Order History</Link>
            &nbsp; | &nbsp;
            <Link to="/orders/new">New Order</Link>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogout}>Log out</Link>
        </nav>
    )
}