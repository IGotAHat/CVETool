function FetchCVE() {// Fetch API to call the CVE files from the Server host
  var CVDate = document.getElementById('CVE-YR').value
  var CVID = document.getElementById('CVE-ID').value
  var CVEST = ""
  // this should be in a While loop during recursive search
  console.log('Before Fetch');// debug logs to make sure we are hitting parts of the program
  var file = CVDate + "-" + CVID
  // fetch('src/data/CVE-'+CVDate+'-'+CVID+'.json')
  fetch('https://raw.githubusercontent.com/IGotAHat/CVEDB/main/data/CVE-'+CVDate+'-'+CVID+'.json')
      .then(response => response.json())
      .then(data => {
        //let arr = JSON.parse(data);
        //console.log(arr);
        var CVEST = ""
        CVEST += "---- "+CVDate+"-"+CVID+" ---- \n";
        if (document.getElementById('CVEtoggle').checked === true){
          CVEST += JSON.stringify(data.cve, undefined, 10)// prints all of the CVE information if the CVE is ticked
        }
        else if(document.getElementById('CVEtoggle').checked === false){// prints only the sub categories of the CVE information if their box is ticked
          
          if (document.getElementById('CVE_DataType').checked === true){
          CVEST += JSON.stringify(data.cve.data_type, undefined, 10)
          }

          if (document.getElementById('CVE_DataFormat').checked === true){
          CVEST += JSON.stringify(data.cve.data_format, undefined, 10)
          }

          if (document.getElementById('CVE_DataVersion').checked === true){
          CVEST += JSON.stringify(data.cve.data_version, undefined, 10)
          }

          if (document.getElementById('CVE_DataMeta').checked === true){// prints all of the CVE Meta Data if the box is ticked
          CVEST += JSON.stringify(data.cve.CVE_data_meta, undefined, 10)
          }
        }else if (document.getElementById('CVE_DataMeta').checked === false)// prints only the ticked sub categories of CVE Meta Data if the box is not ticked
        {
          if (document.getElementById('CVE_DataMeta_ID').checked === true){
          CVEST += JSON.stringify(data.cve.CVE_data_meta.ID, undefined, 10)
          }
          if (document.getElementById('CVE_DataMeta_Assigner').checked=== true){
          CVEST += JSON.stringify(data.cve.CVE_data_meta.ASSIGNER, undefined, 10)
         }
        }
        if (document.getElementById('CVSStoggle').checked){
          CVEST += JSON.stringify(data.impact, undefined, 10)
        }
        if (document.getElementById('CPEtoggle').checked){
          CVEST += JSON.stringify(data.configurations, undefined, 10)
        }
        
        //CVEST = CVEST.replace(/ |[|]|{|}|#/g, "");
        CVEST = CVEST.replace(/  |"|{|}|[\|]|#/g, "");
        CVEST = CVEST.replace(/^[\s\t]*(\r\n|\n|\r|,\n|,\r|]\n)/gm, "")
        document.getElementById('container').innerHTML += CVEST;
        console.log('After Update');// debug logs to make sure we are hitting parts of the program
        //CVEST = JSON.stringify(data, undefined, 10);
        
        //let table = document.getElementById("CVEtable");
        //arr.forEach(item => {
          //let row = table.insertRow();
          //for (const [key, value] of Object.entries(item)) {
            //let cell = row.insertCell();
            //cell.innerHTML = value;
          //}
        //});  

      });
      console.log('After Fetch');// debug logs to make sure we are hitting parts of the program
}
function ClearContainer(){// Clears page of information
  document.getElementById('container').innerHTML = "";
}
function SaveToFile(){// save function results in incomplete output, not sure why, fix later
  console.log('Save Called');
  var a = document.body.appendChild(
    document.createElement("a")
    );
  a.download = 'CVE Export';
  a.href = "data:text/plain," + document.getElementById("container").innerHTML;
  console.log(document.getElementById("container").innerHTML); // Grab the HTML
  a.click(); // Trigger a click on the element
};     
function checktick(){

  if (Object.id == 'CVEtoggle') {
    document.getElementById("CVE_DataType").value = false;
    document.getElementById("CVE_DataFormat").value = false;
    document.getElementById("CVE_DataVersion").value = false;
    document.getElementById("CVE_DataMetae").value = false;
    document.getElementById("CVE_DataMeta_ID").value = false;
    document.getElementById("CVE_DataMeta_Assigner").value = false;
  }
}