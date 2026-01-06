import { Typography } from "@mui/material";
import type { CreateItemFormData } from "../../interfaces/CreateItemFormData";
import { ItemForm } from "../../components/ItemForm/ItemForm";

export function CreateItemPage() {
  function handleCreate(data: CreateItemFormData) {
    const items = JSON.parse(localStorage.getItem("items") || "[]");

    const newItem = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("items", JSON.stringify([...items, newItem]));
    alert("Item criado com sucesso!");
  }

  return (
    <>
      <Typography variant="h5" mb={2}>
        Criar novo item
      </Typography>

      <ItemForm
        submitLabel="Criar item"
        onSubmit={handleCreate}
      />
    </>
  );
}
