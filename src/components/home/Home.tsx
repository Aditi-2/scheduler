import React from "react";
import { useSelector } from "react-redux";
import { TimeSlot } from "../../redux/reducer/timeslot";
import { RootState } from "../../redux/rootReducer";
import Grid from "@material-ui/core/Grid";
import styled from "@emotion/styled";
import { CompanyDetails } from "../companydetails/CompanyDeatils";
import { AppointmentCalendar } from "../appointmentcalendar/AppointmentCalendar";
import { ReservedTimeSlot } from "../reservedtimeslot/ReservedTimeSlot";
import { useTimeslotData } from "../../api/hooks";
import { FetchStatus } from "../../common/types/fetch-status";
import { CircularProgress } from "@material-ui/core";

const Home: React.FC = () => {

  const allAvailableSlots = useTimeslotData(TimeSlot.actions.setAvailableSlots, TimeSlot.actions.setStatus)
  const fetchStatus = useSelector((state: RootState) => state.timeslot.fetchStatus);

  return (
    <HomeStyled>
      <div className="home-container">
        <h1>Time slots</h1>
        <Grid container spacing={3}>
          {fetchStatus === FetchStatus.success ? allAvailableSlots.map((companySlots) => {
            return (
              <Grid item xs key={companySlots.name}>
                <CompanyDetails companyName={companySlots.name} />
                <ReservedTimeSlot companyID={companySlots.id} />
                <AppointmentCalendar time_slots={companySlots.time_slots} companyID={companySlots.id} />
              </Grid>
            );
          }) : <CircularProgress/>}
        </Grid>
      </div>
    </HomeStyled>
  );
};

const HomeStyled = styled.div`
  & .home-container {
    margin: 1em;
  }
`;

export default Home;
