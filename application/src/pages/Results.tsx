import * as React from "react"
import { Box, Button, Container, Divider, Typography } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import StickyFooter from "../components/Footer"
import axios from "axios"
import { createApi } from "unsplash-js";
import { useNavigate } from "react-router-dom"
// const UserChoices = 
// {
//   "Brand": ["Lamborghini", "Audi", "Porsche", "Mercedes-Benz"],
//   "Body": "Two Seaters",
//   "Year": {"min": 2005, "max": 2022},
//   "Type": "Gasoline",
//   "TransmissionType": "Automated Manual",
//   "Horsepower": { "min": 120, "max": 700},
//   "Seats": 5,
//   "Doors": 4,
//   "Price": { "min": 100000, "max": 1500000}
// }

let UserChoices: {};
// let car: Object;

export default function ResultsPage() {
  const [car, setCar] = React.useState({
    "Id": 0,
    "Brand": "",
    "Model": "",
    "Body": "",
    "Year": 0,
    "Type": "",
    "TransmissionType": "",
    "Horsepower": 0,
    "Seats": 0,
    "Doors": 0,
    "Price": 0
  })
  const [carImageURL, setCarImageURL] = React.useState("");
  const carChoicesLoadedRef = React.useRef(false);
  
  console.dir( UserChoices);
  const getCarOnLoad = () => {
    axios.post('http://localhost:3005/inferenta', UserChoices)
        .then(function (response) {
            console.log(response.data);
            const x = response.data;
            console.log(x.Brand)
            // setCar(previousState => { return {...previousState,...x}})
            setCar(x)
            // console.log(car)
        })
        .catch(function (error) {
            console.log(error);
        });
        // console.log(car); 
  }

  React.useEffect(() => {
    if (carChoicesLoadedRef.current) return;
      carChoicesLoadedRef.current = true;
    let temp = localStorage.getItem("UserChoices");
    UserChoices = (temp) ? JSON.parse(temp) : null;
    if(UserChoices)
      getCarOnLoad();
    // console.log(car)
  }, []);

  React.useEffect(() => {
    // const unsplash = createApi({ accessKey: 'HnfZPxsReKNhYpXdVc5SmDKlxuA3k7q3E_jl6ld2oXc' });

    // unsplash.search
    //   .getPhotos({
    //     query: car.Brand + " " + car.Model,
    //     page: 1,
    //     perPage: 10
    //   })
    //   .then(result=>{
    //     let imageURL = result.response?.results.at(0)?.urls.raw;
    //     // console.log(imageURL);
    //     // console.log(result.response?.results);
    //     setCarImageURL(imageURL+"");
    //   });
    axios.get(`https://api.serpdog.io/images?api_key=641ce794ea5937e471ab66a4&q=${car.Brand}+${car.Model}`)
    .then(response => {
      let imageURL = response.data?.image_results?.[0].original;
        console.log(imageURL);
          // console.log(response.data);
        setCarImageURL(imageURL+"");
      // console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
}, [car]);


const navigate = useNavigate();
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
            <img src={carImageURL} style={{maxHeight: "500px", maxWidth: "850px"}} />
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ ml: 2, width: "100%" }}>
            {" "}
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Brand name:{" "}
              </Typography>{" "}
              <Typography>{car.Brand}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Model:{" "}
              </Typography>{" "}
              <Typography>{car.Model}</Typography>
            </Box>
            <Divider
              orientation="horizontal"
              sx={{ width: "100%", mb: 2, mt: 2 }}
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>Year: </Typography>{" "}
              <Typography>{car.Year}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Car body:{" "}
              </Typography>{" "}
              <Typography>{car.Body}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Type:{" "}
              </Typography>{" "}
              <Typography>{car.Type}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Transmision type:{" "}
              </Typography>{" "}
              <Typography>{car.TransmissionType}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Horsepower:{" "}
              </Typography>{" "}
              <Typography>{car.Horsepower}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Number of doors:{" "}
              </Typography>{" "}
              <Typography>{car.Doors}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Number of seats:{" "}
              </Typography>{" "}
              <Typography>{car.Seats}</Typography>
            </Box>
            <Divider
              orientation="horizontal"
              sx={{ width: "100%", mb: 2, mt: 2 }}
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography sx={{ fontWeight: "bold", mr: 2 }}>
                Price:{" "}
              </Typography>{" "}
              <Typography>${car.Price.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: "flex", flex: "1 1 auto", justify: "flex-end", alignItems: 'flex-end', flexDirection: "column", pt: 2, pb: 4 }}>
              <Box sx={{ flex: "1 1 auto", flexDirection: "row",  justify: "flex-bottom", justifyContent: "flex-end"}} />
              <Button sx={{ mr: 1, maxHeight: "30px" }} onClick={() => navigate("/questions")}>Retake quiz</Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <StickyFooter />
    </Box>
  )
}
