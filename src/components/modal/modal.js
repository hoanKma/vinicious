import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { SearchIcon } from "@chakra-ui/icons";
import {
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Token from "components/token";
import { CurrencyData } from "ultils/const";

const ModalComponnent = forwardRef(({ screen }, ref) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  useImperativeHandle(ref, () => ({
    show: onOpen,
    hide: onClose,
  }));

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filteredItems = CurrencyData.filter((item) =>
      item.currency?.toLowerCase()?.includes(lowercasedSearchTerm)
    );
    setFilteredData(filteredItems);
  }, [searchTerm]);

  useEffect(() => {
    setFilteredData(CurrencyData);
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a token</ModalHeader>
        <ModalCloseButton />

        <ModalBody mt={1} mb={5}>
          <Flex direction={"column"} gap={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Enter search term"
                value={searchTerm}
                onChange={handleInputChange}
                borderRadius="md"
              />
            </InputGroup>
            <Divider />
            <Flex
              w="100%"
              direction={"column"}
              maxH="500px"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": { width: "0.4em" },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                "&::-webkit-scrollbar-thumb": { background: "transparent" },
              }}
            >
              {filteredData.map((item, index) => {
                return (
                  <Token
                    item={item}
                    tokenName={item?.currency}
                    key={index}
                    screen={screen}
                    onClose={onClose}
                  />
                );
              })}
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});

export default memo(ModalComponnent);
