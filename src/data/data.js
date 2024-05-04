const treeFromServer = {
    "directories": [
        {
            "id": "1000",
            "name": "Корневой раздел",
            "createdAt": "2024-04-05T14:29:00+03:00",
            "updatedAt": "2024-04-05T14:29:00+03:00",
            "pages": [],
            "childDirectories": [
                {
                    "id": "1001",
                    "name": "Подраздел",
                    "createdAt": "2024-04-05T14:29:00+03:00",
                    "updatedAt": "2024-04-05T14:29:00+03:00",
                    "pages": [],
                    "childDirectories": [
                        {
                            "id": "1003",
                            "name": "Подраздел: третий уровень",
                            "createdAt": "2024-04-05T14:29:00+03:00",
                            "updatedAt": "2024-04-05T14:29:00+03:00",
                            "pages": [],
                            "childDirectories": []
                        }
                    ]
                },
                {
                    "id": "1002",
                    "name": "Подраздел 2",
                    "createdAt": "2024-04-05T14:29:00+03:00",
                    "updatedAt": "2024-04-05T14:29:00+03:00",
                    "pages": [
                        {
                            "id": "1007",
                            "name": "Страница",
                            "fileUUID": "84d838b9-0213-48b1-b104-3b30dfef468f",
                            "filePath": null,
                            "createdAt": "2024-05-01T22:41:00+03:00",
                            "updatedAt": "2024-05-01T22:41:00+03:00"
                        }
                    ],
                    "childDirectories": []
                }
            ]
        }
    ],
    "pages": [
        {
            "id": "1006",
            "name": "Корневая страница",
            "fileUUID": "18abe7a1-fa7d-4363-a0d9-d99c8b78edc4",
            "filePath": null,
            "createdAt": "2024-05-01T22:36:00+03:00",
            "updatedAt": "2024-05-01T22:36:00+03:00"
        }
    ]
};

export function fetchData(){
    return new Promise((resolve) => {
        setTimeout(resolve, 100, treeFromServer);
    });
}