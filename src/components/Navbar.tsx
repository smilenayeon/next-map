import Link from "next/link";
import { disconnect } from "process";
import { useState } from "react";
import {BiMenu} from "react-icons/bi";
import {AiOutlineClose} from "react-icons/ai";

export default function NavBar() {
    const [isOpen, setIsOpen]=useState(false);

    return(
        <>
            <div className="navbar">
                <Link href="/" className="navbar__logo">nextmap</Link>
                <div className="navbar__list">
                    <Link href="/stores" className="navbar__list--item">Great Eatery List</Link>
                    <Link href="/stores/new" className="navbar__list--item">Add a new place</Link>
                    <Link href="/users/likes" className="navbar__list--item">Saved Eateries</Link>
                    <Link href="/users/login" className="navbar__list--item">Login</Link>
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
                        <Link href="/stores" className="navbar__list--item--mobile">Great Eatery List</Link>
                        <Link href="/stores/new" className="navbar__list--item--mobile">Add a new place</Link>
                        <Link href="/users/likes" className="navbar__list--item--mobile">Saved Eateries</Link>
                        <Link href="/users/login" className="navbar__list--item--mobile">Login</Link>
                    </div>
                </div>
            )}
        </>
    );
};
