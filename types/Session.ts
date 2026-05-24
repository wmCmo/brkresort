export function isHouseType(value: unknown): value is HouseType {
    return Object.keys(HouseObj).some(item => item === value);
}

export const HouseObj = {
    'makarm': {
        th: "มะขาม",
        id: "1c5b2a8f171b8006a3a8000c831f24eb"

    },
    "peep": {
        th: "ปีป",
        id: "1c5b2a8f171b80c0889df4948327a7cf"
    },
    "jak": {
        th: "จาก",
        id: "1c5b2a8f171b80328fd2e7100fb3f382"
    },
    "manao": {
        th: "มะนาว",
        id: "1c5b2a8f171b802cb930e0fd13230608"
    },
    "jun-pha": {
        th: "จันทร์ผา",
        id: "1c5b2a8f171b80d9852df6558657fad2"
    },
    "chor-muang": {
        th: "ช่อม่วง",
        id: "1c5b2a8f171b8071926bf4cd4938280a"
    }
} as const;

export type HouseType = keyof typeof HouseObj;

export type SessionType = {
    house: HouseType | null;
    checkout: string;
    sig: string;
};
