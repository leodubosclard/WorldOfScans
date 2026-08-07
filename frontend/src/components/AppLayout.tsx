import React, { type ReactElement } from 'react';
import { Box } from '@chakra-ui/react';

interface AppLayoutProps {
    children: ReactElement;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
    <Box w="100%" px={{ base: "auto", md: '30%' }} mx='auto'>
        {children}
    </Box>
);
