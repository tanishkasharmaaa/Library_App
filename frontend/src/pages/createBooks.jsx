import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast, VStack, Heading } from "@chakra-ui/react";
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
        availableCopies: 1
    });

    const token = JSON.parse(localStorage.getItem("token"));
    const toast = useToast();

    // Handles form input changes
    function handleForm(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    // Handles form submission
    async function formSubmit(e) {
        e.preventDefault();
        try {
            let res = await fetch("https://library-app-1-26pr.onrender.com/library/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });
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

    // Handles adding more genre input fields
    function handleAddGenreInput() {
        setForm((prev) => ({
            ...prev,
            genres: [...prev.genres, ""]
        }));
    }

    // Handles individual genre input changes
    function handleGenreChange(e, index) {
        const updatedGenres = form.genres.map((genre, i) =>
            i === index ? e.target.value : genre
        );
        setForm((prev) => ({ ...prev, genres: updatedGenres }));
    }

    return (
        <Box backgroundImage={'https://img.freepik.com/premium-photo/vintage-library-ambiance-with-antique-books-shelves-exuding-nostalgic-aesthetic_872147-61482.jpg?w=1060'}>
            <Navbar />
            <Box bg={'white'} maxW="500px" mx="auto" mt="10" p="6" borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Heading as="h2" size="lg" mb="6" textAlign="center">
                    Add New Book
                </Heading>
                <form onSubmit={formSubmit}>
                    <VStack spacing={4}>
                        <FormControl>
                            <FormLabel>Book Title</FormLabel>
                            <Input
                                type="text"
                                name="title"
                                placeholder="Book Title"
                                value={form.title}
                                onChange={handleForm}
                                focusBorderColor="teal.500"
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Book Author</FormLabel>
                            <Input
                                type="text"
                                name="author"
                                placeholder="Book Author"
                                value={form.author}
                                onChange={handleForm}
                                focusBorderColor="teal.500"
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Book Description</FormLabel>
                            <Textarea
                                name="description"
                                placeholder="Book Description"
                                value={form.description}
                                onChange={handleForm}
                                focusBorderColor="teal.500"
                            />
                        </FormControl>

                        {/* Genre Input Section */}
                        <FormControl>
                            <FormLabel>Genres</FormLabel>
                            {form.genres.map((genre, index) => (
                                <Input
                                    key={index}
                                    type="text"
                                    placeholder="Add genre"
                                    value={genre}
                                    onChange={(e) => handleGenreChange(e, index)}
                                    focusBorderColor="teal.500"
                                    mt={index > 0 ? 2 : 0}
                                />
                            ))}
                        </FormControl>
                        <Button
                            onClick={handleAddGenreInput}
                            colorScheme="pink"
                            variant="outline"
                            size="sm"
                        >
                            Add Genre
                        </Button>

                        <FormControl>
                            <FormLabel>Number of Pages</FormLabel>
                            <Input
                                type="number"
                                name="pages"
                                placeholder="No. of Pages"
                                value={form.pages}
                                onChange={handleForm}
                                focusBorderColor="teal.500"
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Language</FormLabel>
                            <Input
                                type="text"
                                name="language"
                                placeholder="Language"
                                value={form.language}
                                onChange={handleForm}
                                focusBorderColor="teal.500"
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Book Publisher</FormLabel>
                            <Input
                                type="text"
                                name="bookPublisher"
                                placeholder="Book Publisher"
                                value={form.bookPublisher}
                                onChange={handleForm}
                                focusBorderColor="teal.500"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Cover Image URL</FormLabel>
                            <Input
                                type="text"
                                name="coverImageUrl"
                                placeholder="Cover Image URL"
                                value={form.coverImageUrl}
                                onChange={handleForm}
                                focusBorderColor="teal.500"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Available Copies</FormLabel>
                            <Input
                                type="number"
                                name="availableCopies"
                                placeholder="Available Copies"
                                value={form.availableCopies}
                                onChange={handleForm}
                                focusBorderColor="teal.500"
                                required
                            />
                        </FormControl>

                        <Button type="submit" colorScheme="teal" width="full">
                            Submit
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Box>
    );
}

export default CreateBooks;
