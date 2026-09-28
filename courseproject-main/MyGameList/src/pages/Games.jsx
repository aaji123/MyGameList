import { useState } from "react"
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { statusColors } from "../utils/statusHelper"

const Games = ({ games = [], onDeleteGame }) => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.genre.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container className="py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Games</h2>
        <Button variant="dark" onClick={() => navigate("/add-game")}>+ Add Game</Button>
      </div>

      <InputGroup className="mb-4">
        <Form.Control
          placeholder="Search by title or genre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </InputGroup>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filtered.length > 0 ? filtered.map(game => (
          <Col key={game.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">

                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Card.Title className="mb-0">{game.title}</Card.Title>
                  <span className="badge bg-dark fs-6">{game.rating} ⭐</span>
                </div>

                <div className="d-flex gap-2 mb-3">
                  <Badge bg="secondary">{game.genre}</Badge>
                  <Badge bg={statusColors[game.status] || "secondary"}>{game.status}</Badge>
                </div>

                <Card.Text className="text-muted fst-italic flex-grow-1">
                  "{game.review}"
                </Card.Text>

                <div className="d-flex gap-2 mt-3">
                  <Button
                    variant="outline-dark"
                    size="sm"
                    className="flex-grow-1"
                    onClick={() => navigate(`/games/${game.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${game.title}"?`)) {
                        onDeleteGame(game.id)
                      }
                    }}
                  >
                    🗑
                  </Button>
                </div>

              </Card.Body>
            </Card>
          </Col>
        )) : (
          <Col>
            <p className="text-muted">No games found.</p>
          </Col>
        )}
      </Row>

    </Container>
  )
}

export default Games