import React, { useEffect } from "react";
import { DELETE_EVENT, GET_EVENTS } from "@/queries";
import { Evento, eventQuery } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@mui/material";
import { toast} from "react-toastify"

const ListaEventos = ({dataa}: {dataa?: Evento[]} )=>{

    const [eventos, setEventos] = React.useState<Evento[] | undefined>(undefined);
    const [deleteEvent] = useMutation(DELETE_EVENT)

    const { data, loading, error, refetch } = useQuery< eventQuery | undefined>(GET_EVENTS);

    
    useEffect(()=>{
        try{
            setEventos(dataa)
        }catch(error:any){
            toast.error('No hay eventos');
            setEventos(undefined)
        }
    },[data])
    
    if(loading) return <div>Loading...</div>
    if(error) return toast.error


    if(!dataa || dataa.length === 0) return <div>No hay eventos </div>
    return(
        <>
        <ul>
            {dataa.map((e)=>{
                const dataObj = new Date(e.date);
                const day = dataObj.getDate();
                const monthName = dataObj.toLocaleString("default", {
                    month: "long",
                  });
                  const year = dataObj.getFullYear();
                return(
                <li key={e.id}>
                    <p>ID: {e.id}</p>
                    <p>Title: {e.title}</p>
                    <ul>Date:
                        <li>Day: {day}</li>
                        <li>Month: {monthName}</li>
                        <li>Year: {year}</li>
                    </ul>
                    <p>Start Hour: {e.startHour}</p>
                    <p>End Hour : {e.endHour}</p>
                    <p>Descripcion: {e.description}</p>
                 <Button
                  onClick={async () => {
                      await deleteEvent ({
                        variables:{
                            deleteEventId: e.id,
                        },
                    })
                    refetch();
                  }}>
                Delete Event
                </Button>
                </li>
                )
            }) }
        </ul>
        </>
    )
}

export default ListaEventos;