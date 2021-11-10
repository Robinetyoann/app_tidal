import { 
    LOAD_PATHOLOGIES,
    LOAD_PATHOLOGIES_ERROR,
    LOAD_PATHOLOGIES_SUCCESS,
    pathoReducer } from './pathoReducer.js';
import { filters } from '../../../pages/dataTable.js';

const loadPathologies = () => {
    return {
        type: LOAD_PATHOLOGIES
    }
}

const loadPathologiesSuccess = (pathologies) => {
    return {
        type: LOAD_PATHOLOGIES_SUCCESS,
        payload: pathologies
    }
}

const loadPathologiesError = (errors) => {
    return {
        type: LOAD_PATHOLOGIES_ERROR,
        payload: errors
    }
}

export const apiCall = async () => {
    pathoReducer(undefined, loadPathologies());
    return await fetch('http://localhost:8888/api_tidal/pathologies/symptomes/meridiens')
        .then(response => response.json())
        .then(response => {
            return pathoReducer(undefined, loadPathologiesSuccess(response));
        })
        .catch(error => {
            return pathoReducer(undefined, loadPathologiesError(error));
        });
}

export const updatePathologies = async (filter, datas) => {
    
    pathoReducer(undefined, loadPathologies());
    const data = await apiCall();
    try {
        let filterPathologies;
        const filterType = Object.keys(filter)[0];
        const filterValue = Object.values(filter)[0];
        switch (filterType) {
            case 'caracteristique':
                if(filters.meridiens.length !== 0 && filters.pathologie !== 'null') {
                    filterPathologies = data.pathologies.data.filter((pathologie) => {
                        return filters.meridiens.includes(pathologie.meridiens.nom.toLowerCase());
                    });

                    filterPathologies = filterPathologies.filter((pathologie) => {
                        return pathologie.desc.toLowerCase().includes(filters.pathologie);
                    });

                    if(filters.caracteristique !== 'null') {
                        filterPathologies = data.pathologies.data.filter((pathologie) => {
                            return pathologie.desc.toLowerCase().includes(filters.caracteristique);
                        });
                    }
                } else if(filters.meridiens.length !== 0 && filters.pathologie === 'null') {
                    filterPathologies = data.pathologies.data.filter((pathologie) => {
                        return filters.meridiens.includes(pathologie.meridiens.nom.toLowerCase());
                    });

                    if(filters.caracteristique !== 'null') {
                        filterPathologies = data.pathologies.data.filter((pathologie) => {
                            return pathologie.desc.toLowerCase().includes(filters.caracteristique);
                        });
                    }
                } else if(filters.meridiens.length === 0 && filters.pathologie !== 'null') {
                    filterPathologies = data.pathologies.data.filter((pathologie) => {
                        return pathologie.desc.toLowerCase().includes(filters.pathologie);
                    });

                    if(filters.caracteristique !== 'null') {
                        filterPathologies = data.pathologies.data.filter((pathologie) => {
                            return pathologie.desc.toLowerCase().includes(filters.caracteristique);
                        });
                    }
                } else if(filters.meridiens.length === 0 && filters.pathologie === 'null') {
                    
                    if(filters.caracteristique !== 'null') {
                        filterPathologies = data.pathologies.data.filter((pathologie) => {
                            return pathologie.desc.toLowerCase().includes(filters.caracteristique);
                        });
                    } else {
                        filterPathologies = data.pathologies.data;
                    }
                }
                break;
            case 'pathologie':
                if(filters.meridiens.length !== 0 && filters.caracteristique !== 'null') {
                    filterPathologies = data.pathologies.data.filter((pathologie) => {
                        return filters.meridiens.includes(pathologie.meridiens.nom.toLowerCase());
                    });

                    filterPathologies = filterPathologies.filter((pathologie) => {
                        return pathologie.desc.toLowerCase().includes(filters.caracteristique);
                    });

                    if(filters.pathologie !== 'null') {
                        filterPathologies = data.pathologies.data.filter((pathologie) => {
                            return pathologie.desc.toLowerCase().includes(filters.pathologie);
                        });
                    }
                } else if(filters.meridiens.length !== 0 && filters.caracteristique === 'null') {
                    filterPathologies = data.pathologies.data.filter((pathologie) => {
                        return filters.meridiens.includes(pathologie.meridiens.nom.toLowerCase());
                    });

                    if(filters.pathologie !== 'null') {
                        filterPathologies = data.pathologies.data.filter((pathologie) => {
                            return pathologie.desc.toLowerCase().includes(filters.pathologie);
                        });
                    }
                } else if(filters.meridiens.length === 0 && filters.caracteristique !== 'null') {
                    filterPathologies = data.pathologies.data.filter((pathologie) => {
                        return pathologie.desc.toLowerCase().includes(filters.caracteristique);
                    });

                    if(filters.pathologie !== 'null') {
                        filterPathologies = data.pathologies.data.filter((pathologie) => {
                            return pathologie.desc.toLowerCase().includes(filters.pathologie);
                        });
                    }
                } else if(filters.meridiens.length === 0 && filters.caracteristique === 'null') {
                    if(filters.pathologie !== 'null') {
                        filterPathologies = data.pathologies.data.filter((pathologie) => {
                            return pathologie.desc.toLowerCase().includes(filters.pathologie);
                        });
                    } else {
                        filterPathologies = data.pathologies.data;
                    }
                }
                break;
            case 'meridiens':
                if(filters.pathologie !== 'null' && filters.caracteristique !== 'null') {
                    filterPathologies = data.pathologies.data.filter((pathologie) => {
                        return pathologie.desc.toLowerCase().includes(filters.pathologie);
                    });

                    filterPathologies = filterPathologies.filter((pathologie) => {
                        return pathologie.desc.toLowerCase().includes(filters.caracteristique);
                    });

                    console.log(filters.meridiens)
                    
                    if(filters.meridiens.length !== 0) {
                        
                        filterPathologies = filterPathologies.filter((pathologie) => {
                            return filters.meridiens.includes(pathologie.meridiens.nom.toLowerCase());
                        });
                    }
                    
                } else if(filters.pathologie === 'null' && filters.caracteristique !== 'null') {
                    filterPathologies = data.pathologies.data.filter((pathologie) => {
                        return pathologie.desc.toLowerCase().includes(filters.caracteristique);
                    });

                    if(filters.meridiens.length !== 0) {
                        filterPathologies = filterPathologies.filter((pathologie) => {
                            return filters.meridiens.includes(pathologie.meridiens.nom.toLowerCase());
                        });
                    }
                } else if(filters.pathologie !== 'null' && filters.caracteristique === 'null') {
                    filterPathologies = data.pathologies.data.filter((pathologie) => {
                        return pathologie.desc.toLowerCase().includes(filters.pathologie);
                    });

                    if(filters.meridiens.length !== 0) {
                        filterPathologies = filterPathologies.filter((pathologie) => {
                            return filters.meridiens.includes(pathologie.meridiens.nom.toLowerCase());
                        });
                    }
                } else if(filters.pathologie === 'null' && filters.caracteristique === 'null') {
                    if(filters.meridiens.length !== 0) {
                        filterPathologies = data.pathologies.data.filter((pathologie) => {
                            return filters.meridiens.includes(pathologie.meridiens.nom.toLowerCase());
                        });
                    } else {
                        filterPathologies = data.pathologies.data;
                    }
                }
                break;
        }
        
        if(filterPathologies.length !== 0) {
            return pathoReducer(undefined, loadPathologiesSuccess(filterPathologies));
        }
        
    } catch (error) {
        return pathoReducer(undefined, loadPathologiesError(error));
    }
};