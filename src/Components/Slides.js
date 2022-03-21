import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './slides.css';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



const Slides = ({ posts }) => {

    console.log("posts are:", posts);
    // const images = []
    // posts.forEach(element => {
    //     let temp = {
    //         label: element.title,
    //         imgPath: `http://192.168.30.5:5000/admin/getimg/${element.eventId}`
    //     };
    //     images.push(temp);

    // });

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    let maxSteps = 2;
    if (posts != undefined)
        maxSteps = posts.length;
    else
        maxSteps = 0;


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };


    return (
        <div className="carousel">
            <Box sx={{}} className='text-center'>
                <Paper
                    square
                    elevation={0}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: 50,
                        pl: 2,
                        bgcolor: "aquamarine",
                    }}
                >
                    {/* <Typography>{images[activeStep].label}</Typography> */}

                </Paper>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {posts?.map((step, index) => (
                        <div key={step.title}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{
                                        height: 300,
                                        display: 'block',
                                        // maxWidth: 800,
                                        overflow: 'hidden',
                                        width: '100%',
                                    }}
                                    src={`http://192.168.30.5:5000/admin/getimg/${step.eventId}`}
                                    alt={step.title}
                                />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <div className='navigationColor'>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Back
                            </Button>
                        }
                    />
                </div>
            </Box>
        </div>
    );
}

export default Slides;