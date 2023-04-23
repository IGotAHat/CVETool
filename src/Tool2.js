async function DateCVE() 
{// Fetch API to call the CVE files from the Server host
  var CV1 = parseInt(document.getElementById('CVE-YR-1').value);
  var CV2 = parseInt(document.getElementById('CVE-YR-2').value);
  if (CV2 == '')
  {
    CV2 = CV1;
  }
  console.log(CV1);
  console.log(CV2);
  var x = ''
  var loop = true;
  var Count = 2000
  // this should be in a While loop during recursive search
  console.log('Before Fetch');// debug logs to make sure we are hitting parts of the program
  // fetch('src/data/CVE-'+CVDate+'-'+CVID+'.json')
  for (i = CV1; i <= CV2; i++)
  {
    for(z = 0; z < Count; z++)
    {
      x = z.toString().padStart(4, '0');
      console.log(x);
      CheckCVE(CV1, x)
    }
    if (CV1 >= 2018){
      Count = 20000;
    }
  }
}
function ClearContainer(){// Clears page of information
  document.getElementById('save container').innerHTML = "";
  document.getElementById('container').innerHTML = "";
  console.log('Cleared');
}
function SaveToFile(){// save function results in incomplete output, not sure why, fix later
  console.log('Save Called');
  var a = document.body.appendChild(
    document.createElement("a")
    );
  a.download = 'CVE-By-Date Export';
  a.href = "data:text/plain," + document.getElementById("save container").innerHTML;
  console.log(document.getElementById("save container").innerHTML); // Grab the HTML
  a.click(); // Trigger a click on the element
}
function CheckCVE(CVE, ID)
{
  fetch('https://raw.githubusercontent.com/IGotAHat/CVEDB/main/data/CVE-'+CVE+'-'+ID+'.json')
  .then(async (res) => {
    if (res.ok) {
      console.log('File Found');
      await FetchCVE(CVE, ID)
    } else {
      console.log('No File Found');
      skip = true;
    }
  });
};

async function FetchCVE(CVE, ID)
{
  await fetch('https://raw.githubusercontent.com/IGotAHat/CVEDB/main/data/CVE-'+CVE+'-'+ID+'.json')
      .then(response => response.json())
      .then(data => {
         //let arr = JSON.parse(data);
        //console.log(arr);
        var CVEST = ""
        document.getElementById('container').innerHTML += "---- "+CVE+"-"+ID+" ---- \n";
        CVEST += "---- "+CVE+"-"+ID+" ---- \n";
        CVEST += JSON.stringify(data, undefined, 10)// prints all of the CVE information if the CVE is ticked
        CVEST = CVEST.replace(/  |{|}|[\|]|#/g, "");
        CVEST = CVEST.replace(/^[\s\t]*(\r\n|\n|\r|,\n|,\r|]\n)/gm, "")
        document.getElementById('save container').innerHTML += CVEST;
        console.log('After Update');// debug logs to make sure we are hitting parts of the program
     }).catch(function(error){
      console.log('Fetch Error Caught');
      }
,)}
