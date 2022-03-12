import React, { useEffect, useState } from 'react';

export const Members = (props) => {
  const {name,age,handleTransfer,handleEdit,handleDelete}=props;
return (
  <div>
      <span>name: {name}</span>-<span>age: {age}</span>{" - "}
      <button onClick={()=>handleTransfer()}>transfer</button>{" - "}
      <button onClick={()=>handleEdit()}>edit</button>{" - "}
      <button onClick={()=>handleDelete()}>delete</button>
  </div>
)
}
export const TransferMember = () => {
  const [reactMembers, setReactMembers] = useState(()=>{
    return [{
        name: "Đinh Tuấn Anh",
        age: 20,
      },
      {
          name: "Ngụy Minh Thắng",
          age: 19,
      },
      {
        name: "Nguyễn Anh Thư",
        age: 21,
      },
     ]
  });
  const [javaMembers, setJavaMembers] = useState(()=>{
    return [{
      name: "Bế Trọng Hiếu",
      age: 20,
    },
    {
        name: "Ngô Huỳnh Đức",
        age: 19,
    },
    {
      name: "Nguyễn Mạnh Dũng",
      age: 21,
    },
   ]
  });
  useEffect(()=>{
    if(javaMembers.length===0){
      alert("Java Class is Empty");
    } else if (reactMembers.length===0){
      alert("React Class is Empty");
    }
  },[reactMembers.length,javaMembers.length])

  const transferReactToJavaMember =(index)=>{
    const el = reactMembers[index];
    reactMembers.splice(index,1);
    javaMembers.push(el);
    setReactMembers([...reactMembers]);
    setJavaMembers([...javaMembers]);
  }
  const transferJavaToReactMember =(index)=>{
    const el = javaMembers[index];
    javaMembers.splice(index,1);
    reactMembers.push(el);
    setReactMembers([...reactMembers]);
    setJavaMembers([...javaMembers]);
  }

  const [formData, setFormData] = useState({
    name:"",
    age:"",
    classType:""
  })

  const handleInput=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    })
  }

  const handleSubmit = ()=>{
    if(formData.classType === "java"){
      javaMembers.push(formData);
      setJavaMembers([...javaMembers]);
    } else{
      reactMembers.push(formData);
      setReactMembers([...reactMembers]);
    }
    setFormData({
      name:"",
      age:"",
      classType:""
    })
  }
  
  const handleEditReact=(index)=>{
    const el=reactMembers[index];
    setFormData(el);
    reactMembers.splice(index,1);

  }
  const handleEditJava=(index)=>{
    const el=javaMembers[index];
    setFormData(el);
    javaMembers.splice(index,1);
  }
  
  const handleSort=()=>{
    const sortJavaMember=[...javaMembers].sort((a,b)=>{
      return a.age-b.age;
    });
    const sortReactMember=[...reactMembers].sort((a,b)=>{
      return a.age-b.age;
    });
    setJavaMembers([...sortJavaMember]);
    setReactMembers([...sortReactMember]);
  }

  const handleDeleteReact=(index)=>{
    reactMembers.splice(index,1);
    setReactMembers([...reactMembers]);
  }
  const handleDeleteJava=(index)=>{
    javaMembers.splice(index,1);
    setJavaMembers([...javaMembers]);
  }
  
  const [searchValue, setSearchValue] = useState("")
    return (
    <div>
      <h2>Search by name:</h2>
      <input
        type="text"
        name='search'
        value={searchValue}
        onChange={(e)=>{setSearchValue(e.target.value);}}
      /><br></br>
      <button onClick={()=>handleSort()}>Sort</button>
      <h1>List member of React Class</h1>
      {
        reactMembers.length>0? reactMembers.filter((user)=>{
          if (searchValue ===""){
            return user;
          }
          else if (user.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())){
            return user;
          }
        }).map((user, index)=>{
          return <Members name={user.name} age={user.age} key={index} handleTransfer={()=>transferReactToJavaMember(index)} handleEdit={()=>handleEditReact(index)} handleDelete={()=>handleDeleteReact(index)}/>
        }):"empty class"
      }
      <h1>List member of Java Class</h1>
      {
        javaMembers.length>0? javaMembers.filter((user)=>{
          if (searchValue ===""){
            return user;
          }
          else if (user.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())){
            return user;
          }
        }).map((user, index)=>{
          return <Members name={user.name} age={user.age} key={index} handleTransfer={()=>transferJavaToReactMember(index)} handleEdit={()=>handleEditJava(index)} handleDelete={()=>handleDeleteJava(index)}/>
        }):"empty class"
      }
      
      <form onSubmit={(e)=>{
        e.preventDefault();
      }}>
        <h1>Form Add Members</h1>
        <label>name: </label>
        <input name="name" value={formData.name} onChange={(e)=>handleInput(e)}></input>
        {"-"}
        <label>age: </label>
        <input name="age" value={formData.age} onChange={(e)=>handleInput(e)}></input>
        <select name="classType" value={formData.classType} onChange={(e)=>handleInput(e)}>
          <option value="react">React</option>
          <option value="java">Java</option>
        </select>
        <button onClick={()=>handleSubmit()}>Submit</button>
      </form>
      
    </div>
)
}
