import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import styled from "@emotion/styled";
import React from "react";

interface CompanyDetailsProps {
  companyName: string;
}
export const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  companyName,
}) => {
  return (
    <CompanyDetailsStyled>
      <Paper className="company-details" elevation={0}>
        <Typography variant="h5" component="h2" className="title">
          {companyName}
        </Typography>
      </Paper>
    </CompanyDetailsStyled>
  );
};

const CompanyDetailsStyled = styled.div`
  & .company-details {
    min-width: 275px;
    margin-bottom: 2rem;
    & .title {
      text-align: center;
    }
  }
`;
