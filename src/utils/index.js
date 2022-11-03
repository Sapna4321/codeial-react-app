export * from './constants';

export const getFormBody = (params) =>{
    let formBody = [];

    for(let property in params){
         let encodedKey = encodeURIComponent(property);
         let encodedValue = encodeURIComponent(params[property]);

         formBody.push(encodedKey+ " = " + encodedValue);
         
    }

    return formBody.join('&');
}

// set value to local storage will be set when user will login
export const setItemInLocalStorage = (key, value) => {

    if(!key || !value){
        console.error("cannot store value in local stoarge :(");
    }

    const valueToStore = typeof value != "string" ? JSON.stringify(value):value;

    localStorage.setItem(valueToStore);
}

export const getItemFromLocalStorage = (key) => {

    if(!key){
        console.error("cannot get the value from local stoarge :(");
    }

    localStorage.getItem(key);
}

export const removeItemFromLocalStorage = (key) => {

    if(!key){
        console.error("cannot remove value as passed item is not present in local stoarge :(");
    }

    localStorage.removeItem(key);
}



