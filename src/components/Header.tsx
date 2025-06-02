import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logo from '../assets/CinemaScope-logo.png';
import { ThemeToggle } from './ThemeToggle';
import { Navigation } from './Navigation';
import { UserMenu } from './UserMenu';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  return (
    <Disclosure as="nav" className="bg-bg-secondary/95 backdrop-blur-md sticky top-0 z-50 rounded-b-xl shadow-header">
      {({ open }) => (
        <>
          <div className="container mx-auto px-4">
            <div className="relative flex h-20 justify-between items-center">
              {/* Mobile menu button */}
              <div className="flex sm:hidden">
                <Disclosure.Button className="group relative inline-flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-bg-secondary hover:text-text-accent">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo */}
              <div className="flex items-center">
                <Link to="/" className="shrink-0">
                  <img src={logo} alt="CinemaScope" className="h-16 w-auto" />
                </Link>
              </div>

              {/* Navigation - centered on desktop */}
              <div className="hidden sm:flex sm:items-center sm:justify-center absolute left-1/2 -translate-x-1/2">
                <Navigation />
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-3">
                <LanguageToggle />
                <ThemeToggle />
                <UserMenu />
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <Navigation mobile as={Disclosure.Button} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
} 