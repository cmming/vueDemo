export default {
    routerList: [
        { "id": 33, "parentId": null, "sort": 0, "name": "仪表盘", "path": "/index", "icon": "dashboard", "hidden": "1", "children": [] },

        {
            "id": 102,
            "parentId": null,
            "sort": 3,
            "name": "测试2",
            "path": "/test/2",
            "icon": "dashboard",
            "hidden": "1",
            "children": [
                { "id": 103, "parentId": 102, "sort": 0, "name": "测试2-1", "path": "/test/2/1", "icon": "dashboard", "children": [], "hidden": "1" },
                { "id": 104, "parentId": 102, "sort": 0, "name": "测试2-1", "path": "/test/2/1", "icon": "dashboard", "children": [], "hidden": "1" }
            ]
        },
    ]
}