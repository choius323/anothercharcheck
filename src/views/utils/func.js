import dictionary from "../../data/dictionary.json";

export const chooseLang = (language, kor) => {
    const array = dictionary.find(e => e.kor === kor)
    if(array)
        return array[language]
}