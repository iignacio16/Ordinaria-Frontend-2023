export type Evento = {
    id: string,
    title: string,
    date: Date,
    startHour: number,
    endHour: number,
    description: number
  }

export type eventQuery = {
    events: Evento[]
}