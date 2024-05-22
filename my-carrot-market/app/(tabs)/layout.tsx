import TabBar from '@/components/tabbar';

export default function TabLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
