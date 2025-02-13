import { useToast, Box, Text, Button, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const useConfirmToast = () => {
  const toast = useToast();

  const confirm = (title, description, onConfirm, onCancel) => {
    toast({
      duration: null, // Keeps the toast open until manually closed
      position: "bottom",
      render: ({ onClose }) => (
        <Box
          p={4}
          bg={useColorModeValue("gray.200", "gray.dark")}
          borderRadius="md"
          boxShadow="md"
          width="100%"
          maxWidth="400px"
        >
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            {title}
          </Text>
          <Text fontSize="md" mb={4}>
            {description}
          </Text>
          <Flex justifyContent="flex-end" gap={2}>
            <Button
              colorScheme="red"
              onClick={() => {
                onCancel?.(); // Optional cancel callback
                onClose(); // Close the toast
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                onConfirm?.(); // Confirm callback
                onClose(); // Close the toast
              }}
            >
              Confirm
            </Button>
          </Flex>
        </Box>
      ),
    });
  };

  return confirm;
};

export default useConfirmToast;
