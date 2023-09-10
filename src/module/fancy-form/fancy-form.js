import { Button, Flex, Text } from "@chakra-ui/react";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { tokenSelectedAtom } from "recoil/token-selected";
import Pay from "./sub/pay";
import Receive from "./sub/receive";

const formatter = new Intl.NumberFormat("en-EN");

const FancyForm = () => {
  const tokenReceive = useRecoilValue(tokenSelectedAtom("receive"));
  const tokenPay = useRecoilValue(tokenSelectedAtom("pay"));

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <Flex
      direction={"column"}
      border={"1px solid #F1F1F1"}
      boxShadow={"1px 2px 1000px #FBEFFF"}
      borderRadius={20}
      padding={8}
      gap={2}
      as="form"
      onSubmit={handleSubmit}
    >
      <Text fontSize={"16px"} fontWeight={600} m="0">
        Swap
      </Text>
      <Pay />

      <Flex
        alignSelf={"center"}
        border={"1px solid #ccc"}
        borderRadius={100}
        w={"fit-content"}
        padding={2}
        cursor={"pointer"}
        _hover={{ bgColor: "#eee" }}
        _active={{ bgColor: "#ccc" }}
      >
        {/* <UpDownIcon boxSize={4} /> */}
      </Flex>

      <Receive />

      <Text textAlign={"center"} color={"#666"} marginY={2}>
        1 {tokenPay.currency} ={" "}
        {formatter.format(tokenPay.price / tokenReceive.price)}{" "}
        {tokenReceive.currency} (${formatter.format(tokenPay.price)})
      </Text>

      <Button
        type="submit"
        isLoading={false}
        loadingText="Loading"
        spinnerPlacement="start"
        colorScheme="purple"
      >
        <Text>Swap</Text>
      </Button>
    </Flex>
  );
};

export default memo(FancyForm);
