import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navigationbar from "./Components/Navbar"
import { Provider } from "react-redux"
import store from "./store/store"
import "bootstrap/dist/css/bootstrap.min.css"
import Racipebook from "./Components/Racipebook"

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Navigationbar />
				<Routes>
					<Route path="/" element={<Racipebook />} />
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
