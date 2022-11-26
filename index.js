import NaiveBayes from "./naiveBayes.js";

const model = new NaiveBayes("dataset.csv",0.6);
model.trainModel();
model.testModel();
console.log(model.accuracy());
console.log(model.predict([3,60,133,0]));