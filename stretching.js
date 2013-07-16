const LEFT_HAND = 1;
const RIGHT_HAND = 2;

var Stretching = {
  keyboard: null,

  firstRun: true,

  init: function() {
    this.messageDOM = document.getElementById('message');
    this.titleDOM = document.getElementById('title');
    this.reportDOM = document.getElementById('report');
    this.letterDOM = document.getElementById('letter');
    this.keyboardDOM = document.getElementById('keyboard');

    // TODO: select the keyboard
    this.layout = "us";

    this.keyboard = Keyboards[this.layout];
    this.keyboardDOM.addEventListener("load", function() {
      Stretching.svgKeyboardLoaded();
    });
    this.keyboardDOM.data = "keyboard.svg";

    this.buffer = 'yes';

    this.messageDOM.innerHTML = 'Write \'yes\'';
    this.titleDOM.innerHTML = 'Are you ready to stretch your fingers?';
    this.reportDOM.innerHTML = '';
    this.letterDOM.innerHTML = 'yes';

    this.createSteps();
    this.resetReport();
  },

  createSteps: function() {
    var me = this;
    var level = 0;
    this.steps = [
      function() { return me.createRange(
          "Level " + (++level) + ": just left hand, no stretching", true, 20,
          [ { range: 2, hands: [ LEFT_HAND ],  position: [ 1 ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": just right hand, no stretching", true, 20,
          [ { range: 2, hands: [ RIGHT_HAND ],  position: [ 1 ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": left and right hands. no stretching", true, 20,
          [ { range: 2, hands: [ LEFT_HAND, RIGHT_HAND ],  position: [ 1 ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": index finger basic stratching", false, 20,
          [ { range: 2, hands: [ LEFT_HAND, RIGHT_HAND ], fingers: [ 3, 4] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": left and right hands", true, 20,
          [ { range: 2, hands: [ LEFT_HAND, RIGHT_HAND ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": let's stretch the index finger, left hand", false, 20,
          [ { range: 1, hands: [ LEFT_HAND ],  fingers: [ 3 ] },
            { range: 2, hands: [ LEFT_HAND ],  fingers: [ 3 ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": 2 rows, left hand!", true, 20,
          [ { range: 1, hands: [ LEFT_HAND ] },
            { range: 2, hands: [ LEFT_HAND ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": let's stretch the index finger, right hand", false, 20,
          [ { range: 1, hands: [ RIGHT_HAND ],  fingers: [ 4 ] },
            { range: 2, hands: [ RIGHT_HAND ],  fingers: [ 4 ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": 2 rows, right hand!", true, 20,
          [ { range: 1, hands: [ RIGHT_HAND ] },
            { range: 2, hands: [ RIGHT_HAND ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": let's stretch the index finger, both hands", false, 20,
          [ { range: 1, hands: [ RIGHT_HAND, LEFT_HAND ],  fingers: [ 3, 4 ] },
            { range: 2, hands: [ RIGHT_HAND, LEFT_HAND ],  fingers: [ 3, 4 ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": 2 rows and 2 hands!", true, 20,
          [ { range: 1, hands: [ LEFT_HAND, RIGHT_HAND ] },
            { range: 2, hands: [ LEFT_HAND, RIGHT_HAND ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": ready for 3 rows, left hand?", true, 20,
          [ { range: 1, hands: [ LEFT_HAND ] },
            { range: 2, hands: [ LEFT_HAND ] },
            { range: 3, hands: [ LEFT_HAND ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": ready for 3 rows, right hand?", true, 20,
          [ { range: 1, hands: [ RIGHT_HAND ] },
            { range: 2, hands: [ RIGHT_HAND ] },
            { range: 3, hands: [ RIGHT_HAND ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": now 3 rows, 2 hands!", true, 20,
          [ { range: 1, hands: [ LEFT_HAND, RIGHT_HAND ] },
            { range: 2, hands: [ LEFT_HAND, RIGHT_HAND ] },
            { range: 3, hands: [ LEFT_HAND, RIGHT_HAND ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": 4 rows, left hand!", true, 20,
          [ { range: 0, hands: [ LEFT_HAND ] },
            { range: 1, hands: [ LEFT_HAND ] },
            { range: 2, hands: [ LEFT_HAND ] },
            { range: 3, hands: [ LEFT_HAND ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": and 4 rows, right hand...?", true, 20,
          [ { range: 0, hands: [ RIGHT_HAND ] },
            { range: 1, hands: [ RIGHT_HAND ] },
            { range: 2, hands: [ RIGHT_HAND ] },
            { range: 3, hands: [ RIGHT_HAND ] } ]
        );
      },
      function() { return me.createRange(
          "Level " + (++level) + ": now 4 rows, 2 hands!", true, 20,
          [ { range: 0, hands: [ LEFT_HAND, RIGHT_HAND ] },
            { range: 1, hands: [ LEFT_HAND, RIGHT_HAND ] },
            { range: 2, hands: [ LEFT_HAND, RIGHT_HAND ] },
            { range: 3, hands: [ LEFT_HAND, RIGHT_HAND ] } ]
        );
      },
    ];
  },

  createRange: function(title, withSpace, number, array) {
    var range = [];

    for (var i = 0; i < array.length; ++i) {
      if (array[i].hands.indexOf(LEFT_HAND) != -1) {
        for (var finger = 0; finger < 4; ++finger) {
          if ("fingers" in array[i] && array[i].fingers.indexOf(finger) == -1) {
            continue;
          }

          var row;
          switch (array[i].range) {
            case 0:
              row = this.keyboard.row0;
              break;
            case 1:
              row = this.keyboard.row1;
              break;
            case 2:
              row = this.keyboard.row2;
              break;
            case 3:
              row = this.keyboard.row3;
              break;
          }

          for (var p = 0; p < row[finger].length; ++p) {
            if ("position" in array[i] && p >= array[i].position) {
              break;
            }

            range.push({ row: array[i].range, finger: finger, position: p,
                         letter: row[finger][p], hand: LEFT_HAND });
          }
        }
      }

      if (array[i].hands.indexOf(RIGHT_HAND) != -1) {
        for (var finger = 4; finger < 8; ++finger) {
          if ("fingers" in array[i] && array[i].fingers.indexOf(finger) == -1) {
            continue;
          }

          var row;
          switch (array[i].range) {
            case 0:
              row = this.keyboard.row0;
              break;
            case 1:
              row = this.keyboard.row1;
              break;
            case 2:
              row = this.keyboard.row2;
              break;
            case 3:
              row = this.keyboard.row3;
              break;
          }

          for (var p = 0; p < row[finger].length; ++p) {
            if ("position" in array[i] && p >= array[i].position) {
              break;
            }

            range.push({ row: array[i].range, finger: finger, position: p,
                         letter: row[finger][p], hand: RIGHT_HAND });
          }
        }
      }
    }

    var values = [];
    var space = true;
    for (var i = 0; i < number; ++i) {
      if (withSpace && !space && !Math.floor(Math.random() * 4)) {
        values.push({ row: -1, finger: 8, position: -1, letter: ' ',
                      hand: LEFT_HAND });
        space = true;
        continue;
      }

      values.push(range[Math.floor(Math.random() * range.length)]);
      space = false;
    }

    return { title: title, values: values };
  },

  runSteps: function() {
    if (!this.currentStep || this.currentStep.values.length == 1) {
      if (this.steps.length == 0) {
        this.finished();
        return;
      }
      this.currentStep = this.steps.shift()();
      this.resetReport();
    } else {
      this.currentStep.values.shift();
    }

    this.buffer = this.currentStep.values[0].letter;

    this.messageDOM.innerHTML = this.createMessage();

    var oldTitle = this.titleDOM.innerHTML;
    this.titleDOM.innerHTML = this.currentStep.title;
    this.keyboardHighlight();

    if (oldTitle != this.titleDOM.innerHTML) {
      $(this.titleDOM).effect('highlight', { color: '#00AEEF' });
      $(this.titleDOM).effect('pulsate', { time: 3 });
    }

    this.letterDOM.innerHTML = this.buffer;

    // Average:
    var now = new Date();
    this.report.avg.push(now - this.report.time);
    this.report.time = now;

    this.printReport();
  },

  svgKeyboardLoaded: function() {
    this.keyboardDOM.contentDocument.loadKeyboard(this.layout);
  },

  keyboardHighlight: function() {
    if (!this.keyboardDOM || !this.keyboardDOM.contentDocument) {
      return;
    }

    this.keyboardDOM.contentDocument.highlight(this.layout,
                                               this.currentStep.values[0].row,
                                               this.currentStep.values[0].finger,
                                               this.currentStep.values[0].position);
  },

  createMessage: function() {
    var me = this;

    var messages = [
      function() {
        return "Let's stretch " + me.fingerName(me.currentStep.values[0].finger) + ", " +
               me.handName(me.currentStep.values[0].finger, me.currentStep.values[0].hand) + " hand";
      },

      function() {
        return "Continue hard with " + me.fingerName(me.currentStep.values[0].finger) + ", " +
               me.handName(me.currentStep.values[0].finger, me.currentStep.values[0].hand) + " hand";
      },

      function() {
        return "Move " + me.fingerName(me.currentStep.values[0].finger) + ", " +
               me.handName(me.currentStep.values[0].finger, me.currentStep.values[0].hand) + " hand";
      },

      function() {
        return "Hand " + me.handName(me.currentStep.values[0].hand) + " " +
               me.fingerName(me.currentStep.values[0].finger, me.currentStep.values[0].finger);
      },

      function() {
        return "I cannot see your hands... yet. Don't lie to me!";
      }
    ];

    if (this.firstRun) {
      this.firstRun = false;
      return messages[0]();
    }

    return messages[Math.floor(Math.random() * messages.length)]();
  },

  fingerName: function(id) {
    switch(id) {
      case 0:
      case 7:
        return "baby finger";
      case 1:
      case 6:
        return "ring finger";
      case 2:
      case 5:
        return "middle finger";
      case 3:
      case 4:
        return "index finger";
      case 8:
        return "thumb";
    }
  },

  handName: function(fingerId, id) {
    if (fingerId == 8) {
      return "left or right";
    }

    return LEFT_HAND == id ? "left" : "right";
  },

  keyPressed: function(code) {
    if (!this.buffer || this.buffer == '') {
      return;
    }

    if (this.buffer.charCodeAt(0) != code) {
      $(this.letterDOM).addClass('error');
      $(this.letterDOM).effect('shake', { distance: 4});
      ++this.report.errors;
      this.printReport();
      fart();
      return;
    }

    $(this.letterDOM).removeClass('error');
    this.buffer = this.buffer.substring(1);
    ++this.report.done;

    if (this.buffer.length == 0) {
      this.runSteps();
      return;
    }

    this.letterDOM.innerHTML = this.buffer;
  },

  finished: function() {
    this.messageDOM.innerHTML = 'Well done. Do you want to restart?';
    this.titleDOM.innerHTML = '';
    this.clearReport();
    this.letterDOM.innerHTML = 'yes';
    this.buffer = 'yes';
    this.createSteps();
  },

  printReport: function() {
    var avg = '';
    if (this.report.avg.length >= 5) {
      var sum = 0;
      for (var i = 0; i < this.report.avg.length; ++i) {
        sum += this.report.avg[i];
      }
      avg = ' - Average: ' + (sum / this.report.avg.length / 1000).toFixed(1);
    }

    this.reportDOM.innerHTML = 'Errors: ' + this.report.errors +
                               ' - Done: ' + this.report.done +
                               ' - Left: ' + (this.currentStep ? this.currentStep.values.length : 0) +
                               ' - Time: ' + (((new Date()) - this.report.time) / 1000).toFixed(1) +
                               avg;
    if (!this.reportInterval) {
      var me = this;
      this.reportInterval = setInterval(function() {
        me.printReport();
      }, 100);
    }
  },

  resetReport: function() {
    this.report = { errors: 0, done: 0, time: (new Date()), avg: [] };
  },

  clearReport: function() {
    this.reportDOM.innerHTML = '';
  }
};

$(document).ready(function() {
  Stretching.init();
});

window.onkeypress = function(event) {
  if (event.altKey || event.ctrlKey || event.metaKey) {
    return;
  }

  Stretching.keyPressed(event.charCode);
  event.preventDefault();
}
