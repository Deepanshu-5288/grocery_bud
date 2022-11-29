import { useEffect, useState } from 'react';
import Alert from './Alert';
import './App.css';
import List from './List';

const getLocalStorage = () =>{
  let list  = localStorage.getItem("list");
  if(list){
    return (list = JSON.parse(localStorage.getItem("list")));
  }
  return [];
}

function App() {

  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({show:false, msg: "", type:""});
  const [editId, setEditId] = useState(null);


  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!name){
      showAlert(true, "Please enter value", "danger");
    }
    else if(name && isEditing){
      showAlert(true, "item edited", "success");
      setList(
     list.map((item) => {
        if(item.id === editId){
          return {...item, title: name}
        }
        return item
      }));
      setName("");
      setIsEditing(false);
      setEditId(null);
      
    }
    else{
      showAlert(true, "item added to the list", "success");
      const newItem = {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem]);
      setName("");
    }
  }

  const showAlert = (show = false, msg="", type="") =>{
    setAlert({show, msg, type});
  }

  const clearList = () =>{
    showAlert(true, "all items in the list deleted", "danger");
    setList([]);
  }

  const removeItem = (id) =>{
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert(true, "item removed", "danger");
  }

  const editItem = (id) =>{
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(specificItem.id);


  }

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list])


  return (
   
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit} >
        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert} /> }
        <h3>grocery bud</h3>
        <div className='form-control'>
        <input type="text" value={name} onChange={(e) => setName(e.target.value) } placeholder="e.g furits" className="grocery" />
        <button className='submit-btn' type='submit'>
          {isEditing ? "edit" : "submit"}
        </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-conatiner'>
          <List list={list} removeItem={removeItem} editItem={editItem}  />
          <button className='clear-btn' onClick={clearList}>clear list</button>
        </div>
      )}
    </section>
  );
}

export default App;
