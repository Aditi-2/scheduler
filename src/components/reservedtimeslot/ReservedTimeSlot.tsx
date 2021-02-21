import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "@emotion/styled";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { TimeRange } from "../timerange/timerange";

interface ReservedTimeSlotProps {
  companyID: number;
  dateFormat?: string;
}

export const ReservedTimeSlot: React.FC<ReservedTimeSlotProps> = ({
  companyID,
  dateFormat = "PPPP"
}) => {
  const {
    reservedSlot: { timeSlot, company_id },
  } = useSelector((state: RootState) => state.timeslot);
  return (
    <ReservedTimeSlotStyled>
      <Card className={"reservation-details"}>
        <CardContent>
          {company_id === companyID && (
            <>
              <Typography variant="subtitle1" className="reserved-day">
                {format(new Date(timeSlot.start_time), dateFormat)}
              </Typography>
              {timeSlot.start_time !== "" && timeSlot.end_time !== "" && (
                <TimeRange start={new Date(timeSlot.start_time)} end={new Date(timeSlot.end_time)}/>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </ReservedTimeSlotStyled>
  );
};

const ReservedTimeSlotStyled = styled.div`
  & .reservation-details {
    background-color: #f5f5f5;
    min-width: 5rem;
    min-height: 6rem;
    text-align: center;
  }
`;
