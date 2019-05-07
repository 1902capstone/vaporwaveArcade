import Firebase from 'firebase';  
let config = {  
  apiKey: 'AIzaSyAbSDbIh2IZArDTwg7XMY0kYI4oHVtup0c',
  authDomain: 'https://arcapstone-9c6dd.firebaseio.com',
  databaseURL: 'https://arcapstone-9c6dd.firebaseio.com',
  projectId: 'arcapstone-9c6dd',
  storageBucket: 'arcapstone-9c6dd.appspot.com',
  messagingSenderId: '1094921680547'
};
let app = Firebase.initializeApp(config);  
export const db = app.database();  