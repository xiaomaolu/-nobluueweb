/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { TopControls } from './components/TopControls';
import { Home } from './pages/Home';
import { VibeCoding } from './pages/VibeCoding';
import { SunlitLayer } from './components/SunlitLayer';

export default function App() {
  return (
    <AppProvider>
      <SunlitLayer />
      <BrowserRouter>
        <TopControls />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-life/vibe-coding" element={<VibeCoding />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
