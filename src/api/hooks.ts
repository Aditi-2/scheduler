import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CompaniesAvailableTimeSlots } from "../common/types/timeslot";
import { getAvailableTimeSlots } from "./timeslot";
import { FetchStatus } from "../common/types/fetch-status";

export const useTimeslotData = (
  action?: ActionCreatorWithPayload<CompaniesAvailableTimeSlots[]>,
  statusAction?: ActionCreatorWithPayload<FetchStatus>
) => {
  const dispatch = useDispatch();
  const [innerState, setInnerState] = useState<CompaniesAvailableTimeSlots[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        statusAction && dispatch(statusAction(FetchStatus.pending))
        const data = await getAvailableTimeSlots();
        action && dispatch(action(data));
        statusAction && dispatch(statusAction(FetchStatus.success))
        setInnerState(data);
      } catch (error) {
        statusAction && dispatch(statusAction(FetchStatus.error))
      }
    };
    getData();
  }, []);
  return innerState
};
