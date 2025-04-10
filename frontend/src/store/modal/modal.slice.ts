import { createSlice } from '@reduxjs/toolkit';

// Типи для стейту модалки
interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false, // Початковий стан модалки - закрита
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true; // Відкрити модалку
    },
    closeModal(state) {
      state.isOpen = false; // Закрити модалку
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
