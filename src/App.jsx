import { Link, Outlet } from "react-router-dom";

function App() {

  return (
      <>
          <header className="bg-gray-800 text-white p-4 mb-4">
              <div className="container mx-auto px-4">
                  <div className="flex items-center justify-between">
                      <h1 className="text-2xl">Tricount</h1>
                      <nav>
                          <ul className="flex gap-4">
                              <li>
                                  <Link to="/" className="text-blue-200 hover:text-white">Home</Link>
                              </li>
                          </ul>
                      </nav>
                  </div>
              </div>
          </header>

          <main className="container mx-auto px-4">
              <Outlet/>
          </main>
      </>
  )
}

export default App
