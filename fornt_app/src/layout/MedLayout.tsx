
import React, {Children} from 'react';
import {Link} from 'react-router-dom';

interface DefaultLayoutProps {
    children: React.ReactNode;
}



export default function MedLayout({ children}: DefaultLayoutProps ) { 
    return (
        <>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </nav>
        </header>
        


        <main>
            {children}
        </main>
        </>
    );
    }