import TabBar from '@/components/tabbar';

export default function ProductsLayout({
  modal,
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
