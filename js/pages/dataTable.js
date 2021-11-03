import { initDatas, addSelectOptions } from "../data-table/js/data-tableFunc.js";
import { formatedMeridiens } from "../data-table/util/func.js";
import { updatePathologies } from '../data-table/store/data-table/pathoActions.js';

const datas = await initDatas();

const eventSelect = () => {
    $('select').on('changed.bs.select', async (e) => {
        const id = e.currentTarget.id.split('-')[1];
        const value = $(e.currentTarget).val();
        switch (id) {
            case 'caracteristique':
                console.log('caracteristique')
                return {'test' : 'test'}
                break;
            case 'pathologie':
                console.log('pathologie') // patho
                break;
            case 'meridiens':
                console.log('meridiens') // meridien en fonction des patho
                break;
            default:
                break;
        }
    });
}

const initTable = async (tableId, data) => {
    $('#table').bootstrapTable('destroy');
    const configTable = {
        pagination: true,
        contentType: 'application/json',
        detailView: true,
        detailFormatter: (index, rows, element) => {
            const { symptomes } = rows;
            let htmlBuilder = '<b>Symptomes:</b><ol>'
            symptomes.map(symptome => {
                htmlBuilder += '<li>' + symptome.desc + '</li>';
            });
            htmlBuilder += '</ol>';
            return htmlBuilder;
        },
    }

    $(tableId).bootstrapTable({
        ...configTable,
        data: data,
        columns: [
            {
                field: 'idP',
                title: 'Item ID'
            },
            {
                field: 'desc',
                title: 'Description'
            },
            {
                field: 'nomMeridien',
                title: 'Meridien',
            },
        ]
    });
    $('#table').bootstrapTable('refresh')
}

export const filters = {
    caracteristique: 'null',
    pathologie: 'null',
    meridiens: [],
};

$(async () => {
    addSelectOptions(datas.pathologies.data);
    const { pathologies } = datas;
    let formattedData = formatedMeridiens(pathologies.data)
    initTable('#table', formattedData);

    $('select').on('changed.bs.select', async (e) => {
        const id = e.currentTarget.id.split('-')[1];
        const value = $(e.currentTarget).val();
        switch (id) {
            case 'caracteristique':
                filters.caracteristique = value.toLowerCase();
                const datasCarac = await updatePathologies({caracteristique: value.toLowerCase()}, formattedData);
                formattedData = formatedMeridiens(datasCarac.pathologies);
                initTable('#table', formattedData)
                break;
            case 'pathologie':
                filters.pathologie = value.toLowerCase();
                const datasPatho = await updatePathologies({pathologie: value.toLowerCase()}, formattedData);
                formattedData = formatedMeridiens(datasPatho.pathologies);
                initTable('#table', formattedData)
                break;
            case 'meridiens':
                filters.meridiens = value;
                const datasMer = await updatePathologies({meridiens: value}, formattedData);
                formattedData = formatedMeridiens(datasMer.pathologies);
                initTable('#table', formattedData)
                break;
            default:
                break;
        }
    });
});
