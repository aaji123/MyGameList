import { Container, Button, Badge, Card, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { statusColors, statusOptions } from "../utils/statusHelper"

const GameDetails = ({ games = [], onDeleteGame, onStatusChange }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const game = games.find(g => g.id === id)

  if (!game) {
    return (
      <Container className="py-4">
        <p className="text-muted">Game not found.</p>
        <Button variant="dark" onClick={() => navigate("/games")}>← Back to Games</Button>
      </Container>
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${game.title}"?`)) {
      onDeleteGame(game.id)
      navigate("/games")
    }
  }

  return (
    <Container className="py-4" style={{ maxWidth: "700px" }}>

      <Button variant="outline-secondary" size="sm" className="mb-4" onClick={() => navigate("/games")}>
        ← Back to Games
      </Button>

      <Card className="shadow-sm">
        <Card.Body className="p-4">

          <div className="d-flex justify-content-between align-items-start mb-3">
            <h2 className="mb-0">{game.title}</h2>
            <span className="badge bg-dark fs-5">{game.rating} ⭐</span>
          </div>

          <div className="d-flex gap-2 mb-4">
            <Badge bg="secondary" style={{ fontSize: "0.9rem" }}>{game.genre}</Badge>
            <Badge bg={statusColors[game.status] || "secondary"} style={{ fontSize: "0.9rem" }}>
              {game.status}
            </Badge>
          </div>

          <h5>Review</h5>
          <p className="text-muted fst-italic">"{game.review}"</p>

          <h5 className="mt-4">Change Status</h5>
          <Form.Select
            value={game.status}
            onChange={e => onStatusChange(game.id, e.target.value)}
            style={{ maxWidth: "200px" }}
          >
            {statusOptions.map(s => <option key={s}>{s}</option>)}
          </Form.Select>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="danger" onClick={handleDelete}>Delete Game</Button>
          </div>

        </Card.Body>
      </Card>

    </Container>
  )
}

export default GameDetails