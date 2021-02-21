import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableTimeSlots } from "../../api/timeslot";
import { TimeSlot } from "../../redux/reducer/timeslot";
import { RootState } from "../../redux/rootReducer";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import styled from "@emotion/styled";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const { allAvailableSlots, fetchStatus } = useSelector(
    (state: RootState) => state.timeslot
  );

  useEffect(() => {
    const getData = async () => {
      const data = await getAvailableTimeSlots();
      dispatch(TimeSlot.actions.setAvailableSlots(data));
    };
    getData();
  }, []);

  return (
    <HomeStyled>
      <div className="home-container">
        <h1>Time slots</h1>
        <Grid container spacing={3}>
          {allAvailableSlots.map((companySlots) => {
            return (
              <Grid item xs key={companySlots.name}>
                <p>{companySlots.name} </p>
              </Grid>
            );
          })}
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
