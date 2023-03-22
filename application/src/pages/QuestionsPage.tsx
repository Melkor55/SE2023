import * as React from "react"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import StickyFooter from "../components/Footer"
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Stepper, Step, StepLabel, Button } from "@mui/material"
import { Slider } from '@mui/material';

import "./styles.css"

const steps : string[] = [
  // "Question 1",
  // "Question 2",
  // "Question 3",
  // "Question 4",
  // "Question 5",
  // "Question 6",
  // "Question 7",
  // "Question 8",
  // "Question 9",
    "Brand",
    "Body",
    "Year",
    "Type",
    "TransmissionType",
    "Horsepower",
    "Seats",
    "Doors",
    "Price",
]

const choices = {
    "Brand": [
              'Ford',
              'Dacia',
              'Tesla',
              'BMW',
              'Mercedes-Benz',
              'Audi',
              'Ferrari',
              'Toyota',
              'Lamborghini',
              'KIA',
              'Volvo',
              'Volkswagen',
              'Honda',
              'Hyundai',
              'Nissan',
              'Porsche',
              'Chevrolet',
              'Lexus',
              'Land-Rover',
            ],
    "Body": [
              'Midsize Cars',
              'Sport Utility Vehicles',
              'Standard Pickup Trucks',
              'Subcompact Cars',
              'Midsize Station Wagons',
              'Compact Cars',
              'Large Cars',
              'Cargo Vans',
              'Passenger Vans',
              'Sedan',
              'Hatchback',
              'Roadster',
              'Two Seaters',
              'Small Station Wagons',
              'Coupe',
              'Convertible',
              'Minivan',
              'Small Pickup Trucks',
              'Station Wagon',
              'Small Sport Utility Vehicles'
            ],
    "Year": {"min": 2009, "max": 2022},
    "Type": [
              'Midsize Cars',
              'Sport Utility Vehicles',
              'Standard Pickup Trucks',
              'Subcompact Cars',
              'Midsize Station Wagons',
              'Compact Cars',
              'Large Cars',
              'Cargo Vans',
              'Passenger Vans',
              'Sedan',
              'Hatchback',
              'Roadster',
              'Two Seaters',
              'Small Station Wagons',
              'Coupe',
              'Convertible',
              'Minivan',
              'Small Pickup Trucks',
              'Station Wagon',
              'Small Sport Utility Vehicles',
            ],
    "TransmissionType": [ 'Automatic', 'Manual', 'Direct Drive', 'Automated Manual' ],
    "Horsepower": {"min": 68, "max": 887},
    "Seats": [ 2, 5 ],
    "Doors": [ 2, 3, 4, 5 ],
    "Price": {"min": 11169, "max": 1228002},
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function QuestionsPage() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())

  const [value, setValue] = React.useState<number[]>([20, 37]);
  const [selectedDiv, setSelectedDiv] = React.useState(-1);

  const isStepOptional = (step: number) => {
    return step === 1
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  function safeGet(object: {
    [x: string]: any; Brand?: string[]; Body?: string[]; Year?: {
    min: number // "Question 4",
    ; max: number;
    }; Type?: string[]; TransmissionType?: string[]; Horsepower?: {
    min: number; max // "Question 9",
    : number;
    }; Seats?: number[]; Doors?: number[]; Price?: { min: number; max: number; };
    }, key: string) 
      {
      if (key === 'constructor' && typeof object[key] === 'function') {
        return;
      }
    
      if (key == '__proto__') {
        return;
      }
      return object[key];
   }

   React.useEffect(() => {
    if (typeof safeGet(choices, steps[activeStep])[0] !== "string")
      setValue([safeGet(choices, steps[activeStep]).min,safeGet(choices, steps[activeStep]).max])
}, [activeStep]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container
        component="main"
        sx={{
          mt: 6,
          mb: 2,
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Container sx={{ width: '50%'}}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {}
              const labelProps: {
                optional?: React.ReactNode
              } = {}
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                )
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </Container>
        <Container sx={{boxShadow: 3, borderRadius: 2}}>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                  (typeof safeGet(choices, steps[activeStep])[0] === "string" ? 
                  safeGet(choices, steps[activeStep]).map((value: string,index: number) => 
                    (<Grid item xs={2} sm={4} md={4} key={index}>
                      <div className={`card ${selectedDiv === index  ? " selected" : undefined}`} style={{cursor: "pointer"}} onClick={() => {console.log(value); setSelectedDiv(index)}} >
                        <Item >{value}</Item>
                      </div>
                    </Grid>
                  ))
                  :
                  (<Grid item xs={2} sm={4} md={4} key={1}>
                    <Slider
                        // {...setValue([23,100])}
                        getAriaLabel={() => `${steps[activeStep]} range`}
                        min={safeGet(choices, steps[activeStep]).min}
                        max={safeGet(choices, steps[activeStep]).max}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="on"
                      />
                  </Grid>
                  ))
                }
              </Grid>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Container>
      </Container>
      <StickyFooter />
    </Box>
  )
}
