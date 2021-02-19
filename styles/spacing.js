const alignItems = (dir) => ({alignItems: dir})

const justifyContent = (dir) => ({justifyContent: dir})

export const alignCenter = alignItems('center')

export const alignEnd = alignItems('flex-end')

export const justifyCenter = justifyContent('center')

export const justifyEnd = justifyContent('flex-end')

export const centerCenter = {
    ...alignCenter,
    ...justifyCenter
}