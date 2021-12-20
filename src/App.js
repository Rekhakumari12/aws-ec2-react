import './App.css';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
function App() {
  const [user, setUser] = useState({ name:"",email:"",password:"" })
  const [error, setError] = useState({ error: false, message: "" })
  const [isRegister, setIsRegister] = useState(false)

  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({...user,[name]:value})
  }

  const submit = async (e) => {
    e.preventDefault()
    console.log(process.env.REACT_APP_BACKEND_URL+"/api/users")
    const { name, email } = user
    if (name && email) {
      const resp = await fetch(process.env.REACT_APP_BACKEND_URL+"/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
      })
      const res = await resp.json()
      if (resp.status === 200) {
        // alert("Registration Successfull")
        setError({ error: false, message: "" })
        setIsRegister(true)
      } else {
        setError({error:true,message:res.error})
      }
    } else {
      alert("All fields are required")
    }
  }
  return (
    <div className="App">
      <header className="App-header">
          <Form className="yellowBox">
            {
              error.error ? <center><h6 className="text-danger">{error.message}</h6></center> : ""}
            {
              (!error.error && isRegister) ? <center><h6 className="text-success">Registration Successfull</h6></center> : ""
            }
        <Form.Group className="mb-3 form-group" controlId="formUsername">
          <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                required
                onChange={handleInput}
                name="name"
                value={user.name}
              />
            </Form.Group>
          <Form.Group className="mb-3 form-group" controlId="formEmail">
          <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required 
                onChange={handleInput}
                name="email"
                value={user.email}
              />
        </Form.Group>
        <Button variant="dark" type="submit" onClick={submit}>Register</Button>
        </Form>
      </header>
    </div>
  );
}

export default App;
