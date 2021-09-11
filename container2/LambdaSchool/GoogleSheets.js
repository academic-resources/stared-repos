function onEdit() {  
  // If you need it to do different find and replaces, let me know OR see "DIFFERENT FIND AND REPLACES" below.
  // CHANGE:  Add all spreadsheets you wish to change here.
  var arrSheets = ["GiantSheet_Us", "Giant Sheet"];  
  // CHANGE:  to change the columns you want to change, add each number of each column here. (A = column 0, B = column 1, etc)
  var arrColumn = [[4, 41, 49, 58], [4, 18]];
        
  var targetValues = [];
  
    for(y=0; y < arrColumn.length;y++){
      
      Logger.log("current sheet = " + arrSheets[y]);
      var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(arrSheets[y]);
      
      var currentSheetColumns = arrColumn[y];
      Logger.log("currentSheetColumns = " + currentSheetColumns);
      
      for(w=0; w < currentSheetColumns.length;w++){
        var z = currentSheetColumns[w];
        Logger.log("z = " + z);
  
        var lastSourceRow = sourceSheet.getLastRow();
        Logger.log("lastSourceRow = " + lastSourceRow);
        
        var lastSourceCol = sourceSheet.getLastColumn();
        Logger.log("lastSourceCol = " + lastSourceCol);
  
        
      /*
           row --- int --- top row of the range
           column --- int--- leftmost column of the range
           optNumRows --- int --- number of rows in the range.
           optNumColumns --- int --- number of columns in the range
      */    
        
        
        var sourceRange = sourceSheet.getRange(3, 1, lastSourceRow, lastSourceCol);
        // Logger.log("sourceRange = " + sourceRange);
        
        var sourceData = sourceRange.getValues();  
        // Logger.log("sourceData = " + sourceData);
        
        var possiblePeriodIndex = -2;  
        
        for (row in sourceData) { 
          if(row  >= -1){
          Logger.log("row = " + row);
          Logger.log("z = " + z);
          // Logger.log("value of row = " + row); 
          Logger.log("sourceData[row][z] = " +  sourceData[row][z]);
          values = sourceData[row][z];
          Logger.log("values = " + values);
          
          if (values !== "") {
            // DIFFERENT FIND AND REPLACES:  The portion you change begins @ next line.
            possiblePeriodIndex = values.toString().indexOf(".");
            Logger.log("possiblePeriodIndex = " + possiblePeriodIndex);
            if (possiblePeriodIndex == "2" || possiblePeriodIndex == "3") {
              possiblePeriodIndex = values.toString().indexOf(".");
              
              Logger.log("found period, replacing period");
              
              var decimal = possiblePeriodIndex + 1;
              Logger.log("decimal = " + decimal);
              
              var currentCellValue = sourceData[row][z];
              Logger.log("currentCellValue = " + currentCellValue);
              
              var arrCurrentCellValue = currentCellValue.split("");
              
              var toReplace = arrCurrentCellValue[possiblePeriodIndex] + arrCurrentCellValue[decimal] + "k";
              var replaceWith = "," + arrCurrentCellValue[decimal] + "00";
              Logger.log("toReplace = " + toReplace);
              Logger.log("replaceWith = " + replaceWith);
              
              var newCellValue = currentCellValue.toString().replace(toReplace, replaceWith);
              Logger.log("newCellValue = " + newCellValue);  
              
              var tempvalue = [newCellValue];
              targetValues.push(tempvalue);
              arrCurrentCellValue = [];
            }
            else { 
              
              Logger.log("No period, replacing k only");
              
              var currentCellValue = sourceData[row][z];
              Logger.log("currentCellValue = " + currentCellValue);
              var toReplace = "k";
              var replaceWith = ",000";
              Logger.log("toReplace = " + toReplace);
              Logger.log("replaceWith = " + replaceWith);
              
              var newCellValue = currentCellValue.toString().replace(toReplace, replaceWith);
              Logger.log("newCellValue = " + newCellValue);  
              
              var tempvalue = [newCellValue]
              targetValues.push(tempvalue);
              
            }
            // DIFFERENT FIND AND REPLACES:  The portion you change ends @ previous line.
          }
          }
        };
      // DIFFERENT FIND AND REPLACES:  Next line puts data into correct location from the find-and-replace.
      // Logger.log("targetValues = " + targetValues);        
  
  
      /*
           row --- int --- top row of the range
           column --- int--- leftmost column of the range
           optNumRows --- int --- number of rows in the range
           optNumColumns --- int --- number of columns in the range
      */
      if(targetValues.length > 0) {sourceSheet.getRange(3, z+1, targetValues.length, 1).setValues(targetValues);}
      targetValues = [];
      }
    }
}
  
  