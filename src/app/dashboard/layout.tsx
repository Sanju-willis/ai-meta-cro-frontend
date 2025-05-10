// src\app\dashboard\layout.tsx
import { AuthProvider } from '@/app/context/AuthContext';
import { CompanyProvider } from '@/app/context/CompanyContext';
import { MetaProvider } from '@/app/context/MetaContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        <AuthProvider>
          <CompanyProvider>
            <MetaProvider>
          {children}
           </MetaProvider>
          </CompanyProvider>
        </AuthProvider>
  );
}
