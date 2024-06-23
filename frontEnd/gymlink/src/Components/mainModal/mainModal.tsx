// MainModal.tsx
import "./mainModal.css";
import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ECards from "./cards/eCards/eCards";
import AddCard from "../pages/addData/payments/paymentsTables/cardsTable/addCard/addCard";
import AddMission from "./missions/addMission/addMission";
import EditMission from "./missions/editMission/editMission";
import EMembership from "./membership/eMembership/eMembership";
import AddMembership from "./membership/addMembership/addMembership";

interface MainModalProps {
  open: boolean;
  onClose: () => void;
  type: string;
  data?: any;
}

function MainModal(props: MainModalProps): JSX.Element {
  return (
    <>
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
          {props.type === "addCards" && (
            <AddCard id={props.data} onClose={props.onClose} />
          )}
          {props.type === "eMembership" && (
            <EMembership row={props.data} onClose={props.onClose} />
          )}
          {props.type === "addMembership" && (
            <AddMembership id={props.data} onClose={props.onClose} />
          )}
          {props.type === "addMission" && (
            <AddMission data={props.data} onClose={props.onClose} />
          )}
          {props.type === "editMission" && (
            <EditMission data={props.data} onClose={props.onClose} />
          )}
        </ModalDialog>
      </Modal>
    </>
  );
}
//addMIssion

export default MainModal;
