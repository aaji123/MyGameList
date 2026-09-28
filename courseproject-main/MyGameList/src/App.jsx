import { Container, Navbar, Nav } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Games from "./pages/Games"
import AddGame from "./pages/AddGame"
import GameDetails from "./pages/GameDetails"

const BASE_URL = 'http://localhost:3000/api/games'

const App = () => {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => setGames(data))
  }, [])

  const handleAddGame = (game) => {
    fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game),
    })
      .then(res => res.json())
      .then(savedGame => setGames(prev => [...prev, savedGame]))
  }

  const handleDeleteGame = (id) => {
    fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
      .then(() => setGames(prev => prev.filter(g => g.id !== id)))
  }

  const handleStatusChange = (id, newStatus) => {
    fetch(`${BASE_URL}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(updatedGame => setGames(prev => prev.map(g => g.id === id ? updatedGame : g)))
  }

  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">MyGameList</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/games">Games</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home games={games} />} />
        <Route path="/games" element={<Games games={games} onDeleteGame={handleDeleteGame} />} />
        <Route path="/games/:id" element={<GameDetails games={games} onDeleteGame={handleDeleteGame} onStatusChange={handleStatusChange} />} />
        <Route path="/add-game" element={<AddGame onAddGame={handleAddGame} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App