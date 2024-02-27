// MainModal.tsx
import "./mainModal.css";
import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ECards from "./cards/eCards/eCards";

interface MainModalProps {
  open: boolean;
  onClose: () => void;
  type: string;
  data?: any;
}

function MainModal(props: MainModalProps): JSX.Element {
  return (
    <>
      {/* <Button
        variant="outlined"
        color="neutral"
        onClick={props.onClose} // Toggle the modal open/close state from the parent
      >
        {props.type}
      </Button> */}
      <Modal open={props.open} onClose={props.onClose}>
        <ModalDialog>
          <ECards data={props.data} onClose={props.onClose} />
        </ModalDialog>
      </Modal>
    </>
  );
}

export default MainModal;
