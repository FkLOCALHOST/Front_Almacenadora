import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./pages/auth";

export const routes = [
    {path: '/auth', element: <AuthPage/>},
    {path: '/*', element: <DashboardPage/>}
]