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

const isGranted = () => {
    const token = localStorage.getItem('token');
    if(token !== null) {
        return true;
    }
    return false;
}

export const renderSearchKeyWordInput = () => {
    const keyWordDiv = $('#divKeyWord');
    keyWordDiv.css({'display': 'none'})
    if(isGranted()) {
        keyWordDiv.css({'display': 'flex'})
    }
}

