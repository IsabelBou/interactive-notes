import { Box} from "@chakra-ui/react";
import { useState } from 'react';

import { VerovioRenderer, TonePlayer } from ".";
import { PlayPauseToggle } from '../Buttons';
import { useJSON } from "../../hooks";

export const Display = (props) => {
    const { score } = props;
    const [ midiString, setMidiString ] = useState([]);

    const midiJson = useJSON (midiString);

    const [ isPlaying, setIsPlaying ] = useState(false);

    //TODO: Allow Pause and Resumption with Toggler
    //TODO: Highlight playing notes

    return (
        <Box>
            <VerovioRenderer url = {score} setMidi = {setMidiString} />
            <TonePlayer midiJson = { midiJson } isPlaying = { isPlaying }/>
            <PlayPauseToggle onClick = {() => setIsPlaying(!isPlaying)} isPlaying = { isPlaying }/>
        </Box>
    )
}