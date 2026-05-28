import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Carpetz — Logomatten op maat',
  description: 'Professionele entree-matten met jouw logo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
