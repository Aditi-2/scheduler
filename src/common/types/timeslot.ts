export interface TimeSlots {
  start_time: string | Date;
  end_time: string | Date;
}

export interface CompaniesAvailableTimeSlots {
  id: number;
  name: string;
  type: string;
  time_slots: TimeSlots[];
}
export interface AvailableSlots {
  dayOfWeek: string;
  slots: TimeSlots[];
}

export interface AllAvailableTimeSlots {
  data: CompaniesAvailableTimeSlots[];
}