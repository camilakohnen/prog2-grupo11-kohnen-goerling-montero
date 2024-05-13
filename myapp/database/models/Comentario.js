module.exports= function(sequelize, dataTypes){
    let alias = "Comentarios";
    let cols = {
        id: {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER
        },
        idUsuario: {
            type : dataTypes.INTEGER
        },
        idProducto: {
            foreignKey : true,
            type : dataTypes.INTEGER
        },
        textoComentario : {
            type: dataTypes.STRING
        },
        createdAt : {
            type : dataTypes.DATE
        },
        updatedAt : {
            type : dataTypes.DATE
        },
        deletedAt: {
            type : dataTypes.DATE
        }
    }

    let config = {
        tableName: "comentarios",
        timestamps: true,
        underscored: true
    }

    let Comentario = sequelize.define(alias, cols, config);

    return Comentario;
}
