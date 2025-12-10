import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { usePopularMovies } from '../../hooks/usePopularMovies';
import type { Movie } from '../../services/tmdb';

const columnHelper = createColumnHelper<Movie>();

export function DashboardPage() {
  const { data, isLoading, isError, error } = usePopularMovies();

  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const movies = data?.results ?? [];

  const filteredMovies = useMemo(() => {
    const search = filter.trim().toLowerCase();
    if (!search) return movies;

    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(search),
    );
  }, [movies, filter]);

  const pagedMovies = useMemo(
    () =>
      filteredMovies.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [filteredMovies, page, rowsPerPage],
  );

  useEffect(() => {
    setPage(0);
  }, [filter]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('title', {
        header: () => 'Título',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('release_date', {
        header: () => 'Lançamento',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('vote_average', {
        header: () => 'Nota média',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('popularity', {
        header: () => 'Popularidade',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('original_language', {
        header: () => 'Idioma',
        cell: (info) => info.getValue(),
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: pagedMovies,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" mt={4}>
        Erro ao carregar filmes: {(error as Error).message}
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" mb={2}>
        Produtos (Filmes Populares do TMDB)
      </Typography>

      <Card>
        <CardContent>
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              gap: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Lista de filmes</Typography>

            <TextField
              label="Filtrar por título"
              size="small"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>

              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell!,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                {table.getRowModel().rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <Typography align="center" sx={{ py: 3 }}>
                        Nenhum resultado encontrado.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filteredMovies.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[rowsPerPage]}
          />
        </CardContent>
      </Card>
    </>
  );
}
