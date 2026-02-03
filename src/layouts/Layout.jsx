import React from 'react';
import { Outlet } from 'react-router-dom';
import MainMenu from '@/components/MainMenu';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const Layout = () => (
  <>
    <ScrollToTop />
    <MainMenu />
    <Outlet />
    <Footer />
  </>
);

export default Layout;
