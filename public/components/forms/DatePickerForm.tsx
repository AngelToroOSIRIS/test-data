"use client";

import { Tooltip } from "@nextui-org/react";
import Icon from "../ui/Icon";
import DatePicker from "./DatePicker";
import Subtitle from "@/components/forms/Subtitle";

interface Props {
  name: string;
  defaultValue?: string;
  minDateToday?: boolean;
  minDateTomorrow?: boolean;
  showHour?: boolean;
  label?: {
    value?: string;
    required?: boolean;
    className?: string;
    tooltip?: string;
  };
  disabled?: boolean;
  selectMonthYears?: boolean;
  onChange?: ({ name, value }: { name: string; value: string | null }) => any;
  clearable?: boolean;
}

const DatePickerForm = ({
  name,
  defaultValue,
  minDateToday,
  minDateTomorrow,
  selectMonthYears = true,
  showHour = false,
  label,
  disabled,
  onChange,
  clearable,
}: Props) => {
  return (
    <div className="text-start w-full">
      <div className="flex gap-2 mb-[5px]">
        <Subtitle
          text={
            label?.value ??
            name[0].toString().toUpperCase() +
              name.toString().substring(1) +
              ":"
          }
          required={label?.required ?? true}
          className={label?.className}
        />

        {label?.tooltip && (
          <Tooltip
            content={label?.tooltip}
            className="select-none text-default-foreground"
            showArrow
          >
            <p>
              <Icon icon="info-circle-fill" className="text-warning" />
            </p>
          </Tooltip>
        )}
      </div>

      <DatePicker
        name={name}
        onChange={onChange}
        showHour={showHour}
        disabled={disabled}
        clearable={clearable}
        defaultValue={defaultValue}
        minDateToday={minDateToday}
        minDateTomorrow={minDateTomorrow}
        selectMonthYears={selectMonthYears}
      />
    </div>
  );
};

export default DatePickerForm;
