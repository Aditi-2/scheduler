import {combineReducers} from "@reduxjs/toolkit";
import { TimeSlot } from "./reducer/timeslot";

export const rootReducer = combineReducers({
    timeslot: TimeSlot.reducer
})

export type RootState = ReturnType<typeof rootReducer>;