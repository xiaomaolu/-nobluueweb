/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { TopControls } from './components/TopControls';
import { Home } from './pages/Home';
import { VibeCoding } from './pages/VibeCoding';
import { Catmark } from './pages/Catmark';
import { Blunote } from './pages/Blunote';
import { BlunotePlatform } from './pages/BlunotePlatform';
import { BlunoteSupport } from './pages/BlunoteSupport';
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
          <Route path="/ai-life/catmark" element={<Catmark />} />
          <Route path="/blunote" element={<Blunote />} />
          <Route path="/blunote/support" element={<BlunoteSupport />} />
          <Route path="/blunote/:platform" element={<BlunotePlatform />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
