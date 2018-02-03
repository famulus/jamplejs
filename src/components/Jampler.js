import React from 'react';
import ReactDOM from 'react-dom';
import Patch from './Patch.js';


export default class Jampler extends React.Component {

	componentDidMount(){
		







		const onMIDISuccess = (midiAccess) => {
			console.log("okok")
      // when we get a succesful response, run this code
      // # this is our raw MIDI data, inputs, outputs, and sysex status
      const inputs = midiAccess.inputs.values()
      // # loop over all available inputs and listen for any MIDI input
      let input = inputs.next()
      while (input &&  !input.done){
	        // # each time there is a midi message call the onMIDIMessage function
	      input.value.onmidimessage = onMIDIMessage
	      input = inputs.next()
      }
      // return
    }

    const onMIDIFailure = (error) =>{

			console.log("nono")
      // # when we get a failed responsysex, run this code
      console.log( "No access to MIDI devices or your browsysexr doesn\'t support WebMIDI API. Please use WebMIDIAPIShim " + error)
      return
    }


    const onMIDIMessage = (message) => {

    	const data = message.data
      // # this gives us our [command/channel, note, velocity] data.
      if  ((data[0] == 144) && (data[1] < 52)){

      	console.log ('MIDI data', data)
      	let previous_state = this.state
        // this.setState({currentPatch: (data[1] - 36)})
        // this.set_current_patch()
	      // # MIDI data [144, 63, 73]
	      return
      } //# the < 52 ignore the foot pedal


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

