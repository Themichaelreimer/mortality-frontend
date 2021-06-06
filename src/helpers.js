export function postRequest(url, data, callback){
    let req = new XMLHttpRequest();
    let result = null;
    let formData = new FormData();
    let targetURL = getBackendURL() + url;

    for (const prop in data){
        formData.append(prop,data[prop]);
    }

    req.open("POST", targetURL);
    req.onload = function(){
      if(req.readyState === 4){
        if(req.status === 200 ){
          result = JSON.parse(req.responseText);
          callback(result);
        }
      }
    };
    req.onerror = function() {
      console.error(req.statusText);
    }
    req.send(formData);
}

function getBackendURL(){
  const hostname = window.location.host;
  const targetProdAnyway = true;
  if(hostname === 'medistat.online' || targetProdAnyway){
    return "https://api.medistat.online/";
  }
  return "http:127.0.0.1:8000/";
}