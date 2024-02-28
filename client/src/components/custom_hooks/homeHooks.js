import { useState } from 'react';


export function useModalManagement(initialItem = null) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedWorkItem, setSelectedWorkItem] = useState(initialItem);
    const [modalHeading, setModalHeading] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const openModal = (item = null, heading = '') => {
      setSelectedWorkItem(item);
      setModalHeading(heading);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedWorkItem(null); // or keep the last selected item, based on your needs
      setModalHeading('');
    };

    
  
    return { isModalOpen, selectedWorkItem, modalHeading, openModal, closeModal };
  }
  

export function useToast(initialState = false) {
    const [showToast, setShowToast] = useState(initialState);
    const [toastMessage, setToastMessage] = useState('');
    const [isToastSuccess, setIsToastSuccess] = useState(false);

    const triggerToast = (message, isSuccess = false) => {
        setToastMessage(message);
        setIsToastSuccess(isSuccess);
        setShowToast(true);

        // Automatically hide toast after a delay, if needed
        setTimeout(() => setShowToast(false), 3000);
    };

    return { showToast, toastMessage, isToastSuccess, triggerToast };
}
  

