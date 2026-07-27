import { QueryProvider } from '@/components/query-provider';

export default function PurchaseLayout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}
