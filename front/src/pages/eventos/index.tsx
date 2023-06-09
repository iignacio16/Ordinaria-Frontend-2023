import React, { useEffect } from "react";
import * as yup from "yup"; //Para validar esquemas
import {useForm} from "react-hook-form"; //Para administrar formularios
import { yupResolver } from "@hookform/resolvers/yup"; //Para integrar yup con react-hook-form
import { Button, TextField } from "@mui/material"; //mui biblioteca proporciona componentes de interfaz de usuario
import {ToastContainer, toast} from "react-toastify"
import { useMutation,useQuery } from "@apollo/client";
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components"
import { CREATE_EVENT, GET_EVENTS } from "@/queries";
import { Evento, eventQuery } from "@/types";
import ListaEventos from "@/components/listaEventos";

type FormValues = {
    title:string,
    date: Date,
    startHour: number,
    endHour: number,
    description: string
}

const schema = yup.object().shape({
    title: yup.string().required("Titulo Requerido"),
    date: yup.date().min(new Date()).max(new Date(2024,11, 31)).required("La fecha es requerida"),
    startHour: yup.number().min(0).max(24).required("Start Hour required"),
    endHour: yup.number().min(0).max(24).required("Hora de finalizacion requerida"),
    description: yup.string().required("Descripcion requerida")
})

const EventosPage = () =>{
    const [eventos, setEventos] = React.useState<Evento[] | undefined>(undefined);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<FormValues>({
        resolver: yupResolver(schema) 
    });

    const[createEvent] = useMutation(CREATE_EVENT);
    
    const { data, loading, error, refetch } = useQuery< eventQuery | undefined>(GET_EVENTS);

    
    useEffect(()=>{
        try{
            setEventos(data?.events)
        }catch(error:any){
            toast.error('No hay eventos');
            setEventos(undefined)
        }
    },[data])
    
    if(loading) return <div>Loading...</div>
    if(error) return toast.error

    const onSubmit = (data: FormValues) => {
        createSlotHandler(data)
          .then(() => {
            toast.success("Slot added");
          })
          .catch(() => {
            toast.error("Error creating slot");
          });
      };

    const createSlotHandler = async (data: FormValues) => {
        const {title, date, startHour, endHour, description} = data;
        try{
            if(endHour < startHour){
                toast.error("La hora de fin no puede ser menor a la de inicio");
            }
            const eventoDuplicado  = eventos?.find((s) => s.title === title && s.date === date && s.startHour === startHour)
            if(eventoDuplicado){
                toast.error("Evento Duplicado");
            }
            const result = await createEvent({
                variables: {
                    title:title,
                    date: date,
                    startHour: startHour,
                    endHour: endHour,
                    description: description
                },
            });
            refetch();
            reset();
            toast.success("Success");
            return result;

        }catch(error:any){
            toast.error("Error:", error.message);
            reset();
            throw error;
            
        }
    }
    
    
    return(
        <>
         <StyledToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            Titulo:
            <TextField
            label= "title"
            type="text"
            {...register('title')}
            error={!!errors.title}
            />
            </div>
            <div>
            Selecciona una fecha:{" "}
            <TextField
            id="date"
            {...register("date")}
            type="date"
            label="Fecha"
            error={!!errors.date}
            InputLabelProps={{
                shrink: true,
            }}
            />  
            </div>
            <div>
            Selecciona hora inicio:{" "}
            <TextField
            label= "hour"
            type="number"
            {...register('startHour')}
            error={!!errors.startHour}
            />
            </div>
            <div>
            Selecciona hora final:{" "}
            <TextField
            label= "hour"
            type="number"
            {...register('endHour')}
            error={!!errors.endHour}
            />
            </div>
            <div>
            Descripcion: {" "}
            <TextField
            label= "description"
            type="text"
            {...register('description')}
            error={!!errors.description}
            />
            </div>
            <Button type="submit" variant="contained">Add Event</Button>
        </form>
        <br/>

        <div>
            Lista Eventos: <br/>
            <ListaEventos dataa={eventos}/>
        </div>
        </>
    )
}

export default EventosPage;

const StyledToastContainer = styled(ToastContainer)`
position: fixed;
top: 20px;
right: 20px;
width: 200px;
height: 200px;
`;