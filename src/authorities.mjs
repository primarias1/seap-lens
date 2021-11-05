export const ENTITIES = [
    {
        shortName: 'S1MB',
        fiscalCode: '4505359',
        seapId: 1500
    },
    {
        shortName: 'ADP S1',
        fiscalCode: '4602068',
        seapId: 3770
    },
    {
        shortName: 'DITL S1',
        fiscalCode: '12293095',
        seapId: 3077
    },
    {
        shortName: 'DGASPC S1',
        fiscalCode: '15318810',
        seapId: 3256
    },
    {
        shortName: 'PL S1',
        fiscalCode: '17182756',
        seapId: 7260
    },
    {
        shortName: 'Caraiman',
        fiscalCode: '23410107',
        seapId: 31527
    },
    {
        shortName: 'Salubrizare S1',
        fiscalCode: '41640678',
        seapId: 100098523
    },
    {
        shortName: 'CIDSDIPP S1',
        fiscalCode: '40311936',
        seapId: 100071715
    }
]

export const authorityShortName = (fiscalCode) => {
    const match = ENTITIES
        .filter((entity) => { return entity.fiscalCode === fiscalCode; })
        .shift();

    if (match === undefined) {
        return null;
    } else {
        return match.shortName;
    }
};

export const authorityIds = () => {
    return ENTITIES.map((entity) => { return entity.seapId; });
}