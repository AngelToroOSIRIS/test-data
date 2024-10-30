"use client"

import {Calendar as CalendarNextUi, CalendarDate, DateValue} from "@nextui-org/react";
import {I18nProvider} from "@react-aria/i18n";
import {getLocalTimeZone, parseDate, today} from "@internationalized/date";
import {useEffect, useState} from "react";

interface Props {
    name: string;
    disabled?: boolean;
    isReadOnly?: boolean;
    error?: string;
    minDateToday?: boolean;
    minDateTomorrow?: boolean;
    defaultValue?: string;
    onChange?: ({name, value}: { name: string; value: string | null }) => any;
    datesDisabled?: ((date: DateValue) => boolean) | undefined
}

const Calendar = ({
                      name,
                      disabled,
                      error,
                      minDateToday,
                      isReadOnly,
                      defaultValue,
                      onChange,
                      datesDisabled,
                      minDateTomorrow
                  }: Props) => {
    const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(defaultValue ? parseDate(defaultValue) : null);

    useEffect(() => {
        if (onChange) {
            onChange({
                name: String(name).trim(),
                value: selectedDate
                    ? new Date(`${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`).toISOString().slice(0, 10)
                    : null,
            });
        }
    }, [selectedDate]);

    return (
        <I18nProvider locale="co-CO">
            <CalendarNextUi
                color="primary"
                className="w-full max-w-[302px]"
                classNames={{
                    header: "bg-default-100",
                    base: "border border-divider"
                }}
                aria-label={name + " calendar"}
                isDisabled={disabled}
                isReadOnly={isReadOnly}
                isInvalid={!!error} errorMessage={error ?? null}
                minValue={!minDateToday
                    ? (minDateTomorrow
                        ? today(getLocalTimeZone()).add({days: 1})
                        : undefined)
                    : today(getLocalTimeZone())}
                value={selectedDate}
                onChange={setSelectedDate}
                showMonthAndYearPickers
                isDateUnavailable={datesDisabled}
            />
        </I18nProvider>
    );
};

export default Calendar;