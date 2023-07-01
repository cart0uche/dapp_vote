"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex } from "@chakra-ui/react";
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
         <Image src="/alyra.png" width={100} height={100} alt="alyra" />
         <Image src="/logo.png" width={500} height={700} alt="logo" />
         <ConnectButton />
      </Flex>
   );
};

export default Header;
