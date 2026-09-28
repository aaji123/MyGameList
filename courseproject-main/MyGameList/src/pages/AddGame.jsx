import { useState } from "react"
import { Container, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { statusOptions } from "../utils/statusHelper"

const AddGame = ({ onAddGame }) => {
  const navigate = useNavigate()

  const [form, setForm] = useState({ title: "", genre: "", rating: "", review: "", status: "" })
  const [error, setError] = useState("")

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!form.title || !form.genre || !form.rating || !form.review || !form.status) {
      setError("Please fill in all fields.")
      return
    }

    if (form.rating < 0 || form.rating > 10) {
      setError("Rating must be between 0 and 10.")
      return
    }

    onAddGame({
      title: form.title,
      genre: form.genre,
      rating: parseFloat(form.rating),
      review: form.review,
      status: form.status,
    })

    navigate("/games")
  }

  return (
    <Container className="py-4" style={{ maxWidth: "600px" }}>
      <div className="d-flex align-items-center mb-4">
        <Button variant="outline-secondary" size="sm" className="me-3" onClick={() => navigate("/games")}>
          ← Back
        </Button>
        <h2 className="mb-0">Add a Game</h2>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="e.g. Elden Ring"
            value={form.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Select name="genre" value={form.genre} onChange={handleChange}>
            <option value="">Select a genre...</option>
            <option>Action</option>
            <option>Action RPG</option>
            <option>RPG</option>
            <option>Platformer</option>
            <option>Roguelike</option>
            <option>Metroidvania</option>
            <option>Strategy</option>
            <option>Simulation</option>
            <option>Sports</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating <span className="text-muted">(0 – 10)</span></Form.Label>
          <Form.Control
            type="number"
            name="rating"
            placeholder="e.g. 9.5"
            min="0"
            max="10"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select name="status" value={form.status} onChange={handleChange}>
            <option value="">Select a status...</option>
            {statusOptions.map(s => <option key={s}>{s}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="review"
            placeholder="Write a short review..."
            value={form.review}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="dark" type="submit" className="w-100">
          Add Game
        </Button>

      </Form>
    </Container>
  )
}

export default AddGame