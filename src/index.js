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
            iterations: 100000,
            log: 10000,
            rate: .0012,
            error: .01
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


// iterations 10000 error 0.06549594736345705 rate 0.03
// iterations 20000 error 0.06546996596133348 rate 0.03
// iterations 30000 error 0.06546882328849055 rate 0.03
// iterations 40000 error 0.06546506375928421 rate 0.03
// iterations 50000 error 0.0654614573461793 rate 0.03

// iterations 10000 error 0.062259850033969374 rate 0.01
// iterations 20000 error 0.059360057277992755 rate 0.01
// iterations 30000 error 0.05725724933257616 rate 0.01
// iterations 40000 error 0.055736975008530074 rate 0.01
// iterations 50000 error 0.05627062824074254 rate 0.01

// iterations 10000 error 0.05977595183546593 rate 0.005
// iterations 20000 error 0.052231399297389576 rate 0.005
// iterations 30000 error 0.046946950198550115 rate 0.005
// iterations 40000 error 0.0351540510789493 rate 0.005
// iterations 50000 error 0.05103779601143528 rate 0.005

// iterations 10000 error 0.06230024435302879 rate 0.0025
// iterations 20000 error 0.05542695152187594 rate 0.0025
// iterations 30000 error 0.05443247811325467 rate 0.0025
// iterations 40000 error 0.052670779682994356 rate 0.0025
// iterations 50000 error 0.04944637180643104 rate 0.0025
