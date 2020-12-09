const sortByPronoun = (verbFamily, pattern, infinitive, root) =>
{
    const sortedFamily = verbFamily.map(
        (subFamily) =>{
            let sortedSubData = subFamily.data.slice(0).sort(function(a,b) {
                return pronounOrder.indexOf(a.possession.morphology) - pronounOrder.indexOf(b.possession.morphology);
            })
            return {tense: subFamily.tense, data: sortedSubData, pattern, infinitive, root}
        }
    );
    return sortedFamily;
}

const pronounOrder = [
    'FIRST+MF+SINGULAR', 
    'FIRST+M+SINGULAR', 
    'FIRST+F+SINGULAR', 
    'SECOND+M+SINGULAR', 
    'SECOND+F+SINGULAR',
    'THIRD+M+SINGULAR',
    'THIRD+F+SINGULAR',
    'FIRST+MF+PLURAL',
    'FIRST+M+PLURAL',
    'FIRST+F+PLURAL',
    'THIRD+M+PLURAL',
    'THIRD+F+PLURAL',
    'SECOND+M+PLURAL',
    'SECOND+F+PLURAL'
];

export default sortByPronoun;