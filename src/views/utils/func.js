import dictionary from "../data/dictionary.json";

export const chooseLang = (language, kor) => {
    const array = dictionary.find(e => e.kor === kor)
    if(language === "kor")
        return array.kor;
    else if(language === "jap")
        return array.jap;
    else   
        return array.eng;
}