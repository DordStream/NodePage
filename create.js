let _url ="https://nodedemoapp.onrender.com/";
function getRequest(url,callback){
    fetch(_url + url,{method:"GET"}).then((response)=> {
        response.json().then((json)=>{
        callback(json);
        });
    
    
        }).catch((error)=> alert(error));
}

function showStudent(){
    let url ="showstudents";
    getRequest(url,(json)=>{ addTableData(json.data)});
    
}
function displayFromServer(id,formElement){
    let url ="find/"+ id;
    getRequest(url,(json)=>{ fillFormInputWithData(formElement,json.data);});
    
}
function deleteFromServer(event){
    var element = event.target;
    let id = element.getAttribute("data-id");
    let url ="delete/"+ id;
  let reply =  prompt("Are you sure to delete the profile (yes | no)");
 
  if(reply == "yes"){
    getRequest(url,(json)=>{
       
        alert(json.message);
        window.location.href ="https://dordstream.github.io/NodePage/studentlist.html";
    });
  }

    event.preventDefault();
}
function addTableData(arrayObject){
    var table = document.getElementById("tableBody");
    var child = table.children[0];
    table.innerHTML ="";
    let temporary ="";
    for(let i=0; i< arrayObject.length; i++){
       
        setTableValue(child.children, arrayObject[i],i);
        temporary += child.outerHTML;
        
    }
 table.innerHTML = temporary;
}

function setTableValue(children,obj,index){
    for(let i=0; i< children.length; i++){
        var row = children[i];
       var property = row.getAttribute("id");
  
       var data = obj[property];
       if(data != undefined)
       {
       
       
       if(property =="_id" ){
        let href = "https://dordstream.github.io/NodePage/update.html?id=";
       row.setAttribute("data-id", data.toString());
     
       if(row.tagName == "A")
       {
        row.setAttribute("href", href + data.toString());
       }
        
       }
       else{
        row.innerHTML = data;
       }

     
    }
    else{
     
        if(property === "sN"){
         row.innerHTML = index+ 1;
        }
    }
    if(row.hasChildNodes()){
         setTableValue(row.children,obj,index);
        }
    }
  
}

function addUpdateId(){
    let url = window.location.href;
   let id = url.split("?id=");
   if(id.length == 1){ alert("Invalid url. id query string does not exist"); return;}
   let idValue = id[1];
 document.getElementById("_id").value = idValue;
 let formElement = document.getElementById("updateForm");
 displayFromServer(idValue,formElement);
}