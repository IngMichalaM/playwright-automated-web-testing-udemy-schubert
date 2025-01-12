export const isDesktopViewport = (page)  => {
    // return true or false - based on the viewportSize - mobile < 600 px
    const size = page.viewportSize()
    return size.width >= 600
}