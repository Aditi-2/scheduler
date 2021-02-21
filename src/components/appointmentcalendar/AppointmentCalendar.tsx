
import React from "react";
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import styled from "@emotion/styled";
import { areIntervalsOverlapping, format, getDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { TimeSlots, AvailableSlots } from "../../common/types/timeslot";
import { TimeSlot } from "../../redux/reducer/timeslot";
import { RootState } from "../../redux/rootReducer";
import { TimeRange } from "../timerange/timerange";

const DAYS_MAP = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const getAvailableSlots = (time_slots: TimeSlots[]): AvailableSlots[] => {
  let availableDates: string[] = [];
  const availableSlots: AvailableSlots[] = [];

  time_slots.forEach((time) => {
    const start_date = format(new Date(time.start_time), "yyyy-MM-dd");

    const startDate = new Date(time.start_time);
    const day = getDay(startDate);

    if (availableDates.includes(start_date)) {
      const slotIndex = availableSlots.findIndex(
        (slots) => slots.dayOfWeek === DAYS_MAP[day]
      );
      availableSlots[slotIndex].slots.push({
        start_time: time.start_time,
        end_time: time.end_time,
      });
    } else {
      availableDates.push(start_date);
      availableSlots.push({
        dayOfWeek: DAYS_MAP[day],
        slots: [
          {
            start_time: time.start_time,
            end_time: time.end_time,
          },
        ],
      });
    }
  });
  return availableSlots;
};

interface AppointmentCalendarProps {
  time_slots: TimeSlots[];
  companyID: number;
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  time_slots,
  companyID,
}) => {
  const dispatch = useDispatch();
  const availableSlots = getAvailableSlots(time_slots);
  const {
    reservedSlot: { day, timeSlot, company_id },
  } = useSelector((state: RootState) => state.timeslot);

  const updateSelectedSlot = (dayOfWeek: string, timeSlots: TimeSlots) => {
    dispatch(
      TimeSlot.actions.setReservedSlots({
        day: dayOfWeek,
        timeSlot: timeSlots,
        company_id: companyID,
      })
    );
  };

  const removeSelectedSlot = () => {
    dispatch(
      TimeSlot.actions.setReservedSlots({
        day: "",
        timeSlot: {
          start_time: "",
          end_time: "",
        },
        company_id: null,
      })
    );
  };

  return (
    <AppointmentCalendarStyled>
      <div className="slot-list">
        <List>
          {availableSlots.map((slot, index) => {
            return (
              <div className="avialable-slots" key={`available-slot-${index}`}>
                <ListItemText
                  primary={slot.dayOfWeek}
                  className="day-of-week"
                  disableTypography
                />
                {slot.slots.map((timeslot, index) => {
                  const intervalsOverlapping =
                    timeSlot.start_time !== "" &&
                    timeSlot.end_time !== "" &&
                    areIntervalsOverlapping(
                      {
                        start: new Date(timeslot.start_time),
                        end: new Date(timeslot.end_time),
                      },
                      {
                        start: new Date(timeSlot.start_time),
                        end: new Date(timeSlot.end_time),
                      }
                    );
                  return (
                    <ListItem
                      className="time-slot"
                      key={`timeslot-${index}`}
                      disabled={
                        companyID !== company_id &&
                        day === slot.dayOfWeek &&
                        intervalsOverlapping
                      }
                      selected={
                        companyID === company_id &&
                        day === slot.dayOfWeek &&
                        timeSlot.start_time === timeslot.start_time
                      }
                      onClick={() =>
                        updateSelectedSlot(slot.dayOfWeek, timeslot)
                      }
                    >
                      <TimeRange
                        className="time-slot-inner"
                        start={new Date(timeslot.start_time)}
                        end={new Date(timeslot.end_time)}
                      />
                      {companyID === company_id &&
                        day === slot.dayOfWeek &&
                        timeSlot.start_time === timeslot.start_time && (
                          <ListItemSecondaryAction onClick={removeSelectedSlot}>
                            <IconButton edge="end" aria-label="delete">
                              <CloseIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        )}
                    </ListItem>
                  );
                })}
              </div>
            );
          })}
        </List>
      </div>
    </AppointmentCalendarStyled>
  );
};

const AppointmentCalendarStyled = styled.div`
  & .slot-list {
    max-height: calc(100vh - 30rem);
    overflow-y: auto;
    margin-bottom: 3rem;
    margin-top: 2rem;
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(13deg, #dedede 14%, #e3e4e6 64%);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(13deg, #c7ceff 14%, #f9d4ff 64%);
    }
    ::-webkit-scrollbar-track {
      background: #ffffff;
      border-radius: 10px;
      box-shadow: inset 7px 10px 12px #f0f0f0;
    }
    & .avialable-slots {
      text-align: center;
      & .day-of-week {
        font-size: 1.5rem;
        color: #3b7ab5;
        margin: 2rem 0;
      }
      & .time-slot {
        color: #2f9be9;
        border: 1px solid #2f9be9;
        text-align: center;
        margin: 10px 0;
        border: radius;
        border-radius: 5px;
        cursor: pointer;
        &-inner {
          text-align: center;
          box-sizing: border-box;
          width: 100%;
          padding: 6px;
        }
      }
    }
  }
`;
