//import { Button } from "@mui/material";

export default function Home() {
  return (
    <>
      <button
        onClick={() => {
          window.location.href = "/eventos";
        }}
      >
        Gestion Eventos
      </button>
      <button
        onClick={() => {
          window.location.href = "/pacie";
        }}
      >
        Consultar Eventos
      </button>

    </>
  )
}
