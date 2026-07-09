import { AdminPage } from "./pages/AdminPage";
import { HomePage } from "./pages/HomePage";
import { ResultPage } from "./pages/ResultPage";
import { TestPage } from "./pages/TestPage";

export function App() {
  const path = window.location.pathname;
  if (path === "/test") return <TestPage />;
  if (path === "/result") return <ResultPage />;
  if (path === "/admin") return <AdminPage />;
  return <HomePage />;
}
