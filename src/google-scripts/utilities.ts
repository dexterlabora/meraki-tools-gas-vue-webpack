// Helper functions

export function flattenObject(ob) {
    var toReturn = {};
     
     for (var i in ob) {
         if (!ob.hasOwnProperty(i)) continue;
         
         if ((typeof ob[i]) == 'object') {
             var flatObject = flattenObject(ob[i]);
             for (var x in flatObject) {
                 if (!flatObject.hasOwnProperty(x)) continue;
                 
                 toReturn[i + '.' + x] = flatObject[x];
             }
         } else {
             toReturn[i] = ob[i];
         }
     }
     return toReturn;
 };
 
export function parseJsonToCsv(json, keys){
   var values = [];
 
   // Parse JSON Object
   if(!Array.isArray(json)){
        
     // Get Values
     var v = [];    
     keys.forEach(
       function (k){
         v.push(json[k]);
       }
     );
     values.push(keys.toString())
     values.push("\n"+v)
     //Logger.log('Parse Object values %s',values);
     
   } else {
   
   // Parse JSON Array of Objects
     for (let i = 0; i < json.length; i++) { 
       
       var data = json[i];
       
       // Get Values
       var v = [];
       keys.forEach(
         function (k){
           v.push(data[k]);
         }
       );
       // Create a new line
       if(i > 0){
         values.push("\n"+v)
       }else{
         values.push(keys.toString())
         values.push("\n"+v);       
       }     
  //     Logger.log('Parse Array of Object values '+i + " : " +v);
     } 
   }
   return values;
 }
 