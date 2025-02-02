import { useToast, Box, Text, Button, Flex } from "@chakra-ui/react";

const useConfirmToast = () => {
  const toast = useToast();

  const confirm = (title, description, onConfirm, onCancel) => {
    toast({
      duration: null, // Keeps the toast open until manually closed
      position: "top",
      render: ({ onClose }) => (
        <Box
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.200"
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
              variant="outline"
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
