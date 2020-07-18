

var AudioContext = require('web-audio-api').AudioContext;
var Speaker      = require('speaker');
const sound = require('sound-play')

var context      = new AudioContext();

context.outStream = new Speaker();

function play(audioBuffer) {
    if (!audioBuffer) { return; }

    var bufferSource = context.createBufferSource();
    var gainNode = context.createGain();
    gainNode.gain.value = 0.5 // for instance, find a good value
  
    bufferSource.connect(gainNode);
    gainNode.connect(context.destination);
    bufferSource.buffer = audioBuffer;
    bufferSource.loop   = false;
    bufferSource.start(0);
}


// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();



async function playSpeech(text) {
  // The text to synthesize
  //const text = 'Ahoj, jak se máš? Já se mám dobře';

  // Construct the request
  const request = {
    input: {text: text},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: 'cs-CZ'},
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'MP3'},
  };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    //await context.decodeAudioData(response.audioContent, (audioBuffer) => {
        // let bufferStream = new stream.PassThrough();
        // bufferStream.start(response.audioContent);
        // bufferStream.pipe(speaker);
       // play(audioBuffer)
    //})
    


  // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
    await sound.play('./output.mp3')
    await fs.unlinkSync('./output.mp3')
}
//playSpeech(input);

module.exports.playSpeech = playSpeech



