import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import Addtodo from "./components/Addtodo";
import GetTodo from "./components/GetTodo";
import Title from "./components/Title";
import { db } from "./Firebase";

function App() {

  let [isUpdating, setisUpdating] = useState(false);
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'todo', id));
  }

  const handleUpdate = async (title, id) => {
    if(title === '' || title) {
      alert("Title must have a value");
    } else {
      console.log(title === '');
      await updateDoc(doc(db, 'todo', id), {
        title
      });
    }

  }

  return (
    <div className="App">
      <Title />
      <Addtodo />
      <GetTodo
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        isUpdating
      />
    </div>
  );
}

export default App;
