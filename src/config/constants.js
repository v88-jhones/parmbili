
export const DEFAULT = {
    EARNINGS: 50,
    LAND_SQUARE: 4,
    MAX_LAND_SQUARE: 8
}

export const TILE = {
    EMPTY: 0,
    TILLED: 1,
    HAS_PLANT: 2,
    HARVEST: 3
};

export const PLANTS = [
    {
        id: 1,
        name: "potato",
        time_to_harvest: 20,
        cost: 10,
        reward: 15,
        image: "potato.png"
    },
    {
        id: 2,
        name: "onion",
        time_to_harvest: 80,
        cost: 15,
        reward: 25,
        image: "onion.png"
    },
    {
        id: 3,
        name: "carrot",
        time_to_harvest: 120,
        cost: 25,
        reward: 75,
        image: "carrot.png"
    },
    {
        id: 4,
        name: "corn",
        time_to_harvest: 180,
        cost: 35,
        reward: 100,
        image: "corn.png"
    }
];

export const EXPAND_LAND_COST = {
    5: 180,
    6: 270,
    7: 360,
    8: 450,
};