import { useEffect, useState } from "react";
import {
  Box,
  Image,
  Input,
  Button,
  Textarea,
  VStack,
  HStack,
  Flex,
  useBreakpointValue,
  useToast,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import Navbar from "../components/navbar";

function UpdateAndDelete() {
  const [books, setBooks] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const toast = useToast();

  async function getBooks() {
    try {
      const res = await fetch("https://library-app-1-26pr.onrender.com/library/books", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleInput(e, index) {
    const { name, value } = e.target;
    const updatedBooks = [...books];
    updatedBooks[index] = { ...updatedBooks[index], [name]: value };
    setBooks(updatedBooks);
  }

  async function updateBook(bookId, updatedBook) {
    try {
      const res = await fetch(`https://library-app-1-26pr.onrender.com/library/books/${bookId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedBook),
      });

      if (res.ok) {
        toast({
          title: "Success",
          description: "Book updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getBooks();
      } else {
        toast({
          title: "Error",
          description: `Failed to update book. Status: ${res.status}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBook(bookId) {
    try {
      const res = await fetch(`https://library-app-1-26pr.onrender.com/library/books/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast({
          title: "Deleted",
          description: "Book deleted successfully.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        getBooks();
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

  const columnWidth = useBreakpointValue({ base: "100%", sm: "90%", md: "45%", lg: "30%" });

  return (
    <>
      <Navbar />
      <Flex
        wrap="wrap"
        p={6}
        justify="center"
        gap={6}
        backgroundImage="url('https://media.istockphoto.com/id/1453081662/photo/bookstore-in-the-city-center-of-lisbon.webp?b=1&s=612x612&w=0&k=20&c=d_p96PciyrLisFJrMqtMvGm74xaKUvzKnDWUqXz6r34=')"
        backgroundSize="cover"
      >
        {books.map((ele, i) => (
          <Box
            key={ele._id}
            p={6}
            bg="whiteAlpha.900"
            borderRadius="lg"
            boxShadow="xl"
            width={columnWidth}
            color="gray.800"
          >
            <Box textAlign="center" mb={4}>
              <Image
                src={ele.coverImageUrl}
                alt={ele.title}
                borderRadius="md"
                boxSize="160px"
                objectFit="cover"
                mx="auto"
              />
              <Heading size="md" mt={3}>{ele.title}</Heading>
            </Box>

            <VStack spacing={3} align="stretch">
              {[
                { label: "Title", name: "title", type: "text" },
                { label: "Author", name: "author", type: "text" },
                { label: "Pages", name: "pages", type: "number" },
                { label: "Language", name: "language", type: "text" },
                { label: "Publisher", name: "bookPublisher", type: "text" },
                { label: "Cover Image URL", name: "coverImageUrl", type: "text" },
                { label: "Available Copies", name: "availableCopies", type: "number" },
              ].map((field) => (
                <FormControl key={field.name}>
                  <FormLabel fontSize="sm">{field.label}</FormLabel>
                  <Input
                    type={field.type}
                    name={field.name}
                    value={ele[field.name] || ""}
                    onChange={(e) => handleInput(e, i)}
                    borderColor="gray.300"
                  />
                </FormControl>
              ))}

              <FormControl>
                <FormLabel>Description / Story</FormLabel>
                <Textarea
                  name="description"
                  placeholder="Use # for subtitles, * or - for bullet points"
                  rows={6}
                  resize="vertical"
                  value={ele.description || ""}
                  onChange={(e) => handleInput(e, i)}
                  borderColor="gray.300"
                  bg="gray.50"
                />
              </FormControl>

              <HStack spacing={4} pt={2} justify="center">
                <Button colorScheme="teal" onClick={() => updateBook(ele._id, ele)} size="sm">
                  Update
                </Button>
                <Button colorScheme="red" onClick={() => deleteBook(ele._id)} size="sm">
                  Delete
                </Button>
              </HStack>
            </VStack>
          </Box>
        ))}
      </Flex>
    </>
  );
}

export default UpdateAndDelete;
