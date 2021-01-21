export class Gauge {
    value: string;
    name: string;
    unit: string;

    constructor(value: string, name: string, unit: string) {
        this.value = value;
        this.name = name;
        this.unit = unit;
    }
}