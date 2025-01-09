'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import logo from '@/assets/logo.png'
import { Menu } from 'lucide-react'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > 100) {
        document.querySelector('header')?.classList.add('bg-background/80')
      } else {
        document.querySelector('header')?.classList.remove('bg-background/80')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='fixed top-0 z-50 w-full h-16 bg-background backdrop-blur-sm transition-all duration-200 ease-in-out'>
      <nav className='w-full max-w-7xl flex items-center justify-between gap-4 mx-auto px-4 py-2 sm:px-6 sm:py-4'>
        <Link
          href='/'
          className='text-xl font-semibold flex items-center gap-2 hover:opacity-70 duration-200 ease-in-out'
        >
          <Image
            src={logo}
            alt='Diprofire Logo'
            width={40}
            height={40}
            loading='lazy'
            className='object-cover border rounded-full bg-white'
          />
          Diprofire
        </Link>

        <div className='hidden md:flex items-center gap-4'>
          <Link
            href='/'
            className='font-medium hover:opacity-70 duration-200 ease-in-out'
          >
            Catálogo REM
          </Link>
          <Link
            href='/rem'
            className='font-medium hover:opacity-70 duration-200 ease-in-out'
          >
            Solicitud REM
          </Link>
          <Link
            href='/seguimiento'
            className='font-medium hover:opacity-70 duration-200 ease-in-out'
          >
            Seguimiento REM
          </Link>
          <Link
            href='/inspections'
            className='font-medium hover:opacity-70 duration-200 ease-in-out'
          >
            Inspecciones
          </Link>
        </div>

        <div className='md:hidden'>
          <button
            onClick={toggleMenu}
            aria-label='Toggle menu'
            className='focus:outline-none'
          >
            <Menu size={28} />
          </button>
        </div>

        {isMenuOpen && (
          <div className='md:hidden fixed top-14 left-0 w-full bg-background backdrop-blur-sm shadow-lg'>
            <div className='flex flex-col items-center gap-4 py-4'>
              <Link
                href='/'
                className='font-medium hover:opacity-70 duration-200 ease-in-out'
                onClick={toggleMenu}
              >
                Catálogo REM
              </Link>
              <Link
                href='/rem'
                className='font-medium hover:opacity-70 duration-200 ease-in-out'
                onClick={toggleMenu}
              >
                Solicitud REM
              </Link>
              <Link
                href='/seguimiento'
                className='font-medium hover:opacity-70 duration-200 ease-in-out'
                onClick={toggleMenu}
              >
                Seguimiento REM
              </Link>
              <Link
                href='/inspections'
                className='font-medium hover:opacity-70 duration-200 ease-in-out'
                onClick={toggleMenu}
              >
                Inspecciones
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
