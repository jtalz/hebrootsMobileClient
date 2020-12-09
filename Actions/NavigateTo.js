const navigateTo = (navigator) => (navigation, screen, params) => {
    navigation.navigate(navigator, {screen, initial: false, params});
}

export const navigateToPattern = navigateTo('Learn');

export const navigateToTraining = navigateTo('Progress');

export const navigateToSearch = navigateTo('Explore')
