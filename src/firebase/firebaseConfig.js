

// eslint-disable-next-line import/no-mutable-exports
let firebaseConfig;
if (process.env.NODE_ENV === 'development') {
  firebaseConfig = {
    apiKey: 'AIzaSyD_rjUOBKsj8fXOG5w6r2N4E9WlvS5R9C4',
    authDomain: 'mern-store-7288b.firebaseapp.com',
    projectId: 'mern-store-7288b',
    storageBucket: 'mern-store-7288b.appspot.com',
    messagingSenderId: '330583288551',
    appId: '1:330583288551:web:682a469be1d508293a1042',
    measurementId: 'G-S9DMQX88EH'
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyCeNgxHgIXAo_ruNc8SDPs5eLG3HQBBBU4",
    authDomain: "smartupdeal.firebaseapp.com",
    projectId: "smartupdeal",
    storageBucket: "smartupdeal.appspot.com",
    messagingSenderId: "148451614695",
    appId: "1:148451614695:web:aa570f2d7a359d95aba742",
    measurementId: "G-91GC0EJFCN"
  };
}

export default firebaseConfig;
