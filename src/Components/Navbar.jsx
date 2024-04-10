import React from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const Navigationbar = () => {
	return (
		<Navbar expand="lg" className=" bg-dark">
			<Container>
				<Navbar.Brand className=" text-white">restaurants</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link to="/" className=" text-decoration-none text-white">
						recipes List
						</Nav.Link>
						<Nav.Link to="/add-recipes" className=" text-decoration-none text-white">
							Add recipes
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
export default Navigationbar
