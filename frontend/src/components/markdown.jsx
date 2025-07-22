import Markdown from 'markdown-to-jsx';
import { Box } from "@chakra-ui/react";

export default function MarkDownReview({ storyContent }) {

  const formattedContent = storyContent.replace(/\\n/g, '\n');

  return (
    <Box
      p={4}
      borderRadius="md"
      fontSize="md"
      maxW="100%"
      overflowX="auto"
      whiteSpace="pre-wrap"
      color="black"
    >
      <Markdown>
        {formattedContent}
      </Markdown>
    </Box>
  );
}
