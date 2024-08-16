import {Link, Input, Select, Box, Heading, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [handleForm, setHandleForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate=useNavigate();
const token=JSON.parse(localStorage.getItem("token"))
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertStatus, setAlertStatus] = useState(null);
if(token){
navigate('/dashboard')
}
  function handleFormInfo(e) {
    const { name, value } = e.target;
    setHandleForm((prev) => ({ ...prev, [name]: value }));
  }

  

  async function formSubmit(e) {
    e.preventDefault();
    if (handleForm.name && handleForm.email && handleForm.password && handleForm.role) {
      try {
      let res = await fetch(
          "https://library-app-1-26pr.onrender.com/user/register",{
          
          method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
           body:JSON.stringify(handleForm)
          }
        );
        let data=await res.json()

        if (data.message === "registered successfully") {
         
          setAlertStatus("success");
          setAlertMessage("Registration Successful");
         navigate('/login')


        } else {
          setAlertStatus("error");
          setAlertMessage("User already exists");
         
        }
      } catch (error) {
        console.log(error);
        setAlertStatus("error");
        setAlertMessage("An error occurred. Please try again.");
      }
    } else {
      setAlertStatus("warning");
      setAlertMessage("Please fill all the fields");
    }
  }

  return (
    <Box
      bgImage={
        "https://i.pinimg.com/564x/11/08/3a/11083abffd7da56da0ba2205ebb3a6be.jpg"
      }
      bgSize="cover"
      bgPos="center"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      <Box
        bg="rgba(255, 255, 255, 0.9)"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        width="100%"
        maxW="400px"
        textAlign="center"
      >
        <Heading mb={6} size="lg" color="teal.600">
          Register
        </Heading>
        {alertMessage && (
          <Alert status={alertStatus} mb={4} borderRadius="md">
            <AlertIcon />
            {alertMessage}
          </Alert>
        )}
        <form onSubmit={formSubmit}>
          <Input
            name="name"
            value={handleForm.name}
            onChange={handleFormInfo}
            type="text"
            placeholder="Enter your name"
            mb={4}
            variant="filled"
            focusBorderColor="teal.400"
          />
          <Input
            name="email"
            value={handleForm.email}
            onChange={handleFormInfo}
            type="email"
            placeholder="Enter your email"
            mb={4}
            variant="filled"
            focusBorderColor="teal.400"
          />
          <Input
            name="password"
            value={handleForm.password}
            onChange={handleFormInfo}
            type="password"
            placeholder="Enter your password"
            mb={4}
            variant="filled"
            focusBorderColor="teal.400"
          />
          <Select
            name="role"
            value={handleForm.role}
            onChange={handleFormInfo}
            placeholder="Select your role"
            mb={6}
            variant="filled"
            focusBorderColor="teal.400"
          >
            <option value="CREATOR">CREATOR</option>
            <option value="VIEWER">VIEWER</option>
            <option value="VIEW_ALL">VIEW_ALL</option>
          </Select>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            width="100%"
            _hover={{ bg: "teal.400" }}
          >
            Register
          </Button>
           <Link onClick={()=>(navigate('/login'))} color={'blue'}>Login if signup already</Link>
        </form>
       
      </Box>
    </Box>
  );
}

export default Register;

