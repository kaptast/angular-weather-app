export interface City {
    userid: string,
    cityname: string,
    id: string,
    main: {
        temp: number,
        humidity: number,
        pressure: number
    },
    wind: {
        speed: number,
        deg: number
    }
}