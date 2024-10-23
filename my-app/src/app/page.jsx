import Catalog from "./components/catalog/Catalog";

export default function Home() {
  return (
    <main 
      className="flex flex-col items-center justify-between"
    >
      {/* <Header/> */}
      <Catalog/>
      {/* <Footer/> */}
    </main>
  );
}
