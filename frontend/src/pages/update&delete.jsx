import { useEffect, useState } from "react";
import { Box, Image, Input, Button, Textarea, VStack, HStack, Flex, useBreakpointValue } from "@chakra-ui/react";
import Navbar from "../../components/navbar";

function UpdateAndDelete() {
    const [books, setBooks] = useState([]);
    const token = JSON.parse(localStorage.getItem("token"));

    // Fetch books data
    async function getBooks() {
        try {
            let res = await fetch("https://library-app-1-26pr.onrender.com/library/books", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let data = await res.json();
            setBooks(data);
        } catch (error) {
            console.log(error);
        }
    }

    // Handle input changes for each book's form
    function handleInput(e, index) {
        const { name, value } = e.target;
        const updatedBooks = [...books];
        updatedBooks[index] = { ...updatedBooks[index], [name]: value || "" };
        setBooks(updatedBooks);
    }

    // Handle book update
    async function updateBook(bookId, updatedBook) {
        try {
            let res = await fetch(`https://library-app-1-26pr.onrender.com/library/books/${bookId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedBook)
            });
            if (res.ok) {
                alert("Book updated successfully!");
                getBooks(); // Refresh the book list after update
            } else {
                console.log(`Failed to update book: ${res.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Handle book deletion
    async function deleteBook(bookId) {
        try {
            const res = await fetch(`https://library-app-1-26pr.onrender.com/library/books/${bookId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.ok) {
                alert("Book deleted successfully!");
                getBooks(); // Refresh the book list after deletion
            } else {
                console.log(`Failed to delete book: ${res.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    // Responsive column width
    const columnWidth = useBreakpointValue({ base: "100%", sm: "48%", md: "30%" });

    return (
        <><Navbar/>
        <Flex
        backgroundImage={'https://media.istockphoto.com/id/1453081662/photo/bookstore-in-the-city-center-of-lisbon.webp?b=1&s=612x612&w=0&k=20&c=d_p96PciyrLisFJrMqtMvGm74xaKUvzKnDWUqXz6r34='}
            wrap="wrap"
            spacing={4}
            p={4}
            justify="center"
            align="start"
        >
            
            {books.length > 0 && books.map((ele, i) => (
                <Box
                    key={ele._id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    mb={4}
                    boxShadow="md"
                    width={columnWidth}
                    backgroundColor="white"
                >
                    <Box mb={4} display="flex" justifyContent="center">
                        <Image
                            src={ele.coverImageUrl}
                            alt={ele.title}
                            boxSize={{ base: "120px", sm: "150px" }}
                            objectFit="cover"
                            borderRadius="md"
                        />
                    </Box>
                    <VStack spacing={3} align="stretch">
                        <Input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={ele.title || ""}
                            onChange={(e) => handleInput(e, i)}
                            mb={2}
                            borderColor="gray.300"
                        />
                        <Input
                            type="text"
                            name="author"
                            placeholder="Author"
                            value={ele.author || ""}
                            onChange={(e) => handleInput(e, i)}
                            mb={2}
                            borderColor="gray.300"
                        />
                        <Textarea
                            name="description"
                            placeholder="Description"
                            value={ele.description || ""}
                            onChange={(e) => handleInput(e, i)}
                            mb={2}
                            borderColor="gray.300"
                        />
                        <Input
                            type="number"
                            name="pages"
                            placeholder="Pages"
                            value={ele.pages || 0}
                            onChange={(e) => handleInput(e, i)}
                            mb={2}
                            borderColor="gray.300"
                        />
                        <Input
                            type="text"
                            name="language"
                            placeholder="Language"
                            value={ele.language || ""}
                            onChange={(e) => handleInput(e, i)}
                            mb={2}
                            borderColor="gray.300"
                        />
                        <Input
                            type="text"
                            name="bookPublisher"
                            placeholder="Publisher"
                            value={ele.bookPublisher || ""}
                            onChange={(e) => handleInput(e, i)}
                            mb={2}
                            borderColor="gray.300"
                        />
                        <Input
                            type="text"
                            name="coverImageUrl"
                            placeholder="Cover Image URL"
                            value={ele.coverImageUrl || ""}
                            onChange={(e) => handleInput(e, i)}
                            mb={2}
                            borderColor="gray.300"
                        />
                        <Input
                            type="number"
                            name="availableCopies"
                            placeholder="Available Copies"
                            value={ele.availableCopies || 0}
                            onChange={(e) => handleInput(e, i)}
                            mb={2}
                            borderColor="gray.300"
                        />
                        <HStack spacing={4} mt={4} justify="center">
                            <Button
                                colorScheme="teal"
                                onClick={() => updateBook(ele._id, ele)}
                                size="sm"
                            >
                                Update Book
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => deleteBook(ele._id)}
                                size="sm"
                            >
                                Delete Book
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            ))}
        </Flex></>
    );
}

export default UpdateAndDelete;
