import { Box, Container, Divider, Typography } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import StickyFooter from "../components/Footer"

export default function ResultsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Container sx={{ m: 6, boxShadow: 4, p: 5, borderRadius: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              color: "green",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleIcon fontSize="large" />
            <Typography sx={{ ml: 1 }} variant="h4">
              Congratiulations! Here is a car that suits you{" "}
            </Typography>
          </Box>
        </Container>
        <Container
          sx={{
            m: 4,
            p: 2,
            boxShadow: 4,
            borderRadius: 2,
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ mr: 2, boxShadow: 3 }}>
            <img src="supra-test.jpg" width="700px" height="450px" />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ ml: 2, width: "100%" }}>
            {" "}
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Brand name:{" "}
              </Typography>{" "}
              <Typography>Toyota</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Model:{" "}
              </Typography>{" "}
              <Typography>Supra</Typography>
            </Box>
            <Divider
              orientation="horizontal"
              sx={{ width: "100%", mb: 2, mt: 2 }}
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>Year: </Typography>{" "}
              <Typography>2020</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Car body:{" "}
              </Typography>{" "}
              <Typography>Toyota</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Transmision type:{" "}
              </Typography>{" "}
              <Typography>Automatic</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Horsepower:{" "}
              </Typography>{" "}
              <Typography>320</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Number of doors:{" "}
              </Typography>{" "}
              <Typography>2</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Number of seats:{" "}
              </Typography>{" "}
              <Typography>4</Typography>
            </Box>
            <Divider
              orientation="horizontal"
              sx={{ width: "100%", mb: 2, mt: 2 }}
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Price:{" "}
              </Typography>{" "}
              <Typography>$46000</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
      <StickyFooter />
    </Box>
  )
}
