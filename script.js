
var firebaseConfig = {
  apiKey: "AIzaSyBP5fSB_kiakv0r-WMo7BkP2Ik70c26tT0",
authDomain: "whattschat-f522c.firebaseapp.com",
databaseURL: "https://whattschat-f522c-default-rtdb.firebaseio.com",
projectId: "whattschat-f522c",
storageBucket: "whattschat-f522c.appspot.com",
messagingSenderId: "746097682908",
appId: "1:746097682908:web:51a0278320ad4af5774719",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database;
database = firebase.database();


var url_string = window.location.href; // www.test.com?filename=test
var url = new URL(url_string);
var myuserid = url.searchParams.get("userid");
var mysecretkey = url.searchParams.get("secretkey");
var passwordmatched = false;


/*now connect to database and link to user; fetch secret key for given userid
var MyValRef = database.ref("/cc/");
  MyValRef.on("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
var    cc=childSnapshot.key;
alert(cc);
    
    });
  });
*/

  async function getDataFromFirebase() {
    return new Promise(resolve => {
      firebase.database().ref('/cc/cc2').on('value', snapshot => {
        const data = snapshot.val();
        resolve(data);
      });
    });
  }
  var mydata = "";
  async function main(prompt) {
    const data1 = await getDataFromFirebase();
    
    mydata = data1;
    
    const img = document.createElement('img');
  img.src = 'https://i.pinimg.com/originals/53/e9/45/53e945c516cebdffd987b6c2df159db1.jpg';
  img.alt = 'AI';

  const profile = document.createElement('div');
  profile.className = 'profile';
  profile.appendChild(img);

  const messageContainer = document.createElement('div');
  messageContainer.className = 'message ai';
  messageContainer.textContent = "Typing ...";

  const chatBubble = document.createElement('div');
  chatBubble.className = 'chat';
  chatBubble.appendChild(profile);
  chatBubble.appendChild(messageContainer);
  
  chatContainer.appendChild(chatBubble);

  // Scroll to bottom of chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;
  const response =await fetch('https://api.openai.com/v1/chat/completions', {
    
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ mydata,
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": prompt}]
    }),
   
  });
  const data =await response.json();
  const message = data.choices[0].message.content;

  messageContainer.textContent = message;

  }
  



const form = document.querySelector('form');
const chatContainer = document.getElementById('chat_container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  main(e.target.prompt.value);

  // Clear the prompt input
  e.target.prompt.value = '';

  
});

