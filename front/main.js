const checkText = () => {
    const element = document.getElementById('save');
    const text = document.getElementById('textarea').value;
    element.disabled = !text;
  };
  
  const setTodaysDate = () => {
    const dateControl = document.getElementById('datepicker');    
    const MyDate = new Date();
    MyDate.setDate(MyDate.getDate());
    const MyDateString = MyDate.toISOString().split('T')[0];
    dateControl.value = MyDateString;
    const text = MyDateString;
    const h1 = document.createElement('h1');
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = weekday[MyDate.getDay()];
    h1.textContent = `${dayOfWeek} ${text}`;
    document.body.prepend(h1);
  };
  
  const sendRequest = (method, url, data, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = () => {
      if (xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.send(JSON.stringify(data));
  };
  
  const postMethod = (content, date) => {    
    const url = `/entry`;
    const body = { 'name': content, 'Created_date': date };
  
    sendRequest('POST', url, body, () => {
      // Handle the response if needed
    });
  };
  
  const getMethod = () => {    
    document.getElementById('textarea').value = '';
    const needle = document.getElementById('datepicker').value;
    const url = `/entry?date=${encodeURIComponent(needle)}`;
  
    sendRequest('GET', url, null, (text) => {
      const d = new Date(needle).toISOString();
      const element = text.find((element) => element['Created_date'] === d);
      if (element) {
        console.log(element);
        document.getElementById('textarea').value = element.reverse()[0].name;
      }
    });
  };
  
  const saveContent = () => {
    const date = document.getElementById('datepicker').value;
    const content = document.getElementById('textarea').value;
    const element = document.getElementById('save');
    if (content && !element.disabled) {
      postMethod(content, date);
    } else {
      console.log(content);
      console.log(date);
      console.log(element.disabled);
    }
  };

  const initializePage = () => {
    setTodaysDate();
    getMethod();
  }
  