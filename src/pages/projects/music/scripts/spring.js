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
const audioParams = { chordsOff: true };
const visualObj = abcjs.renderAbc("paper", music, abcOptions)[0];

const CursorControl = function() {
  this.beatSubdivisions = 2;
  this.onStart = function() {
    console.log("The tune has started playing.");
  }
  this.onFinished = function() {
    console.log("The tune has stopped playing.");
  }
  this.onBeat = function(beatNumber) {
    console.log("Beat " + beatNumber + " is happening.");
  }
  this.onEvent = function(event) {
    console.log("An event is happening", event);
  }
};

if (abcjs.synth.supportsAudio()) {
  const synthController = new abcjs.synth.SynthController();
  synthController.load("#audio",
    new CursorControl(),
    {
      displayLoop: true,
      displayRestart: true,
      displayPlay: true,
      displayProgress: true,
      displayWarp: true
    });

  const midiBuffer = new abcjs.synth.CreateSynth();
  midiBuffer.init({
    // audioContext: new AudioContext(),
    visualObj: visualObj,
    // sequence: [],
    // millisecondsPerMeasure: 1000,
    // debugCallback: function(message) { console.log(message) },
    options: {
      // soundFontUrl: "https://paulrosen.github.io/midi-js-soundfonts/FluidR3_GM/" ,
      // sequenceCallback: function(noteMapTracks, callbackContext) { return noteMapTracks; },
      // callbackContext: this,
      // onEnded: function(callbackContext),
      // pan: [ -0.5, 0.5 ]
    }
  }).then(function() {
    synthController.setTune(visualObj[0], false, audioParams).then(function() {
      console.log("Audio successfully loaded.")
    }).catch(function(error) {
      console.warn("Audio problem:", error);
    });
  }).catch(function(error) {
    console.warn("Audio problem:", error);
  });



}
