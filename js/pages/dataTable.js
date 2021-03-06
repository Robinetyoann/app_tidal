import { initDatas, addSelectOptions, renderSearchKeyWordInput } from "../data-table/js/data-tableFunc.js";
import { formatedMeridiens } from "../data-table/util/func.js";
import { updatePathologies } from '../data-table/store/data-table/pathoActions.js';
const datas = await initDatas();

const eventSelect = () => {
    $('select').on('changed.bs.select', async (e) => {
        const id = e.currentTarget.id.split('-')[1];
        const value = $(e.currentTarget).val();
        switch (id) {
            case 'caracteristique':
                return {'test' : 'test'}
                break;
            case 'pathologie':
                break;
            case 'meridiens':
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

const fetchKeywords = async (search) => {

    const myHeaders = new Headers();
    
    myHeaders.append('Content-Type', 'application/json')

    const myInit = {
        headers: myHeaders,
    };
    
    const symptomes = await fetch(CONFIG.API_HOST+'/symptomes/keywords')
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(error => {
            return error;
        });

        const keyWordWithSymptomes = symptomes.data.filter(symptome => symptome.keywords !== undefined&&symptome.keywords !== null)
    
        const filteredSymptomes = keyWordWithSymptomes.filter(({keywords}) => {
            return keywords.some(keyword => keyword.name.includes(search))
        })
        return filteredSymptomes;
}


$(async () => {
    
    renderSearchKeyWordInput();
    $(".selectpicker").selectpicker("refresh");
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

    $('#searchKeyWords').on('click', async () => {
        const keyword = $('#keyword').val();
        const regex = new RegExp(/[a-z]+/, 'gi');
        const match = keyword.match(regex) ? true : false;
        let str = '';
        if(match) {
            keyword.match(regex).forEach(element => {
                str += element;
                str += ' '
            });
            const text = str.slice(0, -1);
            try {
                const filteredSymptomes = await fetchKeywords(text);
                const idSymptomes = filteredSymptomes.map((symptome) => symptome.idS)
                formattedData = datas.pathologies.data.filter(({symptomes}) => {
                    return symptomes.some(symptome => idSymptomes.includes(symptome.idS))
                })    
                initTable('#table', formattedData)
            } catch (error) {
                console.error(error)
            }
        } else {
            formattedData = datas.pathologies.data;
            initTable('#table', formattedData)
        }
    })
});
