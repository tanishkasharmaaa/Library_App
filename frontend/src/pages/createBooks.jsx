import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
  Heading,
} from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { useState } from "react";

function CreateBooks() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genres: [""],
    pages: 0,
    language: "",
    bookPublisher: "",
    coverImageUrl: "",
    availableCopies: 1,
  });

  const token = JSON.parse(localStorage.getItem("token"));
  const toast = useToast();

  function handleForm(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function formSubmit(e) {
    e.preventDefault();
    try {
      let res = await fetch(
        "https://library-app-1-26pr.onrender.com/library/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );
      let data = await res.json();
      toast({
        title: "Book Added",
        description: "The new book has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add the book.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
    }
  }

  function handleAddGenreInput() {
    setForm((prev) => ({
      ...prev,
      genres: [...prev.genres, ""],
    }));
  }

  function handleGenreChange(e, index) {
    const updatedGenres = form.genres.map((genre, i) =>
      i === index ? e.target.value : genre
    );
    setForm((prev) => ({ ...prev, genres: updatedGenres }));
  }

  return (
    <Box
      minH="100vh"
      backgroundImage={
        "url('https://img.freepik.com/premium-photo/vintage-library-ambiance-with-antique-books-shelves-exuding-nostalgic-aesthetic_872147-61482.jpg?w=1060')"
      }
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
      px={4}
      py={10}
    >
      <Navbar />
      <Box
        maxW="600px"
        mx="auto"
        mt={10}
        p={8}
        borderRadius="xl"
        boxShadow="2xl"
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(15px)"
      >
        <Heading as="h2" size="xl" mb={6} textAlign="center" color="white">
          Add New Book
        </Heading>
        <form onSubmit={formSubmit}>
          <VStack spacing={5}>
            <FormControl>
              <FormLabel>Book Title</FormLabel>
              <Input
                name="title"
                placeholder="Enter book title"
                value={form.title}
                onChange={handleForm}
                bg="white"
                color="black"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Book Author</FormLabel>
              <Input
                name="author"
                placeholder="Enter author name"
                value={form.author}
                onChange={handleForm}
                bg="white"
                color="black"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description / Story</FormLabel>
              <Textarea
                name="description"
                placeholder="Write a detailed description or story..."
                value={form.description}
                onChange={handleForm}
                bg="white"
                color="black"
                rows={6}
                resize="vertical"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Genres</FormLabel>
              {form.genres.map((genre, index) => (
                <Input
                  key={index}
                  placeholder={`Genre ${index + 1}`}
                  value={genre}
                  onChange={(e) => handleGenreChange(e, index)}
                  bg="white"
                  color="black"
                  mt={index > 0 ? 2 : 0}
                />
              ))}
              <Button
                onClick={handleAddGenreInput}
                mt={2}
                size="sm"
                colorScheme="orange"
                variant="ghost"
              >
                + Add Genre
              </Button>
            </FormControl>

            <FormControl>
              <FormLabel>Pages</FormLabel>
              <Input
                type="number"
                name="pages"
                placeholder="Number of pages"
                value={form.pages}
                onChange={handleForm}
                bg="white"
                color="black"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Language</FormLabel>
              <Input
                name="language"
                placeholder="e.g., English, Hindi"
                value={form.language}
                onChange={handleForm}
                bg="white"
                color="black"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Publisher</FormLabel>
              <Input
                name="bookPublisher"
                placeholder="Publisher name"
                value={form.bookPublisher}
                onChange={handleForm}
                bg="white"
                color="black"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Cover Image URL</FormLabel>
              <Input
                name="coverImageUrl"
                placeholder="Image URL"
                value={form.coverImageUrl}
                onChange={handleForm}
                bg="white"
                color="black"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Available Copies</FormLabel>
              <Input
                type="number"
                name="availableCopies"
                value={form.availableCopies}
                onChange={handleForm}
                bg="white"
                color="black"
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" size="lg" width="full">
              Add Book
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default CreateBooks;
