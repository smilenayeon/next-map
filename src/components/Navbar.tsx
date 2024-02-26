import Link from "next/link";
import { useState } from "react";
import {useSession, signOut} from "next-auth/react";

import {BiMenu} from "react-icons/bi";
import {AiOutlineClose} from "react-icons/ai";

export default function NavBar() {
    const [isOpen, setIsOpen]=useState(false);
    const {data,status} = useSession();


    return(
        <>
            <div className="navbar">
                <Link href="/" className="navbar__logo">nextmap</Link>
                <div className="navbar__list">
                    <Link href="/stores" className="navbar__list--item">Great Eatery List</Link>
                    <Link href="/stores/new" className="navbar__list--item">Add a new place</Link>
                    <Link href="/users/likes" className="navbar__list--item">Saved Eateries</Link>
                    <Link href="/users/mypage" className="navbar__list--item">My Page</Link>
                    
                    {status === 'authenticated' ? <button type="button" onClick={() => signOut()}>Logout</button> : <Link href="/api/auth/signin" className="navbar__list--item">Login</Link>}
                </div>
                {/* mobile button */}
                <div role="presentation" className="navbar__button" onClick={()=>{setIsOpen((val) => !val)}}>
                    {isOpen ? <AiOutlineClose/> : <BiMenu/>}
                </div>
            </div>
            {/* mobile navbar */}
            {isOpen && (
                <div className="navbar--mobile">
                    <div className="navbar__list--mobile">
                        <Link href="/stores" className="navbar__list--item--mobile" onClick={()=>setIsOpen(false)}>Great Eatery List</Link>
                        <Link href="/stores/new" className="navbar__list--item--mobile" onClick={()=>setIsOpen(false)}>Add a new place</Link>
                        <Link href="/users/likes" className="navbar__list--item--mobile" onClick={()=>setIsOpen(false)}>Saved Eateries</Link>
                        <Link href="/users/mypage" className="navbar__list--item--mobile" onClick={()=>setIsOpen(false)}>My Page</Link>
                        {status === 'authenticated' 
                        ? <button 
                            type="button" 
                            onClick={() => { 
                                signOut();
                                setIsOpen(false);
                            }} 
                            className="navbar__list--item--mobile"
                            >
                                Logout
                            </button> 
                        : <Link 
                            href="/api/auth/signin" 
                            className="navbar__list--item--mobile" 
                            onClick={()=>setIsOpen(false)}
                            >
                                Login
                            </Link>
                        }
                    </div>
                </div>
            )}
        </>
    );
};
