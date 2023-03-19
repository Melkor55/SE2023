import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Typography,
} from "@mui/material"
import { Stack } from "@mui/system"
import { useNavigate } from "react-router-dom"
import { SocialIcon } from "react-social-icons"

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
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h3">
              Car Picker App
            </Typography>
            <Divider orientation="horizontal" sx={{ width: "100%" }} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleClick}
              sx={{ mt: 8, mb: 4 }}
            >
              Try Now
            </Button>
          </Box>
          <Stack sx={{justifyContent: 'center'}} direction="row" spacing={4}>
            <SocialIcon url="https://www.facebook.com/" />
            <SocialIcon url="https://www.instagram.com/" />
            <SocialIcon url="https://www.twitter.com/" />
          </Stack>
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
