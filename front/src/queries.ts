import { gql } from "@apollo/client";

export const CREATE_EVENT = gql`
mutation CreateEvent($title: String!, $date: Date!, $startHour: Int!, $endHour: Int!, $description: String!) {
  createEvent(title: $title, date: $date, startHour: $startHour, endHour: $endHour, description: $description) {
    id
    title
  }
}
`;

export const DELETE_EVENT = gql`
mutation DeleteEvent($deleteEventId: ID!) {
  deleteEvent(id: $deleteEventId) {
    date
    description
    endHour
    id
    startHour
    title
  }
}
`;

export const UPDATE_EVENT = gql`
mutation UpdateEvent($updateEventId: ID!, $title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
  updateEvent(id: $updateEventId, title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
    id
    date
    description
    endHour
    title
    startHour
  }
}
`;

export const GET_EVENTS = gql`
query Events {
  events {
    id
    date
    description
    endHour
    startHour
    title
  }
}
`;