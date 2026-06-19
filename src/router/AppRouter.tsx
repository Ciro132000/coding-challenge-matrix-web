import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import { ProtectedRoute }
from './ProtectedRoute';

import { PublicRoute }
from './PublicRoute';
import { LoginPage } from '../features/auth/LoginPage';
import { HomeRedirect } from './HomeRedirect';
import { MatrixPage } from '../features/matrix/MatrixPage';

export function AppRouter() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<HomeRedirect />}
                />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/matrix"
                    element={
                        <ProtectedRoute>
                            <MatrixPage />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}