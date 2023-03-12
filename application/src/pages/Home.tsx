import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/questions")
  }

  return (
    <div>
      <div className="wrapper">
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "#ebeff2",
            height: "350px",
            borderRadius: "10px",
            boxShadow: 3,
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Car Picker App
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleClick}
              sx={{ mt: 3, mb: 2 }}
            >
              Try Now
            </Button>
          </Box>
          <Box sx={{ mt: 8, mb: 4 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              {"Copyright © "}
              {new Date().getFullYear()}
              {"."}
            </Typography>
          </Box>
        </Container>
      </div>
      <div className="video-container">
        <video style={{ position: "relative" }} loop autoPlay muted>
          <source src="background.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default Home
