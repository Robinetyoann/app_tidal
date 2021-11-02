import { apiCall } from '../store/data-table/pathoActions.js';

export const addSelectOptions = async (data) => {
    const meridiens = data.map((data) => {
        return data.meridiens.nom;
    });
    const meridiensUniq = [...new Set(meridiens)]
    $.each(meridiensUniq, function (i, item) {
        $('#select-meridiens').append($('<option>', { 
            value: item.toLowerCase(),
            text : item
        }));
    });
    $("#select-meridiens").selectpicker("refresh");
}

export const initDatas = () => {
    return apiCall();
}
