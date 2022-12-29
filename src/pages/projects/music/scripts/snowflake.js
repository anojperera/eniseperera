import abcjs from "abcjs";

import 'abcjs/abcjs-audio.css';

const music = `X: 1
T: Enise Perera
M: 4/4
L: 1/8
K: Emin
|:GD|C|B|A|B|G|d|C|BA|
|:Gd|C|B|A|B:|`;

const abcOptions = { add_classes: true };

const visualObj = abcjs.renderAbc("paper", music, abcOptions)[0];
if (abcjs.synth.supportsAudio()) {
  const synthControl = new abcjs.synth.SynthController();
  synthControl.load("#audio", null, { displayRestart: true, displayPlay: true, displayProgress: true });
  synthControl.setTune(visualObj, false);
}

