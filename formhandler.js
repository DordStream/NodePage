var formObj ={};
function clearInputs (formElement) {
    try {

        for (let i = 0; i < formElement.children.length; i++) {

            let children = formElement.children[i];

            if (children.tagName == "INPUT") {
                if (children.type != "submit") {

                    formElement.children[i].value = "";
                }
            }

            if (children.children.length > 0) {
                this.clearInputs(children);
            }
        }

    }
    catch (error) {
        alert(error);
    }
}
  function  formInputsToObject (formElement) {
    try {
 
    
        for (let i = 0; i < formElement.children.length; i++) {

            let children = formElement.children[i];

            if (children.tagName == "INPUT") {
               
                if (children.type != "submit") {
                   let name = formElement.children[i].name.toString();
                   let value = formElement.children[i].value;
                   formObj[name] = value;

                  
                
                }
            }

            if (children.children.length > 0) {
              this.formInputsToObject(children);
            }
        }
    }
    catch (error) {
        alert(error);
    }
    
    return formObj;

}
function fillFormInputWithData(formElement, data){
    try {
 
    
        for (let i = 0; i < formElement.children.length; i++) {

            let children = formElement.children[i];

            if (children.tagName == "INPUT") {
               
                if (children.type != "submit") {
                   let name = formElement.children[i].name.toString();
                  

                  let value = data[name];
                
                   formElement.children[i].value = value;
        
                  
                
                }
            }

            if (children.children.length > 0) {
              this.fillFormInputWithData(children,data);
            }
        }
    }
    catch (error) {
        alert(error);
    }
}
let errorElement = document.createElement("p");
let _clickOnce = true;
 function sendRequest (formElement, isInputsCleared) {
    try {
        if (_clickOnce) {
            _clickOnce = false;
            const jsonBody =JSON.stringify(this.formInputsToObject(formElement));
        
         
            var xmlRequest = new XMLHttpRequest();
          
            xmlRequest.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var handler = JSON.parse(this.responseText);
               
                    addErrorDocument(formElement, handler.message,handler.status);
                  if(isInputsCleared){
                   clearInputs(formElement);
                  }
                    loader.hide();
                    _clickOnce = true;

                }

            }
            xmlRequest.onerror = function (error) {
                alert(JSON.stringify(error));
                loader.hide();
                _clickOnce = true;
            }
            loader.show(formElement);
          
        xmlRequest.open(formElement.method, formElement.action);
         xmlRequest.setRequestHeader("Content-Type","application/json");
            
            xmlRequest.send(jsonBody);
        
        }
    }
        catch (error) {
            alert(error);

        loader.hide();
        _clickOnce = true;
        }
    

}
function addErrorDocument(htmlElement,errorText,status) {

    errorElement.innerText = errorText;
    errorElement.style.color = status == false ? "Red" : "Green";
    errorElement.style.marginLeft = 0;
    errorElement.style.textAlign = "left";
    var firstChild = htmlElement.children[0];
    firstChild.insertAdjacentElement("beforeEnd", errorElement);
    return error;

}
function clearAllInputs(formElement) {
    try {

        for (let i = 0; i < formElement.children.length; i++) {

            let children = formElement.children[i];

            if (children.tagName == "INPUT") {
                if (children.type != "submit") {

                    formElement.children[i].value = "";
                }
            }

            if (children.children.length > 0) {
                clearAllInputs(children);
            }
        }

    }
    catch (error) {
        alert(error);
    }
}
