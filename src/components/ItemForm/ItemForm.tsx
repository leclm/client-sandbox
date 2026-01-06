import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import type { CreateItemFormData } from "../../interfaces/CreateItemFormData";


interface ItemFormProps {
  defaultValues?: CreateItemFormData;
  onSubmit: (data: CreateItemFormData) => void;
  submitLabel: string;
}

export function ItemForm({
  defaultValues,
  onSubmit,
  submitLabel,
}: ItemFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemFormData>({
    defaultValues,
  });

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Nome do produto"
                {...register("name", { required: "Informe o nome." })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Preço"
                {...register("price", {
                  required: "Informe o preço.",
                  valueAsNumber: true,
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Quantidade"
                {...register("quantity", {
                  required: "Informe a quantidade.",
                  min: { value: 1, message: "Quantidade mínima é 1." },
                  valueAsNumber: true,
                })}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Início da oferta"
                {...register("startDate", {
                  required: "Informe a data de início.",
                })}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Fim da oferta"
                {...register("endDate", {
                  required: "Informe a data de fim.",
                })}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" variant="contained">
                  {submitLabel}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}
