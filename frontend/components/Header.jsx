"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

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
         <Flex direction="column" gap={3}>
            <ConnectButton />
            <Flex gap={1} justifyContent="flex-end">
               <Box ml={2}>
                  <Link href="https://sepolia.etherscan.io/address/0xdbe6c93e847d551ED417b8e173725760fBb37880#code">
                     <Image
                        src="/etherscan-logo.png"
                        width={30}
                        height={30}
                        alt="etherscan"
                     />
                  </Link>
               </Box>

               <Box ml={2}>
                  <Link href="https://github.com/cart0uche/dapp_vote">
                     <Image
                        src="/github-logo.png"
                        width={30}
                        height={30}
                        alt="etherscan"
                     />
                  </Link>
               </Box>
            </Flex>
         </Flex>
      </Flex>
   );
};

export default Header;
