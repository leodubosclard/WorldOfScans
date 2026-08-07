import type { ReactElement } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalFooter, ModalCloseButton } from '@chakra-ui/react';

interface GlobalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactElement;
}

export const GlobalModal = ({ isOpen, onClose, title, children }: GlobalModalProps) => {
    return (
        <Modal
        onClose={onClose}
        isOpen={isOpen}
        size={{ base: 'full', md: 'lg' }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    );
}
