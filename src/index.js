var Synaptic = require('synaptic');
var Dictionary = require('./dictionary');

var Architect = Synaptic.Architect;
var Trainer = Synaptic.Trainer;



var d = new Dictionary('dictionary.txt');
d.buildDictionary(__dirname + '/dictionary.txt').then( a => {
    // we have our dictionary 
    // let's create the training set
    var trainingSet = d.buildTrainingSet(3);

    // console.log(trainingSet);

    var lstm = new Architect.LSTM(3, 6, 1);
    var trainer = new Trainer(lstm);

    var info = trainer.train(trainingSet, {
            iterations: 1000000,
            log: 1000,
            rate: .0005,
            error: .005,
            cost: ccost
        }
    );

    console.log( info, "\n\n\n" );

    // we can now start to see if the training was good
    var output = lstm.activate(trainingSet[1].input);
    console.log(output, ' for: ', trainingSet[1]);

    output = lstm.activate(trainingSet[2].input);
    console.log(output, ' for: ', trainingSet[2]);
    
    output = lstm.activate(trainingSet[3].input);
    console.log(output, ' for: ', trainingSet[3]);

});

function ccost(target, output) {
    var mse = 0;
    for (var i = 0; i < output.length; i++)
      mse += Math.abs(target[i] - output[i]);
    return mse / output.length;
  }

