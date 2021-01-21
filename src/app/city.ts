import { Gauge } from "./gauge";

export interface City {
    userid: string,
    cityname: string,
    id: number,
    gauges: Gauge[]
}