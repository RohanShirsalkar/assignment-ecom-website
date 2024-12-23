import router from "./router/app.router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <main className="font-sans">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
