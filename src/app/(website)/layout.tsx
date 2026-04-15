import TopLoader from "../../components/TopLoader";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopLoader />
      {children}
    </>
  );
}
