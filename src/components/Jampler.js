import React from 'react'
import ReactDOM from 'react-dom'
import Patch from './Patch.js'
import {Howl, Howler} from 'howler'
import Set from 'set'


export default class Jampler extends React.Component {

	constructor(props){
    super(props)
    this.state = { 
      note_on_set: new Set([]),
      current_howler_play_id: 0,
      player_ids:[]
    }
  }

	componentDidMount(){

		const sound = new Howl({
		  src: ['https://archive.org/download/JoshJones-BreakBottles-OriginalDemomp3/Josh-BreakBottles.mp3'],
		    sprite: {
			    "36": [4200, 5000],
          "37":[4500,5000]
			  }
		})


		const onMIDISuccess = (midiAccess) => {
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
    }



    const onMIDIMessage = (message) => {
    	const data = message.data
      //  this gives us our [command/channel, note, velocity] data.
    	// console.log ('MIDI data', data)
      if((data[0] == 144) && (data[1] < 52)){
        let previous_state = this.state
        this.state.note_on_set.add( data[1] ) 
        this.state.player_ids[data[1]] = sound.play(String(data[1]))
      } 



      if((data[0] == 144) && (data[1] == 64) && (data[2] == 64)){
        console.log("Pedal on")

      }
      if((data[0] == 144) && (data[1] == 64) && (data[2] == 0)){
        console.log("Pedal off")

      }
      if((data[0] == 128) && (data[2] == 0)){
      	sound.stop(this.state.player_ids[data[1]])
        this.state.note_on_set.remove( data[1] ) 

      }
      // console.log(this.state.note_on_set.get())
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

