const styleFinder = (styleId) => {

    switch(styleId) {
        case 1:
            return ["font-serif", "text-red-500"];

        case 2:
            return ["font-mono", "text-red-500"];

        case 3:
            return ["font-sans", "text-red-500"]

        case 4:
            return ["font-serif", "text-yellow-500"];

        case 5:
            return ["font-mono", "text-yellow-500"];

        case 6:
            return ["font-sans", "text-yellow-500"]

        case 7:
            return ["font-serif", "text-yellow-300"];

        case 8:
            return ["font-mono", "text-yellow-300"];

        case 9:
            return ["font-sans", "text-yellow-300"]

        case 10:
            return ["font-serif", "text-green-700"];

        case 11:
            return ["font-mono", "text-green-700"];

        case 12:
            return ["font-sans", "text-green-700"]

        case 13:
            return ["font-serif", "text-blue-400"];

        case 14:
            return ["font-mono", "text-blue-400"];

        case 15:
            return ["font-sans", "text-blue-400"]

        case 16:
            return ["font-serif", "text-purple-800"];

        case 17:
            return ["font-mono", "text-purple-800"];
        case 18:
            return ["font-sans", "text-purple-800"]
        case 19:
            return ["font-serif", "text-black-800"]
        case 20:
            return ["font-mono", "text-black-800"]
        case 21:
            return ["font-sans", "text-black-800"]
        default:
            return ["font-mono", "text-black"]
    }

}

export default styleFinder;
