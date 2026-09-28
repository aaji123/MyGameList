import { Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: "100vh" }}>
      <Container className="text-center pt-5">
        <h1 className="display-4">Welcome to MyGameList</h1>
        <p>Track and review your favorite games!</p>

        <Button variant="primary" href="/games" size="lg" className="me-3">
          View Games
        </Button>

        <Button variant="outline-dark" size="lg" onClick={() => navigate("/add-game")}>
          Add Game
        </Button>
      </Container>
    </div>
  )
}

export default Home