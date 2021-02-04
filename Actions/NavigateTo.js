const navigateTo = (navigator) => (navigation, screen, params) => {
    navigation.navigate(navigator, {screen, initial: false, params});
}

export const navigateToPattern = navigateTo('Learn');

export const navigateToSearch = navigateTo('Explore')

const navigateToPlay = navigateTo('Play');

export const navigateToTraining = (state, navigation, tense_en) => {
    let newFamily = state.tableData.family.filter(
        (subFamily) =>
          tense_en == subFamily.tense.en
      );
    navigateToPlay(navigation, 'MultipleChoice', {
        family: newFamily,
        gameStyle: "MEDIUM_SINGLE_TENSE_PRACTICE",
        infinitive: state.tableData.infinitive,
        pattern: state.tableData.pattern.pattern,
        noun_phrase: state.tableData.noun_phrase,
        tense_en,
        translation: state.tableData.translation,
    })
}