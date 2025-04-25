import { StrictMode } from 'react';
import App from './App';
import BrowerRouter from 'react-router-dom/BrowserRouter';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowerRouter>
            <App/>
        </BrowerRouter>
    </StrictMode>
    );