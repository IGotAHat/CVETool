var results = 0
function FetchCVE() {// Fetch API to call the CVE files from the Server host
  results = 0
  var CV1 = parseInt(document.getElementById('CVE-YR-1').value);
  var CV2 = parseInt(document.getElementById('CVE-YR-2').value);
  // this should be in a While loop during recursive search
  console.log('Before Fetch');// debug logs to make sure we are hitting parts of the program
  var Total = 0
  var Count = 2000
  for (i = CV1; i <= CV2; i++)
  {
    if (CV1 >= 2015){
      Count = 20000;
    }
    for(z = 0; z < Count; z++)
    {
      x = z.toString().padStart(4, '0');
      console.log(x);
      Fetch(i, x, document.getElementById("Search_Check").value)

      Total ++
    }
    
  }
  if (document.getElementById("Search_Check").value == ""){
    //document.getElementById('container').innerHTML = "No Value was Entered into Search Field. Please Clear and try again.";
  }
  document.getElementById('container').innerHTML += "Searched a total of over "+Total+" files.\n";
}
function ClearContainer(){// Clears page of information
  document.getElementById('container').innerHTML = "";
}
function SaveToFile(){// save function results in incomplete output, not sure why, fix later
  console.log('Save Called');
  var a = document.body.appendChild(
    document.createElement("a")
    );
  a.download = 'CVE Type Export';
  a.href = "data:text/plain," + document.getElementById("container").innerHTML;
  console.log(document.getElementById("container").innerHTML); // Grab the HTML
  a.click(); // Trigger a click on the element
};     
function Fetch(CVE, ID, search){
  fetch('https://raw.githubusercontent.com/IGotAHat/CVEDB/main/data/CVE-'+CVE+'-'+ID+'.json')
      .then(response => response.json())
      .then(data => {
         //let arr = JSON.parse(data);
        //console.log(arr);
        var CVEST = "";
        switch (document.getElementById('CVE_Select').value) {
          case "CVSS_V3_Exploit":
            if (parseInt(JSON.stringify(data.impact.baseMetricV3.exploitabilityScore)) >= search){
              CVEST += "---- "+CVE+"-"+ID+" ---- \n";
              CVEST += 'V3 Exploitability score: ' +JSON.stringify(data.impact.baseMetricV3.exploitabilityScore, undefined, 10) + "\n\n"
            }
            break;

          case "CVSS_V3_Impact":
            if (parseInt(JSON.stringify(data.impact.baseMetricV3.impactScore)) >= search){
              CVEST += "---- "+CVE+"-"+ID+" ---- \n";
             CVEST += 'V3 Impact score: ' +JSON.stringify(data.impact.baseMetricV3.impactScore, undefined, 10) + "\n\n"
            }
            break;
          
          case "CVSS_V3_Base_Score":
            if (parseInt(JSON.stringify(data.impact.baseMetricV3.cvssV3.baseScore)) >= search){
              CVEST += "---- "+CVE+"-"+ID+" ---- \n";
              CVEST += 'V3 Base score: ' +JSON.stringify(data.impact.baseMetricV3.cvssV3.baseScore, undefined, 10) + "\n\n"
            }
            break;
            
          case "CVSS_V3_Attack":
            //if (JSON.stringify(data.impact.baseMetricV3.cvssV3.attackVector) =='\"'+search.toString+'\"'){
              CVEST += "---- "+CVE+"-"+ID+" ---- \n";
              CVEST += 'V3 Attack Vector: ' +JSON.stringify(data.impact.baseMetricV3.cvssV3.attackVector, undefined, 10) + "\n\n"
            //}
            break;

          case "CVSS_V3_Severity":
            if (JSON.stringify(data.impact.baseMetricV3.cvssV3.baseSeverity) == '\"'+search.toString+'\"'){
              CVEST += "---- "+CVE+"-"+ID+" ---- \n";
              CVEST += 'V3 Severity Score: ' +JSON.stringify(data.impact.baseMetricV3.cvssV3.baseSeverity, undefined, 10) + "\n\n"
            }
            break;
          
          case "CVSS_V2_Exploit":
            if (parseInt(JSON.stringify(data.impact.baseMetricV2.exploitabilityScore)) >= search){
              CVEST += "---- "+CVE+"-"+ID+" ---- \n";
              CVEST += 'V3 Exploitability score: ' +JSON.stringify(data.impact.baseMetricV2.exploitabilityScore, undefined, 10) + "\n\n"
            }
            break;

          case "CVSS_V2_Impact":
            if (parseInt(JSON.stringify(data.impact.baseMetricV2.impactScore)) >= search){
              CVEST += "---- "+CVE+"-"+ID+" ---- \n";
              CVEST += 'V2 Impact score: ' + JSON.stringify(data.impact.baseMetricV2.impactScore, undefined, 10) + "\n\n"
            }
            break;
          
          case "CVSS_V2_Base_Score":
            if (parseInt(data.impact.baseMetricV2.cvssV2.baseScore) >= search){
              CVEST += "---- "+CVE+"-"+ID+" ---- \n";
              CVEST += 'V2 Base score: ' + JSON.stringify(data.impact.baseMetricV2.cvssV2.baseScore, undefined, 10) + "\n\n"
            }
            break;

          case "CVSS_V2_Access":
            if (JSON.stringify(data.impact.baseMetricV2.cvssV2.accessVector =='\"'+search.toString+'\"')){
              CVEST += "---- "+CVE+"-"+ID+" ---- \n";
              CVEST += 'V2 Access Vector: ' + JSON.stringify(data.impact.baseMetricV2.cvssV2.accessVector, undefined, 10) + "\n\n"
            }
            break;

          case "CVSS_V2_Severity":
            if (JSON.stringify(data.impact.baseMetricV2.severity) == '\"'+search.toString+'\"'){
              CVEST += "---- "+CVE+"-"+ID+" ---- \n";
              CVEST += 'V2 Severity Score: ' + JSON.stringify(data.impact.baseMetricV2.severity, undefined, 10) + "\n\n"
            }
            break;

          default:
            break;
        }
        console.log('After Update');// debug logs to make sure we are hitting parts of the program
        Save = CVEST;
        Save = Save.replace(/  |{|}|[\|]|#/g, "");
        Save = Save.replace(/^[\s\t]*(\r\n|\n|\r|,\n|,\r|]\n)/gm, "")
        document.getElementById('save container').innerHTML += Save;
        results++;
        document.getElementById('container').innerHTML += CVEST;
      });
  console.log('After Fetch');// debug logs to make sure we are hitting parts of the program
}