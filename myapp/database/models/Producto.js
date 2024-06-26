module.exports= function(sequelize, dataTypes){
    let alias = "Producto";
    let cols = {
        id: {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER
        },
        idUsuarios: {
            type : dataTypes.INTEGER
        },
        
        fotoProducto : {
            type: dataTypes.STRING
        },
        nombreProducto : {
            type : dataTypes.STRING
        },
        descripcionProducto : {
            type : dataTypes.STRING
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
        tableName: "productos",
        timestamps: true,
        underscored: false,
    }

    let Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models){
        Producto.belongsTo(models.Usuario, {
            as: "usuarios",
            foreignKey: "idUsuarios"
        });
        Producto.hasMany(models.Comentario, {
            as: "comentario",
            foreignKey: "idProducto"
        });
    }

    return Producto;
}