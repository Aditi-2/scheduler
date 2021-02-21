import axios from "axios";
import { AllAvailableTimeSlots } from "../common/types/timeslot";

export const getAvailableTimeSlots = async (
  ): Promise<AllAvailableTimeSlots> => {
    const response = await axios.get(`${process.env.REACT_APP_TIMESLOTS}/data`);
    const data = await response.data;
    return data;
  };
