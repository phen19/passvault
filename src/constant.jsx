const API = "https://sophisticated-muire-projetospessoais-bf19be74.koyeb.app";

const categorias = [
    {"wifis":[
        {"fieldName": "networkName", "fieldType": "text", "label": "Nome da Rede"},
        {"fieldName":"title", "fieldType": "text", "label": "Título"},
        {"fieldName": "password", "fieldType":"text", "label": "Senha"}
    ], "name": "Wifis", "id": 1},
    {"credentials":
        [
            {"fieldName": "url", "fieldType": "text", "label": "URL"},
            {"fieldName": "title", "fieldType": "text", "label": "Título"},
            {"fieldName": "username", "fieldType": "text", "label": "Nome de usuário" },
            {"fieldName": "password", "fieldType": "text", "label": "Senha"}
        ], "name": "Credentials", "id": 2}, 
    {"cards": [
        {"fieldName": "title", "fieldType": "text", "label": "Nome do Cartão"},
        {"fieldName": "cardHolderName", "fieldType": "text", "label": "Titular do Cartão"},
        {"fieldName": "number", "fieldType": "number", "label": "Número do Cartão"},
        {"fieldName": "securityCode", "fieldType": "number", "label": "Código de Segurança"},
        {"fieldName": "expireDate", "fieldType": "date", "label": "Data de Expiração"},
        {"fieldName": "password", "fieldType": "text", "label": "Senha"},
        {"fieldName": "isVirtual", "fieldType": "checkbox", "label": "É virtual?"},
        {"fieldName": "type", "fieldType": "select", "label": "Tipo do cartão"}
    ], "name":"Cards", "id": 3}, 
    {"documents":[
        {"fieldName": "fullName", "fieldType": "text", "label": "Nome Completo"},
        {"fieldName": "type", "fieldType": "select", "label": "Tipo do Documento"},
        {"fieldName": "emissionDate", "fieldType": "date", "label": "Data de Emissão"},
        {"fieldName": "expireDate", "fieldType": "date", "label": "Data de Expiração"},
        {"fieldName": "number", "fieldType": "number", "label": "Número do Documento"},
        {"fieldName": "issuer", "fieldType": "text", "label": "Emissor"},
    ], "name": "Documents", "id": 4},
    {"notes": [
        {"fieldName": "title", "fieldType": "text", "label": "Nome"},
        {"fieldName": "note", "fieldType": "text", "label": "Nota"},
    ],"name":"Notes", "id": 5}
];
export{
    API,
    categorias
} 