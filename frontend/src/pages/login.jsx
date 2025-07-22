import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  useToast,
  useColorModeValue
} from "@chakra-ui/react";

function Login() {
  let [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const toast = useToast();

  function handleForm(e) {
    e.preventDefault();
    let { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await fetch("https://library-app-1-26pr.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      let data = await res.json();
      console.log(data);
      if (data.message === "Login Successful") {
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        localStorage.setItem("role",JSON.stringify({email:loginInfo.email,role:data.role}))
        navigate("/dashboard");
      } else {
        toast({
          title: "Invalid credentials",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: "Unable to login. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  const cardBg = useColorModeValue("whiteAlpha.900", "gray.800");

  return (
    <Box
      bgImage={
        "https://i.pinimg.com/564x/11/08/3a/11083abffd7da56da0ba2205ebb3a6be.jpg"
      }
       bgSize="cover"
      bgPosition="center"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg={cardBg}
        p={{ base: 6, sm: 8 }}
        borderRadius="2xl"
        boxShadow="2xl"
        width="100%"
        maxW="450px"
        textAlign="center"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.2)"
      >
        <Heading textAlign="center" mb={6}>
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={loginInfo.email}
                name="email"
                onChange={handleForm}
                placeholder="Enter your email"
                variant="filled"
              focusBorderColor="teal.500"
              _placeholder={{ color: "gray.500" }}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={loginInfo.password}
                name="password"
                onChange={handleForm}
                placeholder="Enter your password"
                variant="filled"
              focusBorderColor="teal.500"
              _placeholder={{ color: "gray.500" }}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              mt={4}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
