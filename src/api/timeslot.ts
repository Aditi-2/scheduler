import axios from "axios";
import { CompaniesAvailableTimeSlots } from "../common/types/timeslot";

export const getAvailableTimeSlots = async (
  ): Promise<CompaniesAvailableTimeSlots> => {
    const response = await axios.get(`${process.env.REACT_APP_TIMESLOTS}/data`);
    const data = await response.data;
    return data;
  };
