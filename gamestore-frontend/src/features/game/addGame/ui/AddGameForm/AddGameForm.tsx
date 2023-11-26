import {Controller, useForm} from "react-hook-form";

import {Box, Button, Chip, FormControl, MenuItem, OutlinedInput, Select, Switch, TextField, Typography} from "@mui/material";

import {yupResolver} from "@hookform/resolvers/yup";

import {enqueueSnackbar} from "notistack";

import {useNavigate} from "react-router-dom";

import {useAddGameMutation, useGetGenresAndPlatformsQuery} from "@/entities/game/api/gameAPi";
import {AddGameSchema, addGameSchema} from "@/features/game/addGame/model/addGameSchema";
import {RequestAddGameData} from "@/entities/game/model/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const AddGameForm = () => {
  const [addGameMutation, {error: mutationError, isLoading: isAddGamePending}] = useAddGameMutation();
  const {data} = useGetGenresAndPlatformsQuery();
  const navigate = useNavigate();
  const {
    formState: {errors},
    control,
    handleSubmit,
    register,
  } = useForm<AddGameSchema>({
    resolver: yupResolver(addGameSchema),
    mode: "onChange",
  });

  const onSubmitHandler = async (data: RequestAddGameData) => {
    const {image, ...rest} = data;
    const formData = new FormData();
    formData.append("data", JSON.stringify(rest));
    formData.append("image", image[0]);
    await addGameMutation(formData)
      .unwrap()
      .then((payload) => {
        enqueueSnackbar(`Game ${payload.title} successfully added.`, {variant: "success"});
        navigate("/");
      })
      .catch(() => enqueueSnackbar("An error occurred.", {variant: "error"}));
  };
  
  return (
    <>
      <form encType="multipart/form-data" style={{maxWidth: "900px", width: "100%"}} onSubmit={handleSubmit(onSubmitHandler)}>
        <FormControl fullWidth sx={{m: 2}}>
          <TextField
            {...register("title")}
            label="Title"
            variant="outlined"
            fullWidth
            error={!!errors.title || !!mutationError}
            helperText={errors.title?.message}
          />
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <TextField
            {...register("price", {valueAsNumber: true})}
            label="Price"
            type="number"
            inputProps={{
              step: "any",
            }}
            variant="outlined"
            fullWidth
            defaultValue={0}
            error={!!errors.price || !!mutationError}
            helperText={errors.price?.message}
            InputProps={{
              startAdornment: <Typography>$</Typography>,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <TextField
            {...register("description")}
            label="Description"
            variant="outlined"
            fullWidth
            error={!!errors.description || !!mutationError}
            helperText={errors.description?.message}
          />
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <Controller
            defaultValue={[]}
            name="genres"
            control={control}
            render={({field}) => (
              <Select
                multiple
                fullWidth
                {...field}
                input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                renderValue={(selected) => (
                  <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                    {selected.map((value) => (
                      <Chip key={value} label={data?.genres.find((genre) => genre.id === value)?.name || ""}/>
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {data?.genres.map((genre) => (
                  <MenuItem
                    key={genre.id}
                    value={genre.id}
                  >
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            )}/>
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <Controller
            defaultValue={[]}
            name="platforms"
            control={control}
            render={({field}) => (
              <Select
                multiple
                fullWidth
                {...field}
                input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                renderValue={(selected) => (
                  <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                    {selected.map((value) => (
                      <Chip key={value} label={data?.platforms.find((platform) => platform.id === value)?.name || ""}/>
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {data?.platforms.map((platform) => (
                  <MenuItem
                    key={platform.id}
                    value={platform.id}
                  >
                    {platform.name}
                  </MenuItem>
                ))}
              </Select>
            )}/>
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <TextField
            {...register("publisher")}
            label="Publisher"
            variant="outlined"
            fullWidth
            error={!!errors.publisher || !!mutationError}
            helperText={errors.publisher?.message}
          />
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <TextField
            {...register("developer")}
            label="Developer"
            variant="outlined"
            fullWidth
            error={!!errors.developer || !!mutationError}
            helperText={errors.developer?.message}
          />
        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <input {...register("image")} type="file"/>

        </FormControl>
        <FormControl fullWidth sx={{m: 2}}>
          <Controller
            name="multiplayerSupport"
            control={control}
            defaultValue={false}
            render={({field}) => (
              <Switch
                {...field}
                checked={field.value}
              />
            )}
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          {isAddGamePending ? "Adding game" : "Add game"}
        </Button>
      </form>
    </>
  );
};