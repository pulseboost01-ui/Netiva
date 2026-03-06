
'use client';
import React, { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="navbar sticky top-0 z-40">
      <div className="padding-global">
        <div className="w-layout-blockcontainer container w-container">
          <div className="nav-wrapper">
            <a aria-label="site-logo" href="/" className="site-logo-erap w-inline-block no-underline">
            <h6 className='text-[18px] text-[#ff6a00] font-semibold'>Netiva</h6>
              {/* <img
                src="/netiva.jpg"
                loading="lazy" alt="Site Logo" className="image" /> */}
            </a>
            <div className="nav-link-item-wrap">
              <a href="/products" className="nav-link w-inline-block"><div>Products</div></a>
              <a href="/solutions" className="nav-link w-inline-block"><div>Solutions</div></a>
              <a href="/resources" className="nav-link w-inline-block"><div>About</div></a>
            </div>
            <div className="nav-button-area">
              <div className="nav-button-wrap">
                <a href="/contact" className="nav-button w-inline-block">
                  <div>LET’S Talk</div>
                </a>
              </div>
              <div
                className={`nav-menu-button${mobileOpen ? ' open' : ''} lg:hidden md:hidden inline-block`}
                data-w-id="b6d7a6d1-cff5-dd8b-4cd1-7862e725704a"
                onClick={() => setMobileOpen((v) => !v)}
                // style={{ cursor: 'pointer', display: 'inline-block' }}
              >
                <div className="menu-line-wrap">
                  <div className="menu-line _1"></div>
                  <div className="menu-line _2"></div>
                </div>
                <div className="nav-menu-text">MENU</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`nav-menu-wrapper${mobileOpen ? ' open' : ''} lg:hidden`} style={{ display: mobileOpen ? 'block' : 'none' }}>
        <div className="nav-menu-content">
          <div className="nav-contact-wrap">
            {/* You can add contact info or leave empty */}
          </div>
          <div className="nav-menu-wrap">
            <a href="/products" className="nav-menu-link w-inline-block" onClick={() => setMobileOpen(false)}><div>Products</div></a>
            <a href="/solutions" className="nav-menu-link w-inline-block" onClick={() => setMobileOpen(false)}><div>Solutions</div></a>
            <a href="/resources" className="nav-menu-link w-inline-block" onClick={() => setMobileOpen(false)}><div>About</div></a>
            <a href="/contact" className="nav-button w-inline-block mt-4" onClick={() => setMobileOpen(false)}>
              <div>LET’S Talk</div>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
