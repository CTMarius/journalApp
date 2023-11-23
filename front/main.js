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
    } else {
      console.error(`Request failed with status ${xhr.status}`);
    }
  };
  xhr.onerror = () => {
    console.error('Network error occurred');
  };
  xhr.send(JSON.stringify(data));
};

const postMethod = (content, date) => {
  const url = `/entry`;
  const body = {
    'name': content,
    'Created_date': date
  };

  sendRequest('POST', url, body, () => {
    // Handle the response if needed
  });
};

const getMethod = () => {  
  const needle = document.getElementById('datepicker').value;
  const url = `/entry`;

  sendRequest('GET', url, null, (response) => {
    // Filter entries for the selected date    
    const entriesForDate = response.filter(entry => {
      if (entry.Created_date && entry.Created_date.startsWith(needle)) {
        return true;
      }
      return false;
    });

    if (entriesForDate.length > 0) {
      // Sort the entries in descending order by creation date and pick the first one
      const lastEntry = entriesForDate.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
      })[entriesForDate.length - 1];

      document.getElementById('textarea').value = lastEntry.name; // Assuming 'name' is the field you want to display
    } else {
      // Handle the case when no entry is found for the selected date
      document.getElementById('textarea').value = '';
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
};

const authenticateUser = () => {
  const username = window.prompt('Enter your username:');
  const password = window.prompt('Enter your password:');

  // Perform the authentication logic
  sendAuthenticationRequest(username, password);
};

const sendAuthenticationRequest = (username, password) => {
  const url = '/authenticate'; // Change this to your authentication endpoint
  const data = { username, password };

  sendRequest('POST', url, data, (response) => {
    if (response.authenticated) {
      // Authentication successful, proceed with other logic
      console.log('Authentication successful!');
      initializePage(); // Call your initialization logic here
    } else {
      // Authentication failed, handle accordingly
      console.log('Authentication failed!');
    }
  });
};

// Trigger authentication when the page loads
authenticateUser();
