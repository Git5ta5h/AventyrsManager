
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function showNotification(message) {
    console.log("called");
    toast.info(message, {
        autoClose: false, // Set autoClose to false to make it persistent
      });
    };