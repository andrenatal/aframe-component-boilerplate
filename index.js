/**
 * Example component for A-Frame.
 */
module.exports.Component = {
  schema: { },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    console.log('starting');

    var grm = "#JSGF v1.0; grammar fxosVoiceCommands; public <simple> =  cube rotate two times | cube show up | cube rotate five times | cube disappear | cube go away | cube come back | cube grow up | cube shrink;";
    this.recognition = new SpeechRecognition();
    this.recognition.lang = "en-US";
    this.speechrecognitionlist = new SpeechGrammarList();
    this.speechrecognitionlist.addFromString(grm, 1);
    this.recognition.grammars = this.speechrecognitionlist;
    this.recognition.start();
    console.log('started');
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) { },

  /**
   * Called on each scene tick.
   */
  // tick: function (t) { },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () {

    var that = this;
    this.recognition.onstart = function() {
      recognizing = true;
      console.log('Speak slowly and clearly');
    };

    this.recognition.onerror = function(event) {
      console.log("There was a recognition error...");
      that.recognition.start();
    };

    this.recognition.onend = function() {
      recognizing = false;
      console.log('Done');
    };

    this.recognition.onresult = function(event) {
      //var interim_transcript = '';
      var score = '';
      // Assemble the transcript from the array of results
      this.final_transcript = "";
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal && (event.results[i][0].transcript != "")) {
          console.log("recognition.onresult : isFinal:",  event.results[i][0].transcript);
          this.final_transcript = event.results[i][0].transcript;
        } else {
          //console.log("recognition.onresult : not isFinal");
          //this.final_transcript += event.results[i][0].transcript;
          //score = event.results[i][0].confidence;
        }
      }
      console.log("final:", this.final_transcript);
      that.speechRecognitionEventHandler(this.final_transcript);
      that.recognition.start();
    };
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  speechRecognitionEventHandler : function (transcript){
    console.log("at speechHandler:", transcript);

    if (transcript.indexOf('five') > -1){
      console.log('cube rotate five');
      this.el.emit('rotatefive');
    }

    if (transcript.indexOf('two') > -1){
      console.log('cube rotate two');
      this.el.emit('rotatetwo');
    }

    if (transcript.indexOf('show') > -1){
      console.log('ball appear');
      this.el.emit('appear');
    }

    if (transcript.indexOf('disappear') > -1){
      console.log('ball disappear');
      this.el.emit('disappear');
    }

    if (transcript.indexOf('go') > -1){
      console.log('go away');
      this.el.emit('moveaway');
    }

    if (transcript.indexOf('back') > -1){
      console.log('back');
      this.el.emit('back');
    }

    if (transcript.indexOf('grow') > -1){
      console.log('back');
      this.el.emit('grow');
    }

    if (transcript.indexOf('shrink') > -1){
      console.log('back');
      this.el.emit('shrink');
    }
  }
};
