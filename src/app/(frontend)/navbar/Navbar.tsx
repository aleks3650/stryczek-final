'use client'
import React from 'react'
import Burger from './Burger'
import Link from 'next/link'
import Logo from './Logo'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  const pages = [{
    name: 'Nowości',
    url: '/news'
  },
  {
    name: 'Oferta',
    url: '/offer'
  },
  {
    name: 'Galeria',
    url: '/galery'
  },
  {
    name: 'Kontakt',
    url: '/contact'
  },]
  return (
    <nav
      className="flex px-4 lg:px-10 xl:px-14 fixed top-0 left-0 w-screen z-50 flex-row justify-between items-center h-28 bg-white text-black shadow-lg font-shantell-sans"
    >
      <div className="w-24 h-[4.5rem] relative">
        <Logo />
      </div>
      <div className="block md:hidden">
        <Burger />
      </div>
      <div className="hidden md:flex text-2xl lg:text-3xl lg:gap-12">
        {pages.map((page) => (
          <Link key={page.url} href={page.url} className={`${page.url === pathname ? 'text-pink-800' : 'text-gray-900'} pl-10 hover:scale-105 transition-all hover:text-gray-800`}>
            {page.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
