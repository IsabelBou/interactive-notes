import { useEffect  } from 'react';
import * as Tone from 'tone';
import { useContext } from "react";
import { TempoContext } from '../../context';

const synth = new Tone.Sampler({
    urls: {
					C4: "C4.mp3",
					"D#4": "Ds4.mp3",
					"F#4": "Fs4.mp3",
					A4: "A4.mp3",
					C5: "C5.mp3",
					"D#5": "Ds5.mp3",
					"F#5": "Fs5.mp3",
					A5: "A5.mp3",
					C6: "C6.mp3",
				},
    release: 1,
    baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

export const TonePlayer = (props) => {
    const { midiJson, isPlaying} = props;
    const { tempo } = useContext(TempoContext);

    useEffect( () => {
        if (isPlaying) {
            Tone.start();
            const part = new Tone.Sequence(((time, note) => {
                synth.triggerAttackRelease(note, "4n", time);
            }), midiJson.tracks[0].notes.map(note => note.name), "4n").start();
            part.playbackRate = tempo;
            Tone.Transport.start();
        }
        else {
            Tone.Transport.cancel(0);
            Tone.Transport.stop();
        }
    }, [isPlaying, midiJson, tempo])
}