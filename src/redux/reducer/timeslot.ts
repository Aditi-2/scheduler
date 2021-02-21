import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchStatus } from "../../common/types/fetch-status";
import { CompaniesAvailableTimeSlots, ReservedSlot } from "../../common/types/timeslot";

interface TimeslotState {
  fetchStatus: FetchStatus;
  allAvailableSlots: CompaniesAvailableTimeSlots[];
  reservedSlot: ReservedSlot;
}

const initialState: TimeslotState = {
  fetchStatus: FetchStatus.none,
  allAvailableSlots: [],
  reservedSlot: {
    day: "",
    timeSlot: {
      start_time: "",
      end_time: "",
    },
    company_id: null
  }
};

export const TimeSlot = createSlice({
  name: "timeslot",
  initialState,
  reducers: {
    setStatus: (state: TimeslotState, action: PayloadAction<FetchStatus>) => {
      state.fetchStatus = action.payload;
      return state;
    },
    setAvailableSlots: (state: TimeslotState, action: PayloadAction<CompaniesAvailableTimeSlots[]>) => {
      state.allAvailableSlots = action.payload;
      return state;
    },
    setReservedSlots: (state: TimeslotState, action: PayloadAction<ReservedSlot>) => {
      state.reservedSlot = {
        ...state.reservedSlot,
        day: action.payload.day,
        timeSlot: action.payload.timeSlot,
        company_id: action.payload.company_id
      };
      return state;
    }
  },
});
