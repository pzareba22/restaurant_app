export interface IUser {
    _id?: number;
    username: string;
    isAdmin: boolean;
    isManager: boolean;
    isBanned: boolean;
    JWT: string;
    reviews: Array<IReview>;
    orders: Array<IOrder>;
}

export interface IOrder {
    _id?: number;
    username: string;
    amount: number;
    dishID: number;
}

export interface IDish {
    _id?: number;
    name: string;
    cuisine: Cuisine;
    type: DishType;
    category: DishCategory;
    ingredients: Array<string>;
    dayAmount: number;
    price: number;
    description: string;
    images: Array<string>;
}

export interface IReview {
    username: string;
    content: string;
    grade: number;
    _id?: number;
    dishID: number;
}

export type Cuisine =
    | "Polska"
    | "Włoska"
    | "Indyjska"
    | "Międzynarodowa"
    | "Francuska";

export type DishType = "Wegański" | "Mięsny";

export type DishCategory =
    | "Zupa"
    | "Danie główne"
    | "Sałatka"
    | "Przystawka"
    | "Kolacja"
    | "Śnianadnie";

export const dishes: Array<IDish> = [
    {
        name: "Zupa pomidorowa",
        cuisine: "Polska",
        type: "Mięsny",
        category: "Zupa",
        ingredients: ["Przecier pomidorowy", "Bulion drobiowy", "Makaron"],
        dayAmount: 50,
        price: 7.5,
        description:
            "Klasyk kuchni polskiej, pomidorowa na wczorajszym rosole, palce lizać",
        images: ["./images/pomidorowa.jpg", "./images/pomidorowa1.png"],
    },
    {
        name: "Kotlet mielony z ziemniakami",
        cuisine: "Polska",
        type: "Mięsny",
        category: "Danie główne",
        ingredients: ["Mięso wołowo-wieprzowe", "Cebula", "Ziemniaki"],
        dayAmount: 40,
        price: 15.5,
        description:
            "Świeży kotlet mielony, podany z pieczonymi ziemniaczkami w formie łódeczek",
        images: [
            "./images/mielony.jpg",
            "./images/mielony1.png",
            "./images/mielony2.png",
        ],
    },
    {
        name: "Stek wołowy z frytkami",
        cuisine: "Międzynarodowa",
        type: "Mięsny",
        category: "Danie główne",
        ingredients: [
            "Antrykot wołowy",
            "ziemniaki",
            "keczup Pudliszki",
            "Sól",
        ],
        dayAmount: 15,
        price: 25,
        description:
            "Potężny stek z antrykotu wołowego, podany ze świeżymi frytkami smażonymi na głębokim tłuszczu z wybornym sosem",
        images: [
            "./images/stek.jpg",
            "./images/stek1.png",
            "./images/stek2.png",
        ],
    },
    {
        name: "Curry z soczewicy",
        cuisine: "Indyjska",
        type: "Wegański",
        category: "Danie główne",
        ingredients: ["Soczewica", "Imbir", "Pomidory", "Morele", "Ryż"],
        dayAmount: 20,
        price: 20,
        description:
            "Jest to danie indyjskie - tzw. dal, czyli potrawa z roślin strączkowych",
        images: ["./images/curry.jpg", "./images/curry2.jpg"],
    },
    {
        name: "Ratatuj",
        cuisine: "Francuska",
        type: "Wegański",
        category: "Przystawka",
        ingredients: ["Papryka", "Cukinia", "Bakłażan", "Pomidory", "Cebula"],
        dayAmount: 30,
        price: 14,
        description:
            "Ratatouille to klasyczna potrawa francuska wywodząca się z Nicei",
        images: [
            "./images/ratatuj.jpg",
            "./images/ratatuj1.jpg",
            "./images/ratatuj2.jpg",
        ],
    },
    {
        name: "Pizza Hawajska",
        cuisine: "Włoska",
        type: "Mięsny",
        category: "Danie główne",
        ingredients: ["Sos pomidorowy szefa", "Ananas", "Szynka", "Ciasto"],
        dayAmount: 30,
        price: 14,
        description:
            "Magnum opus kuchni włoskiej, słona szynka w połączeniu ze słodkim ananasem",
        images: ["./images/hawajska.jpg", "./images/pizza1.jpg"],
    },
    {
        name: "Zupa cebulowa",
        cuisine: "Polska",
        type: "Mięsny",
        category: "Zupa",
        ingredients: ["Cebula", "Bulion drobiowy", "Łyżka"],
        dayAmount: 50,
        price: 7,
        description: "Klasyk kuchni polskiej ze świeżo zebranych warzyw",
        images: [
            "./images/cebulowa.jpg",
            "./images/cebulowa1.jpeg",
            "./images/cebulowa2.jpg",
        ],
    },
    {
        name: "Wodzionka",
        cuisine: "Polska",
        type: "Wegański",
        category: "Zupa",
        ingredients: ["Suchy chleb", "Wody szklonka", "Czosnek"],
        dayAmount: 65,
        price: 5.5,
        description: "Tradycyjna potrawa kuchni śląskiej",
        images: ["./images/wodzionka.png", "./images/wodzionka1.jpg"],
    },
    {
        name: "Lasagne z parmezanem",
        cuisine: "Włoska",
        type: "Wegański",
        category: "Danie główne",
        ingredients: ["Makaron", "Sos Bolognese", "Ser Grana Padano"],
        dayAmount: 30,
        price: 23,
        description:
            "Jedno z najpopularniejszych dań kuchni włoskiej, z Polską nutką",
        images: [
            "./images/lasagne.jpg",
            "./images/lasagne1.jpg",
            "./images/lasagne2.jpg",
        ],
    },
    {
        name: "Sałatka Kolesław",
        cuisine: "Międzynarodowa",
        type: "Wegański",
        category: "Sałatka",
        ingredients: ["Biała kapusta", "Cebula", "Świeża marchew"],
        dayAmount: 55,
        price: 13,
        description: "Świeża sałatka z przepysznych warzyw",
        images: [
            "./images/coleslaw.jpg",
            "./images/coleslaw1.jpg",
            "./images/coleslaw2.jpg",
        ],
    },
    {
        name: "Chleb ze smalcem",
        cuisine: "Polska",
        type: "Mięsny",
        category: "Przystawka",
        ingredients: ["Chleb", "Smalec", "Sól i pieprz do smaku"],
        dayAmount: 120,
        price: 7,
        description: "Pożywne śniadanie dla każdego",
        images: [
            "./images/chleb.jpg",
            "./images/chleb1.jpg",
            "./images/chleb2.jpg",
        ],
    },
    {
        name: "Pierogi ruskie na smalcu",
        cuisine: "Polska",
        type: "Mięsny",
        category: "Kolacja",
        ingredients: ["Pierogi", "Smalec", "Ser"],
        dayAmount: 40,
        price: 16,
        description: "Klasyk kuchni Polskiej, prawdziwie Polskiej",
        images: ["./images/pierogi.jpg", "./images/pierogi1.jpg"],
    },
];

export type borderType = "" | "max" | "min";
