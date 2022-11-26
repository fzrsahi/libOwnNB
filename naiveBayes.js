import {probability,readCsv,splitData,unique} from "./utils.js";

class NaiveBayes{
    // x_train,y_train,x_test,y_test
    constructor(fileName,split){
        let dataset = readCsv(fileName);
        const n = Math.round(dataset.length * split);
        dataset = dataset.sort(() => Math.random()> 0.5)
        const train = splitData(dataset.slice(0,n));
        const test = splitData(dataset.slice(n));
        this.train = {
            x:train.attributes,
            y:train.labels
        }
        this.test = {
            x:test.attributes,
            y:test.labels
        }

        this.jumlahBenar = 0;
    }

    trainModel() {
        this.labels = unique(this.train.y)
        this.dataLength = this.train.y.length;
        this.labelsProba = probability(this.train.y);
        this.attributesProba = [];
        const splitNb = this.splitNB;
        for(let i = 0; i < splitNb.length; i++) {
            const tmp = [];
            for(let k = 0; k < splitNb[i][0].length; k++) {
                const tmp2 = [];
                for(let j = 0; j < splitNb[i].length; j++) {
                    tmp2.push(splitNb[i][j][k])
                }
                tmp.push(probability(tmp2))
            }
            this.attributesProba.push(tmp)
        }
    }

    testModel(){
        // const n = this.test.y.length;
        let index = 0;
        for (const test of this.test.x) {
            if(this.predict(test) === this.test.y[index]){
                this.jumlahBenar++
            }
            index++
        }
    }

    predict(x){
        const attProba = this.attributesProba;
        let xProba = [];
        for (let i = 0; i< attProba.length; i++){
            const tmp = [];
            for(let j = 0; j< x.length; j++){
                tmp.push(attProba[i][j][x[j]] || 0);
                // console.log({att:attProba[i][j],x:x[j]});
            }
            xProba.push(tmp)
        }
        xProba = xProba.map(m => m.reduce((a,b)=> a*b))
        const max = Math.max(...xProba);
        return xProba.findIndex(p => p===max);
    }
    accuracy(){
        return this.jumlahBenar/this.test.y.length;
    }
    get splitNB() {
        return this.labels.map(label =>{
            return this.train.x.filter((f,i) => this.train.y[i] === label)
        })
    }
}

export default NaiveBayes;