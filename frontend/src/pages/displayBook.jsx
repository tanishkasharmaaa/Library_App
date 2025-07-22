import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";

export default function DisplayBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const { id } = useParams();
  const toast = useToast();

  async function getBook() {
    try {
      const res = await fetch(
        `https://library-app-1-26pr.onrender.com/library/books/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setBook(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to fetch book.",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    getBook();
  }, []);

  if (loading) {
    return (
      <Box mt="100px" textAlign="center">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        maxW="800px"
        mx="auto"
        mt={10}
        p={6}
        bg="gray.50"
        borderRadius="2xl"
        boxShadow="xl"
      >
        <VStack spacing={6}>
          <Image
            src={book.coverImageUrl}
            alt={book.title}
            borderRadius="md"
            maxH="400px"
            objectFit="cover"
          />

          <Heading size="xl" textAlign="center" color="blue.700">
            {book.title}
          </Heading>

          {book.author && (
            <Text fontSize="lg" color={'gray.800'}>
              <b>Author:</b> {book.author}
            </Text>
          )}

          {book.language && (
            <Text fontSize="lg" color={'gray.800'}>
              <b>Language:</b> {book.language}
            </Text>
          )}

          {book.publisher && (
            <Text fontSize="lg" color={'gray.800'}>
              <b>Publisher:</b> {book.publisher}
            </Text>
          )}

          {book.description && (
  <Box w="100%" bg="gray.50" p={4} borderRadius="lg">
    {book.description.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <Heading size="md" mt={4} key={index} color="blue.700">
            {line.replace("# ", "")}
          </Heading>
        );
      } else {
        return (
          <Text mt={2} key={index} color="gray.700">
            {line}
          </Text>
        );
      }
    })}
  </Box>
)}

        </VStack>
      </Box>
    </>
  );
}
