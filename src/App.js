import { List, ThemeProvider, createTheme } from '@mui/material';
import { collection, query, onSnapshot, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import Addtodo from "./components/Addtodo";
import GetTodo from "./components/GetTodo";
import Title from "./components/Title";
import { db } from "./Firebase";

function App() {
  let [docs, setDocs] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState('');

  useEffect(() => {
    console.log(loading)
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

  return (
    <>
      {loading ? 'Loading...' : <div>
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
  )
}

export default App;
