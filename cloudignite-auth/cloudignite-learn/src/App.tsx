/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';

import { NetflixArchitecture } from './pages/NetflixArchitecture';
import { UberArchitecture } from './pages/UberArchitecture';
import { DiscordArchitecture } from './pages/DiscordArchitecture';

import { Foundations } from './pages/Foundations';
import { FoundationTopic } from './pages/FoundationTopic';

import { SystemDesign } from './pages/SystemDesign';
import { SystemDesignTopic } from './pages/SystemDesignTopic';

export default function App() {

  return (
    <BrowserRouter>

      <div className="bg-[#02040a] text-slate-100 min-h-screen relative overflow-hidden flex flex-col font-sans">

        {/* BACKGROUND */}

        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="fixed inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none z-0" />

        {/* CONTENT */}

        <div
          id="scroll-container"
          className="relative z-10 hidden-scrollbar overflow-y-auto h-screen"
        >

          <Routes>

            {/* HOME */}

            <Route
              path="/"
              element={<Home />}
            />

            {/* ARCHITECTURES */}

            <Route
              path="/architecture/netflix"
              element={<NetflixArchitecture />}
            />

            <Route
              path="/architecture/uber"
              element={<UberArchitecture />}
            />

            <Route
              path="/architecture/discord"
              element={<DiscordArchitecture />}
            />

            {/* FOUNDATIONS */}

            <Route
              path="/foundations"
              element={<Foundations />}
            />

            {/* DEEP TOPIC ROUTING */}

            <Route
              path="/topic/*"
              element={<FoundationTopic />}
            />

            {/* SYSTEM DESIGN */}

            <Route
              path="/system-design"
              element={<SystemDesign />}
            />

            <Route
              path="/system-design/:topicId"
              element={<SystemDesignTopic />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}