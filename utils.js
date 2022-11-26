import fs from "fs";

function readCsv(fileName){
    let data = fs.readFileSync(fileName, 'utf-8');
    data = data.split("\r\n");
    const header = data.shift().split(',');
    data = data.map(d =>{
        const obj = {};
        d = d.split(',') 
        header.forEach((h,i) => {
            obj[h] = +d[i];
        })
        return obj;
    })
    return data;
}

function splitData(obj){
    const n = Object.values(obj[0]).length;
    const labels = obj.map(o => Object.values(o).pop()); 
    // console.log({labels,obj});
    const attributes = obj.map(o => Object.values(o).slice(0,n-1)) 
    return {labels,attributes}

}

function unique(y){
    return [...new Set(y)];
}



function probability(arr){
    const unik = unique(arr)
    const unikMap = unik.map(u => arr.filter(a => a===u).length/arr.length);
    const result = {};
    unik.forEach((u,i)=>{
        result[u] = unikMap[i];
    })
    return result;
}


// console.log(probability([60,70,70,50,30,70,80,90,60,70]));

export {readCsv,splitData,unique,probability}