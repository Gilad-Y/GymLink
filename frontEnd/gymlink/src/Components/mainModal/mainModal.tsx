// MainModal.tsx
import "./mainModal.css";
import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ECards from "./cards/eCards/eCards";
import AddCard from "../pages/addData/payments/paymentsTables/cardsTable/addCard/addCard";
import AddMission from "./missions/addMission/addMission";

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
      <Modal
        open={props.open}
        onClose={() => {
          props.onClose();
        }}
      >
        <ModalDialog>
          {props.type === "eCards" && (
            <ECards data={props.data} onClose={props.onClose} />
          )}
          {props.type === "AddCards" && (
            <AddCard id={props.data} onClose={props.onClose} />
          )}
          {props.type === "addMIssion" && (
            <AddMission data={props.data} onClose={props.onClose} />
          )}
        </ModalDialog>
      </Modal>
    </>
  );
}
//addMIssion

export default MainModal;
