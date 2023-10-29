import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {
  const {isAuthenticated,setIsAuthenticated,loading,setLoading}=useContext(Context);
  const logoutHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const {data} = await axios.post(
        `${server}/users/logout`,
        
        {
          withCredentials: true,
        }
      );
      
  
      toast.success("logout Succesfull");
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      
      toast.error(error.response.data.message);
      setLoading(false);
      setIsAuthenticated(false);
    }
  };
  return (
     <nav className='header'>
        <div>
            <h2>To-do app</h2>
        </div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>
            {isAuthenticated ?<button disabled={loading} className='btn' onClick={logoutHandler}>logout</button>:
            (<Link to={"/login"}>login</Link>) }
            
            
        </article>
     </nav>
  )
}

export default Header