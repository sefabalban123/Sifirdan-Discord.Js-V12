module.exports = () => {

    const Sequelize = require('sequelize');

    const sequelize = new Sequelize('database', 'user', 'password', {
        host: 'localhost',
        dialect: 'sqlite',
        logging: false,
        storage: 'database.sqlite'
    })

    const Tags = sequelize.define('tags', {
        guild_id: { type: Sequelize.STRING, unique: true, allowNull: false },
        prefix: { type: Sequelize.STRING, defaultValue: "!" },
        welcome_message: { type: Sequelize.JSON, defaultValue: {enabled: false, channel_id: "", message: ""} },
        leave_message: { type: Sequelize.JSON, defaultValue: {enabled: false, channel_id: "", message: ""} },
        tag: {type: Sequelize.JSON, defaultValue: {enabled: false, tag_name: ""}},
        link_protect_enabled: {type: Sequelize.BOOLEAN, defaultValue: false},
        advertise_protect_enabled: { type: Sequelize.BOOLEAN, defaultValue: false },
        auto_role: {type: Sequelize.JSON, defaultValue: {enabled: false, role_id: ""}}
    })

    return Tags
}