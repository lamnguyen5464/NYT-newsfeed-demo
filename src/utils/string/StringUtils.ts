export default {
    upperWord(word: string) {
        if (!word) {
            return '';
        }
        return word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();
    },

    isMatching(word1: string, words2: string) {
        return word1?.toLowerCase()?.includes(words2?.toLowerCase());
    },
};
