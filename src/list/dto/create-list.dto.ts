import { Medicine } from "src/medicine/entities/medicine.entity";

export class CreateListDto {
    id: number;
    name: string;
    pic: string;
    price: number;
    amount: number;
    desc: string;
    detail: string;
    medicine: Medicine;
}
