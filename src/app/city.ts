export interface City {
    userid: string,
    cityname: string,
    id: number,
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