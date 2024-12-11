import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setFavoriteSongs } from '../../redux/slices/onboardingSlice.ts';
import { TextField, Button, Container } from '@mui/material';

const OnboardingStep2 = () => {
  const dispatch = useDispatch();
  const { favoriteSongs } = useSelector((state:RootState) => state.onboarding);

  const [song, setSong] = useState('');
  const [songs, setSongs] = useState(favoriteSongs);


  const handleAddSong = () => {
    setSongs([...songs, song]);
    setSong('');
  };

  const save = () => {
    dispatch(setFavoriteSongs(songs));
  };

  return (
    <Container>
      <TextField
        label="Favorite Song"
        fullWidth
        margin="normal"
        value={song}
        onChange={(e) => setSong(e.target.value)}
      />
      <Button onClick={handleAddSong}>Add Song</Button>
      <ul>
        {songs.map((song, idx) => (
          <li key={idx}>{song}</li>
        ))}
      </ul>
      <Button variant="outlined" onClick={save}>Save</Button>
    </Container>
  );
};

export default OnboardingStep2;
