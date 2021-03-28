export default function postRequest(url, data, callback){
    var req = new XMLHttpRequest();
    var result = null;
    var formData = new FormData();

    for (const prop in data){
        formData.append(prop,data[prop]);
    }

    req.open("POST", url);
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