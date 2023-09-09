import { Flex, Input, Text } from "@chakra-ui/react";
import ModalComponent from "components/modal";
import Token from "components/token";
import { memo, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { rateAtom } from "recoil/rate";
import { tokenSelectedAtom } from "recoil/token-selected";
import { CurrencyData } from "ultils/const";
const formatter = new Intl.NumberFormat("en-EN");

const Receive = ({ screen = "receive" }) => {
  const modalRef = useRef();
  const [convertUsd, setConvertUsd] = useState();
  const [value, setValue] = useState();
  const [focus, setFocus] = useState(false);
  const [token, setToken] = useRecoilState(tokenSelectedAtom(screen));
  const tokenReceive = useRecoilValue(tokenSelectedAtom("pay"));
  const [rateData, setRateData] = useRecoilState(rateAtom);

  useEffect(() => {
    setToken(CurrencyData[1]);
  }, [setToken]);

  useEffect(() => {
    if (rateData?.screen === "pay") {
      setValue((rateData?.value * token?.price) / tokenReceive?.price);
    }
  }, [rateData?.screen, rateData?.value, token, tokenReceive?.price]);

  useEffect(() => {
    setConvertUsd(value * token?.price);
  }, [token?.price, value]);

  return (
    <Flex
      bgColor="#F9F9F9"
      borderRadius={10}
      padding={4}
      direction="column"
      gap={2}
    >
      <Text fontSize="14px" color="#7d7d7d">
        You Receive
      </Text>
      <Flex gap={6} justifyContent="space-between">
        <Flex flex={1}>
          <Input
            type="number"
            maxW={"300px"}
            placeholder="0"
            fontSize={"20px"}
            fontWeight={700}
            variant="flushed"
            isInvalid={!value && focus}
            errorBorderColor="crimson"
            value={value}
            onChange={(item) => {
              const value = item?.target?.value;
              setValue(value);
              setRateData({ value, screen: "receive" });
            }}
            onFocus={() => setFocus(true)}
          />
        </Flex>
        <Token isForm="true" modalRef={modalRef} tokenName={token?.currency} />
      </Flex>
      {convertUsd > 0 && (
        <Text paddingLeft={2}>${formatter.format(convertUsd)}</Text>
      )}
      <ModalComponent ref={modalRef} screen={screen} />
    </Flex>
  );
};

export default memo(Receive);
