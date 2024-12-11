import React from 'react';
import { Container, Box } from '@mui/material';
import CustomStepper from './CustomStepper.tsx';

const Onboarding = () => {

  const steps = ['Step 1: Profile', 'Step 2: Favorite Songs', 'Step 3: Payment', 'Step 4: Success' ];

  return (
    <Container>
      <Box sx={{ padding: 3 }}>
        <CustomStepper steps={steps} />
      </Box>
    </Container>
  );
};

export default Onboarding;
