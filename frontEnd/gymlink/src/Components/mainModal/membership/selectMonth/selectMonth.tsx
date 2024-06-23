import React, { useEffect } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";

interface Props {
  returnMonth: any;
  monthToChange?: number;
}

function SelectMonth(props: Props): JSX.Element {
  const [selectedValue, setSelectedValue] = React.useState<any>("");

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    // alert(`You chose "${newValue}"`);
    setSelectedValue(newValue);
    props.returnMonth(newValue);
  };
  useEffect(() => {
    setSelectedValue(props?.monthToChange);
  }, [props.monthToChange]);

  return (
    <Select
      placeholder="כמות חודשים"
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 240,
        [`& .${selectClasses.indicator}`]: {
          transition: "0.2s",
          [`&.${selectClasses.expanded}`]: {
            transform: "rotate(-180deg)",
          },
        },
      }}
      value={selectedValue}
      onChange={handleChange}
    >
      <Option value="0">-</Option>
      <Option value="1">1</Option>
      <Option value="3">3</Option>
      <Option value="6">6</Option>
      <Option value="9">9</Option>
      <Option value="12">12</Option>
    </Select>
  );
}

export default SelectMonth;
