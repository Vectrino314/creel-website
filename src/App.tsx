import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { DestinationDetailPage } from "./pages/DestinationDetailPage";

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinos" element={<DestinationsPage />} />
          <Route path="/destinos/:slug" element={<DestinationDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
