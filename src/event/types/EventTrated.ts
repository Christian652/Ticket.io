export type EventTrated = {  
    id: number;
    title: string,
    start_at: Date,
    end_at: Date,
    description: string,
    status: boolean,
    ticket_limit: number,
    ticket_price: number,
    company: {
      id: number
    },
    place: {
      id: number
    }
}