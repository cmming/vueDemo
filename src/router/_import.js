export default file => {
    // return map[file] || null
    return getViews(file) || null
}


function getViews(params) {
    return () =>
        import (`@/views/${params}`)
}

// const map = {
//     'layout/index': () =>
//         import ('@/views/layout/index'),
//     'dashborad/index': () =>
//         import ('@/views/dashborad/index'),
//     'ui/form': () =>
//         import ('@/views/ui/form'),
//     'ui/table': () =>
//         import ('@/views/ui/table')
// }