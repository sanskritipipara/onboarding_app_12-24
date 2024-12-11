import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setPaymentInfo } from "../../redux/slices/onboardingSlice.ts";
import { TextField, Button, Container } from "@mui/material";

const OnboardingStep3 = () => {
    const dispatch = useDispatch();
    const { paymentInfo } = useSelector((state: RootState) => state.onboarding);

    const [cardNumber, setCardNumber] = useState(paymentInfo.cardNumber || "");
    const [expiryDate, setExpiryDate] = useState(paymentInfo.expiryDate || "");
    const [cvv, setCvv] = useState(paymentInfo.cvv || "");
    const [errors, setErrors] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const validateInputs = () => {
        const newErrors = {
            cardNumber: "",
            expiryDate: "",
            cvv: "",
        };

        let isValid = true;

        const cardNumberDigitsOnly = cardNumber.replace(/\D/g, "");
        if (!/^\d{16}$/.test(cardNumberDigitsOnly)) {
            newErrors.cardNumber = "Card number must be exactly 16 digits.";
            isValid = false;
        }

        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryRegex.test(expiryDate)) {
            newErrors.expiryDate = "Expiry date must be in MM/YY format.";
            isValid = false;
        } else {
            const [month, year] = expiryDate.split("/").map(Number);
            const now = new Date();
            const expiry = new Date(2000 + year, month - 1);
            if (expiry <= now) {
                newErrors.expiryDate = "Expiry date must be in the future.";
                isValid = false;
            }
        }

        if (!/^\d{3}$/.test(cvv)) {
            newErrors.cvv = "CVV must be 3 digits.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const save = () => {
        if (validateInputs()) {
            dispatch(setPaymentInfo({ cardNumber, expiryDate, cvv }));
        }
    };

    return (
        <Container>
            <TextField
                label="Card Number"
                fullWidth
                margin="normal"
                value={cardNumber}
                onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(/\D/g, ""); 
                    if (sanitizedValue.length <= 16) {
                        setCardNumber(sanitizedValue); 
                    }
                }}
                error={Boolean(errors.cardNumber)}
                helperText={errors.cardNumber}
            />
            <TextField
                label="Expiry Date (MM/YY)"
                fullWidth
                margin="normal"
                value={expiryDate}
                onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9/]/g, ""); 
                    if (/^\d{0,2}\/?\d{0,2}$/.test(value)) {
                        setExpiryDate(value);
                    }
                }}
                error={Boolean(errors.expiryDate)}
                helperText={errors.expiryDate}
            />
            <TextField
                label="CVV"
                fullWidth
                margin="normal"
                value={cvv}
                onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(/\D/g, ""); 
                    if (sanitizedValue.length <= 3) {
                        setCvv(sanitizedValue);
                    }
                }}
                error={Boolean(errors.cvv)}
                helperText={errors.cvv}
            />
            <Button variant="outlined" onClick={save}>
                Save
            </Button>
        </Container>
    );
};

export default OnboardingStep3;
