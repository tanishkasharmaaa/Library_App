import { Box, Flex, Heading, VStack, Text, IconButton, Avatar, Menu, MenuButton, MenuItem, MenuList, Image, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, useDisclosure, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

function Dashboard() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [logoutAlert, setLogoutAlert] = useState(false);
  const[searchData,setSearchData]=useState([]);
  const [searchQuery,setSearchQuery]=useState("")
  const [result,setResult]=useState([])
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = JSON.parse(localStorage.getItem("token"));
  const email=JSON.parse(localStorage.getItem("role")).email
const role=JSON.parse(localStorage.getItem("role")).role;

async function handleSearch(e) {
  e.preventDefault();
  let query = e.target.value; // Set query from input value

  if (query === "old=1" || query === "new=1") {
    setSearchQuery(query); // Update searchQuery state
    try {
      let res = await fetch(`https://library-app-1-26pr.onrender.com/library/books?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      setSearchData(data);
     
    } catch (error) {
      console.error(error);
    }
  }
  else{
    let search=books.filter((ele)=>ele.title.toLowerCase().includes(query.toLowerCase()))
    setSearchData(search)
 
  }
}

// Get all books
async function getBooks() {
  try {
    const res = await fetch("https://library-app-1-26pr.onrender.com/library/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setBooks(data);
  } catch (error) {
    console.log(error);
  }
}

// Logout Function
function logout() {
  localStorage.removeItem("token");
  onOpen(); // Open the alert
  setTimeout(() => {
    navigate("/login"); // Redirect after showing alert
  }, 2000); // Delay redirection to allow the user to see the alert
}

// Filter Data based on searchQuery
function filterData() {
  setTimeout(()=>{
     // If searchQuery is present and searchData is available, use searchData
  if (searchQuery.length> 0||searchData.length>0) {
    setResult(searchData);
  } else {
    // Otherwise, use the original books data
    setResult([...books]);
  }
  },5000)
 
}

useEffect(() => {
  filterData();
}, [searchData, books]);

useEffect(() => {
  getBooks();
}, []);

  return (<>
  <Navbar/>
    <Flex height="100vh" bg="gray.100">
  
      

      {/* Main Content */}
      <Box flex="1" p={6}>
        {/* Header */}
        <Flex justifyContent="space-between" alignItems="center" mb={6}>
          <Heading as="h1" size="xl">
            Dashboard
          </Heading>
          <Menu>
            <MenuButton as={IconButton} icon={<Avatar name={email} />} variant="outline" />
            <MenuList>
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
<Input type="text" placeholder="Search your query eg: new=1 ,old=1 " onChange={handleSearch} />
        {/* Dashboard Content */}
        <Flex justifyContent="space-between" flexWrap="wrap" p={4} gap={6}>
          {result.map((ele,i) => (
            <Box
              key={i}
              width={["100%", "48%", "30%"]}
              p={4}
              bg="white"
              borderRadius="md"
              boxShadow="sm"
              _hover={{ boxShadow: "lg" }}
              transition="all 0.3s ease"
            >
              <Image
                src={ele.coverImageUrl}
                alt={`Cover image of ${ele.title}`}
                borderRadius="md"
                mb={4}
                objectFit="cover"
                width="100%"
                height="200px"
              />
              <VStack spacing={2} align="start">
                <Heading as="h2" size="md">
                  {ele.title}
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  by {ele.author}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {ele.pages} pages | {ele.language}
                </Text>
                <Text mt={2}>{ele.description}</Text>
                <Text mt={2} fontWeight="bold">
                  Available Copies: {ele.availableCopies}
                </Text>
              </VStack>
            </Box>
          ))}
        </Flex>
        
        {/* Logout Alert */}
        <Alert
          status="success"
          variant="solid"
          position="fixed"
          bottom="20px"
          right="20px"
          width="auto"
          borderRadius="md"
          display={isOpen ? "flex" : "none"}
        >
          <AlertIcon />
          <AlertTitle mr={2}>Logout Successful</AlertTitle>
          <AlertDescription>Your session has ended.</AlertDescription>
          <CloseButton onClick={onClose} position="absolute" right="8px" top="8px" />
        </Alert>
      </Box>
    </Flex></>
  );
}

export default Dashboard;
