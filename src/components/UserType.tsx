import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { fetchCustomerByRole } from "../redux/slices/customerSlice";
import { changeRole } from "../redux/slices/authSlice";
import { Role } from "../types/Role";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const UserType: React.FC = () => {
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.auth.role);

  useEffect(() => {
    if (role === "All") return;
    dispatch(fetchCustomerByRole(role));
  }, [dispatch, role]);

  return (
    <FormControl>
      <RadioGroup row>
        <FormControlLabel
          value={Role.Admin}
          control={<Radio />}
          label="Admin"
          onChange={() => dispatch(changeRole(Role.Admin))}
        />
        <FormControlLabel
          value={Role.Manager}
          control={<Radio />}
          label="Manager"
          onChange={() => dispatch(changeRole(Role.Manager))}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default UserType;
