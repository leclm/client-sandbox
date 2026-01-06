import { Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import type { CreateItemFormData } from "../../interfaces/CreateItemFormData";
import type { Item } from "../../interfaces/Item";
import { ItemForm } from "../../components/ItemForm/ItemForm";

export function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const items: Item[] = JSON.parse(localStorage.getItem("items") || "[]");
  const item = items.find((i) => i.id === id);

  if (!item) {
    return <Typography>Item não encontrado</Typography>;
  }

  function handleUpdate(data: CreateItemFormData) {
    const updatedItems = items.map((i) =>
      i.id === id ? { ...i, ...data } : i
    );

    localStorage.setItem("items", JSON.stringify(updatedItems));
    alert("Item atualizado com sucesso!");
    navigate("/");
  }

  return (
    <>
      <Typography variant="h5" mb={2}>
        Editar item
      </Typography>

      <ItemForm
        defaultValues={item}
        submitLabel="Salvar alterações"
        onSubmit={handleUpdate}
      />
    </>
  );
}
