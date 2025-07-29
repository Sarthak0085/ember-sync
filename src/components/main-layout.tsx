'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';

interface MainLayoutWrapperProps {
  children: React.ReactNode;
}

const excludedHeaderPaths = ['/auth/login', '/auth/register'];

export const MainLayoutWrapper = ({ children }: MainLayoutWrapperProps) => {
  const pathname = usePathname();
  const shouldShowHeader = !excludedHeaderPaths.includes(pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <div className={shouldShowHeader ? 'mt-15' : ''}>{children}</div>
    </>
  );
};
