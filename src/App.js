import { collection, query, onSnapshot, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore'
import { useState, useEffect } from "react";
import Addtodo from "./components/Addtodo";
import GetTodo from "./components/GetTodo";
import Title from "./components/Title";
import { db } from "./Firebase";

function App() {
  let [docs, setDocs] = useState([]);
  let [error, setError] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(query(collection(db, "todo")), (doc) => {
      let tempArr = [];
      doc.forEach(e => {
        tempArr.push({ info: e.data(), id: e.id });
        console.log(tempArr);
      });
      setDocs(tempArr);
      return () => unsub();
    }, []);
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
        alert("Title must have a value");
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


  const toggleChange = async (isChecked, id) => {
    try {

      await updateDoc(doc(db, 'todo', id), {
        completed: isChecked
      })
    }
    catch (e) {
        console.log(e);
        setError(e)
      }
    }

  return (
      <div className="App">
        {error !== '' && <p> {error} </p>}
        <Title title='alpha-Todo' />
        <Addtodo handlesubmit={handlesubmit} />
        {docs.map(todo => <GetTodo
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          toggleChange={toggleChange}
          todo={todo}
        />
        )
        }
      </div>
    );
  }

  export default App;
