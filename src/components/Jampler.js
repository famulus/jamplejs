import React from 'react';
import ReactDOM from 'react-dom';
import Patch from './Patch.js';
import {Howl, Howler} from 'howler'
// import sound from '../../sounds/test.mp3';


export default class Jampler extends React.Component {

	componentDidMount(){
		


		const sound = new Howl({
		  src: ['https://archive.org/download/JoshJones-BreakBottles-OriginalDemomp3/Josh-BreakBottles.mp3'],
		    sprite: {
			    blast: [4200, 5000]
			  }
		});


		const onMIDISuccess = (midiAccess) => {
			console.log("okok")
      // when we get a succesful response, run this code
      //  this is our raw MIDI data, inputs, outputs, and sysex status
      const inputs = midiAccess.inputs.values()
      //  loop over all available inputs and listen for any MIDI input
      let input = inputs.next()
      // let input2 = inputs.next()
      while ((input &&  !input.done)  ){
        //  each time there is a midi message call the onMIDIMessage function
	      input.value.onmidimessage = onMIDIMessage
	      input = inputs.next()
      }
      // return
    }

    const onMIDIFailure = (error) =>{
      //  when we get a failed responsysex, run this code
      console.log( "No access to MIDI devices or your browsysexr doesn\'t support WebMIDI API. Please use WebMIDIAPIShim " + error)
      return
    }


    const onMIDIMessage = (message) => {
    	const data = message.data
      //  this gives us our [command/channel, note, velocity] data.
    	// console.log ('MIDI data', data)
      if((data[0] == 144) && (data[1] < 52)){
      	let previous_state = this.state
      	sound.play('blast')
	      return
      } 
      if((data[0] == 128) && (data[2] == 0)){
      	sound.stop()
      }
    }


    if (navigator.requestMIDIAccess){
    	navigator.requestMIDIAccess({sysex: false}).then(onMIDISuccess, onMIDIFailure)
    }
    else{
    	alert ('No MIDI support in your browser.')
    }

	}

	render() {
		return <div>I'm Jampler <Patch/><Patch/></div>
	}

}

