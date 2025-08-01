import { BrowserRouter } from "react-router-dom"
import PrivateRoutes from "./routs/priveRouts"
import { Context } from "./context"
function App() {

  return (
    <BrowserRouter>
      <Context>
        <PrivateRoutes />
      </Context>
    </BrowserRouter>
  )
}

export default App
