//Departaments
export interface ListingTypeDepartment {
    id: number;
    name: string;
    image: string;
    description: string;
    functions: string[];
    links: string[];
    postdescription: string;
    sub: SubItemTypeDepartment[];
    schedule: string;
    mail: string;
    phone: string;
    galery: string[];
    category: string;
    building: number;
    unit: string;
    contact: number;
}

//Departaments
interface SubItemTypeDepartment {
    name: string;
    description: string;
    functions: string[];
    image?: string;
    postdescription?: string;
    links: string[];
}

//Auditorium
export interface ListingTypeAuditorium {
    id: number;
    name: string;
    image: string;
    description: string;
    functions: string[];
    links: string[];
    postdescription: string;
}

//CLASSROOM
export interface ListingTypeClassroom {
    id: number;
    name: string;
    image: string;
    description: string;
    functions: string[];
    postdescription: string;
    galery: string[];
    category: string;
    building: number;
    unit: string;
}

//DIRECTORS
export interface ListingTypeDirector {
    id: number;
    name: string;
    image: string;
    description: string;
    period: string;
}

//JEFATURAS
export interface ListingTypeJefatura {
    id: number;
    name: string;
    image: string;
    organigramaImage: string;
    description: string;
    functions: string[];
    schedule: string;
    mail: string;
    phone: string;
    web: string;
    facebook: string;
    category: string;
    building: number;
    unit: string;
    contact: number;
}

//LABORATORY
export interface ListingTypeLaboratory {
    id: number;
    name: string;
    image: string;
    description: string;
    functions: string[];
    postdescription: string;
    links: string[];
    galery: string[];
    schedule: string;
    mail: string;
    phone: string;
    category: string;
    building: number;
    unit: string;
    contact: number;
}

//OTROS
export interface ListingTypeOther {
    id: number;
    name: string;
    image: string;
    description: string;
    functions: string[];
    links: string[];
    postdescription: string;

    schedule: string;
    mail: string;
    phone: string;
    category: string;
    building: number;
    unit: string;
    contact: number;
}

//PARKING
export interface ListingTypeParking {
    id: number;
    name: string;
    image: string;
    description: string;
    schedule: string;
    access: string[];
}

//PTC
export interface ListingTypePtc {
    id: number;
    name: string;
    image: string;
    description: string;
    functions: string[];
    postdescription: string;
    schedule: string;
    teachers: string[];
    galery: string[];
    building: number;
    category: string;
    unit: string;
}
