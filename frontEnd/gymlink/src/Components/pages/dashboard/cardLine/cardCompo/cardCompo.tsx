import "./cardCompo.css";
import * as React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import MainModal from "../../../../mainModal/mainModal";
import { statLogic } from "./statLogic";
interface itemProps {
  id: number;
  type: string;
  refresh: () => void;
}
function CardCompo(props: itemProps): React.JSX.Element {
  const [openModal, setOpenModal] = React.useState(false);
  const [statValue, setStatValue] = React.useState(0);
  React.useEffect(() => {
    const fetchStatValue = async () => {
      setStatValue(await statLogic(props.type));
    };
    fetchStatValue();
    props.refresh();
  }, [openModal]);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div className="cardCompo">
      <Card
        variant="solid"
        color="neutral"
        invertedColors
        onDoubleClick={() => toggleModal()}
      >
        <CardContent orientation="horizontal">
          <CircularProgress
            size="lg"
            determinate
            value={statValue} // This is the value of the stat
          >
            {/* <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                />
              </svg>
            </SvgIcon> */}
            <Typography level="h2">{statValue}</Typography>
          </CircularProgress>
          <CardContent>
            <Typography level="h2">{props.type}</Typography>
            {/* <Typography level="h2">{props.stat}</Typography> */}
          </CardContent>
        </CardContent>
      </Card>
      <MainModal
        open={openModal}
        onClose={toggleModal}
        type={"stat"}
        data={{ stat: props }}
      />
    </div>
  );
}

export default CardCompo;
