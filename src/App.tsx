import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router";
import HomePage from "./pages/home/home";
import {BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import SideMenu from "./components/sideMenu/sideMenu";
import useOutsideClicker from "./hooks/outsideClicker";
import RansomsPage from "./pages/ransoms/ransoms";
import LoginPage from "./pages/login/login";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <main className={"flex flex-fill min-h-screen bg-main-back text-main-text"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SideMenu />}>
                        <Route path="" element={<HomePage />} />
                        <Route path="/ransoms" element={<RansomsPage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
          </main>
      </QueryClientProvider>
  );
}

export default App;
