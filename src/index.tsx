import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from "~/Components/ErrorBoundary";

import TryDocpie from "~/Pages/TryDocpie";
import NotFound from "~/Pages/NotFound";
import Layout from "~/Components/Layout";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<ErrorBoundary>
    <HelmetProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="try" element={<TryDocpie />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    </HelmetProvider>
</ErrorBoundary>);
