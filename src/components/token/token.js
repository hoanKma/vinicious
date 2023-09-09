import { Flex, Image, Text } from "@chakra-ui/react";
import { memo, useCallback } from "react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import { tokenSelectedAtom } from "recoil/token-selected";

const tokenImages = {
  BLUR: require("assets/images/BLUR.svg").default,
  bNEO: require("assets/images/bNEO.svg").default,
  BUSD: require("assets/images/BUSD.svg").default,
  USD: require("assets/images/USD.svg").default,
  ETH: require("assets/images/ETH.svg").default,
  GMX: require("assets/images/GMX.svg").default,
  STEVMOS: require("assets/images/STEVMOS.svg").default,
  LUNA: require("assets/images/LUNA.svg").default,
  RATOM: require("assets/images/RATOM.svg").default,
  STRD: require("assets/images/STRD.svg").default,
  EVMOS: require("assets/images/EVMOS.svg").default,
  IBCX: require("assets/images/IBCX.svg").default,
  IRIS: require("assets/images/IRIS.svg").default,
  ampLUNA: require("assets/images/ampLUNA.svg").default,
  KUJI: require("assets/images/KUJI.svg").default,
  STOSMO: require("assets/images/STOSMO.svg").default,
  USDC: require("assets/images/USDC.svg").default,
  axlUSDC: require("assets/images/axlUSDC.svg").default,
  ATOM: require("assets/images/ATOM.svg").default,
  STATOM: require("assets/images/STATOM.svg").default,
  OSMO: require("assets/images/OSMO.svg").default,
  rSWTH: require("assets/images/rSWTH.svg").default,
  STLUNA: require("assets/images/STLUNA.svg").default,
  LSI: require("assets/images/LSI.svg").default,
  OKB: require("assets/images/OKB.svg").default,
  OKT: require("assets/images/OKT.svg").default,
  SWTH: require("assets/images/SWTH.svg").default,
  USC: require("assets/images/USC.svg").default,
  WBTC: require("assets/images/WBTC.svg").default,
  wstETH: require("assets/images/wstETH.svg").default,
  YieldUSD: require("assets/images/YieldUSD.svg").default,
  ZIL: require("assets/images/ZIL.svg").default,
};

const Token = ({
  item,
  tokenName,
  isForm = false,
  modalRef,
  screen,
  onClose,
}) => {
  const setToken = useSetRecoilState(tokenSelectedAtom(screen));

  const onClickToken = useCallback(() => {
    modalRef.current.show();
  }, [modalRef]);

  if (isForm) {
    return (
      <Flex
        bgColor={"#fff"}
        align={"center"}
        borderRadius={20}
        gap={2}
        padding={2}
        cursor={"pointer"}
        onClick={onClickToken}
      >
        <Image
          boxSize={"24px"}
          src={tokenImages[tokenName]}
          alt="token images"
        />
        <Text m={0} fontWeight={500}>
          {tokenName}
        </Text>
        <ChevronDownIcon boxSize={6} />
      </Flex>
    );
  }
  return (
    <Flex
      borderRadius={20}
      gap={4}
      padding={2}
      cursor={"pointer"}
      align={"center"}
      _hover={{ bgColor: "#81BF2A" }}
      onClick={() => {
        setToken(item);
        onClose();
      }}
    >
      <Image boxSize={"36px"} src={tokenImages[tokenName]} alt="token images" />
      <Text m={0} fontSize={"18px"} fontWeight={500}>
        {tokenName}
      </Text>
    </Flex>
  );
};

export default memo(Token);
