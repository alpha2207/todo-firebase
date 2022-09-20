import { List, ThemeProvider, createTheme, Button } from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, onSnapshot, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore'
import React, { useState, useEffect } from "react";
import Addtodo from "./components/Addtodo";
import GetTodo from "./components/GetTodo";
import Login from './components/Login';
import Register from './components/Register';
import Title from "./components/Title";
import { db } from "./Firebase";

function App() {
  let [docs, setDocs] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState('');
  let [isLoggedIn, setLoggedIn] = useState();

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "todo")), (doc) => {
      let tempArr = [];
      doc.forEach(e => {
        tempArr.push({ info: e.data(), id: e.id });
      });
      setDocs(tempArr);
      setLoading(false);
      return () => unsub();
    });
  }, [])

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setLoggedIn(true);
    } else {
      // User is signed out
      console.log(user);

      setLoggedIn(false);
    }
  });


  const handlesubmit = async (title) => {
    try {
      if (title !== '') {
        await addDoc(collection(db, "todo"), {
          title,
          completed: false
        })
      } else {
        alert("Title is empty!")
      }
    }
    catch (e) {
      console.log(e);
      setError(e);
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'todo', id));
    }
    catch (e) {
      console.log(e);
      setError(e);
    }
  }

  const handleUpdate = async (title, id) => {
    try {
      if (title === '' || !title) {
        alert("Either title is empty or value isn't changed!");
      } else {
        await updateDoc(doc(db, 'todo', id), {
          title
        });
        alert("Updated Successfully" + title);
      }
    }
    catch (e) {
      console.log(e);
      setError(e)
    }

  }


  const toggleChange = async (todo) => {
    try {
      await updateDoc(doc(db, 'todo', todo.id), {
        completed: !todo.info.completed
      })
    }
    catch (e) {
      console.log(e);
      setError(e)
    }
  }


  const handleLogout = () => {
    signOut(auth).then(() => {
      alert("Sign-out successful.")
    }).catch((error) => {
      alert(error.message)
    });
  }
  return (
    <React.Fragment>
      {!isLoggedIn ? <>
        <Login />
        <Register />
        <Button variant='contained' onClick={handleLogout}>Logout</Button>
      </>
        :
        <>
          {loading ? 'Loading...' :
        <div>
          {error !== '' && <p> {error} </p>}
          <Title title='alpha-Todo' />
          <Addtodo handlesubmit={handlesubmit} />
          <List>
            {docs.map(todo => <GetTodo
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              toggleChange={toggleChange}
              todo={todo}
            />
            )
            }
          </List>
        </div>
      }
        </>
      }
    </React.Fragment>
  )
}

export default App;
