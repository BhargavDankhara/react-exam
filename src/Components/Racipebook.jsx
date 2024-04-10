import React, { useEffect, useState } from "react"
// import css from  './racip.module.css'

const Racipebook = () => {
	const [input, setInput] = useState({
		name: "",
		topic_title: "",
		description: "",
	})

	const [racipes, setRacipes] = useState([])
	const [edit, isEdit] = useState(false)
	const [id, setId] = useState()

	useEffect(() => {
		fetchRacipes()
	}, [racipes])

	async function fetchRacipes() {
		const response = await fetch("/db.json")
		const data = await response.json()
		setRacipes(data.racipes)
	}

	const calculateTimeDifference = (submissionTime) => {
		const now = new Date()
		const diff = Math.abs(now - submissionTime) / 1000
		const hours = Math.floor(diff / 3600)
		const minutes = Math.floor((diff % 3600) / 60)
		let timeString = ""
		if (hours > 0) {
			timeString += hours + " hour"
			if (hours > 1) timeString += "s"
			timeString += " ago"
		} else {
			timeString += minutes + " minute"
			if (minutes > 1) timeString += "s"
			timeString += " ago"
		}
		return timeString
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const timestamp = new Date()
		if (edit) {
			const updatedRacipes = racipes.map((racipe) => (racipe.id === id ? { ...racipe, ...input, timestamp } : racipe))
			setRacipes(updatedRacipes)
			isEdit(false)
			setInput({ name: "", topic_title: "", description: "" })
		} else {
			const newBlog = {
				id: new Date().getTime(),
				name: input.name,
				topic_title: input.topic_title,
				description: input.description,
				timestamp,
			}
			const updatedRacipes = [...racipes, newBlog]
			setRacipes(updatedRacipes)
			setInput({ name: "", topic_title: "", description: "" })
		}
	}

	const handleChange = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value })
	}

	const handleDelete = (id) => {
		const updatedRacipes = racipes.filter((racipe) => racipe.id !== id)
		setRacipes(updatedRacipes)
	}

	const handleEdit = (id) => {
		const racipeToEdit = racipes.find((racipe) => racipe.id === id)
		setInput(racipeToEdit)
		isEdit(true)
		setId(id)
	}

	const handleSearch = (e) => {
		let searchContext = e.target.value
		if (searchContext !== "") {
			let search = racipes.filter((x) => x.name.toLowerCase().includes(searchContext.toLowerCase()))
			setRacipes(search)
		} else {
			setRacipes(racipes)
		}
	}

	return (
		<>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-12">
						<div className="rounded-6 pb-5">
							<h1 className="text-center mb-5">Add your racipes</h1>
							<form className="signup-form  w-50 p-4 m-auto" action="" onSubmit={handleSubmit}>
								<h2 className="text-center">Add Recipe</h2>
								<input className=" form-control" type="text" name="name" id="" placeholder="Enter Your Racipe Name" onChange={handleChange} value={input ? input.name : ""} required />
								<br />
								<input
									className=" form-control"
									type="text"
									name="topic_title"
									id=""
									placeholder="Enter cuisine name"
									onChange={handleChange}
									value={input ? input.topic_title : ""}
									required
								/>
								<br />
								<input
									className=" form-control"
									type="text"
									name="description"
									id=""
									placeholder="Add Racipe description"
									onChange={handleChange}
									value={input ? input.description : ""}
									required
								/>
								<br />
								<button className="btn btn-success w-50 rounded-5">{edit ? "Edit racipe" : "Submit racipe"}</button>
							</form>
						</div>
					</div>
					<div className="col-12">
						<div className="container">
							<h1 className="text-center mb-5">Racipe List</h1>
							<div className="row gx-4">
								<div className="col-4">
									<input type="text" className=" form-control" placeholder="Search" onChange={handleSearch} />
								</div>
								{racipes &&
									racipes.map((racipe, id) => (
										<div className="col-4" key={id}>
											<div className="card-container mb-4 p-3">
												<div className="card-image">
													<img
														className="img-fluid"
														src="https://www.google.com/search?sca_esv=571bc24825544f17&rlz=1C1ONGR_enCA939CA939&sxsrf=ACQVn0-cSFbLYy87JsYD7ZpyEmLjzgDA3Q:1712580859571&q=food+images&uds=AMwkrPvi6Fn774vFV8erJs7Dhp5E8HsNSC9DacFi49sLpOSOoyoC_UZcneYRBquZX6KT4gnRizJYbn7QoCHYP9PlqJg0iId6gf0R5exxqdGvpoL1HULYKFXXDsjetJkwfjqzhR8iTOQnzUnYy8WbAybLEg1nTBCwvP6qrn5UnU2ztv_SmEcNmkD3HhZQTmKHUML_YCnn3hbE_EQDgIZkYAJEbQbnRMm382p3E_27ZpiWkDgt4Rikh3rKY0LJvRO6SovG-pkuLfuaBcRBENNwBDP8Jo-CD9j3z1vwnLdtVzVLgoluF-L-iik&udm=2&prmd=isvnmbtz&sa=X&ved=2ahUKEwiarqLu1LKFAxXy4TgGHSm3B2QQtKgLegQIEhAB&biw=1536&bih=695&dpr=1.25#vhid=PB6VBTFgACuZUM&vssid=mosaic"
														alt=""
													/>
												</div>
												<div className="card-body">
													<h1>{racipe.topic_title}</h1>
													<p className="card-subtitle">{racipe.description}</p>
													<div className="card-author">

														<div className="author-info">
															<p className="author-name">{racipe.name}</p>
															<p className="post-timestamp">{racipe.timestamp ? calculateTimeDifference(racipe.timestamp) : ""}</p>
														</div>
													</div>
												</div>
												<div className="d-flex mt-2">
													<button className="w-100 btn btn-warning rounded-5 me-2" onClick={() => handleEdit(racipe.id)}>
														EDIT
													</button>
													<button className="w-100 btn btn-danger rounded-5" onClick={() => handleDelete(racipe.id)}>
														DELETE
													</button>
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Racipebook
