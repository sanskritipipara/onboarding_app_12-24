import React, { useEffect } from "react";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../../redux/slices/onboardingSlice.ts";
import { useNavigate } from "react-router-dom";
import OnboardingStep1 from "./step1.tsx";
import OnboardingStep2 from "./step2.tsx";
import OnboardingStep3 from "./step3.tsx";
import OnboardingStep4 from "./step4.tsx";
import Home from "../Home.tsx";

interface StepperProps {
    steps: string[];
}

interface RootState {
    onboarding: {
        step: number;
    };
}

const CustomStepper: React.FC<StepperProps> = ({ steps }) => {
    const dispatch = useDispatch();
    const step = useSelector((state: RootState) => state.onboarding.step);
    const navigate = useNavigate();

    const stepsComponent = [OnboardingStep1, OnboardingStep2, OnboardingStep3, OnboardingStep4, Home];

    useEffect(() => {
        if (step===5) {
            navigate("/home");
        }
    }, [step, navigate]);

    const handleNext = () => {
        if (step < steps.length) {
            dispatch(setStep(step + 1));
        } else {
            dispatch(setStep(step + 1));
            navigate("/home");
        }
    };

    const handleBack = () => {
        if (step > 1) {
            dispatch(setStep(step - 1));
        }
    };

    let CurrentComponent = stepsComponent[step-1]

    return (
        <Box sx={{ width: "100%", padding: 2 }}>
            <Stepper activeStep={step - 1} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <CurrentComponent/>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                }}
            >
                <Button
                    disabled={step === 1}
                    onClick={handleBack}
                    variant="outlined"
                    color='primary'
                >
                    Back
                </Button>
                <Button
                    onClick={handleNext}
                    variant="outlined"
                    disabled={step > steps.length}
                >
                    {step === steps.length ? "Finish" : "Next"}
                </Button>
            </Box>
        </Box>
    );
};

export default CustomStepper;
