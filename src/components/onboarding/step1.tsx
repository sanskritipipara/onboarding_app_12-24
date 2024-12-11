import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    RootState,
    setUserProfile,
} from "../../redux/slices/onboardingSlice.ts";
import {
    TextField,
    Container,
    FormHelperText,
    Avatar,
    Button,
} from "@mui/material";

const OnboardingStep1 = () => {
    const dispatch = useDispatch();
    const { userProfile } = useSelector((state: RootState) => state.onboarding);

    const [name, setName] = useState(userProfile.name || "");
    const [age, setAge] = useState(userProfile.age || "");
    const [email, setEmail] = useState(userProfile.email || "");
    const [profilePicture, setProfilePicture] = useState(
        userProfile.profilePicture || ""
    );
    const [errors, setErrors] = useState({
        name: "",
        age: "",
        email: "",
        profilePicture: "",
    });

    const save = () => {
        const newErrors = {
            name: "",
            age: "",
            email: "",
            profilePicture: "",
        };
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

        if (!age.trim()) {
            newErrors.age = "Age is required";
            isValid = false;
        } else if (isNaN(Number(age))) {
            newErrors.age = "Age must be a number";
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        if (!profilePicture) {
            newErrors.profilePicture = "Profile picture is required";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            dispatch(setUserProfile({ name, age, email, profilePicture }));
        }
    };

    const handleProfilePictureChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Container>
            <div>
                <input
                    accept="image/*"
                    id="profile-picture-input"
                    type="file"
                    onChange={handleProfilePictureChange}
                    style={{ display: "none" }}
                />
                <label htmlFor="profile-picture-input">
                    <Avatar
                        src={profilePicture}
                        alt="Profile Picture"
                        sx={{ width: 50, height: 50, margin: "10px" }}
                    />
                </label>
                {errors.profilePicture && (
                    <FormHelperText error>
                        {errors.profilePicture}
                    </FormHelperText>
                )}
            </div>
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(errors.name)}
                helperText={errors.name}
            />
            <TextField
                label="Age"
                fullWidth
                margin="normal"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                error={Boolean(errors.age)}
                helperText={errors.age}
            />
            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
            />

            <Button
                style={{ maxWidth: "100px" }}
                variant="outlined"
                onClick={save}
            >
                Save
            </Button>
        </Container>
    );
};

export default OnboardingStep1;
