import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { format } from "date-fns";

interface ReservedTimeSlotProps {
  companyID: number;
}

export const ReservedTimeSlot: React.FC<ReservedTimeSlotProps> = ({
  companyID,
}) => {
  const {
    reservedSlot: { day, timeSlot, company_id },
  } = useSelector((state: RootState) => state.timeslot);
  return (
    <ReservedTimeSlotStyled>
      <Card className={"reservation-details"}>
        <CardContent>
          {company_id === companyID && (
            <>
              <Typography variant="subtitle1" className="reserved-day">
                {format(new Date(timeSlot.start_time), "PPPP")}
              </Typography>
              {timeSlot.start_time !== "" && timeSlot.end_time !== "" && (
                <Typography variant="subtitle1" className="title">
                  {format(new Date(timeSlot.start_time), "HH:mm")}
                  {"-"}
                  {format(new Date(timeSlot.end_time), "HH:mm")}
                </Typography>
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
