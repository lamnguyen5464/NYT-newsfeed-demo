export default {
    upperWord(word: string) {
        if (!word) {
            return '';
        }
        return word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();
    },
};
