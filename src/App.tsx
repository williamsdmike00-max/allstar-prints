import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import CustomTshirts from './pages/CustomTshirts'
import DTFPrinting from './pages/DTFPrinting'
import CustomApparel from './pages/CustomApparel'
import HowItWorks from './pages/HowItWorks'
import Pricing from './pages/Pricing'
import UploadArtwork from './pages/UploadArtwork'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import GangSheetBuilder from './pages/GangSheetBuilder'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="custom-tshirts" element={<CustomTshirts />} />
          <Route path="dtf-printing" element={<DTFPrinting />} />
          <Route path="custom-apparel" element={<CustomApparel />} />
          <Route path="gang-sheet-builder" element={<GangSheetBuilder />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="upload-artwork" element={<UploadArtwork />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
