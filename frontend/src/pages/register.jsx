import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  VStack,
  Alert,
  AlertIcon,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [handleForm, setHandleForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertStatus, setAlertStatus] = useState(null);

  if (token) {
    navigate("/dashboard");
  }

  const handleFormInfo = (e) => {
    const { name, value } = e.target;
    setHandleForm((prev) => ({ ...prev, [name]: value }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = handleForm;

    if (name && email && password && role) {
      try {
        const res = await fetch("https://library-app-1-26pr.onrender.com/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(handleForm),
        });

        const data = await res.json();

        if (data.message === "registered successfully") {
          setAlertStatus("success");
          setAlertMessage("Registration successful!");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          setAlertStatus("error");
          setAlertMessage("User already exists");
        }
      } catch (err) {
        setAlertStatus("error");
        setAlertMessage("Something went wrong. Try again.");
      }
    } else {
      setAlertStatus("warning");
      setAlertMessage("All fields are required.");
    }
  };

  const cardBg = useColorModeValue("whiteAlpha.900", "gray.800");

  return (
    <Box
      bgImage="https://i.pinimg.com/564x/11/08/3a/11083abffd7da56da0ba2205ebb3a6be.jpg"
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
        <Heading mb={5} size="xl" color="teal.600">
          Create Your Account
        </Heading>

        {alertMessage && (
          <Alert status={alertStatus} mb={4} borderRadius="md">
            <AlertIcon />
            {alertMessage}
          </Alert>
        )}

        <form onSubmit={formSubmit}>
          <VStack spacing={4}>
            <Input
              name="name"
              value={handleForm.name}
              onChange={handleFormInfo}
              type="text"
              placeholder="Full Name"
              variant="filled"
              focusBorderColor="teal.500"
              _placeholder={{ color: "gray.500" }}
            />
            <Input
              name="email"
              value={handleForm.email}
              onChange={handleFormInfo}
              type="email"
              placeholder="Email Address"
              variant="filled"
              focusBorderColor="teal.500"
              _placeholder={{ color: "gray.500" }}
            />
            <Input
              name="password"
              value={handleForm.password}
              onChange={handleFormInfo}
              type="password"
              placeholder="Password"
              variant="filled"
              focusBorderColor="teal.500"
              _placeholder={{ color: "gray.500" }}
            />
            <Select
              name="role"
              value={handleForm.role}
              onChange={handleFormInfo}
              placeholder="Select Role"
              variant="filled"
              focusBorderColor="teal.500"
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
              transition="0.3s"
              _hover={{ bg: "teal.500", transform: "translateY(-2px)" }}
            >
              Register
            </Button>

            <Text fontSize="sm" mt={2}>
              Already have an account?{" "}
              <Link
                color="blue.500"
                fontWeight="medium"
                cursor="pointer"
                onClick={() => navigate("/login")}
                _hover={{ textDecoration: "underline" }}
              >
                Login here
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default Register;
