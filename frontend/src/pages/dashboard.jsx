import { Box, Flex, Heading, VStack, Text, IconButton, Avatar, Menu, MenuButton, MenuItem, MenuList, Image, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, useDisclosure, Input, Grid ,useColorModeValue} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

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
    console.log(data)
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
const bgCard = useColorModeValue("white", "white");
  return (<>
  <Navbar/>
    <Flex height="100vh" >
  
      

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
        
        <Grid
          templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          gap={6}
          alignItems="stretch"
          pt={4}
        >
          {result.map((ele, i) => (
            <Box
              key={i}
              bg={bgCard}
              p={4}
              borderRadius="lg"
              boxShadow="md"
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
            >
              <Link to={`/displayBook/${ele._id}`}>
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
                  <Heading as="h3" size="md" color="black">
                    {ele.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    by {ele.author}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    {ele.pages} pages | {ele.language}
                  </Text>
                  
                </VStack>
              </Link>
            </Box>
          ))}
        </Grid>
        
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
