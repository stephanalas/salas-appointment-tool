import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { DateTime } from "luxon";
import { useTheme, useMediaQuery, MenuItem } from "@mui/material";
import {
  useGetAllProfilesQuery,
  Profile,
  useCreateAppointmentMutation,
  useCancelAppointmentMutation,
  useUpdateAppointmentMutation,
  MessageResponse,
  Appointment,
} from "../../store/api";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { toast } from "react-toastify";
interface DialogProps {
  open: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

interface IFormInput {
  profile: Profile | null;
  dateTime: DateTime | null;
  contact: string;
  notes: string | null;
}

// TODO: create a loading state after the appointmen has been created. email is working
// check on toast notification after appointment creation
// change contact to email address instead of phone number
// description should also be changed to notes
//
const AppointmentDialog = (props: DialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [createAppointment, { isLoading: createLoading }] =
    useCreateAppointmentMutation();
  const [cancelAppointment, { isLoading: cancelLoading }] =
    useCancelAppointmentMutation();
  const [updateAppointment, { isLoading: updateLoading }] =
    useUpdateAppointmentMutation();
  const { data: profiles, isLoading: _isProfilesLoading } =
    useGetAllProfilesQuery();
  const { open, onClose, appointment } = props;
  const { control, handleSubmit, reset, resetField } = useForm<IFormInput>({
    defaultValues: {
      profile: null,
      dateTime: null,
      contact: "",
      notes: "",
    },
  });

  useEffect(() => {
    // populate form with selected profile data
    if (appointment && appointment.profile) {
      const { phoneNumber, email } = appointment.profile;
      reset({
        profile: appointment.profile,
        dateTime: appointment.dateTime,
        contact: phoneNumber ? phoneNumber : email,
        notes: appointment.notes,
      });
    } else {
      reset({
        profile: null,
        dateTime: null,
        contact: "",
        notes: "",
      });
    }
  }, [appointment]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      let response: MessageResponse;
      if (!appointment) {
        // create
        response = await createAppointment(data).unwrap();
      } else {
        // update
        response = await updateAppointment({
          id: appointment.id,
          ...data,
        }).unwrap();
      }
      if (response.error) throw response.message;
      else toast.success(response.message);
      handleClose();
    } catch (error) {
      if (typeof error == "string") {
        toast.error(error);
        console.log(error);
      }
      handleClose();
    }
  };
  const handleDelete = async () => {
    try {
      if (appointment && appointment.id) {
        const response = await cancelAppointment(appointment.id).unwrap();
        if (response.error) throw response.message;
        toast.success(response.message);
      }
      handleClose();
    } catch (error) {
      if (typeof error == "string") {
        console.log(error);
        toast.error(error);
      }
      handleClose();
    }
  };
  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle>
        {appointment ? "Edit Appointment" : "Add Appointment"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item width={"100%"}>
              <Controller
                name="profile"
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: { onChange, value, ...field },
                  fieldState,
                }) => (
                  <Autocomplete
                    {...field}
                    fullWidth
                    handleHomeEndKeys
                    value={value}
                    onChange={(_e, newValue) => {
                      if (newValue) {
                        const { phoneNumber, email } = newValue;
                        onChange(newValue);
                        resetField("contact", {
                          defaultValue: phoneNumber ? phoneNumber : email,
                        });
                      }
                    }}
                    options={profiles || []}
                    renderOption={(props, option) => (
                      <MenuItem {...props} key={option.id}>
                        {`${option.firstName} ${option.lastName}`}
                      </MenuItem>
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id == value.id
                    }
                    getOptionLabel={(option) =>
                      `${option.firstName} ${option.lastName}`
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Profile"
                        inputRef={field.ref}
                        helperText={
                          fieldState.error
                            ? "Select a profile to associate with task"
                            : null
                        }
                        error={!!fieldState.error}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid
              item
              container
              justifyContent={"space-between"}
              rowGap={fullScreen ? 2 : 0}
            >
              <Controller
                control={control}
                name="contact"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="contact"
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="dateTime"
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange, ref } }) => (
                  <DateTimePicker
                    disablePast
                    value={value}
                    inputRef={ref}
                    onChange={onChange}
                    label="DateTime"
                  />
                )}
              />
            </Grid>
            <Grid item width={"100%"}>
              <Controller
                control={control}
                name="notes"
                rules={{
                  required: true,
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Description"
                    multiline
                    helperText={
                      fieldState.error
                        ? "Missing task description. What are we doing?"
                        : null
                    }
                    error={!!fieldState.error}
                    rows={4}
                    fullWidth
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {appointment && (
            <Button
              onClick={handleDelete}
              disabled={createLoading || updateLoading || cancelLoading}
            >
              Delete
            </Button>
          )}
          <Button
            onClick={handleClose}
            disabled={createLoading || updateLoading || cancelLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createLoading || updateLoading || cancelLoading}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AppointmentDialog;
