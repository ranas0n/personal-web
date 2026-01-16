import { FC, ReactNode } from 'react';
import Header from '../Header';
import Footer from '../Footer';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout: FC<PageLayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;