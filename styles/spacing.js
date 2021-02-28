const alignItems = (dir) => ({alignItems: dir})

const justifyContent = (dir) => ({justifyContent: dir})

const padding = (p) => ({padding: p})

const margin = (m) => ({margin: m})

const marginHorizontal = (mh) => ({marginHorizontal: mh})

export const mh10 = marginHorizontal(10)

export const row = {flexDirection: 'row'}

export const p5 = padding(5)

export const m5 = margin(5)

export const m10 = margin(10)

export const m20 = margin(20)

export const alignCenter = alignItems('center')

export const alignEnd = alignItems('flex-end')

export const alignStart = alignItems('flex-start')

export const justifyCenter = justifyContent('center')

export const justifyEnd = justifyContent('flex-end')

export const justifyAround = justifyContent('space-around')

export const justifyStart = justifyContent('flex-start')

export const justifyBtwn = justifyContent('space-between')

export const centerCenter = {
    ...alignCenter,
    ...justifyCenter
}