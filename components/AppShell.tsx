"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "./BootScreen";
import Hero from "./Hero";
import About from "./About";
import FakeAISimulation from "./FakeAISimulation";
import AISimulation from "./AISimulation";
import ArchiveLibrary from "./ArchiveLibrary";
import Agents from "./Agents";
import Terminal from "./Terminal";
import ActivityFeed from "./ActivityFeed";
import TokenSection from "./TokenSection";
import Roadmap from "./Roadmap";
import DailyDiscovery from "./DailyDiscovery";
import Footer from "./Footer";

export default function AppShell() {
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (bootComplete) {
      window.scrollTo(0, 0);
    }
  }, [bootComplete]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {!bootComplete && (
          <BootScreen onComplete={() => setBootComplete(true)} />
        )}
      </AnimatePresence>

      {bootComplete && (
        <main>
          <Hero />
          <About />
          <FakeAISimulation />
          <AISimulation />
          <ArchiveLibrary />
          <Agents />
          <Terminal />
          <ActivityFeed />
          <TokenSection />
          <Roadmap />
          <DailyDiscovery />
          <Footer />
        </main>
      )}
    </>
  );
}
