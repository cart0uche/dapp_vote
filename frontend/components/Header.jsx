"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Spacer } from "@chakra-ui/react";
import Image from "next/image";

const Header = () => {
   return (
      <Flex
         p="2rem"
         justifyContent="space-between"
         alignItems="center"
         width="100%"
         h="15vh"
      >
         <Image src="/alyra.png" width={100} height={100} />
         <ConnectButton />
      </Flex>
   );
};

export default Header;
