import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find a Dog Park Near Me in NYC | Full Directory',
  description: 'Browse our complete directory of NYC dog parks. Use the "Find Near Me" button to locate the closest off-leash dog park to you.',
};

export default function ParksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 