import abcjs from "abcjs";

import 'abcjs/abcjs-audio.css';

const music = `X: 1
T: Enise Perera
M: 4/4
L: 1/8
K: Emin
|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|
EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|
|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|
eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|`;

const abcOptions = { add_classes: true };

const visualObj = abcjs.renderAbc("paper", music, abcOptions)[0];
if (abcjs.synth.supportsAudio()) {
  const synthControl = new abcjs.synth.SynthController();
  synthControl.load("#audio", null, { displayRestart: true, displayPlay: true, displayProgress: true });
  synthControl.setTune(visualObj, false);
}
