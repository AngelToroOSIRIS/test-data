"use client"

import {CalendarDateTime, fromDate, getLocalTimeZone, parseDateTime, today} from "@internationalized/date";
import {DatePicker as DatePickerNextUi} from "@nextui-org/react";
import {I18nProvider} from "@react-aria/i18n";
import {useEffect, useState} from "react";
import Icon from "../ui/Icon";

interface Props {
    name: string;
    variant?: "flat" | "bordered" | "faded" | "underlined";
    selectMonthYears?: boolean;
    defaultValue?: string;
    showHour?: boolean;
    minDateToday?: boolean;
    minDateTomorrow?: boolean;
    error?: string;
    onChange?: ({name, value}: { name: string; value: string | null }) => any;
    disabled?: boolean;
    description?: string;
    clearable?: boolean;
}

const DatePicker = ({
                        name,
                        defaultValue,
                        minDateToday,
                        minDateTomorrow,
                        selectMonthYears = true,
                        error,
                        onChange,
                        showHour = false,
                        disabled,
                        description,
                        clearable
                    }: Props) => {
    const [selectedDate, setSelectedDate] = useState<CalendarDateTime | null>(defaultValue ? parseDateTime(defaultValue) : null);

    useEffect(() => {
        if (onChange) {
            onChange({
                name: String(name).trim(),
                value: selectedDate
                    ? (showHour
                        ? (selectedDate + `.000000`).toString()
                        : (String(selectedDate.year).length < 4 ? null : new Date(`${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`).toISOString().slice(0, 10)))
                    : null,
            });
        }
    }, [selectedDate]);

    return (
        <I18nProvider locale="es-CO">
            <DatePickerNextUi
                variant="faded"
                value={selectedDate}
                isDisabled={disabled}
                className="max-w-[284px]"
                classNames={{
                    base: "!max-w-full",

                }}
                onChange={setSelectedDate}
                aria-label={name + " date-picker"}
                granularity={showHour ? "minute" : "day"}
                showMonthAndYearPickers={selectMonthYears}

                isInvalid={!!error} errorMessage={error ?? null}
                description={description} name={name} radius="lg" size="lg"
                timeInputProps={{
                    errorMessage: "Hora no válida"
                }}
                startContent={(clearable && selectedDate)
                    ? <Icon icon="x-circle-fill"
                            className="cursor-pointer text-gray hover:text-dark-gray dark:hover:text-default-white transition-all"
                            title="Limpiar"
                            onClick={() => setSelectedDate(null)}/>
                    : undefined}
                minValue={!minDateToday
                    ? (minDateTomorrow
                        ? today(getLocalTimeZone()).add({days: 1})
                        : undefined)
                    : fromDate(new
                    Date(), 'America/Bogota')}
                dateInputClassNames={{
                    inputWrapper: "bg-default border-divider",

                }}

            />
        </I18nProvider>
    )
}

export default DatePicker
