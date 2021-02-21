import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchStatus } from "../../common/types/fetch-status";
import { CompaniesAvailableTimeSlots } from "../../common/types/timeslot";

interface TimeslotState {
  fetchStatus: FetchStatus;
  allAvailableSlots: CompaniesAvailableTimeSlots[];
}

const initialState: TimeslotState = {
  fetchStatus: FetchStatus.none,
  allAvailableSlots: []
};

export const TimeSlot = createSlice({
  name: "timeslot",
  initialState,
  reducers: {
    setStatus: (state: TimeslotState, action: PayloadAction<FetchStatus>) => {
      state.fetchStatus = action.payload;
      return state;
    },
    setAvailableSlots: (state: TimeslotState, action: PayloadAction<any>) => {
      state.allAvailableSlots = action.payload;
      return state;
    }
  },
});
