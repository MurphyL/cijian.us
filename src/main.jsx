import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil'
import { HashRouter } from "react-router-dom"

import App from './core/app'

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
    <StrictMode>
        <RecoilRoot>
            <Suspense fallback="Loading...">
                <HashRouter>
                    <App />
                </HashRouter>
            </Suspense>
        </RecoilRoot>
    </StrictMode>
)
