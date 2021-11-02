export const formatedMeridiens = (datas) => {
    datas.map((data) => {
        return data['nomMeridien'] = data.meridiens.nom;
    })
    return datas
}