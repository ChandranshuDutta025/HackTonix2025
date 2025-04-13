"use client"
import React, { use, useEffect } from 'react';
import Image from 'next/image'; // Import the Image component
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

function Header() {
    const path = usePathname();

    useEffect(() => {
        console.log(path); // Remove this if not needed
      }, []);
    

return (
    <div className='flex p-4 items-center justify-between shadow-md text-black bg-secondary'>
        <Image src="/logo.svg" alt="Logo" width={100} height={50} />
        <ul className='flex gap-6'>
            <li className={`hover:text-purple-500 hover:font-bold transition cursor-pointer ${path === '/dashboard' && 'text-primary font-bold' }`}
            >Dashboard</li>
            <li className={`hover:text-purple-500 hover:font-bold transition cursor-pointer ${path === '/dashboard' && 'text-primary font-bold' }`}>Toppers Mock</li>
            <li className={`hover:text-purple-500 hover:font-bold transition cursor-pointer ${path === '/dashboard' && 'text-primary font-bold' }`}>Study For Interview </li>
            <li className={`hover:text-purple-500 hover:font-bold transition cursor-pointer ${path === '/dashboard' && 'text-primary font-bold' }`}>Contact Us</li>
        </ul>  
        <UserButton/>
    </div>
);
}

export default Header;