//Author:  Taiwo Adebayo
//Any Modification is accepted

"use strict"

var runtimeBinder = {
    defaultAttribute: "id",
    assignIfExist: function (element, attribute,result,obj) {
        let isExist = element.hasAttribute(attribute);

        let existingValue = element.getAttribute("href");

        let newConstructedHref = existingValue + result.toString();
        if (isExist) {
            let appendUrl = element.getAttribute("append-url");
          newConstructedHref +="/"+ obj[appendUrl];
        }
        let buttonType = element.hasAttribute("button");
       // if (buttonType) element.innerHTML = result;

        element.setAttribute("href", newConstructedHref);
    },
    setBind: function (element, attribute, obj) {
        var attributeValue = (attribute === undefined || attribute == null || attribute == "") ? element.getAttribute(this.defaultAttribute) : element.getAttribute(attribute);
     
        if (attributeValue != null || attributeValue != undefined) {
         
            var result = obj[attributeValue];
            if(attributeValue == "_id") result = result.toString();
            if (result !== undefined || result != null) {
                if (element.nodeName === "INPUT") {
                    element.setAttribute("value", result);
                }
                else if (element.nodeName === "IMG" || element.nodeName === "AUDIO" || element.nodeName == "VIDEO") {
                    element.setAttribute("src", result);
                }
                else if (element.nodeName === "A") {
                    
                    this.assignIfExist(element, "append-url", obj);
                    

                }
                else {
                    element.innerHTML = result;

                }

             
            }
        
        }
        if (element.hasChildNodes()) {
            for (let i = 0; i < element.children.length; i++) {
                let child = element.children[i];
                this.setBind(child, attribute, obj);
            }
        }
        return element;
       
    },
        //getBindElement Bind the html element with the giving object.
    //The parentId is the parent Id containing the element to bind
    // The  object is the object to bind with the element
    // return new element
    getBindElement: function (parentId, attribute, object) {
        if ((parentId === undefined || parentId == null) || (object === undefined || object == null)) {
            throw new Error("the parentId and the object can not be null or undefined");
        }
        var parent = document.getElementById(parentId);
        if (parent != null) {
            var element = parent.cloneNode(true);
        
            if (element.hasChildNodes()) {
                let child = element.children[0];
         
                this.setBind(child, attribute, object);
                return child;
            }
           
            return element;
        }
        else {
            throw new Error("the parent id can not be found in the document");
        }

    },
    //bindElement Bind the html element with the giving object.
    //The parentId is the parent Id containing the element to bind
    // The  object is the object to bind with the element
    // no return
    bindElement: function (parentId, attribute, object) {
        if ((parentId === undefined || parentId === null) || (object === undefined || object === null)) {
            throw new Error("the parentId and the object can not be null or undefined");
        }

        var element = document.getElementById(parentId);
       
        if (element != null) {
            for (let i = 0; i < element.children.length; i++) {
                let child = element.children[i];
                this.setBind(child, attribute, object);
            }
        }
        else {
            throw new Error("the parent id can not be found in the document");
        }
    },
       //getBindElements Bind the html element with the giving list of object.
    //The parentId is the parent Id containing the element to bind
    // The  arrayObject is the list of the object to bind with the element
    // no return
    getBindElements: function (parentId, attribute, arrayObject) {

            if (!Array.isArray(arrayObject)) {
                throw new Error("The arrayObject must be an array. i.e list of the object")
            }

            if (parentId === undefined || parentId == null) {
                throw new Error("The parentId can not be null or undefined");
            }
            var parent = document.getElementById(parentId);

            if (parent != null) {
                var clonedElement = firstChild.cloneNode(true);

                var newElement = document.createElement("DIV");
                if (arrayObject.length > 0) {
                    for (let i = 0; i < arrayObject.length; i++) {
                        var element = this.getBindElement(parentId, attribute, arrayObject[i]);
                        newElement.appendChild(element);
                    }
                    clonedElement.innerHTML = newElement.innerHTML;
                    return clonedElement;
                }

            }
            else {
                throw new Error("the parent id can not be found in the document");
            }
        
    },
     //bindElements Bind the html element with the giving list of object.
    //The parentId is the parent Id containing the element to bind
    // The  arrayObject is the list of the object to bind with the element
    // no return
    bindElements: function (parentId, attribute, arrayObject) {
      
            if (!Array.isArray(arrayObject)) {
                throw new Error("The arrayObject must be an array. i.e list of the object")
            }

            if (parentId === undefined || parentId == null) {
                throw new Error("The parentId can not be null or undefined");
            }
            var parent = document.getElementById(parentId);
            if (parent != null) {
                var newElement = document.createElement("DIV");
                if (arrayObject.length > 0) {
                    for (let i = 0; i < arrayObject.length; i++) {
                        var element = this.getBindElement(parentId, attribute, arrayObject[i]);
                        newElement.appendChild(element);
                    }
                    parent.innerHTML = newElement.innerHTML;
                }
                else {
                    parent.innerHTML = "";

                }
            }
            else {
                throw new Error("the parent id can not be found in the document");
            }
        
    }

  

}

