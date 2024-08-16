import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  let navigate=useNavigate()
let getToken=localStorage.getItem("token")
if(getToken!==null){
   
    navigate('/dashboard')
}
function handleButton(){
   
    navigate("/register")
}


  return (
    <Box
      bgImage={
        "https://img.freepik.com/premium-photo/young-woman-reading-book-room-inside-balcony-house-with-potted-plants_118124-154893.jpg?w=826"
      }
      bgSize="cover"
      bgPos="center"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
    >
      <Flex
        direction="column"
        align="center"
        bg="rgba(0, 0, 0, 0.6)"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading mb={4}>Welcome to the Library</Heading>
        <Text fontSize="lg" mb={6}>
          Dive into a world of knowledge.
        </Text>
        <Button
        onClick={handleButton}
          size="lg"
          colorScheme="teal"
          variant="solid"
          _hover={{ bg: "teal.400" }}
        >
          Register to start with Library
        </Button>
      </Flex>
    </Box>
  );
}

export default Home;
