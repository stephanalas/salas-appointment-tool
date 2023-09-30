import { useEffect } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Profile,
  useCreateProfileMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
} from "../../store/api";

import { toast } from "react-toastify";
import DialogContainer from "../../common/DialogContainer";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  profile: Profile | null;
};

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  industry: string;
  stage: string;
  notes: string;
}

const ProfileDialog = (props: DialogProps) => {
  const { open, onClose, profile } = props;
  const [createProfile, { isLoading: isCreateLoading }] =
    useCreateProfileMutation();
  const [deleteProfile, { isLoading: isDeleteLoading }] =
    useDeleteProfileMutation();
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateProfileMutation();
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      industry: "",
      stage: "PROSPECT",
      notes: "",
    },
  });

  useEffect(() => {
    // populate form with selected profile data
    if (profile) {
      reset({
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        email: profile?.email,
        phoneNumber: profile?.phoneNumber,
        industry: profile?.industry,
        stage: profile?.stage,
        notes: profile?.notes,
      });
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        industry: "",
        stage: "PROSPECT",
        notes: "",
      });
    }
  }, [profile]);

  const renderOptions = (options: string[]) => {
    return options.map((option: string) => (
      <MenuItem key={option} value={option}>
        {option}
      </MenuItem>
    ));
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      let response;
      if (profile) {
        // request to updated
        const payload = { ...data, id: profile.id };
        response = await updateProfile(payload).unwrap();
      } else {
        // request to add
        response = await createProfile(data).unwrap();
      }
      if (response.error) {
        throw response.message;
      }
      handleClose();
      toast.success(response.message);
    } catch (error) {
      if (typeof error == "string") {
        toast.error(error);
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    try {
      if (profile) {
        const response = await deleteProfile(profile.id).unwrap();
        if (response.error) throw response.message;
        toast.success(response.message);
        handleClose();
      }
    } catch (error) {
      if (typeof error == "string") {
        toast.error(error);
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  const children = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Grid container justifyContent={"space-around"}>
          <Controller
            name={`firstName`}
            control={control}
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="dense"
                label="First name"
                helperText={error ? "Missing first name" : null}
                error={!!error}
              />
            )}
          />
          <Controller
            name="lastName"
            rules={{
              required: true,
            }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Last name"
                helperText={error ? "Missing last name" : null}
                margin="dense"
                error={!!error}
              />
            )}
          />
        </Grid>
        <Grid container justifyContent={"space-around"}>
          <Controller
            name="email"
            rules={{
              required: true,
            }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
                margin="dense"
                helperText={error ? "Missing Email" : null}
                error={!!error}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            rules={{
              required: true,
            }}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                margin="dense"
                label="Phone number"
                helperText={error ? "Missing Phone number" : null}
                error={!!error}
              />
            )}
          />
        </Grid>
        <Grid container justifyContent={"space-around"}>
          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Industry" margin="dense" />
            )}
          />
          <Controller
            name="stage"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                label="Stage"
                select
                margin="dense"
                children={renderOptions(["PROSPECT", "CLIENT"])}
                helperText={error ? "Select stage" : null}
                error={!!error}
                sx={{
                  width: "23.5ch",
                }}
              />
            )}
          />
        </Grid>
        <Grid container justifyContent={"space-around"}>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                label="Notes (Optional)"
                margin="normal"
              />
            )}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        {profile && (
          <Button
            onClick={handleDelete}
            disabled={isCreateLoading || isDeleteLoading || isUpdateLoading}
          >
            Delete
          </Button>
        )}
        <Button
          onClick={handleClose}
          type="button"
          disabled={isCreateLoading || isDeleteLoading || isUpdateLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={isCreateLoading || isDeleteLoading || isUpdateLoading}
        >
          {profile ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </form>
  );

  return (
    <DialogContainer
      open={open}
      handleClose={handleClose}
      label="Profile"
      selectedItem={profile}
      children={children}
    />
  );
};

export default ProfileDialog;
