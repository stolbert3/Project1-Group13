// Initialize Firebase

  var config = {
    apiKey: "AIzaSyBxq4l59TeNIU8ISsodXpdxmvnMZIWa3LU",
    authDomain: "project1-group13.firebaseapp.com",
    databaseURL: "https://project1-group13.firebaseio.com",
    projectId: "project1-group13",
    storageBucket: "project1-group13.appspot.com",
    messagingSenderId: "799198513092"
  };
  firebase.initializeApp(config);
 
 

  var uiConfig = {
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
     
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      
    ],
   
};
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

console.log("firebase test");

