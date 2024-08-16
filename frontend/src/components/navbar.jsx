import { Box, Button, Flex, Heading, Spacer, Link as ChakraLink, IconButton, useDisclosure, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";

function Navbar() {
    const email = JSON.parse(localStorage.getItem("role")).email;
    const role = JSON.parse(localStorage.getItem("role")).role;
  let navigate=useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    function logout() {
        localStorage.removeItem("token");
 navigate('/login')
    }

    return (
        <Box bg="teal.500" color="white" px={[2, 4]} py={[2, 4]}>
            <Flex align="center" direction={["row", "row"]} justify="space-between">
                <Heading size={["md", "lg"]}>
                    <Link to={'/dashboard'}>LIBRARY</Link>
                </Heading>
                <Spacer />
                {/* Drawer for Mobile Screens */}
                <Box display={["block", "none"]}>
                    <IconButton
                        icon={<HamburgerIcon />}
                        colorScheme="teal"
                        variant="outline"
                        onClick={onOpen}
                    />
                    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
    <DrawerOverlay>
        <DrawerContent bg="gray.800" color="white">
            <DrawerCloseButton color="white" />
            <DrawerHeader borderBottomWidth="1px" borderColor="gray.600">
                Menu
            </DrawerHeader>
            <DrawerBody>
                {role === "CREATOR" ? (
                    <>
                        <ChakraLink as={Link} to="/create" _hover={{ textDecoration: 'none' }} onClick={onClose}>
                            <Button 
                                bg="teal.500" 
                                color="white" 
                                _hover={{ bg: "teal.600" }} 
                                variant="solid" 
                                width="100%" 
                                mb={4}
                            >
                                ADD BOOKS
                            </Button>
                        </ChakraLink>
                        <ChakraLink as={Link} to="/update&delete" _hover={{ textDecoration: 'none' }} onClick={onClose}>
                            <Button 
                                bg="blue.500" 
                                color="white" 
                                _hover={{ bg: "blue.600" }} 
                                variant="solid" 
                                width="100%" 
                                mb={4}
                            >
                                UPDATE & DELETE
                            </Button>
                        </ChakraLink>
                        <Button 
                            bg="red.500" 
                            color="white" 
                            _hover={{ bg: "red.600" }} 
                            variant="solid" 
                            width="100%" 
                            mb={4} 
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button 
                        bg="red.500" 
                        color="white" 
                        _hover={{ bg: "red.600" }} 
                        variant="solid" 
                        width="100%" 
                        mb={4} 
                        onClick={logout}
                    >
                        Logout
                    </Button>
                )}
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px" borderColor="gray.600">
                <Button color={'white'} variant="outline" colorScheme="gray" mr={3} onClick={onClose}>
                    Close
                </Button>
            </DrawerFooter>
        </DrawerContent>
    </DrawerOverlay>
</Drawer>

                </Box>
                {/* Normal Buttons for Larger Screens */}
                <Flex gap={4} display={["none", "flex"]}>
                    {role === "CREATOR" ? (
                        <>
                            <ChakraLink as={Link} to="/create" _hover={{ textDecoration: 'none' }}>
                                <Button colorScheme="teal" backgroundColor={'teal'} color={'white'} >ADD BOOKS</Button>
                            </ChakraLink>
                            <ChakraLink as={Link} color={'white'} to="/update&delete" _hover={{ textDecoration: 'none' }}>
                                <Button colorScheme="teal" color={'white'} variant="outline">UPDATE & DELETE</Button>
                            </ChakraLink>
                            <Button colorScheme="teal" onClick={logout}>Logout</Button>
                        </>
                    ) : (
                        <Button colorScheme="teal" onClick={logout}>Logout</Button>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
}

export default Navbar;
