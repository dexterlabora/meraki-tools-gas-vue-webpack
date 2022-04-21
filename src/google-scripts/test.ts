/**
 * Hello !
 *
 * @param {name} URL API path .
 * @return response string
 * @customfunction
 */
 function helloArray() {
    const arr = [["CATEGORY","PERSON"],["A","Will"],["B","Bill"]]
    return arr
}





async function testFetch() {
  const url = "https://home-lab.internetoflego.com/meraki/test"
  
  try{
      res = await fetch(url)
      let data = JSON.parse(res.body)
      Logger.log('data.title %s', data.title);
      return data
  }catch(e){
    Logger.log(e)
    return e
  }

}

/**
 * Test pulling API data and convert it to sheet
 * @param url url to pull json data from
 * @return Google Sheet data
 * @customfunction
 */
async function testParseJsonToCsv(url){
//   {
//   "userId": 1,
//   "id": 1,
//   "title": "delectus aut autem",
//   "completed": false
// }
  const res = await fetch(url)
  let result = []
  try{
    result = JSON.parse(res.body)
  }catch(e){
    result = res.body
  }
  

  // build results array
  let data = []
  let keys = []
  let results = []
  // find keys
  if(Array.isArray(result)){
    results = [...[],...result]
    }else{results.push(result)}  

  results.forEach(function(obj){ 
    var flat = flattenObject(obj);
    data.push(flat);
    // set keys
    Object.keys(flat).forEach(function(value){
      if (keys.indexOf(value)==-1) keys.push(value);
    });
  });


  const csvData = await parseJsonToCsv(data,keys)
  Logger.log(`csvData results: %s`, csvData)
  //return writeCsvData(results.toString())
  //const arr = csvToArray(csvData.toString())
  const arr = await Utilities.parseCsv(csvData);
  
  Logger.log(` csvToArray arr : %s`, arr)
  return arr
}

async function testFlatten(){
  let data = await testFetch()
  let arr = []
  for (d of data){
    let flat = flattenObject(d)
  Logger.log("flat %s",JSON.stringify(flat))

  //arr.push(objectToArray(flat))
  arr = [...arr, ...objectToArray(flat)]
  Logger.log("arr %s",JSON.stringify(arr))
  }

  
  return arr
}

function objectToArray(obj){
  Logger.log("objectToArray obj %s",obj)
  const keys = Object.keys(obj)
  Logger.log("objectToArray keys %s",keys)
  let array = []
  for (let k of keys) {
    
    let value = obj[k]
    Logger.log("objectToArray keys %s %s",k,value)
    array.push([k,value])
  }
  Logger.log("objectToArray array %s",array)
  return array
}




