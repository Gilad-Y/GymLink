// MainModal.tsx
import "./mainModal.css";
import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import AdvancedModal from "./advancedModal/advancedModal";
import { data } from "react-router-dom";
import StatModal from "./statModal/statModal";

interface MainModalProps {
  open: boolean;
  onClose: () => void;
  type: string;
  data?: any;
}

function MainModal(props: MainModalProps): React.JSX.Element {
  return (
    <>
      <Modal
        open={props.open}
        onClose={() => {
          props.onClose();
        }}
      >
        <ModalDialog>
          {props.type === "advanced" && (
            <AdvancedModal
              onClose={props.onClose}
              columns={props.data.columns}
              id={props.data.id}
            />
          )}
          {props.type === "stat" && (
            <StatModal
              onClose={props.onClose}
              stat={props.data.stat}
            />
          )}
        </ModalDialog>
      </Modal>
    </>
  );
}
//addMIssion

export default MainModal;
