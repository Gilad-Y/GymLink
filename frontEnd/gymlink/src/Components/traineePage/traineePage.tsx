import { useParams } from "react-router-dom";
import "./traineePage.css";
import { Button } from "@mui/joy";
import MainModal from "../mainModal/mainModal";
import React, { useEffect, useState } from "react";
import store from "../../redux/store";

function TraineePage(): React.JSX.Element {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [data, setData] = useState<any>();
  const params = useParams();
  useEffect(() => {
    const dataToModal = [store.getState().users.user, params.id];
    setData(dataToModal);
  }, []);
  const handleModalToggle = () => {
    setModalOpen((prev) => !prev); // Toggle the modal open/close state
  };
  return (
    <div className="traineePage">
      {params.id}
      <br />
      <Button
        color="success"
        onClick={() => {
          handleModalToggle();
        }}
      >
        הוסף משימה
      </Button>
      <MainModal
        open={modalOpen}
        onClose={handleModalToggle}
        type={"addMission"}
        data={data}
      ></MainModal>
    </div>
  );
}

export default TraineePage;
